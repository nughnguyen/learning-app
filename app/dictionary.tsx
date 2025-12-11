import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView, Keyboard, Image, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

interface Phonetic {
  text: string;
  audio: string;
}

interface DictionaryData {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

const { width } = Dimensions.get('window');

export default function DictionaryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<DictionaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Rich Data
  const [vietnameseMeaning, setVietnameseMeaning] = useState('');
  const [vietnameseDefinition, setVietnameseDefinition] = useState('');
  const [wikiImage, setWikiImage] = useState<string | null>(null);

  const searchWord = async (word: string) => {
      setSearchQuery(word);
      handleSearch(word);
  };

  const handleSearch = async (queryOverride?: string) => {
    const query = queryOverride || searchQuery;
    if (!query.trim()) return;
    
    Keyboard.dismiss();
    setLoading(true);
    setError('');
    setResult(null);
    setVietnameseMeaning('');
    setVietnameseDefinition('');
    setWikiImage(null);

    try {
      // 1. Fetch Dictionary Data (English)
      const resDict = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query.trim()}`);
      const dataDict = await resDict.json();

      if (Array.isArray(dataDict) && dataDict.length > 0) {
        const entry = dataDict[0];
        setResult(entry);

        // 2. Fetch Vietnamese Meaning (Word Translation)
        fetch(`https://api.mymemory.translated.net/get?q=${entry.word}&langpair=en|vi`)
            .then(r => r.json())
            .then(d => {
                if(d.responseData) setVietnameseMeaning(d.responseData.translatedText);
            })
            .catch(e => console.log("Trans Err", e));

         // 3. Fetch Vietnamese Definition (Translate the first definition)
         if (entry.meanings.length > 0 && entry.meanings[0].definitions.length > 0) {
             const firstDef = entry.meanings[0].definitions[0].definition;
             fetch(`https://api.mymemory.translated.net/get?q=${firstDef}&langpair=en|vi`)
                .then(r => r.json())
                .then(d => {
                    if(d.responseData) setVietnameseDefinition(d.responseData.translatedText);
                })
                .catch(e => console.log("Def Trans Err", e));
         }

         // 4. Fetch Wikipedia Image
         fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${entry.word}&prop=pageimages&format=json&pithumbsize=600&origin=*`)
            .then(r => r.json())
            .then(d => {
                const pages = d.query?.pages;
                if (pages) {
                    const pageId = Object.keys(pages)[0];
                    const thumb = pages[pageId]?.thumbnail?.source;
                    if (thumb) setWikiImage(thumb);
                }
            })
            .catch(e => console.log("Wiki Image Err", e));

      } else {
        setError("Word not found.");
      }
    } catch (err) {
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (url: string) => {
    if (!url) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      await sound.playAsync();
    } catch (e) {
      console.log("Error playing audio", e);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
        
        {/* Search Header */}
        <View className="px-5 pt-2 pb-4 bg-white shadow-sm z-20 rounded-b-3xl">
            <View className="flex-row items-center mb-4">
                <TouchableOpacity 
                    onPress={() => router.back()}
                    className="mr-3 p-2 bg-gray-50 rounded-full"
                >
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-2xl font-extrabold text-gray-900">Dictionary</Text>
            </View>

            <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200">
                <Ionicons name="search" size={20} color="#6b7280" className="mr-2"/>
                <TextInput 
                    placeholder="Type a word..." 
                    className="flex-1 text-lg text-gray-900 mx-2 font-medium"
                    placeholderTextColor="#9ca3af"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={() => handleSearch()}
                    returnKeyType="search"
                />
                {searchQuery.length > 0 ? (
                    <TouchableOpacity onPress={() => setSearchQuery('')} className="p-1 bg-gray-300 rounded-full">
                         <Ionicons name="close" size={16} color="#4b5563" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity className="p-1">
                         <Ionicons name="mic" size={22} color="#2563eb" />
                    </TouchableOpacity>
                )}
            </View>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
            {loading ? (
                <View className="mt-20 items-center">
                    <ActivityIndicator size="large" color="#2563eb" />
                    <Text className="text-gray-400 mt-4 font-medium">Looking up...</Text>
                </View>
            ) : error ? (
                <View className="mt-20 items-center opacity-80">
                     <Ionicons name="cloud-offline-outline" size={64} color="#ef4444" />
                    <Text className="text-gray-500 font-medium text-lg text-center mt-4">{error}</Text>
                </View>
            ) : result ? (
                <View>
                    {/* Word Header Card */}
                    <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                        <View className="flex-row justify-between items-start">
                            <View className="flex-1">
                                <Text className="text-4xl font-black text-gray-900 capitalize tracking-tight">{result.word}</Text>
                                <Text className="text-blue-500 text-lg font-medium mt-1">{result.phonetic || result.phonetics?.find(p => p.text)?.text}</Text>
                                {/* Translation */}
                                {vietnameseMeaning && (
                                    <View className="mt-2 self-start bg-blue-50 px-3 py-1 rounded-lg">
                                        <Text className="text-blue-700 font-bold text-lg capitalize">{vietnameseMeaning}</Text>
                                    </View>
                                )}
                            </View>
                            {result.phonetics?.find(p => p.audio) && (
                                <TouchableOpacity 
                                    onPress={() => playAudio(result.phonetics.find(p => p.audio)?.audio as string)}
                                    className="w-12 h-12 bg-blue-600 rounded-full justify-center items-center shadow-lg shadow-blue-200"
                                >
                                    <Ionicons name="volume-high" size={24} color="white" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Meanings */}
                    {result.meanings.map((meaning, index) => (
                        <View key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-4">
                            {/* Part of Speech Label */}
                            <View className="flex-row items-center mb-4">
                                <View className="bg-purple-100 px-3 py-1 rounded-lg mr-3">
                                    <Text className="text-purple-700 font-bold italic text-sm capitalize">{meaning.partOfSpeech}</Text>
                                </View>
                                <View className="h-[1px] bg-gray-100 flex-1" />
                            </View>
                            
                            {/* Definitions */}
                            {meaning.definitions.slice(0, 3).map((def, idx) => (
                                <View key={idx} className="mb-5 last:mb-0">
                                    <View className="flex-row items-start">
                                        <Text className="text-purple-500 font-bold mr-2 mt-1">•</Text>
                                        <Text className="text-gray-800 text-base leading-6 font-medium flex-1">
                                            {def.definition}
                                        </Text>
                                    </View>

                                    {/* Vietnamese Definition (First one only) */}
                                    {index === 0 && idx === 0 && vietnameseDefinition ? (
                                        <View className="ml-4 mt-1 mb-1">
                                             <Text className="text-gray-500 italic text-sm">VN: {vietnameseDefinition}</Text>
                                        </View>
                                    ) : null}

                                    {def.example && (
                                        <View className="ml-4 mt-2 pl-3 border-l-2 border-gray-200 py-1">
                                            <Text className="text-gray-400 italic text-sm">"{def.example}"</Text>
                                        </View>
                                    )}
                                </View>
                            ))}

                            {/* Synonyms & Antonyms */}
                            {(meaning.synonyms.length > 0 || meaning.antonyms.length > 0) && (
                                <View className="mt-4 pt-4 border-t border-gray-50">
                                    {meaning.synonyms.length > 0 && (
                                        <View className="mb-3">
                                            <Text className="text-green-600 font-bold text-[10px] uppercase mb-2 tracking-wider">Synonyms</Text>
                                            <View className="flex-row flex-wrap gap-2">
                                                {meaning.synonyms.slice(0, 5).map(syn => (
                                                    <TouchableOpacity 
                                                        key={syn} 
                                                        onPress={() => searchWord(syn)}
                                                        className="bg-green-50 border border-green-100 px-3 py-1 rounded-lg"
                                                    >
                                                        <Text className="text-green-700 font-medium text-xs">{syn}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                    {meaning.antonyms.length > 0 && (
                                        <View>
                                            <Text className="text-red-500 font-bold text-[10px] uppercase mb-2 tracking-wider">Antonyms</Text>
                                            <View className="flex-row flex-wrap gap-2">
                                                {meaning.antonyms.slice(0, 5).map(ant => (
                                                    <TouchableOpacity 
                                                        key={ant} 
                                                        onPress={() => searchWord(ant)}
                                                        className="bg-red-50 border border-red-100 px-3 py-1 rounded-lg"
                                                    >
                                                        <Text className="text-red-700 font-medium text-xs">{ant}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    ))}

                    {/* Image Footer */}
                    {wikiImage && (
                        <View className="mt-2 mb-8">
                            <View className="rounded-3xl overflow-hidden shadow-sm bg-gray-200 h-64 relative">
                                <Image 
                                    source={{ uri: wikiImage }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    className="absolute bottom-0 left-0 right-0 h-24 justify-end p-5"
                                >
                                    <Text className="text-white font-bold text-lg">{result.word}</Text>
                                    <Text className="text-gray-300 text-xs">Visual Representation (Wikipedia)</Text>
                                </LinearGradient>
                            </View>
                        </View>
                    )}
                </View>
            ) : (
                <View className="mt-20 items-center opacity-50">
                     <View className="bg-gray-100 p-8 rounded-full mb-6">
                        <Ionicons name="search" size={60} color="#d1d5db" />
                     </View>
                    <Text className="text-gray-400 font-medium text-lg">Type a word to start</Text>
                </View>
            )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
