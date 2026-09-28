import { Stack } from 'expo-router';

export default function GiveLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="category" />
      <Stack.Screen name="details" />
      <Stack.Screen name="location" />
      <Stack.Screen name="photos" />
      <Stack.Screen name="review" />
      <Stack.Screen name="success" />
      <Stack.Screen name="availability" />
    </Stack>
  );
}