import { Providers } from "@/components/providers";
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../../global.css';
export default function RootLayout() {
  return (
      <SafeAreaProvider>
      <Providers>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="give" />
        </Stack>
      </Providers>
      </SafeAreaProvider>
  );
}