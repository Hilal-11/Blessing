'use client';

import { SafeAreaView, Text, View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function GivePhotos() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Photos</Text>
          <Text className="text-gray-500 dark:text-gray-400 mb-6">Optional: Add photos of your gift</Text>
          
          <View className="flex-row flex-wrap gap-3 mb-6">
            {[1, 2, 3].map(i => (
              <Pressable key={i} className="w-32 h-32 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <Ionicons name="add" size={32} color="#9ca3af" />
              </Pressable>
            ))}
          </View>
          
          <Pressable
            onPress={() => router.push('/give/review')}
            className="w-full bg-gradient-to-r from-primary-500 to-purple-600 py-3 px-6 rounded-xl shadow-lg shadow-primary-500/30"
          >
            <Text className="text-white font-semibold text-center">Continue</Text>
          </Pressable>
          
          <Pressable className="w-full mt-3">
            <Text className="text-center text-primary-500 font-medium">Skip for now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}