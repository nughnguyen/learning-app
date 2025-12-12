import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User as FirebaseUser,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
  FacebookAuthProvider
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

interface User {
  uid?: string;
  name: string;
  email?: string;
  avatar?: string | null;
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
  login: (name: string, avatar?: string) => Promise<void>; // Legacy/Simple login
  guestLogin: () => Promise<void>;
  logout: () => Promise<void>;
  // New Methods
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  updateUserProfile: (name: string, avatar: string | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isGuest: false,
  isLoading: true,
  login: async () => {},
  guestLogin: async () => {},
  logout: async () => {},
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  loginWithGoogle: async () => {},
  loginWithFacebook: async () => {},
  updateUserProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Google Auth Request
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // REPLACE WITH YOUR ACTUAL CLIENT IDs from Google Cloud Console
    // webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    // iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    // androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    clientId: '600307861165-8jg9a0uoli6l4mn0iint1f869v3059ak.apps.googleusercontent.com', // Taking a guess from prev conversation helper, but likely needs webClientId for Expo Go
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
           // onAuthStateChanged will handle the user state update
        })
        .catch((error) => {
           console.error("Google Sign-In Error", error);
           alert("Google Sign-In failed: " + error.message);
        });
    }
  }, [response]);

  useEffect(() => {
    checkLocalGuest();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
       if (firebaseUser) {
           setUser({
               uid: firebaseUser.uid,
               name: firebaseUser.displayName || 'User',
               email: firebaseUser.email || '',
               avatar: firebaseUser.photoURL
           });
           setIsGuest(false);
           AsyncStorage.removeItem('isGuest'); // If logged in, not guest
       } else {
           // If not firebase user, check if we are in legacy local user mode or guest mode
           checkLocalGuest().then(() => {
               // If checkLocalGuest returns null (not found), then we are truly logged out unless guest
           });
       }
       setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const checkLocalGuest = async () => {
      if (auth.currentUser) return; 

      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedGuest = await AsyncStorage.getItem('isGuest');
        
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else if (storedGuest === 'true') {
            setIsGuest(true);
        } else {
            setUser(null);
        }
      } catch (e) {
          console.error(e);
      }
  };

  const login = async (name: string, avatar?: string) => {
    // "Legacy" Name-only login (Local)
    const newUser = { name, avatar: avatar || null };
    setUser(newUser);
    setIsGuest(false);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    await AsyncStorage.removeItem('isGuest');
  };

  const loginWithEmail = async (email: string, pass: string) => {
      await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, { displayName: name });
      setUser({
           uid: userCredential.user.uid,
           name: name,
           email: email,
           avatar: null
      });
  };

  const loginWithGoogle = async () => {
      if (!request) {
          alert("Google Sign-In is not ready yet. Please check your configuration.");
          return;
      }
      await promptAsync();
  };

  const loginWithFacebook = async () => {
       console.log("Facebook Login Triggered");
       alert("Facebook Login requires App ID configuration.");
  };

  const guestLogin = async () => {
    setIsGuest(true);
    setUser(null);
    await AsyncStorage.setItem('isGuest', 'true');
    await AsyncStorage.removeItem('user');
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsGuest(false);
    await AsyncStorage.multiRemove(['user', 'isGuest']);
  };

  const updateUserProfile = async (name: string, avatar: string | null) => {
    // Update local state immediately for UI responsiveness
    setUser(prev => prev ? { ...prev, name, avatar } : null);
    
    // Also update AsyncStorage if we are in local flow fallback (unlikely if using Firebase but safe to do)
    if (!auth.currentUser) {
        const currentUserStr = await AsyncStorage.getItem('user');
        if (currentUserStr) {
            const currentUser = JSON.parse(currentUserStr);
            const updated = { ...currentUser, name, avatar };
            await AsyncStorage.setItem('user', JSON.stringify(updated));
        }
    } else {
        // If firebase, the auth.currentUser needs reload to see changes usually, 
        // but we assume the caller has already called updateProfile on firebase auth.
        // We just ensure local state is in sync.
        await auth.currentUser.reload();
    }
  };

  return (
    <AuthContext.Provider value={{ 
        user, isGuest, isLoading, 
        login, guestLogin, logout,
        loginWithEmail, registerWithEmail, loginWithGoogle, loginWithFacebook,
        updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
