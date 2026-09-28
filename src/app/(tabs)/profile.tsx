'use client';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6">
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <Ionicons name="person" size={48} color="#8b5cf6" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">John Doe</Text>
            <Text className="text-gray-500 dark:text-gray-400">@johndoe</Text>
          </View>

          <View className="flex-row justify-around mb-8">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">24</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Prayers</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">156</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Blessings</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">12</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Requests</Text>
            </View>
          </View>

          <View className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <Pressable className="flex-row items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Ionicons name="person" size={20} color="#8b5cf6" />
                </View>
                <Text className="font-medium text-gray-900 dark:text-white">Edit Profile</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
            <Pressable className="flex-row items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Ionicons name="settings" size={20} color="#a855f7" />
                </View>
                <Text className="font-medium text-gray-900 dark:text-white">Settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
            <Pressable className="flex-row items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Ionicons name="shield-checkmark" size={20} color="#22c55e" />
                </View>
                <Text className="font-medium text-gray-900 dark:text-white">Privacy & Security</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
            <Pressable className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Ionicons name="log-out" size={20} color="#ef4444" />
                </View>
                <Text className="font-medium text-red-600 dark:text-red-400">Sign Out</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}