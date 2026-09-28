'use client';

import {  Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Activity() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Activity</Text>
          
          <View className="space-y-3">
            {[
              { type: 'prayer', text: 'You prayed for Sarah', time: '2h ago', icon: 'heart', color: '#ec4899' },
              { type: 'blessing', text: 'John sent you a blessing', time: '5h ago', icon: 'gift', color: '#8b5cf6' },
              { type: 'prayer', text: 'Your request received 10 prayers', time: '1d ago', icon: 'heart', color: '#ec4899' },
              { type: 'blessing', text: 'You blessed Maria\'s family', time: '2d ago', icon: 'gift', color: '#8b5cf6' },
              { type: 'prayer', text: 'New prayer request in your area', time: '3d ago', icon: 'heart', color: '#ec4899' },
            ].map((item, i) => (
              <View key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex-row gap-4">
                <View className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-gray-900 dark:text-white">{item.text}</Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}