'use client';

import { SafeAreaView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Notifications() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="notifications" size={64} color="#8b5cf6" className="mb-4" />
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notifications</Text>
        <Text className="text-gray-500 dark:text-gray-400 text-center">
          Your notifications coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}