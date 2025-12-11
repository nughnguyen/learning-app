import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import axios from 'axios';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ja', name: 'Japanese' },
];

export default function TranslateScreen() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('vi');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    Keyboard.dismiss();
    try {
        // Using Google Translate free endpoint for demo
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(inputText)}`;
        const response = await axios.get(url);
        // format: [[["Hello","Xin chào",null,null,1]],...]
        if (response.data && response.data[0] && response.data[0][0]) {
            setTranslatedText(response.data[0][0][0]);
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "Translation failed. Check internet.");
    } finally {
        setLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleMicPress = () => {
      // Mock Speech to Text
      setIsListening(!isListening);
      if (!isListening) {
          setTimeout(() => {
              setIsListening(false);
              setInputText("Hello, how are you today?"); // Mock result
              Alert.alert("Microphone", "Mock: Recognized 'Hello, how are you today?'");
          }, 2000);
      }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ 
            headerTitle: 'Translate', 
            headerStyle: { backgroundColor: '#white' },
            headerShadowVisible: false 
      }} />

      {/* Language Selector Area */}
      <View className="flex-row justify-around items-center py-4 bg-gray-50 rounded-b-3xl mb-6 shadow-sm">
        <TouchableOpacity className="bg-white px-6 py-2 rounded-full border border-gray-200">
            <Text className="text-blue-600 font-bold">{LANGUAGES.find(l => l.code === sourceLang)?.name}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={swapLanguages} className="bg-blue-100 p-2 rounded-full">
            <Ionicons name="swap-horizontal" size={24} color="#2563eb" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white px-6 py-2 rounded-full border border-gray-200">
            <Text className="text-blue-600 font-bold">{LANGUAGES.find(l => l.code === targetLang)?.name}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5" keyboardShouldPersistTaps="handled">
            {/* Input Area */}
            <View className="bg-white border border-gray-200 rounded-3xl p-5 mb-5 shadow-sm min-h-[150px]">
                <View className="flex-row justify-between mb-2">
                     <Text className="text-gray-400 font-medium">Original Text</Text>
                     <TouchableOpacity onPress={() => setInputText('')}>
                        <Ionicons name="close-circle" size={20} color="#e5e7eb" />
                     </TouchableOpacity>
                </View>
                <TextInput
                    className="text-xl text-gray-800 flex-1 text-justify"
                    multiline
                    placeholder="Type or speak..."
                    value={inputText}
                    onChangeText={setInputText}
                    verticalAlign="top"
                />
            </View>

            {/* Translate Button */}
             <View className="flex-row justify-center mb-6">
                 {loading ? (
                     <ActivityIndicator size="large" color="#2563eb" />
                 ) : (
                     <View className="flex-row space-x-4">
                         {/* Mic Button */}
                         <TouchableOpacity 
                            onPress={handleMicPress}
                            className={`p-4 rounded-full ${isListening ? 'bg-red-500' : 'bg-gray-100'}`}
                         >
                            <Ionicons name={isListening ? "mic" : "mic-outline"} size={28} color={isListening ? 'white' : '#4b5563'} />
                         </TouchableOpacity>
                         
                         {/* Action Button */}
                         <TouchableOpacity 
                            onPress={handleTranslate}
                            className="bg-blue-600 px-10 py-4 rounded-full shadow-lg shadow-blue-400"
                         >
                            <Text className="text-white font-bold text-lg">Translate</Text>
                         </TouchableOpacity>
                     </View>
                 )}
             </View>

            {/* Output Area */}
            {translatedText ? (
                <View className="bg-blue-50 border border-blue-100 rounded-3xl p-5 mb-5 shadow-sm min-h-[150px]">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-blue-400 font-medium">Translation</Text>
                         <TouchableOpacity>
                            <Ionicons name="copy-outline" size={20} color="#60a5fa" />
                         </TouchableOpacity>
                    </View>
                    <Text className="text-xl text-blue-900 font-medium">{translatedText}</Text>
                </View>
            ) : null}

      </ScrollView>
    </View>
  );
}
