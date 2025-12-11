import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CourseScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const COURSES = [
    { id: 'grammar', title: 'English Grammar', count: '12 Tenses & more', color: 'bg-orange-100', iconColor: '#f97316', icon: 'text' },
    { id: 'vocabulary', title: 'Vocabulary Builder', count: '1000+ words', color: 'bg-blue-100', iconColor: '#2563eb', icon: 'book' },
    { id: 'speaking', title: 'Speaking Practice', count: 'Coming Soon', color: 'bg-purple-100', iconColor: '#9333ea', icon: 'mic' },
  ];

  const filteredCourses = COURSES.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.count.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-5">
      <Text className="text-3xl font-bold text-gray-900 mb-2">My Courses</Text>
      <Text className="text-gray-500 mb-6">Structured learning paths for you.</Text>

      {/* Search Bar */}
      <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3 mb-6 shadow-sm">
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput 
              className="flex-1 ml-3 text-gray-800 font-medium text-base"
              placeholder="Search courses..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color="#d1d5db" />
              </TouchableOpacity>
          )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
                <TouchableOpacity 
                    key={course.id}
                    className="bg-white rounded-3xl p-6 mb-5 shadow-sm border border-gray-100 flex-row items-center"
                    onPress={() => {
                        if (course.id === 'grammar') router.push('/course/grammar');
                        if (course.id === 'vocabulary') router.push('/vocabulary');
                    }}
                >
                    <View className={`w-16 h-16 rounded-2xl ${course.color} justify-center items-center mr-5`}>
                        <Ionicons name={course.icon as any} size={30} color={course.iconColor} />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-gray-800 mb-1">{course.title}</Text>
                        <Text className="text-gray-500 font-medium">{course.count}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#d1d5db" />
                </TouchableOpacity>
            ))
        ) : (
            <View className="items-center mt-10">
                <Ionicons name="search-outline" size={48} color="#e5e7eb" />
                <Text className="text-gray-400 mt-2 font-medium">No courses found matching "{searchQuery}"</Text>
            </View>
        )}
        <View className="h-20" /> 
      </ScrollView>
    </View>
  );
}
