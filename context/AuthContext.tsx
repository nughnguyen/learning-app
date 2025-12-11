import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  avatar?: string | null;
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
  login: (name: string, avatar?: string) => Promise<void>;
  guestLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isGuest: false,
  isLoading: true,
  login: async () => {},
  guestLogin: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedGuest = await AsyncStorage.getItem('isGuest');
        
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else if (storedGuest === 'true') {
            setIsGuest(true);
        }
    } catch (e) {
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  const login = async (name: string, avatar?: string) => {
    const newUser = { name, avatar: avatar || null };
    setUser(newUser);
    setIsGuest(false);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    await AsyncStorage.removeItem('isGuest');
  };

  const guestLogin = async () => {
    setIsGuest(true);
    setUser(null);
    await AsyncStorage.setItem('isGuest', 'true');
    await AsyncStorage.removeItem('user');
  };

  const logout = async () => {
    setUser(null);
    setIsGuest(false);
    await AsyncStorage.multiRemove(['user', 'isGuest']);
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, isLoading, login, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
