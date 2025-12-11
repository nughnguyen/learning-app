import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

const RootLayoutNav = () => {
  const { user, isGuest, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)'; // If I had an auth group, but I don't.
    // Check if on login screen
    const inLogin = segments[0] === 'login';

    if (!user && !isGuest && !inLogin) {
      // Redirect to login if not logged in and not guest
      router.replace('/login');
    } else if ((user || isGuest) && inLogin) {
      // Redirect to home if logged in and on login page
      router.replace('/(tabs)');
    }
  }, [user, isGuest, isLoading, segments]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="vocabulary" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
