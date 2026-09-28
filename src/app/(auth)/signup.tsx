import { supabase } from "@/lib/supabase";
import { phoneRequestSchema, signupSchema } from "@/validations/AuthenticationValidations";
import { Ionicons } from "@expo/vector-icons";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";





export default function Signup() {
  const router = useRouter();
  useEffect(() => {
  GoogleSignin.configure({
    webClientId: "878791573905-06m5nll9da4n609is8h3h2gb1gnnf6ea.apps.googleusercontent.com",
  });
}, []);
  const [showPassword, setShowPassword] = useState(false);

  // ---------- Email + password state ----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | undefined>();
  // Disabled until both fields have *something* in them — full validation
  // (format checks) still runs on press, so this is just the "don't even
  // let them try yet" gate, not the whole validation story.
  const isFormFilled = email.trim().length > 0 && password.length > 0;

  const handleContinue = async () => {
    const result = signupSchema.safeParse({ email, password });
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors({ email: fe.email?.[0], password: fe.password?.[0] });
      return;
    }

    setErrors({});
    setGeneralError(undefined);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("password")) {
          setErrors({ password: error.message });
        } else {
          setGeneralError(error.message);
        }
        return;
      }

      // With email confirmation on, an existing email doesn't error —
      // Supabase returns a user with an empty identities array.
      if (data.user?.identities?.length === 0) {
        setErrors({ email: "This email is already registered. Try logging in instead." });
        return;
      }

      router.push({
        pathname: "/(auth)/otp",
        params: { mode: "email", identifier: result.data.email },
      });
    } catch {
      setGeneralError("Something went wrong. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Phone bottom sheet state ----------
  const [phoneModalVisible, setPhoneModalVisible] = useState(true);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [phoneLoading, setPhoneLoading] = useState(false);

  const handlePhoneContinue = async () => {
    const result = phoneRequestSchema.safeParse({ phone });
    if (!result.success) {
      setPhoneError(result.error.flatten().fieldErrors.phone?.[0]);
      return;
    }
    setPhoneError(undefined);
    setPhoneLoading(true);
    try {
      const fullPhone = `+91${result.data.phone}`;
      const { error } = await supabase.auth.signInWithOtp({ phone: fullPhone });
      if (error) {
        setPhoneError(error.message);
        return;
      }
      setPhoneModalVisible(false);
      router.push({
        pathname: "/(auth)/otp",
        params: { mode: "phone", identifier: fullPhone },
      });
    } catch {
      setPhoneError("Couldn't send the code. Try again.");
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGeneralError(undefined);
    try {
      const isAvailable = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      if (!isAvailable) {
        Alert.alert("Google Play Services not available", "Please install Google Play Services to sign in with Google.");
        return;
      }
      const res = await GoogleSignin.signIn();
      const idToken = res.data?.idToken;
      if (!idToken) return;

      const { error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });
      if (error) throw error;

      router.replace("/(tabs)/home"); // your post-auth route
    } catch (e: any) {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      }
      if (e.code === statusCodes.IN_PROGRESS) {
        return;
      }
      if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Google Play Services not available", "Please install Google Play Services to sign in with Google.");
        return;
      }
      if (e.message?.includes("RNGoogleSignin") || e.message?.includes("TurboModuleRegistry")) {
        Alert.alert(
          "Development build required",
          "Google Sign-In requires a development build. Run 'npx expo run:android' or 'npx expo run:ios' to create one.",
          [{ text: "OK", onPress: () => {} }]
        );
        return;
      }
      setGeneralError("Google sign-in failed. Try again.");
    }
  };

  return (

    <SafeAreaView className="flex-1 bg-white" style={{flex:1}} edges={["top", "bottom"]}>
      <View className="flex-1 px-8">
        {/* Back button */}
        <View className="pt-3">
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full bg-neutral-950"
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </Pressable>
        </View>

        {/* Logo */}
        <View className="flex-row justify-center items-center gap-2 mt-8">
          <Image
            source={require("@/assets/images/blessing.png")}
            style={{ width: 35, height: 35 }}
          />
          <Text className="text-4xl font-bold font-mono">BLESSINGS</Text>
        </View>

        {/* Title and subtitle */}
        <View className="mt-16 items-center text-center px-4">
          <Text className="text-[32px] font-bold font-sans text-neutral-950">
            Create an Account
          </Text>
          <View className="mt-1 px-4">
            <Text className="text-[16px] font-sans font-medium text-neutral-600 text-center">
              New user ? <Text className="font-bold text-neutral-950">  Create an account</Text>
            </Text>
          </View>
        </View>

        {/* Primary action: Continue with phone */}
        <View className="w-full pt-10 flex gap-2">

          <View>
            <View className="h-[56px] w-full flex-row items-center rounded-full border border-[#DDE9E6] bg-white pl-5">
              {/* Email icon */}
              <Ionicons
                name="mail"
                size={22}
                color="#262626"
                style={{ marginRight: 10 }}
              />

              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
                }}
                placeholder="Enter your email"
                placeholderTextColor="#404040"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="flex-1 text-[16px] text-neutral-900 font-sans font-medium"
              />

            </View>
            {errors.email ? (
              <Text className="text-red-500 text-xs mt-1 ml-4">{errors.email}</Text>
            ) : null}
          </View>

          <View className="mt-3">
            <View className="h-[56px] w-full flex-row items-center rounded-full border border-[#DDE9E6] bg-white pl-5 pr-4">

              {/* Password icon */}
              <Ionicons
                name="lock-closed"
                size={20}
                color="#262626"
                style={{ marginRight: 10 }}
              />

              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
                }}
                placeholder="Enter your password"
                placeholderTextColor="#404040"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                className="flex-1 text-[16px] text-neutral-900 font-sans font-medium"
              />

              {/* Show / Hide password */}
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="ml-2 h-10 w-10 items-center justify-center"
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={21}
                  color="#262626"
                />
              </TouchableOpacity>

            </View>
            {errors.password ? (
              <Text className="text-red-500 text-xs mt-1 ml-4">{errors.password}</Text>
            ) : null}
          </View>
        </View>
        <View className="mt-5 w-full">
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!isFormFilled || loading}
            className="h-15 w-full items-center justify-center rounded-full bg-neutral-950"
            style={{ opacity: !isFormFilled || loading ? 0.4 : 1 }}
            onPress={handleContinue}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-[16px] font-bold text-neutral-100">
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="mt-10 flex-row items-center gap-4">
          <View className="flex-1 h-px bg-neutral-300"></View>
          <Text className="text-[14px] font-sans text-neutral-500 tracking-wide">
            Or
          </Text>
          <View className="flex-1 h-px bg-neutral-300"></View>
        </View>

        {/* Secondary action: Continue with email */}
        

        <View className="mt-6 gap-2">
          {/* Phone — full width — opens bottom sheet */}
          <TouchableOpacity
            className="w-full h-15 flex-row items-center justify-start gap-6 rounded-full border pl-6 border-neutral-200 bg-white"
            onPress={() => setPhoneModalVisible(true)}
          >
            <Image
              source={require("@/assets/images/phone-icon.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text className="text-[15px] font-sans font-semibold text-neutral-950">
              Continue with Phone
            </Text>
          </TouchableOpacity>
        
          {/* Google + Apple — one row, equal width */}
            <TouchableOpacity
              className="w-full h-15 flex-row items-center justify-start pl-6 gap-6 rounded-full border border-neutral-200 bg-white"
              onPress={handleGoogle}
            >
              <Image
                source={require("@/assets/images/google-icon.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text className="text-[15px] font-sans font-semibold text-neutral-950">
                Continue with Google
              </Text>
            </TouchableOpacity>
        
            <TouchableOpacity
              className="w-full h-15 flex-row items-center justify-start pl-6 gap-6 rounded-full border border-neutral-200 bg-white"
            >
              <Image
                source={require("@/assets/images/apple-icon.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text className="text-[15px] font-sans font-semibold text-neutral-950">
                Continue with Apple
              </Text>
            </TouchableOpacity>
        </View>

        {/* Login link */}
        <View className="mt-2 flex-row justify-center items-center gap-2">
          <Text className="text-[15px] font-sans text-neutral-500">
            Already have an account?
          </Text>
          <Pressable onPress={() => router.replace("/(auth)/login")}>
            <Text className="text-[15px] font-sans font-bold text-neutral-950 underline">
              Log in
            </Text>
          </Pressable>
        </View>

        {/* Terms and Privacy */}
        <View className="absolute bottom-0 left-5 text-center w-full flex-row justify-center gap-4  items-center">
          <Pressable onPress={() => {}}>
            <Text className="text-[13px] font-bold font-sans text-neutral-500 underline">
              Terms of Service
            </Text>
          </Pressable>
          <Text className="text-[13px] font-sans text-neutral-300">|</Text>
          <Pressable onPress={() => {}}>
            <Text className="text-[13px] font-bold font-sans text-neutral-500 underline">
              Privacy Policy
            </Text>
          </Pressable>
        </View>
      </View>

      {/* ---------- Phone bottom sheet ---------- */}
      <Modal
        visible={phoneModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPhoneModalVisible(false)}
      >
        {/* Backdrop — tap outside the sheet to dismiss */}
        <Pressable
          className="flex-1 bg-black/40"
          onPress={() => setPhoneModalVisible(false)}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View className="bg-white rounded-t-3xl px-8 pt-3 pb-8">
            {/* Drag handle (cosmetic) */}
            <View className="self-center w-10 h-1.5 rounded-full bg-neutral-200 mb-6" />

            <Text className="text-[22px] font-bold font-sans text-neutral-950 mb-1">
              Continue with phone
            </Text>
            <Text className="text-[14px] font-sans text-neutral-500 mb-6">
              We&apos;ll text you a code to verify your number.
            </Text>

            <View>
              <View className="h-[56px] w-full flex-row items-center rounded-full border border-[#DDE9E6] bg-white pl-5">
                <Text className="text-[16px] font-sans font-medium text-neutral-900 mr-2">
                  +91
                </Text>
                <View className="w-px h-6 bg-neutral-200 mr-2" />
                <TextInput
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    if (phoneError) setPhoneError(undefined);
                  }}
                  placeholder="000 000 000 "
                  placeholderTextColor="#d1d5dc"
                  keyboardType="phone-pad"
                  maxLength={10}
                  className="flex-1 text-[16px] text-neutral-900 font-sans font-medium"
                />
              </View>
              {phoneError ? (
                <Text className="text-red-500 text-xs mt-1 ml-4">{phoneError}</Text>
              ) : null}
            </View>

            <View className="mt-5 w-full">
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={phone.trim().length === 0 || phoneLoading}
                className="h-15 w-full items-center justify-center rounded-full bg-neutral-950"
                style={{ opacity: phone.trim().length === 0 || phoneLoading ? 0.4 : 1 }}
                onPress={handlePhoneContinue}
              >
                {phoneLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-[16px] font-bold text-neutral-100">
                    Continue
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}