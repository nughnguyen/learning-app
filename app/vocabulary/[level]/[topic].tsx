import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useOptions } from 'expo-router/build/useScreens'; // Internal? No, define headers using Stack.Screen

interface WordItem {
  Word: string; // CSV headers usually capitalized? Check sample response if possible.
  Meaning: string;
  Type?: string;
  Pronunciation?: string;
  Example?: string;
  // Based on standard sheet structure.
}

export default function LessonScreen() {
  const { level, topic } = useLocalSearchParams();
  const [words, setWords] = useState<WordItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLesson();
  }, [level, topic]);

  const fetchLesson = async () => {
    try {
      const response = await axios.get(`https://gumballz-learning-api.vercel.app/api/lesson/${level}/${topic}`);
      // API likely returns array of objects
      if (Array.isArray(response.data)) {
        setWords(response.data);
      } else {
         setWords([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderCard = ({ item }: { item: any }) => (
    <View className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-gray-100">
        <View className="flex-row justify-between items-start mb-2">
            <Text className="text-xl font-bold text-blue-600">{item.Word || item.word}</Text>
             {/* Audio button placeholder */}
            <TouchableOpacity>
                <Ionicons name="volume-high-outline" size={24} color="#9ca3af" />
            </TouchableOpacity>
        </View>
        
        <View className="flex-row items-center mb-1">
             <Text className="text-xs font-bold text-orange-500 mr-2 border border-orange-200 px-2 py-0.5 rounded">{item.Type || item.type || 'n'}</Text>
             <Text className="text-gray-500 italic text-sm">{item.Pronunciation || item.pronunciation || '/.../'}</Text>
        </View>

        <Text className="text-gray-800 text-lg mb-2">{item.Meaning || item.meaning}</Text>
        
        {item.Example && (
            <View className="bg-gray-50 p-3 rounded-lg mt-2">
                <Text className="text-gray-600 italic">"{item.Example}"</Text>
            </View>
        )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: topic as string }} />
      {loading ? (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <FlatList
            data={words}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ padding: 20 }}
            ListEmptyComponent={<Text className="text-center text-gray-500 mt-10">No words found.</Text>}
        />
      )}
    </View>
  );
}
