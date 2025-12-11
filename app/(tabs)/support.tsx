import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SupportScreen() {
  const handleSend = () => {
    Alert.alert("Sent", "We have received your message!");
  };

  return (
    <View className="flex-1 bg-white pt-12">
      <ScrollView className="px-5">
        <Text className="text-3xl font-bold text-gray-900 mb-6">Support Center</Text>

        <View className="bg-blue-50 p-6 rounded-3xl mb-8">
            <Text className="text-blue-800 font-bold text-xl mb-2">How can we help?</Text>
            <Text className="text-blue-600">Send us a message or browse commonly asked questions below.</Text>
        </View>

        <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">Contact Us</Text>
            <TextInput 
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800"
                placeholder="Subject"
            />
            <TextInput 
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 h-32"
                placeholder="Describe your issue..."
                multiline
                textAlignVertical="top"
            />
            <TouchableOpacity 
                className="bg-blue-600 py-4 rounded-xl shadow-lg shadow-blue-400"
                onPress={handleSend}
            >
                <Text className="text-white text-center font-bold font-lg">Send Message</Text>
            </TouchableOpacity>
        </View>

        <View className="mb-20">
            <Text className="text-lg font-bold text-gray-800 mb-4">FAQ</Text>
            {['How to reset progress?', 'Can I use offline?', 'Is it free?'].map((q, i) => (
                <View key={i} className="mb-4 border-b border-gray-100 pb-4">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-700 font-medium">{q}</Text>
                        <Ionicons name="chevron-down" size={20} color="#9ca3af" />
                    </View>
                </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
