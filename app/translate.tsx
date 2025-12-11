

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Keyboard, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function TranslateScreen() {
  const router = useRouter();
  
  // State
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeakingInput, setIsSpeakingInput] = useState(false);
  const [isSpeakingOutput, setIsSpeakingOutput] = useState(false);
  
  // Languages
  const [sourceLang, setSourceLang] = useState({ code: 'en', name: 'English' });
  const [targetLang, setTargetLang] = useState({ code: 'vi', name: 'Vietnamese' });

  // Debounce translation
  useEffect(() => {
    const timer = setTimeout(() => {
        if (inputText.trim()) {
            handleTranslate();
        } else {
            setTranslatedText('');
        }
    }, 800);
    return () => clearTimeout(timer);
  }, [inputText, sourceLang, targetLang]);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLang.code}|${targetLang.code}`);
        const data = await response.json();
        if (data && data.responseData) {
            setTranslatedText(data.responseData.translatedText);
        }
    } catch (error) {
        console.error("Translation Error", error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
      setSourceLang(targetLang);
      setTargetLang(sourceLang);
      setInputText(translatedText); // Swap text too? Usually yes for conversation
      setTranslatedText(inputText);
  };

  // Improved Speak Function with Stop/Pause toggle
  const speak = async (text: string, isInput: boolean) => {
      const isSpeaking = isInput ? isSpeakingInput : isSpeakingOutput;
      const setSpeaking = isInput ? setIsSpeakingInput : setIsSpeakingOutput;
      const otherSetSpeaking = isInput ? setIsSpeakingOutput : setIsSpeakingInput;

      // Stop any other speech first
      Speech.stop();
      otherSetSpeaking(false);

      if (isSpeaking) {
          // If currently speaking this text, stop it (Pause effect)
          setSpeaking(false);
          return;
      }

      if (!text.trim()) return;

      setSpeaking(true);
      Speech.speak(text, {
          language: isInput ? sourceLang.code : targetLang.code,
          pitch: 1.0,
          rate: 0.9,
          onDone: () => setSpeaking(false),
          onStopped: () => setSpeaking(false),
          onError: () => setSpeaking(false),
      });
  };

  const copyToClipboard = async (text: string) => {
      if (!text) return;
      await Clipboard.setStringAsync(text);
      Alert.alert("Copied", "Text copied to clipboard");
  };

  // OCR / Camera Handler
  const handleCamera = async () => {
      Alert.alert(
          "Import Image",
          "Choose an option to extract text",
          [
              { text: "Camera", onPress: () => pickImage(true) },
              { text: "Gallery", onPress: () => pickImage(false) },
              { text: "Cancel", style: "cancel" }
          ]
      );
  };

  const pickImage = async (useCamera: boolean) => {
      try {
          let result;
          if (useCamera) {
              const perm = await ImagePicker.requestCameraPermissionsAsync();
              if (!perm.granted) {
                  Alert.alert("Permission Needed", "Camera permission is required.");
                  return;
              }
              result = await ImagePicker.launchCameraAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  quality: 1,
              });
          } else {
              result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  quality: 1,
              });
          }

          if (!result.canceled) {
              // Mock OCR result since we don't have a backend OCR key
              // In production, upload `result.assets[0].uri` to Cloud Vision API
              setIsLoading(true);
              setTimeout(() => {
                  setInputText("This is a simulated text extracted from your image. Real OCR requires a cloud API key.");
                  setIsLoading(false);
              }, 1500);
          }
      } catch (e) {
          console.error(e);
          Alert.alert("Error", "Failed to pick image");
      }
  };

  return (
    <View className="flex-1 bg-gray-50 text-gray-900">
      <SafeAreaView className="flex-1">
          {/* Custom Header similar to Grammar Screen */}
          <View className="px-5 pt-2 pb-2">
              <TouchableOpacity 
                  onPress={() => router.back()}
                  className="w-10 h-10 bg-white rounded-full justify-center items-center shadow-sm border border-gray-100"
              >
                  <Ionicons name="arrow-back" size={20} color="#4b5563" />
              </TouchableOpacity>
          </View>

          <View className="px-5 mb-6">
               <Text className="text-3xl font-bold text-gray-900">Translate</Text>
          </View>

      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
          {/* Input Card */}
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-4 min-h-[220px]">
              {/* Card Header: Lang + Copy */}
              <View className="flex-row justify-between items-center mb-4 border-b border-gray-50 pb-2">
                  <View className="flex-row items-center">
                       <TouchableOpacity className="flex-row items-center">
                           <Text className="text-blue-600 font-bold text-base mr-1">{sourceLang.name}</Text>
                           <Ionicons name="chevron-down" size={16} color="#2563eb" />
                       </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => copyToClipboard(inputText)}>
                      <Ionicons name="copy-outline" size={20} color="#9ca3af" />
                  </TouchableOpacity>
              </View>
              
              {/* Input Area */}
              <TextInput 
                  className="text-xl text-gray-800 flex-1 leading-8 min-h-[100px]" 
                  placeholder="Enter text..."
                  multiline
                  textAlignVertical="top"
                  value={inputText}
                  onChangeText={setInputText}
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={handleTranslate}
              />
               {inputText.length > 0 && (
                   <TouchableOpacity 
                        onPress={() => setInputText('')} 
                        className="absolute right-0 bottom-16 p-2"
                   >
                        <Ionicons name="close-circle" size={20} color="#d1d5db" />
                   </TouchableOpacity>
               )}

              {/* Card Footer: Speaker + Camera (Bottom Left) */}
              <View className="flex-row items-center mt-4 pt-2">
                  <TouchableOpacity 
                    onPress={() => speak(inputText, true)}
                    className="p-3 bg-gray-100 rounded-full mr-3"
                  >
                      <Ionicons name={isSpeakingInput ? "pause" : "volume-high"} size={22} color={isSpeakingInput ? "#ef4444" : "#4b5563"} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    onPress={handleCamera}
                    className="p-3 bg-gray-100 rounded-full"
                  >
                      <Ionicons name="camera-outline" size={22} color="#4b5563" />
                  </TouchableOpacity>
              </View>
          </View>

          {/* Swap Button Area */}
          <View className="items-center -my-6 z-10">
              <TouchableOpacity 
                onPress={handleSwapLanguages}
                className="bg-white p-3 rounded-full border border-gray-200 shadow-sm"
              >
                   <Ionicons name="swap-vertical" size={24} color="#2563eb" />
              </TouchableOpacity>
          </View>

          {/* Output Card */}
          <View className="bg-blue-600 rounded-3xl p-5 shadow-lg shadow-blue-200 mb-10 min-h-[220px] pt-8">
               {/* Card Header: Lang + Copy */}
               <View className="flex-row justify-between items-center mb-4 border-b border-blue-500 pb-2">
                  <View className="flex-row items-center">
                       <TouchableOpacity className="flex-row items-center">
                           <Text className="text-white font-bold text-base mr-1">{targetLang.name}</Text>
                           <Ionicons name="chevron-down" size={16} color="white" />
                       </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => copyToClipboard(translatedText)}>
                      <Ionicons name="copy-outline" size={20} color="white" />
                  </TouchableOpacity>
              </View>

               {isLoading ? (
                   <ActivityIndicator color="white" size="large" className="flex-1" />
               ) : (
                   <Text className="text-xl text-white flex-1 leading-8 font-medium">
                       {translatedText || '...'}
                   </Text>
               )}

               {/* Card Footer: Speaker (Bottom Left) */}
              <View className="flex-row items-center mt-4 pt-2">
                  <TouchableOpacity 
                    onPress={() => speak(translatedText, false)}
                    className="p-3 bg-white/20 rounded-full mr-2"
                  >
                      <Ionicons name={isSpeakingOutput ? "pause" : "volume-high"} size={22} color="white" />
                  </TouchableOpacity>
              </View>
          </View>

          <Text className="text-center text-gray-400 text-xs mb-10">Powered by MyMemory & Expo Speech</Text>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}
