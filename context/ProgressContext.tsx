import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

interface CategoryProgress {
  completed: string[]; 
  total: number;
}

interface ProgressData {
  [categoryIndex: string]: CategoryProgress;
}

interface ProgressContextType {
  progress: ProgressData;
  updateProgress: (category: string, itemKey: string) => Promise<void>;
  updateTotal: (category: string, total: number) => void;
  isLoadingProgress: boolean;
}

const ProgressContext = createContext<ProgressContextType>({
  progress: {},
  updateProgress: async () => {},
  updateTotal: () => {},
  isLoadingProgress: false,
});

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isGuest } = useAuth();
  const [progress, setProgress] = useState<ProgressData>({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

  useEffect(() => {
    if (user || isGuest) {
      loadProgress();
    } else {
        setProgress({});
    }
  }, [user, isGuest]);

  const loadProgress = async () => {
    setIsLoadingProgress(true);
    try {
      if (user) {
        // Check if "Real" User (has UID from Firebase Auth) or just "Name" User
        const hasCloudAuth = (user as any).uid;

        if (hasCloudAuth) {
            // 1. Fetch Cloud Progress
            let cloudData: ProgressData = {};
            try {
                const docRef = doc(db, "users", (user as any).uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                     const data = docSnap.data();
                     if (data.progress) cloudData = data.progress;
                }
            } catch (err) {
                console.error("Firebase load failed:", err);
            }

            // 2. Check for Local Guest Progress to Sync
            const guestStored = await AsyncStorage.getItem('guest_progress');
            if (guestStored) {
                const guestData: ProgressData = JSON.parse(guestStored);
                
                // 3. Merge Strategies
                const mergedData = { ...cloudData };
                Object.keys(guestData).forEach(cat => {
                    const cloudCat = mergedData[cat] || { completed: [], total: 0 };
                    const guestCat = guestData[cat];
                    
                    // Merge completed items (Set union)
                    const uniqueCompleted = Array.from(new Set([...cloudCat.completed, ...guestCat.completed]));
                    
                    mergedData[cat] = {
                        completed: uniqueCompleted,
                        total: Math.max(cloudCat.total, guestCat.total)
                    };
                });

                console.log("Syncing guest progress to cloud...", mergedData);
                
                // 4. Save Merged to Cloud
                try {
                    const docRef = doc(db, "users", (user as any).uid);
                    await setDoc(docRef, { progress: mergedData }, { merge: true });
                    // 5. Clear guest progress so we don't sync again
                    await AsyncStorage.removeItem('guest_progress');
                    setProgress(mergedData);
                } catch(e) {
                    console.error("Failed to sync guest progress", e);
                    // If sync fail, keep cloud data for now? Or guest data?
                    // Let's rely on cloudData mostly but maybe minimal local
                    setProgress(mergedData); 
                }
            } else {
                // No guest data, just use cloud
                setProgress(cloudData);
            }

        } else {
            // Name Only: Load from Local Storage (Unique by Name)
            const stored = await AsyncStorage.getItem(`user_progress_${user.name}`);
            if (stored) {
                setProgress(JSON.parse(stored));
            } else {
                setProgress({});
            }
        }
      } else if (isGuest) {
        // Guest: Load from Local Storage
        const stored = await AsyncStorage.getItem('guest_progress');
        if (stored) {
            setProgress(JSON.parse(stored));
        } else {
             setProgress({});
        }
      }
    } catch (error) {
       console.error("Failed to load progress", error);
    } finally {
       setIsLoadingProgress(false);
    }
  };

  const updateProgress = async (category: string, itemKey: string) => {
    setProgress(prev => {
        const currentCat = prev[category] || { completed: [], total: 0 };
        if (currentCat.completed.includes(itemKey)) return prev;

        const newCompleted = [...currentCat.completed, itemKey];
        const newProgress = {
            ...prev,
            [category]: {
                ...currentCat,
                completed: newCompleted
            }
        };

        persistProgress(newProgress);
        return newProgress;
    });
  };

  const updateTotal = (category: string, total: number) => {
      setProgress(prev => {
          if ((prev[category]?.total || 0) === total) return prev;
          
          const newProgress = {
            ...prev,
            [category]: {
                ...(prev[category] || { completed: [] }),
                total
            }
          };
          // Persist mainly for total count? Maybe not critical to sync total to DB, but good for local
           // We'll trust persistProgress to handle the WHERE
          persistProgress(newProgress);
          return newProgress;
      });
  };

  const persistProgress = async (newProgress: ProgressData) => {
      try {
        if (user) {
             const hasCloudAuth = (user as any).uid;
             if (hasCloudAuth) {
                // Cloud Save
                const docRef = doc(db, "users", (user as any).uid);
                await setDoc(docRef, { progress: newProgress }, { merge: true });
             } else {
                // Local Save (Name Based)
                await AsyncStorage.setItem(`user_progress_${user.name}`, JSON.stringify(newProgress));
             }
        } else if (isGuest) {
             // Local Save (Guest)
             await AsyncStorage.setItem('guest_progress', JSON.stringify(newProgress));
        }
      } catch (e) {
          console.error("Failed to persist progress", e);
      }
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, updateTotal, isLoadingProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
