

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { login, guestLogin, loginWithEmail, registerWithEmail, loginWithGoogle, loginWithFacebook } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For Register or Guest
  const [loading, setLoading] = useState(false);
  const [showGuestInput, setShowGuestInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Quick Name Input (Legacy Guest Mode)
  const [guestName, setGuestName] = useState('');
  
  // Error Handling State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getFriendlyErrorMessage = (errorCode: string) => {
    switch (errorCode) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
            return 'Incorrect email or password. Please try again.';
        case 'auth/email-already-in-use':
            return 'This email is already in use.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        default:
            return 'Something went wrong. Please check your connection.';
    }
  };

  const handleAuthAction = async () => {
      setErrorMessage(null); // Clear previous errors
      if (!email || !password) {
          setErrorMessage('Please fill in all fields.');
          return;
      }
      
      setLoading(true);
      try {
          if (mode === 'login') {
              await loginWithEmail(email, password);
          } else {
              if (!name) {
                  setErrorMessage('Please enter your name.');
                  setLoading(false);
                  return;
              }
              await registerWithEmail(email, password, name);
          }
          router.replace('/(tabs)');
      } catch (error: any) {
          const code = error.code || '';
          setErrorMessage(getFriendlyErrorMessage(code));
          console.log("Auth Error:", code, error.message);
      } finally {
          setLoading(false);
      }
  };

  const handleGuestContinue = async () => {
    if (guestName.trim()) {
      await login(guestName); // This is the context 'login' which is basically "Name-only" mode
      router.replace('/(tabs)');
    } else {
        await guestLogin();
        router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {/* Top Decorative Circle */}
          <View className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-blue-100 rounded-full opacity-50" />
          <View className="absolute top-[20px] right-[-30px] w-24 h-24 bg-orange-100 rounded-full opacity-50" />

          <View className="flex-1 px-8 pt-20 pb-10">
            
            {/* Header / Logo */}
            <View className="items-center mb-10">
                <View className="w-24 h-24 bg-white rounded-3xl justify-center items-center mb-4 shadow-lg shadow-blue-100 border border-gray-50">
                    <Ionicons name="school" size={48} color="#2563eb" />
                </View>
                <Text className="text-3xl font-bold text-gray-800 text-center">
                    Welcome to GumballZ
                </Text>
                <Text className="text-gray-500 text-center mt-2 mb-6">
                    Learning made fun and easy!
                </Text>
                <Text className="text-xl font-bold text-blue-600">
                    {mode === 'login' ? 'Login to Continue' : 'Create New Account'}
                </Text>
            </View>

            {/* Error Banner */}
            {errorMessage && (
                <View className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 flex-row items-start shadow-sm shadow-red-50" style={{ transform: [{ scale: 1 }] }}>
                    <Ionicons name="alert-circle" size={24} color="#ef4444" />
                    <View className="ml-3 flex-1">
                        <Text className="text-red-900 font-bold text-base mb-1">Authentication Failed</Text>
                        <Text className="text-red-600 text-sm">{errorMessage}</Text>
                    </View>
                </View>
            )}

            {/* Form */}
            <View className="space-y-4">
                {mode === 'register' && (
                    <View className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 flex-row items-center focus:border-blue-500 focus:bg-white transition-all">
                        <Ionicons name="person-outline" size={20} color="#9ca3af" />
                        <TextInput
                            className="flex-1 ml-3 text-base text-gray-800"
                            placeholder="Full Name"
                            value={name}
                            onChangeText={(t) => { setName(t); setErrorMessage(null); }}
                            autoCapitalize="words"
                        />
                    </View>
                )}

                <View className={`bg-gray-50 border ${errorMessage && (errorMessage.includes('email') || errorMessage.includes('Incorrect')) ? 'border-red-300 bg-red-50' : 'border-gray-100'} rounded-2xl px-4 py-3 flex-row items-center`}>
                    <Ionicons name="mail-outline" size={20} color={errorMessage && errorMessage.includes('email') ? "#ef4444" : "#9ca3af"} />
                    <TextInput
                        className="flex-1 ml-3 text-base text-gray-800"
                        placeholder="Email Address"
                        value={email}
                        onChangeText={(t) => { setEmail(t); setErrorMessage(null); }}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View className={`bg-gray-50 border ${errorMessage && (errorMessage.includes('password') || errorMessage.includes('Incorrect')) ? 'border-red-300 bg-red-50' : 'border-gray-100'} rounded-2xl px-4 py-3 flex-row items-center`}>
                    <Ionicons name="lock-closed-outline" size={20} color={errorMessage && errorMessage.includes('password') ? "#ef4444" : "#9ca3af"} />
                    <TextInput
                        className="flex-1 ml-3 text-base text-gray-800"
                        placeholder="Password"
                        value={password}
                        onChangeText={(t) => { setPassword(t); setErrorMessage(null); }}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                         <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#9ca3af" />
                    </TouchableOpacity>
                </View>

                {mode === 'login' && (
                    <TouchableOpacity className="items-end">
                        <Text className="text-blue-500 font-medium text-sm">Forgot Password?</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity 
                    className="w-full py-4 rounded-2xl mt-4 shadow-lg shadow-blue-200 bg-blue-600 flex-row justify-center items-center"
                    onPress={handleAuthAction}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-center font-bold text-lg">
                            {mode === 'login' ? 'Login' : 'Sign Up'}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Toggle Mode */}
            <View className="flex-row justify-center mt-6">
                <Text className="text-gray-500">{mode === 'login' ? "Don't have an account? " : "Already have an account? "}</Text>
                <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
                    <Text className="text-blue-600 font-bold">{mode === 'login' ? 'Sign Up' : 'Login'}</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center my-8">
                <View className="flex-1 h-[1px] bg-gray-200" />
                <Text className="mx-4 text-gray-400 text-sm">OR CONTINUE WITH</Text>
                <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            {/* Social Login */}
            <View className="flex-row justify-center space-x-6 mb-8 gap-4">
                <TouchableOpacity onPress={loginWithGoogle} className="w-16 h-16 bg-white border border-gray-100 rounded-2xl justify-center items-center shadow-sm">
                    <Ionicons name="logo-google" size={28} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity onPress={loginWithFacebook} className="w-16 h-16 bg-white border border-gray-100 rounded-2xl justify-center items-center shadow-sm">
                    <Ionicons name="logo-facebook" size={28} color="#4267B2" />
                </TouchableOpacity>
            </View>

            {/* Quick Guest Mode */}
            {!showGuestInput ? (
                <TouchableOpacity onPress={() => setShowGuestInput(true)} className="items-center">
                    <Text className="text-gray-400 font-medium">Continue as Guest</Text>
                </TouchableOpacity>
            ) : (
                <View className="mt-2 animate-pulse bg-orange-50 p-4 rounded-2xl border border-orange-100">
                    <Text className="text-orange-800 font-bold mb-2 text-center">Quick Start (Guest)</Text>
                    <View className="flex-row gap-2">
                        <TextInput 
                            className="flex-1 bg-white border border-orange-200 rounded-xl px-4 py-2"
                            placeholder="Enter your name..."
                            value={guestName}
                            onChangeText={setGuestName}
                        />
                        <TouchableOpacity 
                            className="bg-orange-500 rounded-xl px-4 justify-center"
                            onPress={handleGuestContinue}
                        >
                             <Ionicons name="arrow-forward" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setShowGuestInput(false)} className="mt-2 items-center">
                        <Text className="text-orange-400 text-xs">Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}

          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
