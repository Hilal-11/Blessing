'use client';

import { Text, View, TextInput, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileSetup() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="person-circle" size={64} color="#8b5cf6" className="mb-6" />
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Complete Profile</Text>
        <Text className="text-gray-500 dark:text-gray-400 mb-8 text-center">Tell us about yourself</Text>
        
        <View className="w-full max-w-md space-y-4">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4 flex items-center justify-center">
              <Ionicons name="camera" size={32} color="#8b5cf6" />
            </View>
          </View>
          
          <TextInput
            placeholder="Display Name"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400"
            autoCapitalize="words"
          />
          <TextInput
            placeholder="Bio (optional)"
            multiline
            numberOfLines={3}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400"
          />
          <Pressable
            onPress={() => router.push('/(auth)/location-permission')}
            className="w-full bg-gradient-to-r from-primary-500 to-purple-600 py-3 px-6 rounded-xl shadow-lg shadow-primary-500/30"
          >
            <Text className="text-white font-semibold text-center">Continue</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}