import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PermissionsScreen() {
  const router = useRouter();
  const [statusText, setStatusText] = useState("Setting things up...");
  const hasRun = useRef(false); // guards against double-firing in dev (Strict Mode runs effects twice)

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const requestPermissions = async () => {
      // ---- Location first ----
      setStatusText("Just a moment...");
      const currentLocation = await Location.getForegroundPermissionsAsync();
      if (currentLocation.status !== "granted" && currentLocation.canAskAgain) {
        // This line triggers the real native OS dialog for location
        await Location.requestForegroundPermissionsAsync();
      }

      // ---- Then camera — MUST wait for the location dialog to fully close
      // first; the OS won't show a second permission popup while one is
      // already on screen, so firing both at once (without await) either
      // silently drops the second request or queues unpredictably. ----
      const currentCamera = await ImagePicker.getCameraPermissionsAsync();
      if (currentCamera.status !== "granted" && currentCamera.canAskAgain) {
        await ImagePicker.requestCameraPermissionsAsync();
      }

      // Whatever the user chose on either dialog, move on — never block
      // onboarding on a permission grant. Blessing should degrade
      // gracefully (ask again later, right when a feature actually needs it)
      // rather than trap the user here.
      router.replace("/(tabs)/home");
    };

    requestPermissions();
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <ActivityIndicator size="large" color="#247A59" />
      <Text className="text-[15px] text-neutral-500 mt-4">{statusText}</Text>
    </SafeAreaView>
  );
}