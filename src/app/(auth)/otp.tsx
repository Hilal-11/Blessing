import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
 
const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;


export default function OTP() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const router = useRouter()
  const { mode, identifier } = useLocalSearchParams<{ mode: "email" | "phone"; identifier: string }>();
  const inputs = useRef<(TextInput | null)[]>([]);
 
  // Countdown for the resend timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);
 
  const handleChange = (text: string, index: number) => {
    // Only allow a single digit per box
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
 
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (error) setError(undefined);
 
    // Auto-move to the next box once a digit is entered
    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
    const digits = text.replace(/\D/g, "");
    if (digits.length > 1) {
      const filled = digits.slice(0, OTP_LENGTH).split("");
      setOtp([...filled, ...Array(OTP_LENGTH - filled.length).fill("")]);
      inputs.current[Math.min(filled.length, OTP_LENGTH - 1)]?.focus();
      return;
    }
  };
 
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    // Backspace on an already-empty box moves focus back and clears
    // the previous box too — standard OTP-input behavior
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const next = [...otp];
      next[index - 1] = "";
      setOtp(next);
      inputs.current[index - 1]?.focus();
    }
  };
 
  const code = otp.join("");
  const isComplete = code.length === OTP_LENGTH;
 
  const handleVerify = async () => {
    if (!isComplete || loading || !identifier) return;
    setLoading(true);
    setError(undefined);
    try {
      const { error } =
        mode === "email"
          ? await supabase.auth.verifyOtp({ email: identifier, token: code, type: "signup" })
          : await supabase.auth.verifyOtp({ phone: identifier, token: code, type: "sms" });

      if (error) {
        setError(
          error.message.toLowerCase().includes("expired")
            ? "Code expired. Request a new one."
            : "Invalid code. Please try again."
        );
        setOtp(Array(OTP_LENGTH).fill(""));
        inputs.current[0]?.focus();
        return;
      }

      // Session is now set and the DB trigger has already created the users row
      router.replace("/(auth)/location-permission");
    } catch {
      setError("Something went wrong. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || !identifier) return;
    setError(undefined);
    try {
      const { error } =
        mode === "email"
          ? await supabase.auth.resend({ type: "signup", email: identifier })
          : await supabase.auth.signInWithOtp({ phone: identifier });

      if (error) {
        setError(error.message);
        return;
      }
      setOtp(Array(OTP_LENGTH).fill(""));
      setSecondsLeft(RESEND_SECONDS);
      inputs.current[0]?.focus();
    } catch {
      setError("Couldn't resend the code. Try again.");
    }
  };
  
  
  return (
    <SafeAreaView className="flex-1 bg-white relative" edges={["top", "bottom"]}>
      <View className="px-6 pt-2">
          <TouchableOpacity
            className="h-11 w-11 items-center justify-center rounded-full bg-neutral-950"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      <View className="w-full h-screen relative">

        {/* TOP 40% */}
        <View className="items-center justify-center px-6">
          <Text className="text-center text-3xl font-bold text-neutral-950 mb-4">
            Verify OTP
          </Text>
          <View className="relative flex justify-center items-center w-full h-70"> 
            <Image source={require("@/assets/images/sms-lock-icoon.png")} style={{ width: 100, height: 100 }} className=""/>
            <LinearGradient
                colors={["#ff930f", "#fff95b"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute w-70 h-70 top-0 blur-3xl rounded-full opacity-70"
              >
            </LinearGradient>
          </View>
        </View>

        <View className="absolute bottom-0 w-full h-[550px] rounded-t-[4rem] bg-black border border-neutral-50 shadow-sm">
          <View className="w-full h-full flex-1 justify-start pt-12">
            <View className="flex-col">
              <View className="w-full h-auto flex justify-center items-center">
                <View className="flex justify-center items-center rounded-full h-20 w-20 shadow-sm border border-neutral-200 bg-white"> 
                  <Image 
                    source={require("@/assets/images/sms-icon.png")}
                    style={{ width: 45, height: 45}}
                  />
                </View>
              </View>
              <View className="flex-col gap-2 justify-center items-center pt-4">
                <Text className="text-neutral-200 font-bold font-sans text-2xl">
                  Check your {mode === "email" ? "email" : "phone"}
                </Text>
                <Text className="font-medium text-sm font-sans text-neutral-300 w-3/4 text-center">
                  Enter the 6-digit code sent to {identifier}
                </Text>              
              </View>
            </View>
            <View className="pt-6 px-10 flex-row justify-between">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                className="w-14 h-15 rounded-2xl text-center text-2xl font-bold border border-neutral-700 bg-neutral-900 shadow-sm text-white"
              />
            ))}
          </View>
 
          {error ? (
            <Text className="text-red-500 text-xs mt-2 text-center ">{error}</Text>
          ) : null}
    
          {/* Resend row */}
          <View className="flex-row justify-center items-center gap-1 mt-6">
            <Text className="text-[14px] font-sans text-neutral-500">
              Didn&apos;t receive the code?
            </Text>
            <TouchableOpacity onPress={handleResend} disabled={secondsLeft > 0}>
              <Text
                className="text-[14px] font-sans font-semibold"
                style={{ color: secondsLeft > 0 ? "#A3A3A3" : "#fff" }}
              >
                {secondsLeft > 0 ? ` Resend in 0:${secondsLeft.toString().padStart(2, "0")}` : " Resend"}
              </Text>
            </TouchableOpacity>
          </View>
 
          {/* Verify button — full-width white pill */}
          <View className="mt-8 w-full px-10">
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!isComplete || loading}
              onPress={handleVerify}
              className="h-15 w-full items-center justify-center rounded-full bg-white border border-neutral-200"
              style={{
                opacity: !isComplete || loading ? 0.4 : 1,
                shadowColor: "#0F172A",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#171717" />
              ) : (
                <Text className="text-[16px] font-bold text-neutral-950">
                  Verify and Continue
                </Text>
              )}
            </TouchableOpacity>
          </View>
          </View>
          
        </View>

      </View>
    </SafeAreaView>
  );
}
