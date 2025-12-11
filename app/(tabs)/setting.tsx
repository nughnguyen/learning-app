import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert, Modal, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '../../context/SettingsContext';
import { APP_VERSION } from '../../constants/AppVersion';

export default function SettingScreen() {
  const { 
      language, setLanguage, 
      theme, setTheme, 
      soundEnabled, setSoundEnabled, 
      soundVolume, setSoundVolume,
      t 
  } = useSettings();

  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const LANGUAGES = [
      { code: 'en', name: 'English' },
      { code: 'vi', name: 'Tiếng Việt' },
  ];

  // Simple volume step control
  const increaseVolume = () => setSoundVolume(Math.min(soundVolume + 0.1, 1.0));
  const decreaseVolume = () => setSoundVolume(Math.max(soundVolume - 0.1, 0.0));

  return (
    <View className="flex-1 bg-gray-50 pt-12">
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold text-gray-900 mb-6">{t('settings_title')}</Text>

        {/* General Section */}
        <View className="mb-6">
            <Text className="text-gray-500 font-bold uppercase text-xs mb-3 ml-2">{t('general')}</Text>
            <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <TouchableOpacity 
                    className="flex-row items-center justify-between p-4 border-b border-gray-50"
                    onPress={() => setShowLanguageModal(true)}
                >
                    <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-blue-100 rounded-full justify-center items-center mr-3">
                            <Ionicons name="language" size={18} color="#2563eb" />
                        </View>
                        <Text className="text-gray-800 text-base font-medium">{t('language')}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-gray-400 mr-2">
                             {LANGUAGES.find(l => l.code === language)?.name}
                        </Text>
                        <Ionicons name="chevron-forward" size={18} color="#d1d5db" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>

        {/* Appearance Section */}
        <View className="mb-6">
             <Text className="text-gray-500 font-bold uppercase text-xs mb-3 ml-2">{t('appearance')}</Text>
             <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <View className="flex-row items-center justify-between p-4">
                    <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-purple-100 rounded-full justify-center items-center mr-3">
                            <Ionicons name="moon" size={18} color="#9333ea" />
                        </View>
                        <Text className="text-gray-800 text-base font-medium">{t('dark_mode')}</Text>
                    </View>
                    <Switch 
                        value={theme === 'dark'} 
                        onValueChange={(val) => setTheme(val ? 'dark' : 'light')} 
                        trackColor={{ false: "#e5e7eb", true: "#9333ea" }}
                    />
                </View>
             </View>
        </View>

        {/* Sound Section */}
        <View className="mb-6">
             <Text className="text-gray-500 font-bold uppercase text-xs mb-3 ml-2">{t('sound_effects')}</Text>
             <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                
                {/* Sound Toggle */}
                <View className="flex-row items-center justify-between p-4 border-b border-gray-50">
                    <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-green-100 rounded-full justify-center items-center mr-3">
                            <Ionicons name="musical-note" size={18} color="#16a34a" />
                        </View>
                        <Text className="text-gray-800 text-base font-medium">{t('sound_toggle')}</Text>
                    </View>
                    <Switch 
                        value={soundEnabled} 
                        onValueChange={setSoundEnabled} 
                        trackColor={{ false: "#e5e7eb", true: "#16a34a" }}
                    />
                </View>

                {/* Volume Control */}
                {soundEnabled && (
                    <View className="p-4">
                         <View className="flex-row items-center justify-between mb-2">
                             <Text className="text-gray-800 font-medium">{t('volume')}</Text>
                             <Text className="text-gray-400 text-xs">{Math.round(soundVolume * 100)}%</Text>
                         </View>
                         <View className="flex-row items-center justify-between bg-gray-50 rounded-xl p-2">
                              <TouchableOpacity onPress={decreaseVolume} className="p-2 bg-white rounded-lg shadow-sm">
                                  <Ionicons name="volume-low" size={20} color="#4b5563" />
                              </TouchableOpacity>
                              
                              {/* Visual Bar */}
                              <View className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <View className="h-full bg-green-500 rounded-full" style={{ width: `${soundVolume * 100}%` }} />
                              </View>

                              <TouchableOpacity onPress={increaseVolume} className="p-2 bg-white rounded-lg shadow-sm">
                                  <Ionicons name="volume-high" size={20} color="#4b5563" />
                              </TouchableOpacity>
                         </View>
                    </View>
                )}
             </View>
        </View>

        {/* App Info */}
        <View className="items-center mt-4 mb-20">
            <Text className="text-gray-400 text-xs">GumballZ Learning v{APP_VERSION}</Text>
        </View>

      </ScrollView>

      {/* Language Modal */}
      <Modal visible={showLanguageModal} transparent animationType="slide">
          <View className="flex-1 bg-black/50 justify-end">
              <TouchableOpacity className="flex-1" onPress={() => setShowLanguageModal(false)} />
              <View className="bg-white rounded-t-3xl p-6 min-h-[300px]">
                  <Text className="text-xl font-bold text-center mb-6 text-gray-900">{t('select_language')}</Text>
                  {LANGUAGES.map(lang => (
                      <TouchableOpacity 
                        key={lang.code}
                        className={`flex-row items-center justify-between p-4 rounded-2xl mb-2 ${language === lang.code ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-100'}`}
                        onPress={() => {
                            setLanguage(lang.code);
                            setShowLanguageModal(false);
                        }}
                      >
                          <Text className={`text-base font-bold ${language === lang.code ? 'text-blue-600' : 'text-gray-700'}`}>
                              {lang.name}
                          </Text>
                          {language === lang.code && <Ionicons name="checkmark-circle" size={24} color="#2563eb" />}
                      </TouchableOpacity>
                  ))}
                  <TouchableOpacity 
                    className="mt-4 p-4 bg-gray-100 rounded-2xl"
                    onPress={() => setShowLanguageModal(false)}
                  >
                      <Text className="text-center font-bold text-gray-600">{t('cancel')}</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>

    </View>
  );
}
