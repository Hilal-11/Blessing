'use client';

import { SafeAreaView, Text, View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function GiveCategory() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What would you like to give?</Text>
          
          <View className="space-y-3">
            {[
              { icon: 'cash', label: 'Money', desc: 'Direct financial support', color: '#22c55e' },
              { icon: 'pizza', label: 'Food', desc: 'Meals & groceries', color: '#f97316' },
              { icon: 'shirt', label: 'Clothing', desc: 'Clothes & accessories', color: '#ec4899' },
              { icon: 'home', label: 'Shelter', desc: 'Housing assistance', color: '#3b82f6' },
              { icon: 'medkit', label: 'Medical', desc: 'Healthcare & medicine', color: '#ef4444' },
              { icon: 'school', label: 'Education', desc: 'School supplies & fees', color: '#a855f7' },
            ].map((cat, i) => (
              <Pressable
                key={i}
                onPress={() => router.push('/give/details')}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex-row items-center gap-4 shadow-sm"
              >
                <View className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${cat.color}20` }}>
                  <Ionicons name={cat.icon} size={24} color={cat.color} />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 dark:text-white">{cat.label}</Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">{cat.desc}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}