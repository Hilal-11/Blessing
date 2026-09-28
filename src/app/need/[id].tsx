'use client';

import { SafeAreaView, Text, View, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

export default function NeedDetail() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
              <Ionicons name="heart" size={20} color="#ec4899" />
            </View>
            <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">Prayer Request</Text>
          </View>
          
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Prayer for Healing</Text>
          <View className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <Text className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Please pray for my mother who is undergoing surgery tomorrow. 
              She has been battling illness for months and we need God's healing touch. 
              Thank you for your prayers and support during this difficult time.
            </Text>
          </View>
          
          <View className="flex-row justify-between mb-6">
            <View className="flex-row items-center gap-2">
              <Ionicons name="heart" size={20} color="#ec4899" />
              <Text className="font-semibold text-gray-900 dark:text-white">24</Text>
              <Text className="text-gray-500 dark:text-gray-400">Prayers</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="gift" size={20} color="#8b5cf6" />
              <Text className="font-semibold text-gray-900 dark:text-white">5</Text>
              <Text className="text-gray-500 dark:text-gray-400">Blessings</Text>
            </View>
          </View>
          
          <View className="flex-row gap-3">
            <Pressable className="flex-1 bg-white dark:bg-gray-800 py-3 rounded-xl border border-gray-200 dark:border-gray-700 flex-row items-center justify-center gap-2">
              <Ionicons name="heart" size={20} color="#ec4899" />
              <Text className="text-gray-900 dark:text-white font-medium">Pray</Text>
            </Pressable>
            <Pressable className="flex-1 bg-gradient-to-r from-primary-500 to-purple-600 py-3 rounded-xl flex-row items-center justify-center gap-2">
              <Ionicons name="gift" size={20} color="white" />
              <Text className="text-white font-medium">Bless</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}