'use client';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ChatList() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1">
        <View className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">Messages</Text>
        </View>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-4 py-4 space-y-3">
            {[
              { name: 'Sarah M.', lastMessage: 'Thank you for your prayers!', time: '2h', unread: true },
              { name: 'John D.', lastMessage: 'Blessings to you and your family', time: '1d', unread: false },
              { name: 'Maria R.', lastMessage: 'Praying for your situation', time: '3d', unread: true },
            ].map((chat, i) => (
              <Pressable
                key={i}
                onPress={() => router.push(`/chat/${i}`)}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex-row gap-4"
              >
                <View className="relative">
                  <View className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <Ionicons name="person" size={24} color="#8b5cf6" />
                  </View>
                  {chat.unread && (
                    <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                      <Text className="text-white text-xs font-bold">1</Text>
                    </View>
                  )}
                </View>
                <View className="flex-1 min-w-0">
                  <View className="flex-row justify-between">
                    <Text className="font-semibold text-gray-900 dark:text-white truncate pr-2">{chat.name}</Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{chat.time}</Text>
                  </View>
                  <Text className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}