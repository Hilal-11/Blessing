'use client';

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatDetail() {
  const { conversationId } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1">
        <View className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex-row items-center gap-4">
          <View className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <Ionicons name="person" size={24} color="#8b5cf6" />
          </View>
          <Text className="font-semibold text-gray-900 dark:text-white">Conversation #{conversationId}</Text>
        </View>
        <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
          <View className="space-y-4">
            {[1, 2, 3].map(i => (
              <View key={i} className="flex-row justify-end">
                <View className="max-w-[70%] bg-primary-500 rounded-2xl px-4 py-2 rounded-tr-sm">
                  <Text className="text-white text-sm">Message {i}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex-row items-center gap-3">
          <TextInput
            placeholder="Message..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-gray-900 dark:text-white"
          />
          <Pressable className="p-2">
            <Ionicons name="send" size={24} color="#8b5cf6" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}