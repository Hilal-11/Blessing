'use client';

import { Link, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFound() {
  const { path } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</Text>
      <Text className="text-xl text-gray-600 dark:text-gray-400 mt-2 mb-6">
        Screen not found
      </Text>
      <Text className="text-gray-500 dark:text-gray-500 mb-6 text-center px-4">
        No route matches <Text className="font-mono font-semibold">{path}</Text>
      </Text>
      <Link
        href="/"
        className="bg-primary-600 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Go Home</Text>
      </Link>
    </View>
  );
}