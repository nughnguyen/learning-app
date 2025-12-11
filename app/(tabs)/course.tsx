import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CourseScreen() {
  const router = useRouter();

  const COURSES = [
    { id: 'grammar', title: 'English Grammar', count: '12 Tenses & more', color: 'bg-orange-100', iconColor: '#f97316', icon: 'text' },
    { id: 'vocabulary', title: 'Vocabulary Builder', count: '6 Levels', color: 'bg-blue-100', iconColor: '#2563eb', icon: 'book' },
    { id: 'speaking', title: 'Speaking Practice', count: 'Coming Soon', color: 'bg-purple-100', iconColor: '#9333ea', icon: 'mic' },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-5">
      <Text className="text-3xl font-bold text-gray-900 mb-2">My Courses</Text>
      <Text className="text-gray-500 mb-8">Structured learning paths for you.</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {COURSES.map((course) => (
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
        ))}
      </ScrollView>
    </View>
  );
}
