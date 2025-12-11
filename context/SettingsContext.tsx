import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const translations: Record<string, Record<string, string>> = {
  en: {
    // Auth
    'welcome_back': 'Welcome Back!',
    'login_to_continue': 'Login to continue your journey',
    'create_account': 'Create Account',
    'sign_up_to_start': 'Sign up to start learning',
    'login': 'Login',
    'register': 'Register',
    'email': 'Email',
    'password': 'Password',
    'full_name': 'Full Name',
    'login_button': 'Login',
    'register_button': 'Sign Up',
    'guest_continue': 'Continue as Guest',
    'or_continue_with': 'Or continue with',
    
    // Home
    'hello': 'Hello',
    'guest': 'Guest',
    'have_fun': 'Have fun studying!',
    'search_placeholder': 'Search course...',
    'categories': 'Categories',
    'view_all': 'View all',
    'show_less': 'Show less',
    'current_progress': 'Current Progress',
    'topics_completed': 'Topics Completed',
    
    // Categories
    'cat_grammar': 'Grammar',
    'cat_tense': 'Tense',
    'cat_vocabulary': 'Vocabulary',
    'cat_dictionary': 'Dictionary',
    'cat_translate': 'Translate',
    'cat_course': 'Course',

    // Translate
    'translator_title': 'Translator',
    'type_text': 'Type text to translate...',
    'extracting_text': 'Extracting text...',
    'translation_placeholder': 'Translation will appear here...',
    'powered_by': 'Powered by MyMemory API',
    
    // Settings
    'settings_title': 'Settings',
    'general': 'General',
    'language': 'Language',
    'appearance': 'Appearance',
    'dark_mode': 'Dark Mode',
    'sound_effects': 'Sound & Effects',
    'sound_toggle': 'Sound Effects',
    'volume': 'Volume',
    'select_language': 'Select Language',
    'cancel': 'Cancel',
  },
  vi: {
    // Auth
    'welcome_back': 'Chào mừng trở lại!',
    'login_to_continue': 'Đăng nhập để tiếp tục hành trình',
    'create_account': 'Tạo tài khoản',
    'sign_up_to_start': 'Đăng ký để bắt đầu học',
    'login': 'Đăng nhập',
    'register': 'Đăng ký',
    'email': 'Email',
    'password': 'Mật khẩu',
    'full_name': 'Họ và tên',
    'login_button': 'Đăng nhập',
    'register_button': 'Đăng ký',
    'guest_continue': 'Tiếp tục với tư cách Khách',
    'or_continue_with': 'Hoặc tiếp tục với',

    // Home
    'hello': 'Xin chào',
    'guest': 'Khách',
    'have_fun': 'Chúc bạn học vui vẻ!',
    'search_placeholder': 'Tìm khóa học...',
    'categories': 'Danh mục',
    'view_all': 'Xem tất cả',
    'show_less': 'Thu gọn',
    'current_progress': 'Tiến độ hiện tại',
    'topics_completed': 'Chủ đề đã hoàn thành',

    // Categories
    'cat_grammar': 'Ngữ pháp',
    'cat_tense': 'Các thì',
    'cat_vocabulary': 'Từ vựng',
    'cat_dictionary': 'Từ điển',
    'cat_translate': 'Dịch thuật',
    'cat_course': 'Khóa học',

    // Translate
    'translator_title': 'Dịch thuật',
    'type_text': 'Nhập văn bản cần dịch...',
    'extracting_text': 'Đang trích xuất văn bản...',
    'translation_placeholder': 'Bản dịch sẽ hiện ở đây...',
    'powered_by': 'Cung cấp bởi MyMemory API',

    // Settings
    'settings_title': 'Cài đặt',
    'general': 'Chung',
    'language': 'Ngôn ngữ',
    'appearance': 'Giao diện',
    'dark_mode': 'Chế độ tối',
    'sound_effects': 'Âm thanh & Hiệu ứng',
    'sound_toggle': 'Hiệu ứng âm thanh',
    'volume': 'Âm lượng',
    'select_language': 'Chọn ngôn ngữ',
    'cancel': 'Hủy',
  }
};

