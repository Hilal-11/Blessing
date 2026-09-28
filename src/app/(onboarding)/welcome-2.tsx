import GradientButton from "@/components/OnboardScreensButton";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen2() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/screen3.jpg")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[
          "transparent",
          "rgba(255,255,255,0.61)",
          "rgba(255,255,255,15)",
          "#FFFFFF",
        ]}
        locations={[0, 0.35, 0.7, 1]}
        className="absolute bottom-0 left-0 right-0 h-[60%]"
      />

      <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
        {/* Back button — top-left, on its own, not sharing a row with Continue */}
        <View className="px-6 pt-2">
          <TouchableOpacity
            className="h-11 w-11 items-center justify-center rounded-full bg-neutral-950"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Center grid: 3x2 glass boxes */}
        <View className="px-6 mt-20">
          <View className="flex-row flex-wrap gap-3 justify-center">
            <View className="w-34 h-32 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20" />
            <View className="w-34 h-32 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20" />
            <View className="w-34 h-32 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20" />
            <View className="w-34 h-32 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20" />
            <View className="w-34 h-32 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20" />
            <View className="w-34 h-32 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20" />
          </View>
        </View>
        <View style={{ flex: 1 }} />


        {/* Bottom block: supporting text, then the Continue button */}
        <View className="px-3 pb-6">
          <View className="pr-4 pb-14">
            <Text className="text-6xl text-neutral-950 font-sans font-bold mb-2">
              Share More. Waste Less.
            </Text>
            <Text className="text-[15px] font-sans font-medium px-3 text-black">
              What you no longer need could mean everything to someone else. Share it, pass it on.
            </Text>
          </View>
          <GradientButton
            label="Continue"
            onPress={() => router.push("/(auth)/signup")}
            variant="blackButton"
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}