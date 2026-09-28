'use client';

import {  Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Explore() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Explore</Text>
          
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Ionicons name="people" size={20} color="#a855f7" />
              </View>
              <View>
                <Text className="font-semibold text-gray-900 dark:text-white">Community</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">10k+ members</Text>
              </View>
            </View>
            <View className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                <Ionicons name="heart" size={20} color="#ec4899" />
              </View>
              <View>
                <Text className="font-semibold text-gray-900 dark:text-white">Blessings</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">50k+ sent</Text>
              </View>
            </View>
          </View>

          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Categories</Text>
          <View className="flex-row flex-wrap gap-3">
            {['Healing', 'Family', 'Work', 'Guidance', 'Gratitude', 'Protection'].map(cat => (
              <View key={cat} className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <Text className="text-sm text-gray-700 dark:text-gray-300">{cat}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}