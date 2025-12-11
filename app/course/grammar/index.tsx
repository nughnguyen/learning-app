import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { GRAMMAR_TENSES } from '../../../constants/grammar';
import { Ionicons } from '@expo/vector-icons';

export default function GrammarListScreen() {
  const router = useRouter();

  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity 
        className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 flex-row items-center"
        onPress={() => router.push(`/course/grammar/${item.id}`)}
    >
        <View className="w-10 h-10 rounded-full bg-blue-50 justify-center items-center mr-4">
            <Text className="text-blue-600 font-bold">{index + 1}</Text>
        </View>
        <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800">{item.title}</Text>
            <Text className="text-gray-500 text-xs" numberOfLines={1}>{item.usage}</Text>
        </View>
        <Ionicons name="play-circle-outline" size={28} color="#2563eb" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 px-5 pt-5">
      <Stack.Screen options={{ title: 'Grammar Tenses' }} />
      <FlatList
        data={GRAMMAR_TENSES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
