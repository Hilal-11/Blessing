'use client';

import { SafeAreaView, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

export default function GiveSuccess() {
  const router = useRouter();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    opacity.value = withSpring(1, { duration: 500 });
  }, []);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: scale.value === 0 ? 30 : 0 }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        <Animated.View style={checkStyle} className="mb-8">
          <View className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Ionicons name="checkmark" size={48} color="#22c55e" />
          </View>
        </Animated.View>
        
        <Animated.View style={contentStyle}>
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Gift Sent! 🎉</Text>
          <Text className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-md">
            Your blessing has been delivered. The recipient will be notified.
          </Text>
          
          <Pressable
            onPress={() => router.replace('/(tabs)/give')}
            className="w-full max-w-md bg-gradient-to-r from-primary-500 to-purple-600 py-3 px-6 rounded-xl shadow-lg shadow-primary-500/30"
          >
            <Text className="text-white font-semibold text-center">Done</Text>
          </Pressable>
          
          <Pressable className="w-full max-w-md mt-3">
            <Text className="text-center text-primary-500 font-medium">Send Another Gift</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}