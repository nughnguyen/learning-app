import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useProgress } from '../../context/ProgressContext';

// Category Data
const ALL_CATEGORIES = [
  { id: 'grammar', name: 'Grammar', icon: 'text' },
  { id: 'tense', name: 'Tense', icon: 'time' },
  { id: 'vocabulary', name: 'Vocabulary', icon: 'book' },
  { id: 'dictionary', name: 'Dictionary', icon: 'library' },
  { id: 'translate', name: 'Translate', icon: 'language' },
  { id: 'course', name: 'Course', icon: 'school' },
];

export default function HomeScreen() {
  const { user, isGuest } = useAuth();
  const { progress } = useProgress();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredCategories = ALL_CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedCategories = searchQuery 
    ? filteredCategories 
    : (showAllCategories ? ALL_CATEGORIES : ALL_CATEGORIES.slice(0, 3));

  const handleCategoryPress = (categoryId: string) => {
    // Navigate based on category
    if (categoryId === 'vocabulary') router.push('/vocabulary'); 
    else if (categoryId === 'translate') router.push('/translate');
    // ... add others
  };

  return (
    <View className="flex-1 bg-gray-50 pt-12">
        <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-gray-500 text-base font-medium">Hello,</Text>
                    <Text className="text-2xl font-bold text-gray-800">
                        {user ? user.name : 'Guest'}
                    </Text>
                    <Text className="text-blue-500 font-medium">Have fun studying!</Text>
                </View>
                <View className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    {user?.avatar ? (
                        <Image source={{ uri: user.avatar }} className="w-full h-full" />
                    ) : (
                        <View className="w-full h-full justify-center items-center bg-blue-100">
                             <Ionicons name="person" size={20} color="#2563eb" />
                        </View>
                    )}
                </View>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 mb-8 shadow-sm border border-gray-100">
                <Ionicons name="search" size={24} color="#9ca3af" />
                <TextInput 
                    placeholder="Search course..." 
                    className="flex-1 ml-3 text-base text-gray-700"
                    placeholderTextColor="#9ca3af"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Ionicons name="close-circle" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Categories */}
            <View className="mb-8">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold text-gray-800">Categories</Text>
                    {!searchQuery && (
                        <TouchableOpacity onPress={() => setShowAllCategories(!showAllCategories)}>
                            <Text className="text-blue-500 font-medium">
                                {showAllCategories ? 'Show Less' : 'View all'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View className="flex-row flex-wrap justify-between">
                    {displayedCategories.map((cat) => (
                        <TouchableOpacity 
                            key={cat.id}
                            className="bg-white p-4 rounded-2xl w-[31%] mb-4 items-center shadow-sm border border-gray-50"
                            onPress={() => handleCategoryPress(cat.id)}
                        >
                            <View className="w-12 h-12 bg-blue-50 rounded-full justify-center items-center mb-2">
                                <Ionicons name={cat.icon as any} size={24} color="#2563eb" />
                            </View>
                            <Text className="text-xs font-medium text-gray-700 text-center">{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                {/* Horizontal Scroll Hint if expanded? Or strictly grid as per mockup? */}
                 {showAllCategories && (
                    <Text className="text-xs text-gray-400 text-center mt-[-10px] mb-4">
                        Swipe left to see more (if implemented as scroll)
                    </Text>
                 )}
            </View>

            {/* Current Learning Progress */}
            <View className="mb-24">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold text-gray-800">Current Progress</Text>
                </View>

                {/* Progress Card Example: Vocabulary */}
                <TouchableOpacity className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-gray-100 flex-row">
                    <Image 
                        source={{ uri: 'https://img.freepik.com/free-vector/english-teacher-concept-illustration_114360-7478.jpg' }} // Placeholder
                        className="w-20 h-20 rounded-xl bg-gray-200" 
                    />
                    <View className="flex-1 ml-4 justify-around">
                        <Text className="text-base font-bold text-gray-800">Vocabulary</Text>
                        <Text className="text-xs text-gray-500">
                             {progress['vocabulary']?.completed.length || 0} Topics Completed
                        </Text>
                        
                        <View className="mt-2">
                            <View className="flex-row justify-between mb-1">
                                <Text className="text-xs font-bold text-blue-500">General</Text>
                                <Text className="text-xs text-gray-400">
                                    {progress['vocabulary']?.completed.length || 0} Total
                                </Text>
                            </View>
                             <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                {/* Visual progress: assume 20 topics is a reasonable goal for now */}
                                <View 
                                    className="h-full bg-blue-500 rounded-full" 
                                    style={{ width: `${Math.min(((progress['vocabulary']?.completed.length || 0) / 20) * 100, 100)}%` }}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                 {/* Progress Card Example: Grammar */}
                 <TouchableOpacity className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-gray-100 flex-row">
                    <View className="w-20 h-20 rounded-xl bg-orange-100 justify-center items-center">
                         <Ionicons name="text-outline" size={32} color="#f97316" />
                    </View>
                    <View className="flex-1 ml-4 justify-around">
                        <Text className="text-base font-bold text-gray-800">Grammar</Text>
                        <Text className="text-xs text-gray-500">12 Tenses</Text>
                        
                        <View className="mt-2">
                            <View className="flex-row justify-between mb-1">
                                <Text className="text-xs font-bold text-orange-500">Basic</Text>
                                <Text className="text-xs text-gray-400">80%</Text>
                            </View>
                             <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <View className="w-[80%] h-full bg-orange-500 rounded-full" />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    </View>
  );
}
