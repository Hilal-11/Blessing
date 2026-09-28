'use client';

import { SafeAreaView, Text, View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function GiveReview() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Review Your Gift</Text>
          
          <View className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 mb-6">
            <View className="flex-row justify-between">
              <Text className="text-gray-500 dark:text-gray-400">Type</Text>
              <Text className="font-semibold text-gray-900 dark:text-white">Financial Gift</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500 dark:text-gray-400">Amount</Text>
              <Text className="font-semibold text-gray-900 dark:text-white text-green-600">$50.00</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500 dark:text-gray-400">Delivery</Text>
              <Text className="font-semibold text-gray-900 dark:text-white">Current Location</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500 dark:text-gray-400">Anonymous</Text>
              <Text className="font-semibold text-gray-900 dark:text-white">Yes</Text>
            </View>
          </View>
          
          <Pressable
            onPress={() => router.push('/give/success')}
            className="w-full bg-gradient-to-r from-primary-500 to-purple-600 py-3 px-6 rounded-xl shadow-lg shadow-primary-500/30"
          >
            <Text className="text-white font-semibold text-center">Confirm & Send</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}