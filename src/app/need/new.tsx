'use client';

import { SafeAreaView, Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NeedNew() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Prayer Request</Text>
          
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</Text>
              <TextInput
                placeholder="e.g., Prayer for healing"
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white"
              />
            </View>
            
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</Text>
              <TextInput
                multiline
                numberOfLines={6}
                placeholder="Share your heart..."
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white"
              />
            </View>
            
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</Text>
              <View className="flex-row flex-wrap gap-3">
                {['Healing', 'Family', 'Work', 'Guidance', 'Gratitude', 'Protection'].map(cat => (
                  <Pressable key={cat} className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                    <Text className="text-sm text-gray-700 dark:text-gray-300">{cat}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Anonymous?</Text>
              <Pressable className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 flex-row items-center justify-between">
                <Text className="text-gray-900 dark:text-white">Post anonymously</Text>
                <View className="w-12 h-7 bg-primary-500 rounded-full relative">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-1 left-1 shadow-md" />
                </View>
              </Pressable>
            </View>
            
            <Pressable
              onPress={() => router.replace('/(tabs)/home')}
              className="w-full bg-gradient-to-r from-primary-500 to-purple-600 py-3 px-6 rounded-xl shadow-lg shadow-primary-500/30 mt-4"
            >
              <Text className="text-white font-semibold text-center">Post Request</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}