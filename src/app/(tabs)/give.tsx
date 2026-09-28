'use client';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Give() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="gift" size={80} color="#8b5cf6" className="mb-6" />
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Give a Blessing</Text>
        <Text className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-md">
          Share your abundance with those in need. Every gift makes a difference.
        </Text>
        
        <View className="w-full max-w-md space-y-3">
          <Pressable
            onPress={() => router.push('/give/category')}
            className="w-full bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex-row items-center gap-4 shadow-sm"
          >
            <View className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Ionicons name="cash" size={24} color="#8b5cf6" />
            </View>
            <View>
              <Text className="font-semibold text-gray-900 dark:text-white">Financial Gift</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Send money directly</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </Pressable>
          
          <Pressable
            className="w-full bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex-row items-center gap-4 shadow-sm"
          >
            <View className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Ionicons name="pizza" size={24} color="#a855f7" />
            </View>
            <View>
              <Text className="font-semibold text-gray-900 dark:text-white">Food & Essentials</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Order groceries/meals</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </Pressable>
          
          <Pressable
            className="w-full bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex-row items-center gap-4 shadow-sm"
          >
            <View className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
              <Ionicons name="shirt" size={24} color="#ec4899" />
            </View>
            <View>
              <Text className="font-semibold text-gray-900 dark:text-white">Clothing & Items</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Donate physical items</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}