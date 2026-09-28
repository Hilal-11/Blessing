'use client';

import { SafeAreaView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="settings" size={64} color="#8b5cf6" className="mb-4" />
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</Text>
        <Text className="text-gray-500 dark:text-gray-400 text-center">
          Settings screen coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}