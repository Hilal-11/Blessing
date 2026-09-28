import GradientButton from "@/components/OnboardScreensButton";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function WelcomeScreen1() {
  const router = useRouter();


  return (
    <ImageBackground
      source={require("@/assets/images/screen2.jpg")}
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
        className="absolute bottom-0 left-0 right-0 h-[30%]"
      />
      <SafeAreaView
        edges={["top", "bottom"]}
        style={{ flex: 1 }}
      >
        <View className="w-full h-screen flex flex-col justify-between">
          <View className="w-full flex justify-center items-center pt-10">
            <Image 
              source={require("@/assets/images/blessing.png")}
              style={{
                width: 180,
                height: 180,
              }}
            />
          <View className="pt-5 w-full items-center justify-center">
            <MaskedView
              maskElement={
                <Text
                  className="text-4xl font-extrabold text-center"
                  style={{ letterSpacing: 8 }}
                >
                  BLESSINGS
                </Text>
              }
            >
              <LinearGradient
                colors={['#fff', '#fff', '#fff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  className="text-4xl font-extrabold text-center opacity-0"
                  style={{ letterSpacing: 8 }}
                >
                  BLESSINGS
                </Text>
              </LinearGradient>
            </MaskedView>
          </View>
          </View>
          <View className="flex-col">
            <View className="w-full items-center">
              <Image
                source={require("@/assets/images/blessingCategoryImage.png")}
                className="w-full"
                style={{
                  width: 350,
                  height: 360
                }}
              />
            </View>
          </View>
          <View className="w-full px-6 pb-6">
            <GradientButton
              label="Continue blessings"
              onPress={() => router.push('/(onboarding)/welcome-2')}
              variant="blackButton"
            />
          </View>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}