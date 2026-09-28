import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

type MenuItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

const menuItems: MenuItem[] = [
  { label: 'Profile', icon: 'person-circle-outline' },
  { label: 'Community', icon: 'people-outline' },
  { label: 'Donations', icon: 'heart-outline' },
  { label: 'Appearance', icon: 'color-palette-outline' },
  { label: 'Settings', icon: 'settings-outline' },
  { label: 'Privacy & Policy', icon: 'shield-checkmark-outline' },
  { label: 'Help & Support', icon: 'help-circle-outline' },
];

type LeftDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LeftDrawer({ isOpen, onClose }: LeftDrawerProps) {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -width,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [isOpen, translateX]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Animated.View
          style={{
            width,
            height,
            transform: [{ translateX }],
            backgroundColor: '#ffffff',
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View className="relative flex-row w-full justify-between items-center px-6 border-b border-neutral-300 pb-5">
              <View className="py-5 pb-3 h-auto">
                <Image
                  source={require("@/assets/images/user.png")}
                  style={{ width: 80, height:80 }}
                  className="rounded-full"
                 />
                 <Text className="mt-4 font-sans font-bold text-3xl ">
                  Hilal
                 </Text>
                 <Text className="mt-1 font-sans font-medium text-[16px] text-neutral-500">
                  hilalahmadcodedev@gmail.com
                 </Text>
              </View>
              <View className="absolute right-5 top-5">
                <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                className="h-10 w-10 items-center justify-center rounded-full bg-black/5"
              >
                <Ionicons name="close" size={26} color="#000000" />
              </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              className="flex-1 px-4 pt-4"
              showsVerticalScrollIndicator={false}
            >
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => {
                    item.onPress?.();
                    onClose();
                  }}
                  activeOpacity={0.6}
                  className="flex-row items-center py-4 border-black/5"
                >
                  <View className="h-11 w-11 items-center justify-center rounded-full mr-2">
                    <Ionicons name={item.icon} size={24} color="#000000" />
                  </View>
                  <Text className="text-black text-[21px] font-semibold flex-1">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}