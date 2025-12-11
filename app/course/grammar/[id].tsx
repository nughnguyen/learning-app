import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { GRAMMAR_TENSES } from '../../../constants/grammar';
import { Ionicons } from '@expo/vector-icons';

export default function GrammarLessonScreen() {
  const { id } = useLocalSearchParams();
  const tense = GRAMMAR_TENSES.find(t => t.id === id);
  const [activeTab, setActiveTab] = useState<'theory' | 'quiz'>('theory');
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);

  if (!tense) return <Text>Tense not found</Text>;

  const handleSelectAnswer = (qIndex: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const checkAnswers = () => {
    const correctCount = tense.quiz.reduce((acc, q, idx) => {
        return acc + (selectedAnswers[idx] === q.answer ? 1 : 0);
    }, 0);
    Alert.alert("Quiz Result", `You got ${correctCount}/${tense.quiz.length} correct!`);
    setShowResults(true);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: tense.title }} />
      
      {/* Tabs */}
      <View className="flex-row border-b border-gray-100">
        <TouchableOpacity 
            onPress={() => setActiveTab('theory')}
            className={`flex-1 py-4 items-center ${activeTab === 'theory' ? 'border-b-2 border-blue-600' : ''}`}
        >
            <Text className={`font-bold ${activeTab === 'theory' ? 'text-blue-600' : 'text-gray-500'}`}>Theory</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => setActiveTab('quiz')}
            className={`flex-1 py-4 items-center ${activeTab === 'quiz' ? 'border-b-2 border-blue-600' : ''}`}
        >
            <Text className={`font-bold ${activeTab === 'quiz' ? 'text-blue-600' : 'text-gray-500'}`}>Quiz</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-5">
        {activeTab === 'theory' ? (
            <View className="space-y-6">
                <View className="bg-blue-50 p-5 rounded-2xl">
                    <Text className="text-blue-800 font-bold mb-2 text-lg">Formula</Text>
                    <Text className="text-gray-800 text-xl font-mono">{tense.formula}</Text>
                </View>

                <View>
                    <Text className="text-gray-800 font-bold mb-2 text-lg">Usage</Text>
                    <Text className="text-gray-600 text-base leading-6">{tense.usage}</Text>
                </View>

                <View className="bg-orange-50 p-5 rounded-2xl">
                    <Text className="text-orange-800 font-bold mb-2 text-lg">Example</Text>
                    <Text className="text-gray-800 text-base italic">"{tense.example}"</Text>
                </View>
            </View>
        ) : (
            <View>
                {tense.quiz.map((q, idx) => (
                    <View key={idx} className="mb-8">
                        <Text className="text-lg font-bold text-gray-800 mb-4">{idx + 1}. {q.question}</Text>
                        <View className="space-y-2">
                            {q.options.map((option) => {
                                const isSelected = selectedAnswers[idx] === option;
                                const isCorrect = q.answer === option;
                                let bgClass = 'bg-gray-50 border-gray-200';
                                
                                if (showResults) {
                                    if (isCorrect) bgClass = 'bg-green-100 border-green-500';
                                    else if (isSelected) bgClass = 'bg-red-100 border-red-500';
                                } else if (isSelected) {
                                    bgClass = 'bg-blue-100 border-blue-500';
                                }

                                return (
                                    <TouchableOpacity 
                                        key={option}
                                        className={`p-4 rounded-xl border ${bgClass} mb-2`}
                                        onPress={() => !showResults && handleSelectAnswer(idx, option)}
                                    >
                                        <Text className="text-gray-800">{option}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                ))}
                
                {!showResults && (
                    <TouchableOpacity 
                        className="bg-blue-600 py-4 rounded-xl shadow-lg shadow-blue-400 mt-4 mb-10"
                        onPress={checkAnswers}
                    >
                        <Text className="text-white text-center font-bold text-lg">Check Answers</Text>
                    </TouchableOpacity>
                )}
            </View>
        )}
      </ScrollView>
    </View>
  );
}
