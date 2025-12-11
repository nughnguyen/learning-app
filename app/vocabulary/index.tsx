import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const STANDARD_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function VocabularyScreen() {
  const router = useRouter();
  const [levels, setLevels] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchLevels();
  }, []);

  useEffect(() => {
    if (selectedLevel) {
        fetchTopics(selectedLevel);
    }
  }, [selectedLevel]);

  const fetchLevels = async () => {
      try {
          const timestamp = new Date().getTime();
          const response = await axios.get(`https://gumballz-learning-api.vercel.app/api/vocabulary/list-levels?t=${timestamp}`);
          if (response.data && Array.isArray(response.data.data)) {
              const apiLevels = response.data.data.map((item: any) => item.level);
              setLevels(apiLevels);
              
              // Validate selectedLevel
              if (apiLevels.length > 0 && !apiLevels.includes(selectedLevel)) {
                  setSelectedLevel(apiLevels[0]);
              }
          } else {
              setLevels(STANDARD_LEVELS);
          }
      } catch (error) {
          console.error("Failed to fetch levels", error);
          setLevels(STANDARD_LEVELS);
      }
  };

  const fetchTopics = async (lvl: string) => {
    setLoading(true);
    try {
      const timestamp = new Date().getTime();
      const response = await axios.get(`https://gumballz-learning-api.vercel.app/api/vocabulary/list-topics?level=${lvl}&t=${timestamp}`);
      if (Array.isArray(response.data)) {
         setTopics(response.data);
      } else if (response.data?.data && Array.isArray(response.data.data)) {
         setTopics(response.data.data);
      } else {
        setTopics([]);
      }
    } catch (error) {
      console.error(error);
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
      setRefreshing(true);
      await Promise.all([fetchLevels(), fetchTopics(selectedLevel)]);
      setRefreshing(false);
  };

  const handleLevelSelect = (lvl: string) => {
    setSelectedLevel(lvl);
    setIsDropdownOpen(false);
  };

  const renderItem = ({ item }: { item: string | any }) => {
     const name = typeof item === 'string' ? item : item.name || item.topic;
     return (
        <TouchableOpacity 
            className="w-full mb-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-row items-center"
            onPress={() => router.push(`/vocabulary/${selectedLevel}/${name}`)}
        >
            <View className="w-12 h-12 bg-orange-50 rounded-full justify-center items-center mr-4">
                 <Ionicons name="book-outline" size={24} color="#f97316" />
            </View>
            <Text className="flex-1 font-bold text-gray-800 text-lg" numberOfLines={1}>{name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
     );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      
      <SafeAreaView className="flex-1">
        {/* Custom Header */}
        <View className="px-5 pt-2 pb-2 flex-row items-center z-50">
             <TouchableOpacity 
                onPress={() => router.back()}
                className="w-10 h-10 bg-white rounded-full justify-center items-center shadow-sm border border-gray-100 mr-4"
            >
                <Ionicons name="arrow-back" size={20} color="#4b5563" />
            </TouchableOpacity>
        </View>

        <View className="flex-1 px-4">
            {/* Level Dropdown Section */}
            <View className="mb-6 z-40 relative px-2">
                <Text className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2 ml-1">Select Level</Text>
                
                <TouchableOpacity 
                    className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-200"
                    onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <View className="flex-row items-center">
                        <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${isDropdownOpen ? 'bg-blue-600' : 'bg-blue-100'}`}>
                             <Text className={`font-bold ${isDropdownOpen ? 'text-white' : 'text-blue-600'}`}>{selectedLevel}</Text>
                        </View>
                        <Text className="text-lg font-bold text-gray-800">Level {selectedLevel}</Text>
                    </View>
                    <Ionicons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#6b7280" />
                </TouchableOpacity>

                {/* Dropdown Options */}
                {isDropdownOpen && (
                    <View className="absolute top-20 left-2 right-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-2">
                        {levels.map((lvl) => (
                            <TouchableOpacity 
                                key={lvl}
                                className={`p-3 rounded-xl mb-1 flex-row items-center ${selectedLevel === lvl ? 'bg-blue-50' : ''}`}
                                onPress={() => handleLevelSelect(lvl)}
                            >
                                <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${selectedLevel === lvl ? 'bg-blue-500' : 'bg-gray-100'}`}>
                                    {selectedLevel === lvl && <Ionicons name="checkmark" size={14} color="white" />}
                                </View>
                                <Text className={`font-bold ${selectedLevel === lvl ? 'text-blue-700' : 'text-gray-600'}`}>Level {lvl}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* Topics List */}
             {loading && !refreshing ? (
                 <View className="flex-1 justify-center items-center">
                     <ActivityIndicator size="large" color="#2563eb" />
                 </View>
             ) : (
                <FlatList
                    data={topics}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563eb']} />
                    }
                    ListEmptyComponent={
                        <View className="items-center mt-10 opacity-50">
                            <Ionicons name="file-tray-outline" size={48} color="gray" />
                            <Text className="text-gray-500 mt-2">No topics found.</Text>
                        </View>
                    }
                />
             )}
        </View>
      </SafeAreaView>
    </View>
  );
}
