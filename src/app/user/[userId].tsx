'use client';

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function UserProfile() {
  const { userId } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6">
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <Ionicons name="person" size={48} color="#8b5cf6" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">User {userId}</Text>
            <Text className="text-gray-500 dark:text-gray-400">@username</Text>
          </View>

          <View className="flex-row justify-around mb-8">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">12</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Requests</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">48</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Prayers</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">23</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Blessings</Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</Text>
          <View className="space-y-3">
            {[1, 2, 3].map(i => (
              <View key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex-row gap-4">
                <View className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Ionicons name="heart" size={20} color="#ec4899" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-gray-900 dark:text-white">Posted prayer request</Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}