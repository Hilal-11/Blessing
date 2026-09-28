import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

type Variant = "pearl" | "blackButton";

const VARIANTS: Record<
  Variant,
  {
    colors: [string, string, ...string[]];
    borderColor: string;
    iconBg: string;
    iconBorder: string;
    iconColor: string;
    textColor: string;
    shadowColor: string;
  }
> = {
  // Clean white to soft gray — the neutral, versatile default
  pearl: {
    colors: ["#FFFFFF", "#F3F4F6"],
    borderColor: "#E5E7EB",
    iconBg: "rgba(17,24,39,0.06)",
    iconBorder: "rgba(17,24,39,0.10)",
    iconColor: "#111827",
    textColor: "#111827",
    shadowColor: "#94A3B8",
  },

    blackButton: {
    colors: ["#0A0A0A", "#1F1F1F", "#000000"],
    borderColor: "rgba(255,255,255,0.02)",
    iconBg: "rgba(255,255,255,0.08)",
    iconBorder: "rgba(255,255,255,0.10)",
    iconColor: "#fff",
    textColor: "#F9FAFB",
    shadowColor: "#000000",
    },

};

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
};

export default function GradientButton({
  label,
  onPress,
  variant = "pearl",
  icon = "arrow-forward",
  disabled = false,
}: Props) {
  const v = VARIANTS[variant];

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.85}
      style={{
        borderRadius: 16,
        opacity: disabled ? 0.5 : 1,
        shadowColor: v.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: disabled ? 0 : 0.18,
        shadowRadius: 10,
        elevation: disabled ? 0 : 4,
      }}
    >
      <LinearGradient
        colors={v.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: 56,
          borderRadius: 16,
          paddingLeft: 20,
          paddingRight: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: v.borderColor,
        }}
      >
        <Text
          className="text-[15px] font-sans font-bold"
          style={{ color: v.textColor }}
        >
          {label}
        </Text>
        <View
          style={{
            width: 40,
            height: 36,
            borderRadius: 10,
            backgroundColor: v.iconBg,
            borderWidth: 1,
            borderColor: v.iconBorder,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name={icon} size={20} color={v.iconColor} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}