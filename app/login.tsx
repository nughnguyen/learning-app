import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const { login, guestLogin } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (name.trim()) {
      await login(name);
      router.replace('/(tabs)');
    }
  };

  const handleSkip = async () => {
    await guestLogin();
    router.replace('/(tabs)'); // Use replace to prevent going back to login
  };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 px-8 justify-center pb-20">
            {/* Skip Button */}
            <TouchableOpacity 
                onPress={handleSkip} 
                className="absolute top-12 right-6 p-2 z-10"
            >
                <Ionicons name="close-circle-outline" size={32} color="#9ca3af" />
            </TouchableOpacity>

            <View className="items-center mb-10 mt-20">
                <View className="w-32 h-32 bg-blue-100 rounded-full justify-center items-center mb-6">
                    <Ionicons name="school" size={60} color="#2563eb" />
                </View>
                <Text className="text-3xl font-bold text-gray-800 text-center">
                    Welcome to GumballZ
                </Text>
                <Text className="text-gray-500 text-center mt-2">
                    Learning made fun and easy!
                </Text>
            </View>

            <View className="space-y-4">
                <Text className="text-gray-700 font-medium ml-1">What should we call you?</Text>
                <TextInput
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-lg text-gray-800 focus:border-blue-500 focus:bg-white"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
                
                <TouchableOpacity 
                    className={`w-full py-4 rounded-2xl mt-4 shadow-lg shadow-blue-300 ${name.trim() ? 'bg-blue-600' : 'bg-gray-300'}`}
                    onPress={handleLogin}
                    disabled={!name.trim()}
                >
                    <Text className="text-white text-center font-bold text-lg">Start Learning</Text>
                </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
