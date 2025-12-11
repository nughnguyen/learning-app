import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function LevelsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50 p-5">
      <Text className="text-2xl font-bold text-gray-800 mb-6">Choose your level</Text>
      
      <View className="flex-row flex-wrap justify-between">
        {LEVELS.map((level) => (
          <TouchableOpacity 
            key={level}
            className="w-[48%] bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100 items-center"
            onPress={() => router.push(`/vocabulary/${level}`)}
          >
            <View className="w-16 h-16 rounded-full bg-blue-100 justify-center items-center mb-3">
              <Text className="text-2xl font-bold text-blue-600">{level}</Text>
            </View>
            <Text className="text-gray-500 font-medium">Beginner</Text>
             {/* Dynamic labels based on level? A1/A2 Beginner, B1/B2 Intermediate... */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
