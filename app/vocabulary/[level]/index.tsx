import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

interface Topic {
  topic: string; // API returns 'topic' or similar? Need to verify response shape.
  // Dashboard says "Danh sách Topics... 17 mục...". 
  // Assuming array of strings or objects. API usually returns JSON. 
  // Base on dashboard examples: "Tổng số Chủ đề... 17".
  // Let's assume response is { data: string[] } or just string[].
  // I'll log/inspect or handle both.
}

export default function TopicsScreen() {
  const { level } = useLocalSearchParams();
  const router = useRouter();
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
  }, [level]);

  const fetchTopics = async () => {
    try {
      // Endpoint: /api/vocabulary/list-topics?level=A1
      const response = await axios.get(`https://gumballz-learning-api.vercel.app/api/vocabulary/list-topics?level=${level}`);
      // Assuming response.data is the array or { data: array }
      // The dashboard log shows "Kết quả: 17 mục...". I suspect it returns an array directly or a wrapper.
      // I'll assume array of strings for now based on "list-topics".
      console.log("Topics data:", response.data); 
      // API might return array of objects { name: 'Animals', ... } or strings.
      // If strings, great. If objects, map them.
      // Safely handle:
      if (Array.isArray(response.data)) {
         setTopics(response.data);
      } else if (response.data?.data && Array.isArray(response.data.data)) {
         setTopics(response.data.data);
      } else {
        // Fallback or empty
        setTopics([]); // or mock ['Animals', 'Food'] for demo
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
      // alert("Could not fetch topics");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: string | any }) => {
     // item might be string or object
     const name = typeof item === 'string' ? item : item.name || item.topic;
     
     return (
        <TouchableOpacity 
            className="flex-1 m-2 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 items-center justify-center h-40"
            onPress={() => router.push(`/vocabulary/${level}/${name}`)}
        >
            <View className="w-16 h-16 bg-orange-100 rounded-full justify-center items-center mb-3">
                 <Ionicons name="book" size={30} color="#f97316" />
                 {/* Placeholder icon. User said they will add images. */}
            </View>
            <Text className="text-center font-bold text-gray-800">{name}</Text>
        </TouchableOpacity>
     );
  };

  if (loading) {
    return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#2563eb" /></View>;
  }

  return (
    <View className="flex-1 bg-gray-50 px-2">
      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={<Text className="text-center text-gray-500 mt-10">No topics found for this level.</Text>}
      />
    </View>
  );
}
