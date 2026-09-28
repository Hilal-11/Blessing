'use client';

import { SafeAreaView, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function GiveLocation() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="location" size={80} color="#8b5cf6" className="mb-6" />
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Delivery Location</Text>
        <Text className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-md">
          Where should this blessing be delivered?
        </Text>
        
        <View className="w-full max-w-md space-y-3">
          <Pressable className="w-full bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex-row items-center gap-4 shadow-sm">
            <View className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Ionicons name="navigate" size={24} color="#8b5cf6" />
            </View>
            <View>
              <Text className="font-semibold text-gray-900 dark:text-white">Use Current Location</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">GPS delivery</Text>
            </View>
          </Pressable>
          
          <Pressable
            onPress={() => router.push('/give/review')}
            className="w-full bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex-row items-center gap-4 shadow-sm"
          >
            <View className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Ionicons name="map" size={24} color="#a855f7" />
            </View>
            <View>
              <Text className="font-semibold text-gray-900 dark:text-white">Enter Address Manually</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Type address</Text>
            </View>
          </Pressable>
          
          <Pressable
            onPress={() => router.push('/give/review')}
            className="w-full bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex-row items-center gap-4 shadow-sm"
          >
            <View className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Ionicons name="person" size={24} color="#22c55e" />
            </View>
            <View>
              <Text className="font-semibold text-gray-900 dark:text-white">Pickup Locally</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Meet in person</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}