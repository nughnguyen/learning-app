import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Image, ScrollView, TextInput, Alert, ActivityIndicator, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../../firebaseConfig';

export default function ProfileScreen() {
  const { user, logout, updateUserProfile } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile Data
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(''); // Will load from auth/firestore
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [avatar, setAvatar] = useState(user?.avatar || null);

  // Password Change
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user?.uid) {
        fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
      try {
          if (!user?.uid) return;
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
              const data = userDoc.data();
              setName(data.name || user.name || '');
              setPhone(data.phone || '');
              setGender(data.gender || 'Male');
              setDob(data.dob || '');
              // Create user document often relies on Auth email if available
              setEmail(data.email || auth.currentUser?.email || '');
              if (data.avatar) setAvatar(data.avatar);
          } else {
              // Fallback to Auth data
              setName(user.name || '');
              setEmail(auth.currentUser?.email || '');
          }
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
  };

  const pickImage = async () => {
    if (!isEditing) return;
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const uploadAvatar = async (uri: string) => {
      if (!user?.uid) return null;
      try {
          const response = await fetch(uri);
          const blob = await response.blob();
          const storageRef = ref(storage, `avatars/${user.uid}`);
          await uploadBytes(storageRef, blob);
          return await getDownloadURL(storageRef);
      } catch (e) {
          console.error("Upload failed", e);
          Alert.alert("Error", "Failed to upload image.");
          return null;
      }
  };

  const handleSave = async () => {
      setLoading(true);
      try {
          let photoURL = avatar;
          
          // 1. Upload new avatar if it's a local URI
          if (avatar && !avatar.startsWith('http')) {
              const uploadedUrl = await uploadAvatar(avatar);
              if (uploadedUrl) photoURL = uploadedUrl;
          }

          // 2. Update Firebase Auth Profile
          if (auth.currentUser) {
              await updateProfile(auth.currentUser, {
                  displayName: name,
                  photoURL: photoURL
              });
          }

          // 3. Update Firestore Data
          if (user?.uid) {
               const userDocRef = doc(db, 'users', user.uid);
               await setDoc(userDocRef, {
                   name,
                   email,
                   phone,
                   gender,
                   dob,
                   avatar: photoURL,
                   updatedAt: new Date()
               }, { merge: true });
          }

          // 4. Change Password if requested
          if (showPasswordChange && currentPassword && newPassword) {
              await handleChangePassword();
          }

          // 5. Update Local Context State
          await updateUserProfile(name, photoURL || null);

          Alert.alert("Success", "Profile updated successfully!");
          setIsEditing(false);
          setShowPasswordChange(false);
          setCurrentPassword('');
          setNewPassword('');
          
      } catch (error: any) {
          Alert.alert("Error", error.message);
      } finally {
          setLoading(false);
      }
  };

  const handleChangePassword = async () => {
      if (!auth.currentUser || !auth.currentUser.email) return;
      
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      try {
          await reauthenticateWithCredential(auth.currentUser, credential);
          await updatePassword(auth.currentUser, newPassword);
          Alert.alert("Success", "Password changed successfully.");
      } catch (error: any) {
          throw new Error("Password change failed: " + error.message);
      }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <View className="flex-1 bg-gray-50 pt-12">
      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
        
        {/* Header / Avatar */}
        <View className="items-center mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">Profile Settings</Text>
            <TouchableOpacity onPress={pickImage} disabled={!isEditing} className="relative">
                <View className="w-28 h-28 bg-blue-100 rounded-full justify-center items-center border-4 border-white shadow-sm overflow-hidden">
                    {avatar ? (
                        <Image source={{ uri: avatar }} className="w-full h-full" />
                    ) : (
                        <Ionicons name="person" size={50} color="#2563eb" />
                    )}
                </View>
                {isEditing && (
                    <View className="absolute bottom-0 right-0 bg-blue-600 w-8 h-8 rounded-full items-center justify-center border-2 border-white">
                        <Ionicons name="camera" size={16} color="white" />
                    </View>
                )}
            </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-end mb-4">
             {!isEditing ? (
                 <TouchableOpacity onPress={() => setIsEditing(true)} className="flex-row items-center bg-blue-100 px-4 py-2 rounded-full">
                     <Ionicons name="create-outline" size={18} color="#2563eb" />
                     <Text className="text-blue-600 font-bold ml-2">Edit Profile</Text>
                 </TouchableOpacity>
             ) : (
                 <View className="flex-row space-x-2">
                     <TouchableOpacity onPress={() => setIsEditing(false)} className="bg-gray-200 px-4 py-2 rounded-full mr-2">
                         <Text className="text-gray-600 font-bold">Cancel</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={handleSave} className="bg-blue-600 px-4 py-2 rounded-full flex-row items-center">
                         {loading && <ActivityIndicator size="small" color="white" className="mr-2" />}
                         <Text className="text-white font-bold">Save</Text>
                     </TouchableOpacity>
                 </View>
             )}
        </View>

        {/* Fields Container */}
        <View className="bg-white rounded-3xl p-5 shadow-sm mb-6 space-y-4">
            
            {/* Display Name */}
            <View>
                <Text className="text-gray-500 text-xs font-bold uppercase mb-1 ml-1">Display Name</Text>
                <TextInput 
                    value={name}
                    onChangeText={setName}
                    editable={isEditing}
                    className={`bg-gray-50 p-3 rounded-xl text-gray-700 font-medium ${isEditing ? 'border border-blue-200' : 'border border-transparent'}`}
                    placeholder="Your Name"
                />
            </View>

            {/* Email (Read Only usually or editable) */}
            <View>
                <Text className="text-gray-500 text-xs font-bold uppercase mb-1 ml-1">Email</Text>
                <TextInput 
                    value={email}
                    editable={false}
                    className="bg-gray-100 p-3 rounded-xl text-gray-500 font-medium border border-transparent"
                    placeholder="email@example.com"
                />
            </View>

             {/* Phone */}
             <View>
                <Text className="text-gray-500 text-xs font-bold uppercase mb-1 ml-1">Phone Number</Text>
                <TextInput 
                    value={phone}
                    onChangeText={setPhone}
                    editable={isEditing}
                    keyboardType="phone-pad"
                    className={`bg-gray-50 p-3 rounded-xl text-gray-700 font-medium ${isEditing ? 'border border-blue-200' : 'border border-transparent'}`}
                    placeholder="+84 123 456 789"
                />
            </View>

            {/* Gender & DOB Row */}
            <View className="flex-row space-x-4">
                {/* Gender */}
                <View className="flex-1">
                    <Text className="text-gray-500 text-xs font-bold uppercase mb-1 ml-1">Gender</Text>
                    {isEditing ? (
                        <View className="flex-row bg-gray-50 rounded-xl p-1 border border-blue-200">
                             <TouchableOpacity 
                                onPress={() => setGender('Male')} 
                                className={`flex-1 items-center py-2 rounded-lg ${gender === 'Male' ? 'bg-blue-100' : ''}`}
                             >
                                 <Text className={`font-bold ${gender === 'Male' ? 'text-blue-700' : 'text-gray-400'}`}>Male</Text>
                             </TouchableOpacity>
                             <TouchableOpacity 
                                onPress={() => setGender('Female')} 
                                className={`flex-1 items-center py-2 rounded-lg ${gender === 'Female' ? 'bg-pink-100' : ''}`}
                             >
                                 <Text className={`font-bold ${gender === 'Female' ? 'text-pink-700' : 'text-gray-400'}`}>Female</Text>
                             </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="bg-gray-50 p-3 rounded-xl border border-transparent">
                            <Text className="text-gray-700 font-medium">{gender}</Text>
                        </View>
                    )}
                </View>

                {/* DOB */}
                <View className="flex-1">
                    <Text className="text-gray-500 text-xs font-bold uppercase mb-1 ml-1">Date of Birth</Text>
                    <TextInput 
                        value={dob}
                        onChangeText={setDob}
                        editable={isEditing}
                        className={`bg-gray-50 p-3 rounded-xl text-gray-700 font-medium ${isEditing ? 'border border-blue-200' : 'border border-transparent'}`}
                        placeholder="DD/MM/YYYY"
                    />
                </View>
            </View>

        </View>

        {/* Change Password Section */}
        {isEditing && (
            <View className="bg-white rounded-3xl p-5 shadow-sm mb-6">
                <TouchableOpacity 
                    onPress={() => setShowPasswordChange(!showPasswordChange)}
                    className="flex-row justify-between items-center"
                >
                     <Text className="text-base font-bold text-gray-800">Change Password</Text>
                     <Ionicons name={showPasswordChange ? "chevron-up" : "chevron-down"} size={20} color="#6b7280" />
                </TouchableOpacity>

                {showPasswordChange && (
                    <View className="mt-4 space-y-4">
                        <View>
                            <Text className="text-gray-500 text-xs font-bold uppercase mb-1 ml-1">Current Password</Text>
                            <TextInput 
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                secureTextEntry
                                className="bg-gray-50 p-3 rounded-xl text-gray-700 font-medium border border-blue-200"
                                placeholder="Enter current password"
                            />
                        </View>
                        <View>
                            <Text className="text-gray-500 text-xs font-bold uppercase mb-1 ml-1">New Password</Text>
                            <TextInput 
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry
                                className="bg-gray-50 p-3 rounded-xl text-gray-700 font-medium border border-blue-200"
                                placeholder="Enter new password"
                            />
                        </View>
                    </View>
                )}
            </View>
        )}

        <TouchableOpacity 
            className="bg-red-50 p-4 rounded-2xl flex-row justify-center items-center mb-20"
            onPress={handleLogout}
        >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-2">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
