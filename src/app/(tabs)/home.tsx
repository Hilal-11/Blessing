import { LeftDrawer } from '@/components/LeftDrawer';
import { RightDropdown } from '@/components/RightDropdown';
import { useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownAnchorRef = useRef<View>(null);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <View>
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-6 pt-3.5">
        <View>
          <TouchableOpacity
            onPress={openDrawer}
            className="rounded-full bg-neutral-300 border border-neutral-900 active:opacity-70"
            activeOpacity={0.7}
          >
            <Image
              source={require("@/assets/images/user.png")}
              style={{ width: 28, height: 28 }}
              className="rounded-full"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="font-sans text-2xl font-bold tracking-widest">BLESSINGS</Text>
        </View>
        <View className="bg-neutral-100 border border-neutral-300 h-10 w-10 flex justify-center items-center shadow" style={{ borderRadius: 100 }}>
          <TouchableOpacity
            ref={dropdownAnchorRef}
            onPress={toggleDropdown}
            className=""
            activeOpacity={0.7}
          >
            <Image
              source={require("@/assets/images/threedots.png")}
              style={{ width: 28, height: 28 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      </ScrollView>

    </SafeAreaView>
      <LeftDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
      <RightDropdown
        isOpen={isDropdownOpen}
        onClose={closeDropdown}
        anchorY={102}
      />
    </View>
  );
}