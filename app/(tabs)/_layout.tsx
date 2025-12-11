import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: 70,
                position: 'absolute',
                bottom: 20,
                left: 16,
                right: 16,
                borderRadius: 20,
                backgroundColor: '#ffffff',
                borderTopWidth: 0,
                // Shadow
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 5,
                paddingBottom: 10,
            },
            tabBarShowLabel: true,
            tabBarActiveTintColor: '#2563eb',
            tabBarInactiveTintColor: '#9ca3af',
        }}
    >
      <Tabs.Screen
        name="support"
        options={{
          tabBarLabel: 'Support',
          tabBarIcon: ({ color, size }) => <Ionicons name="help-buoy-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          tabBarLabel: 'Course',
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <View className="bg-blue-600 w-14 h-14 rounded-full justify-center items-center -mt-10 shadow-lg shadow-blue-600/50">
                <Ionicons name="home" size={28} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
