import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';

export default function SupportScreen() {
  const [copied, setCopied] = useState(false);

  const handleCopySTK = async () => {
    await Clipboard.setStringAsync('0388205003');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [donateAmount, setDonateAmount] = useState('');
  const [donateMsg, setDonateMsg] = useState('Ung ho phat trien App');
  const [qrUrl, setQrUrl] = useState(`https://img.vietqr.io/image/OCB-0388205003-compact.png?amount=0&addInfo=${encodeURIComponent('Ung ho phat trien App')}&accountName=NGUYEN QUOC HUNG`);

  const handleSend = () => {
    Alert.alert("Sent", "We have received your message!");
  };

  // Auto-generate QR when inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
        const amount = parseInt(donateAmount.replace(/[^0-9]/g, '')) || 0;
        // Use default msg if empty
        const finalMsg = donateMsg.trim().length > 0 ? donateMsg : 'Ung ho phat trien App'; 
        const url = `https://img.vietqr.io/image/OCB-0388205003-compact.png?amount=${amount}&addInfo=${encodeURIComponent(finalMsg)}&accountName=NGUYEN QUOC HUNG`;
        setQrUrl(url);
    }, 500); // 500ms debounce to avoid spamming while typing

    return () => clearTimeout(timer);
  }, [donateAmount, donateMsg]);

  const handleQuickSelect = (val: string) => {
      setDonateAmount(val);
  };

  const downloadQR = async () => {
      try {
          const fileUri = FileSystem.documentDirectory + 'gumballz_qr.png';
          // Download the image to local filesystem
          const { uri } = await FileSystem.downloadAsync(qrUrl, fileUri);
          
          if (await Sharing.isAvailableAsync()) {
              // Open Share dialog (User can "Save Image" from here)
              await Sharing.shareAsync(uri);
          } else {
              Alert.alert("Error", "Downloading is not supported on this device.");
          }
      } catch (e) {
          console.error(e);
          Alert.alert("Error", "Failed to download QR Code. Please try again.");
      }
  };

  return (
    <View className="flex-1 bg-white pt-12">
      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold text-gray-900 mb-6">Support Center</Text>

        <View className="bg-blue-50 p-6 rounded-3xl mb-8">
            <Text className="text-blue-800 font-bold text-xl mb-2">How can we help?</Text>
            <Text className="text-blue-600">Send us a message or browse commonly asked questions below.</Text>
        </View>
        
        {/* Donation Section */}
        <View className="mb-10 border-b border-gray-100 pb-8">
             <Text className="text-xl font-bold text-gray-800 mb-2">Donate Developer ☕</Text>
             <Text className="text-gray-500 mb-4">Support the development of GumballZ Learning!</Text>

             <View className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm mb-6">
                 {/* Bank Info */}
                 <View className="mb-4 bg-gray-50 p-3 rounded-xl">
                     <Text className="font-bold text-gray-600 uppercase text-xs mb-1">Beneficiary</Text>
                     <Text className="text-blue-900 font-bold text-base mb-1">NGUYỄN QUỐC HƯNG</Text>
                     
                     <View className="flex-row items-center mb-1">
                        <Text className="text-gray-800 text-xl font-bold mr-3 tracking-widest">0388205003</Text>
                        <TouchableOpacity 
                            onPress={handleCopySTK}
                            className={`p-1.5 rounded-lg border ${copied ? 'bg-green-50 border-green-200' : 'bg-white border-gray-300'}`}
                        >
                            <View className="flex-row items-center">
                                <Ionicons name={copied ? "checkmark-circle" : "copy-outline"} size={12} color={copied ? "#16a34a" : "#4b5563"} />
                                <Text className={`text-xs ml-1 font-bold ${copied ? 'text-green-600' : 'text-gray-600'}`}>
                                    {copied ? 'COPIED' : 'COPY'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                     </View>
                     
                     <Text className="text-blue-600 font-bold text-sm">OCB (Ngan hang Phuong Dong)</Text>
                 </View>

                 {/* Controls */}
                 <Text className="font-bold text-gray-600 mb-2">Quick Amount</Text>
                 <View className="flex-row justify-between mb-4">
                     {['10000', '20000', '50000'].map(val => (
                         <TouchableOpacity 
                            key={val} 
                            onPress={() => handleQuickSelect(val)}
                            className={`px-4 py-2 rounded-lg border ${donateAmount === val ? 'bg-blue-600 border-blue-600' : 'bg-white border-blue-200'}`}
                        >
                             <Text className={donateAmount === val ? 'text-white font-bold' : 'text-blue-600 font-bold'}>
                                 {parseInt(val).toLocaleString()}đ
                             </Text>
                         </TouchableOpacity>
                     ))}
                 </View>

                 <Text className="font-bold text-gray-600 mb-2">Custom Amount (VND)</Text>
                 <TextInput 
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-3 font-bold text-lg text-gray-800"
                    placeholder="Enter amount (e.g. 50000)"
                    keyboardType="numeric"
                    value={donateAmount}
                    onChangeText={setDonateAmount}
                 />

                 <Text className="font-bold text-gray-600 mb-2">Message (Optional)</Text>
                 <TextInput 
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-6 text-gray-800"
                    placeholder="Cheer up!"
                    value={donateMsg}
                    onChangeText={setDonateMsg}
                 />
                 
                 {/* removed manual button */}

                 {/* QR Display */}
                 <View className="items-center">
                     <View className="p-2 bg-white rounded-xl border border-gray-200 shadow-sm mb-4">
                        <Image 
                            source={{ uri: qrUrl }} 
                            style={{ width: 250, height: 250 }}
                            resizeMode="contain"
                        />
                     </View>
                     <TouchableOpacity 
                        className="flex-row items-center bg-gray-100 px-5 py-3 rounded-full"
                        onPress={downloadQR}
                     >
                         <Ionicons name="download-outline" size={20} color="#4b5563" />
                         <Text className="ml-2 font-bold text-gray-700">Save QR Code</Text>
                     </TouchableOpacity>
                 </View>
             </View>
        </View>

        <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">Contact Us</Text>
            <TextInput 
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800"
                placeholder="Subject"
            />
            <TextInput 
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 h-32"
                placeholder="Describe your issue..."
                multiline
                textAlignVertical="top"
            />
            <TouchableOpacity 
                className="bg-blue-600 py-4 rounded-xl shadow-lg shadow-blue-400"
                onPress={handleSend}
            >
                <Text className="text-white text-center font-bold font-lg">Send Message</Text>
            </TouchableOpacity>
        </View>

        <View className="mb-20">
            <Text className="text-lg font-bold text-gray-800 mb-4">FAQ</Text>
            {['How to reset progress?', 'Can I use offline?', 'Is it free?'].map((q, i) => (
                <View key={i} className="mb-4 border-b border-gray-100 pb-4">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-700 font-medium">{q}</Text>
                        <Ionicons name="chevron-down" size={20} color="#9ca3af" />
                    </View>
                </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