interface SettingsContextType {
  language: string;
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  soundVolume: number; // 0.0 to 1.0
  setLanguage: (lang: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  playSoundEffect: (type: 'correct' | 'wrong') => Promise<void>;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType>({
  language: 'en',
  theme: 'light',
  soundEnabled: true,
  soundVolume: 1.0,
  setLanguage: () => {},
  setTheme: () => {},
  setSoundEnabled: () => {},
  setSoundVolume: () => {},
  playSoundEffect: async () => {},
  t: (key) => key,
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState('en');
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [soundVolume, setSoundVolumeState] = useState(1.0);

  // Sounds
  const [correctSound, setCorrectSound] = useState<Audio.Sound | null>(null);
  const [wrongSound, setWrongSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    loadSettings();
    loadSounds();
    return () => {
        if (correctSound) correctSound.unloadAsync();
        if (wrongSound) wrongSound.unloadAsync();
    };
  }, []);

  const loadSettings = async () => {
    try {
      const storedLang = await AsyncStorage.getItem('settings_language');
      const storedTheme = await AsyncStorage.getItem('settings_theme');
      const storedSound = await AsyncStorage.getItem('settings_sound');
      const storedVolume = await AsyncStorage.getItem('settings_volume');

      if (storedLang) setLanguageState(storedLang);
      if (storedTheme) setThemeState(storedTheme as 'light' | 'dark');
      if (storedSound !== null) setSoundEnabledState(storedSound === 'true');
      if (storedVolume !== null) setSoundVolumeState(parseFloat(storedVolume));
    } catch (e) {
      console.error("Failed to load settings", e);
    }
  };

  const loadSounds = async () => {
      try {
           // Success Sound (Ding/Chime)
           const { sound: sound1 } = await Audio.Sound.createAsync(
               { uri: 'https://www.myinstants.com/media/sounds/correct.mp3' } 
           );
           setCorrectSound(sound1);

           // Error Sound (Bonk/Buzz)
           const { sound: sound2 } = await Audio.Sound.createAsync(
               { uri: 'https://www.myinstants.com/media/sounds/wrong-answer-sound-effect.mp3' } 
           );
           setWrongSound(sound2);
      } catch (e) {
          console.log("Error loading sounds", e);
      }
  };

  const saveSetting = async (key: string, value: string) => {
      try {
          await AsyncStorage.setItem(key, value);
      } catch (e) { console.error(e); }
  };

  const setLanguage = (lang: string) => {
      setLanguageState(lang);
      saveSetting('settings_language', lang);
  };

  const setTheme = (t: 'light' | 'dark') => {
      setThemeState(t);
      saveSetting('settings_theme', t);
  };

  const setSoundEnabled = (enabled: boolean) => {
      setSoundEnabledState(enabled);
      saveSetting('settings_sound', String(enabled));
  };

  const setSoundVolume = (vol: number) => {
      setSoundVolumeState(vol);
      saveSetting('settings_volume', String(vol));
  };

  const playSoundEffect = async (type: 'correct' | 'wrong') => {
      if (!soundEnabled) return;
      
      try {
          const sound = type === 'correct' ? correctSound : wrongSound;
          if (sound) {
              await sound.stopAsync(); // Stop if already playing (ensure 1 time)
              await sound.setVolumeAsync(soundVolume);
              await sound.playFromPositionAsync(0);
          }
      } catch (error) {
          console.log("Play Sound Error", error);
      }
  };

  const t = (key: string) => {
      return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <SettingsContext.Provider value={{
        language, theme, soundEnabled, soundVolume,
        setLanguage, setTheme, setSoundEnabled, setSoundVolume,
        playSoundEffect, t
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
