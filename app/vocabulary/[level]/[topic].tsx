import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, Dimensions, Alert, Modal, SafeAreaView, StatusBar, PanResponder } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useProgress } from '../../../context/ProgressContext';

interface WordItem {
  word: string;
  wordType: string;
  phonetic: string;
  mean: string;
  definition_vi: string;
  definition_us: string;
  example: string;
}

const { width } = Dimensions.get('window');

export default function LessonScreen() {
  const { level, topic } = useLocalSearchParams();
  const router = useRouter();
  const { updateProgress } = useProgress();
  
  // Data State
  const [words, setWords] = useState<WordItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false); // Track if user chose to stay

  // Animation Values
  const flipAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Ref for auto-play interval
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchLesson();
    return () => stopAutoPlay();
  }, [level, topic]);

  const fetchLesson = async () => {
    try {
      const response = await axios.get(`https://gumballz-learning-api.vercel.app/api/lesson/${level}/${topic}`);
      // Response structure: { success: true, data: [...] }
      if (response.data && Array.isArray(response.data.data)) {
        setWords(response.data.data);
      } else if (Array.isArray(response.data)) {
        // Fallback if API changes
        setWords(response.data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load lesson data.");
    } finally {
      setLoading(false);
    }
  };

  // --- Actions ---

  const speakWord = () => {
    const word = words[currentIndex]?.word;
    if (word) {
        Speech.stop();
        Speech.speak(word, { language: 'en', rate: 0.9 });
    }
  };

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
       changeCard(currentIndex + 1);
    } else {
       // End of List
       if (!hasReviewed) {
           stopAutoPlay();
           setShowComplete(true);
           updateProgress('vocabulary', `${level}/${topic}`);
       } else {
           // User already reviewed, maybe loop or just Toast? 
           // Let's loop for continuous study if they chose "stay"
           changeCard(0); 
       }
    }
  };

  const prevWord = () => {
    if (currentIndex > 0) {
        changeCard(currentIndex - 1);
    } // Else stay at 0
  };

  const changeCard = (newIndex: number) => {
    // Fade out
    Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
    }).start(() => {
        // Reset flip
        flipAnim.setValue(0);
        setIsFlipped(false);
        setCurrentIndex(newIndex);
        
        // Fade in
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        }).start();
    });
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
        stopAutoPlay();
    } else {
        setIsAutoPlaying(true);
        startAutoPlay();
    }
  };

  const startAutoPlay = () => {
    // speakWord(); // Removed to avoid double speech (useEffect triggers it) 
    autoPlayRef.current = setInterval(() => {
        // Simple logic: Just trigger next
        // Logic handled in effect
    }, 4000); 
  };
  
  // AutoPlay Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying && !showComplete) {
        timer = setTimeout(() => {
           // Simulate next
           if (currentIndex < words.length - 1) {
                changeCard(currentIndex + 1); 
           } else {
               if (!hasReviewed) {
                   setIsAutoPlaying(false);
                   setShowComplete(true);
                   updateProgress('vocabulary', `${level}/${topic}`);
               } else {
                   changeCard(0); // Will loop
               }
           }
        }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentIndex, showComplete, hasReviewed]);

  // Trigger speech on card change if auto-playing
  useEffect(() => {
      if (isAutoPlaying && !isFlipped && words[currentIndex]) {
          speakWord();
          // Optional: Flip automatically after 2s?
          setTimeout(() => {
             // flipCard(); // Optional: Flip to show meaning
          }, 2000);
      }
  }, [currentIndex, isAutoPlaying]);

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  // --- Animation Interpolation ---
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 89, 90, 180],
    outputRange: [1, 1, 0, 0]
  });
  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 89, 90, 180],
    outputRange: [0, 0, 1, 1]
  });

  // --- Render ---

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />

      <SafeAreaView className="flex-1">
        {/* Custom Header */}
        <View className="px-5 pt-4 pb-2 flex-row items-center justify-between z-10">
            <TouchableOpacity 
                onPress={() => router.back()}
                className="w-12 h-12 bg-white rounded-full justify-center items-center shadow-sm border border-gray-100"
            >
                <Ionicons name="arrow-back" size={24} color="#4b5563" />
            </TouchableOpacity>

            <View className="flex-1 items-center mx-4">
                <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Level {level}</Text>
                <Text className="text-xl font-bold text-gray-900" numberOfLines={1}>{topic}</Text>
                <Text className="text-gray-400 text-xs font-medium mt-1">
                    {words.length > 0 ? `${currentIndex + 1} / ${words.length}` : 'Loading...'}
                </Text>
            </View>

            {/* Speaker Button (Moved here) */}
             <TouchableOpacity 
                onPress={speakWord}
                className="w-12 h-12 bg-blue-100 rounded-full justify-center items-center shadow-sm"
             >
                <Ionicons name="volume-high" size={24} color="#2563eb" />
            </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View className="h-1.5 bg-gray-200 w-full mt-2 mb-6">
            <View 
                className="h-full bg-blue-600 rounded-r-full" 
                style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }} 
            />
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center items-center px-5">
            <Animated.View 
                style={{ 
                    opacity: opacityAnim, 
                    width: '100%', alignItems: 'center' 
                }}
            >
            <TouchableOpacity activeOpacity={0.9} onPress={flipCard} className="w-full aspect-[3/4] max-h-[500px]">
                {/* Front Card */}
                <Animated.View 
                    style={{ 
                        transform: [{ rotateY: frontInterpolate }], 
                        opacity: frontOpacity,
                        position: 'absolute', width: '100%', height: '100%',
                        backfaceVisibility: 'hidden' 
                    }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 justify-center items-center"
                >
                     <View className="items-center w-full">
                        <Text className="text-4xl font-bold text-gray-800 mb-2 text-center">{currentWord?.word}</Text>
                        <Text className="text-gray-500 italic text-xl mb-4">{currentWord?.phonetic || '/.../'}</Text>
                        
                        <View className="bg-blue-50 px-6 py-2 rounded-full mb-6">
                            <Text className="text-blue-600 font-bold text-lg">{currentWord?.wordType || 'noun'}</Text>
                        </View>

                        <Text className="text-gray-600 text-center text-lg leading-7" numberOfLines={5}>{currentWord?.definition_us}</Text>
                     </View>

                     <Text className="text-gray-400 text-sm mt-8 bottom-0 absolute mb-6">Tap to flip</Text>
                </Animated.View>

                {/* Back Card */}
                <Animated.View 
                    style={{ 
                        transform: [{ rotateY: backInterpolate }], 
                        opacity: backOpacity,
                        position: 'absolute', width: '100%', height: '100%',
                         backfaceVisibility: 'hidden'
                    }}
                    className="bg-blue-600 rounded-3xl shadow-xl p-6 justify-center items-center"
                >
                     <Text className="text-white text-3xl font-bold text-center mb-4">{currentWord?.mean}</Text>
                     <Text className="text-blue-100 text-center mb-8">{currentWord?.definition_vi}</Text>
                     
                     <View className="bg-white/20 p-6 rounded-2xl w-full">
                        <Text className="text-white/80 font-bold mb-2">Example:</Text>
                        <Text className="text-white text-lg italic text-center">"{currentWord?.example || 'No example available.'}"</Text>
                     </View>
                </Animated.View>
            </TouchableOpacity>
            </Animated.View>
        </View>

        {/* Controls */}
        <View className="flex-row justify-around items-center pb-10 px-5 w-full">
            <TouchableOpacity 
                onPress={prevWord} 
                disabled={currentIndex === 0}
                className={`p-4 rounded-full bg-white shadow-sm border border-gray-100 ${currentIndex === 0 ? 'opacity-50' : ''}`}
            >
                <Ionicons name="chevron-back" size={32} color="#4b5563" />
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={toggleAutoPlay}
                className={`w-16 h-16 rounded-full justify-center items-center shadow-lg border-4 border-white ${isAutoPlaying ? 'bg-red-500' : 'bg-blue-600'}`}
            >
                 <Ionicons name={isAutoPlaying ? "pause" : "play"} size={32} color="white" className="ml-1" />
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={nextWord} 
                className="p-4 rounded-full bg-white shadow-sm border border-gray-100"
            >
                 <Ionicons name="chevron-forward" size={32} color="#4b5563" />
            </TouchableOpacity>
        </View>

      {/* Completion Modal */}
      <Modal visible={showComplete} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center p-5">
            <View className="bg-white rounded-3xl p-8 w-full max-w-sm items-center">
                <Ionicons name="trophy" size={60} color="#fbbf24" style={{ marginBottom: 20 }} />
                <Text className="text-2xl font-bold text-gray-900 mb-2">Topic Completed!</Text>
                <Text className="text-gray-500 text-center mb-8">You've studied all {words.length} words in this topic.</Text>

                <TouchableOpacity 
                    className="bg-blue-600 w-full py-4 rounded-xl mb-3 shadow-lg shadow-blue-200"
                    onPress={() => {
                        setShowComplete(false);
                        setHasReviewed(true); // Don't show again this session
                        setCurrentIndex(0); // Restart
                    }}
                >
                    <Text className="text-white text-center font-bold text-lg">Review Again</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    className="bg-gray-100 w-full py-4 rounded-xl"
                    onPress={() => {
                        setShowComplete(false);
                        router.back(); // Go back to topic list
                    }}
                >
                    <Text className="text-gray-700 text-center font-bold text-lg">Next Topic</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

      </SafeAreaView>
    </View>
  );
}
