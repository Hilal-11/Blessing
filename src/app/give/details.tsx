'use client';

import { SafeAreaView, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function GiveDetails() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gift Details</Text>
          
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount / Value</Text>
              <TextInput
                placeholder="$0.00"
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-2xl font-bold text-center"
                keyboardType="numeric"
              />
            </View>
            
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Note (optional)</Text>
              <TextInput
                multiline
                numberOfLines={4}
                placeholder="A message for the recipient..."
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white"
              />
            </View>
            
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Anonymous?</Text>
              <Pressable className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 flex-row items-center justify-between">
                <Text className="text-gray-900 dark:text-white">Hide my name</Text>
                <View className="w-12 h-7 bg-primary-500 rounded-full relative">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-1 left-1 shadow-md" />
                </View>
              </Pressable>
            </View>
            
            <Pressable
              onPress={() => router.push('/give/location')}
              className="w-full bg-gradient-to-r from-primary-500 to-purple-600 py-3 px-6 rounded-xl shadow-lg shadow-primary-500/30 mt-4"
            >
              <Text className="text-white font-semibold text-center">Continue</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}