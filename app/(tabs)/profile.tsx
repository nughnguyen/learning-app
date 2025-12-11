import { View, Text, Switch, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <View className="flex-1 bg-gray-50 pt-12">
      <ScrollView className="px-5">
        <View className="items-center mb-8">
            <View className="w-24 h-24 bg-blue-200 rounded-full mb-4 justify-center items-center border-4 border-white shadow-sm">
                 {user?.avatar ? (
                     <Image source={{ uri: user.avatar }} className="w-full h-full rounded-full" />
                 ) : (
                     <Ionicons name="person" size={40} color="#2563eb" />
                 )}
            </View>
            <Text className="text-2xl font-bold text-gray-900">{user?.name || 'Guest'}</Text>
            <Text className="text-gray-500">Student</Text>
        </View>

        <View className="bg-white rounded-3xl p-5 shadow-sm mb-6">
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                <View className="flex-row items-center">
                    <View className="w-8 h-8 bg-blue-100 rounded-full justify-center items-center mr-3">
                        <Ionicons name="person-outline" size={18} color="#2563eb" />
                    </View>
                    <Text className="text-gray-700 font-medium">Edit Profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
            </View>
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                <View className="flex-row items-center">
                    <View className="w-8 h-8 bg-orange-100 rounded-full justify-center items-center mr-3">
                        <Ionicons name="notifications-outline" size={18} color="#f97316" />
                    </View>
                    <Text className="text-gray-700 font-medium">Notifications</Text>
                </View>
                <Switch value={true} trackColor={{ false: "#767577", true: "#2563eb" }} />
            </View>
             <View className="flex-row justify-between items-center py-3">
                <View className="flex-row items-center">
                    <View className="w-8 h-8 bg-green-100 rounded-full justify-center items-center mr-3">
                        <Ionicons name="language-outline" size={18} color="#16a34a" />
                    </View>
                    <Text className="text-gray-700 font-medium">Language</Text>
                </View>
                <Text className="text-gray-400">English</Text>
            </View>
        </View>

        <TouchableOpacity 
            className="bg-red-50 p-4 rounded-2xl flex-row justify-center items-center mb-10"
            onPress={handleLogout}
        >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-2">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
