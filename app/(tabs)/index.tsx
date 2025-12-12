import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, BackHandler, ToastAndroid, Platform, Animated, Dimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { useProgress } from '../../context/ProgressContext';
import { GRAMMAR_TENSES } from '../../constants/grammar';

// Screen Dimensions for layout calculations
const { width } = Dimensions.get('window');
// Standardizing on 16px (px-4) padding and 16px Gap to ensure perfect 3-column alignment without peeking
const CONTAINER_PADDING = 32; // px-4 * 2 = 16 * 2 = 32
const GAP = 16; 
// Calculate exact width to fit 3 items fully: (Available Width - 2 Gaps) / 3
const ITEM_WIDTH = (width - CONTAINER_PADDING - (GAP * 2)) / 3;

// Category Data
const ALL_CATEGORIES = [
  { id: 'grammar', name: 'Grammar', icon: 'text' },
  { id: 'tense', name: 'Tense', icon: 'time' },
  { id: 'vocabulary', name: 'Vocabulary', icon: 'book' },
  { id: 'dictionary', name: 'Dictionary', icon: 'library' },
  { id: 'translate', name: 'Translate', icon: 'language' },
  { id: 'course', name: 'Course', icon: 'school' },
];

export default function HomeScreen() {
  const { user, isGuest } = useAuth();
  const { progress } = useProgress();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Scroll and Dynamic Color Logic
  const scrollY = useRef(new Animated.Value(0)).current;
  const [categoriesY, setCategoriesY] = useState(0);
  const [recentY, setRecentY] = useState(0);

  // Double back press to exit logic
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }

        setBackPressedOnce(true);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        }
        
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);
        
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [backPressedOnce])
  );

  const filteredCategories = ALL_CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedCategories = searchQuery 
    ? filteredCategories 
    : ALL_CATEGORIES;

  const handleCategoryPress = (categoryId: string) => {
    switch (categoryId) {
        case 'vocabulary':
            router.push('/vocabulary');
            break;
        case 'translate':
            router.push('/translate');
            break;
        case 'grammar':
            router.push('/course/grammar');
            break;
        case 'tense':
            router.push('/course/grammar');
            break;
        case 'course':
            router.push('/(tabs)/course');
            break;
        case 'dictionary':
            router.push('/dictionary');
            break;
        default:
            console.log("Unknown category", categoryId);
    }
  };

  // Helper to get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning,';
    if (hour >= 12 && hour < 17) return 'Good Afternoon,';
    if (hour >= 17 && hour < 22) return 'Good Evening,';
    return "Don't work too hard,";
  };
  const greeting = getGreeting();

  // Helper to interpolate color based on Y position
  const getDynamicTextColor = (elementY: number) => {
    if (elementY === 0) return '#1e293b'; // Default slate-800
    
    // Blue background adjusted height is 180 (cuts through half of search bar).
    const startChange = Math.max(0, elementY - 170);
    const endChange = Math.max(0, elementY - 120);

    return scrollY.interpolate({
        inputRange: [startChange, endChange],
        outputRange: ['#1e293b', '#ffffff'], // slate-800 to white
        extrapolate: 'clamp',
    });
  };

  return (
    <View className="flex-1 bg-[#F4F6F8]">
        {/* Modern Clean Header Background - Height reduced to 180px to cut search bar */}
        <View className="absolute top-0 left-0 right-0 h-[180px] bg-blue-600 rounded-b-[40px]" />

        <Animated.ScrollView 
            className="flex-1" 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingTop: 60, paddingBottom: 100 }}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
        >
            {/* Header Section */}
            <View className="px-4 mb-6 flex-row justify-between items-start">
                <View>
                    <Text className="text-blue-100 text-lg font-medium mb-1">{greeting}</Text>
                    <Text className="text-2xl font-extrabold text-white tracking-tight">
                        {user ? user.name : 'Guest'}
                    </Text>
                    <Text className="text-blue-200 text-xs mt-1">Let's learn something new today!</Text>
                </View>
                <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full border-2 border-white/40 p-0.5 shadow-lg">
                     <View className="w-full h-full bg-white rounded-full overflow-hidden justify-center items-center">
                        {user?.avatar ? (
                            <Image source={{ uri: user.avatar }} className="w-full h-full" />
                        ) : (
                            <Ionicons name="person" size={18} color="#2563eb" />
                        )}
                     </View>
                </TouchableOpacity>
            </View>

            {/* Compact Search Bar */}
            <View className="px-4 mb-6">
                <View className="flex-row items-center bg-white rounded-full px-5 py-3 shadow-lg shadow-blue-900/10">
                    <Ionicons name="search-outline" size={20} color="#94a3b8" />
                    <TextInput 
                        placeholder="Search for courses..." 
                        className="flex-1 ml-2 text-sm text-slate-700 font-medium"
                        placeholderTextColor="#94a3b8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={18} color="#cbd5e1" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Categories Section */}
            <View 
                className="mb-6"
                onLayout={(event) => setCategoriesY(event.nativeEvent.layout.y)}
            >
                <View className="px-4 flex-row justify-between items-center mb-4">
                    <Animated.Text 
                        style={{ color: getDynamicTextColor(categoriesY) }}
                        className="text-lg font-bold tracking-tight"
                    >
                        Browse Categories
                    </Animated.Text>
                    {!searchQuery && (
                        <TouchableOpacity 
                            onPress={() => setShowAllCategories(!showAllCategories)} 
                            className="bg-blue-50 px-3 py-1.5 rounded-full"
                        >
                            <Text className="text-blue-600 font-bold text-xs">
                                {showAllCategories ? 'Collapse' : 'View All'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                {searchQuery || showAllCategories ? (
                    <View className="px-4 flex-row flex-wrap">
                         {displayedCategories.map((cat, index) => (
                            <TouchableOpacity 
                                key={cat.id}
                                style={{ 
                                    width: ITEM_WIDTH, 
                                    marginRight: (index + 1) % 3 === 0 ? 0 : GAP 
                                }}
                                className="bg-white p-3 rounded-3xl mb-4 items-center shadow-sm border border-slate-50 py-4"
                                onPress={() => handleCategoryPress(cat.id)}
                            >
                                <View className={`w-12 h-12 rounded-2xl justify-center items-center mb-2 ${cat.id === 'grammar' ? 'bg-orange-50' : 'bg-blue-50'}`}>
                                    <Ionicons name={cat.icon as any} size={24} color={cat.id === 'grammar' ? '#f97316' : '#2563eb'} />
                                </View>
                                <Text className="text-xs font-bold text-slate-700 text-center" numberOfLines={1}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <Animated.ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                        className="flex-row"
                    >
                        {displayedCategories.map((cat, index) => (
                            <TouchableOpacity 
                                key={cat.id}
                                style={{ width: ITEM_WIDTH, marginRight: index === displayedCategories.length - 1 ? 0 : GAP }}
                                className={`bg-white rounded-3xl items-center shadow-sm border border-slate-50 py-4`}
                                onPress={() => handleCategoryPress(cat.id)}
                            >
                                <View className={`w-12 h-12 rounded-2xl justify-center items-center mb-2 ${cat.id === 'grammar' ? 'bg-orange-50' : 'bg-blue-50'}`}>
                                    <Ionicons name={cat.icon as any} size={24} color={cat.id === 'grammar' ? '#f97316' : '#2563eb'} />
                                </View>
                                <Text className="text-xs font-bold text-slate-600 text-center" numberOfLines={1}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </Animated.ScrollView>
                )}
            </View>

            {/* Continue Learning Section */}
            <View 
                className="px-4"
                onLayout={(event) => setRecentY(event.nativeEvent.layout.y)}
            >
                <Animated.Text 
                    style={{ color: getDynamicTextColor(recentY) }}
                    className="text-lg font-bold mb-4 tracking-tight"
                >
                    Recent Progress
                </Animated.Text>
                
                {/* Vocabulary Card */}
                <TouchableOpacity className="bg-white rounded-[24px] p-5 mb-4 shadow-sm border border-slate-100 flex-row items-center">
                    <View className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden">
                        <Image 
                            source={{ uri: 'https://img.freepik.com/free-vector/english-teacher-concept-illustration_114360-7478.jpg' }} 
                            className="w-full h-full" 
                        />
                    </View>
                    <View className="flex-1 ml-4 justify-center">
                        <View className="flex-row justify-between items-center mb-2">
                             <Text className="text-base font-bold text-slate-800">Vocabulary</Text>
                             <Text className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                                {Math.round(((progress['vocabulary']?.completed.length || 0) / 20) * 100)}%
                             </Text>
                        </View>
                        
                        <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                            <View 
                                className="h-full bg-blue-500 rounded-full" 
                                style={{ width: `${Math.min(((progress['vocabulary']?.completed.length || 0) / 20) * 100, 100)}%` }}
                            />
                        </View>
                        <Text className="text-[10px] text-slate-400 font-medium mt-1">
                            {progress['vocabulary']?.completed.length || 0} / 20 Lessons Completed
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Grammar Card */}
                <TouchableOpacity 
                    className="bg-white rounded-[24px] p-5 mb-4 shadow-sm border border-slate-100 flex-row items-center"
                    onPress={() => router.push('/course/grammar')}
                >
                    <View className="w-16 h-16 rounded-2xl bg-orange-50 justify-center items-center">
                         <Ionicons name="text-outline" size={28} color="#f97316" />
                    </View>
                    <View className="flex-1 ml-4 justify-center">
                        <View className="flex-row justify-between items-center mb-2">
                             <Text className="text-base font-bold text-slate-800">Grammar</Text>
                             <Text className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg">
                                {Math.round(((progress['grammar']?.completed.length || 0) / GRAMMAR_TENSES.length) * 100)}%
                             </Text>
                        </View>

                         <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                            <View 
                                className="h-full bg-orange-500 rounded-full" 
                                style={{ width: `${Math.min(((progress['grammar']?.completed.length || 0) / GRAMMAR_TENSES.length) * 100, 100)}%` }}
                            />
                        </View>
                        <Text className="text-[10px] text-slate-400 font-medium mt-1">
                            {progress['grammar']?.completed.length || 0} / {GRAMMAR_TENSES.length} Lessons Completed
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Animated.ScrollView>
    </View>
  );
}
