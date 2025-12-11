import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold text-blue-500">GumballZ Learning</Text>
      <Text className="text-gray-500 mt-2">Setting up...</Text>
    </View>
  );
}
