import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface RightDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorY: number;
}

const DROPDOWN_WIDTH = 180;

const dropdownItems = [
  {
    icon: "person-circle",
    label: "Profile",
    route: "/profile",
    color: "#000",
  },
  {
    icon: "filter",
    label: "Filter",
    route: "/filter",
    color: "#000",
  },
  {
    icon: "swap-vertical",
    label: "Sort By",
    route: "/sort",
    color: "#000",
  },
  {
    icon: "search",
    label: "Search",
    route: "/search",
    color: "#000",
  },
  {
    icon: "information-circle",
    label: "About",
    route: "/about",
    color: "#000",
  },
  {
    icon: "refresh",
    label: "Refresh",
    route: "/",
    color: "#000",
  },
];

export function RightDropdown({
  isOpen,
  onClose,
  anchorY,
}: RightDropdownProps) {
  const router = useRouter();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const translateY = useSharedValue(-10);

  useEffect(() => {
    opacity.value = withTiming(isOpen ? 1 : 0, {
      duration: 150,
    });

    scale.value = withTiming(isOpen ? 1 : 0.9, {
      duration: 150,
    });

    translateY.value = withTiming(isOpen ? 0 : -10, {
      duration: 150,
    });
  }, [isOpen]);

  const dropdownStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        scale: scale.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));

  const handleItemPress = (route: string) => {
    onClose();
    router.push(route as any);
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* FULL SCREEN BACKDROP */}
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "transparent",
        }}
      >
        {/* DROPDOWN */}
        <Animated.View
          style={[
            {
              position: "absolute",
              top: anchorY,
              right: 16,
            },
            dropdownStyle,
          ]}
        >
          {/* Prevent outside backdrop from receiving dropdown taps */}
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
            }}
          >
            {/* EXACT PREVIOUS UI */}
            <View
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 pt-1 dark:border-gray-700 overflow-hidden"
              style={{
                width: DROPDOWN_WIDTH,
              }}
            >
              {dropdownItems.map((item, index) => (
                <Pressable
                  key={item.label}
                  onPress={() => handleItemPress(item.route)}
                  className={`flex-row items-center gap-3 px-3 py-2 ${
                    index === dropdownItems.length - 1 ? "" : ""
                  }`}
                  android_ripple={{
                    color: item.color + "30",
                  }}
                >
                  <View
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: item.color + "15",
                    }}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      style={{
                        color: item.color,
                      }}
                    />
                  </View>

                  <Text className="font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Pressable>

          {/* EXACT PREVIOUS ARROW */}
          <View
            className="w-4 h-4"
            style={{
              transform: [{ rotate: "45deg" }],
            }}
          />
        </Animated.View>
      </Pressable>
    </Modal>
  );
}