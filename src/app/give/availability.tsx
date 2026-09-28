'use client';

import { SafeAreaView, Text, View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function GiveAvailability() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Availability</Text>
          <Text className="text-gray-500 dark:text-gray-400 mb-6">When can you deliver this gift?</Text>
          
          <View className="space-y-3 mb-6">
            {[
              { label: 'Right Now', desc: 'Immediate delivery', icon: 'flash' },
              { label: 'Today', desc: 'Within a few hours', icon: 'sunny' },
              { label: 'Tomorrow', desc: 'Schedule for tomorrow', icon: 'calendar' },
              { label: 'Custom Time', desc: 'Pick specific date/time', icon: 'time' },
            ].map((opt, i) => (
              <Pressable key={i} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex-row items-center gap-4 shadow-sm">
                <View className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Ionicons name={opt.icon} size={24} color="#8b5cf6" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 dark:text-white">{opt.label}</Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">{opt.desc}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
              </Pressable>
            ))}
          </View>
          
          <Pressable
            onPress={() => router.back()}
            className="w-full border-2 border-gray-200 dark:border-gray-700 py-3 px-6 rounded-xl"
          >
            <Text className="text-gray-700 dark:text-gray-300 font-semibold text-center">Back</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}