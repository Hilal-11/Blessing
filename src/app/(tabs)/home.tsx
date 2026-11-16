import { LeftDrawer } from '@/components/LeftDrawer';
import { RightDropdown } from '@/components/RightDropdown';
import { ensureLocationSynced } from '@/lib/location';
import { useEffect, useRef, useState } from 'react';
import { Image, PanResponder, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// A swipe only counts as "open the drawer" if the finger STARTED within
// this many px of the left edge.
const EDGE_SWIPE_ZONE = 56;

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownAnchorRef = useRef<View>(null);
  const hasCheckedLocation = useRef(false); // guards against double-firing in dev (Strict Mode runs effects twice)

  useEffect(() => {
    if (hasCheckedLocation.current) return;
    hasCheckedLocation.current = true;

    // Fire-and-forget: checks permission, requests it if undecided, and
    // stores coordinates if granted — all without blocking this screen.
    // If the user lands here already having granted permission earlier,
    // this simply refreshes their stored location.
    ensureLocationSynced();
  }, []);

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

  // Swipe right from the left edge to open the drawer. The PanResponder is
  // created once, so it reads the latest openDrawer through a ref.
  const openDrawerRef = useRef(openDrawer);
  openDrawerRef.current = openDrawer;

  const edgeSwipe = useRef(
    PanResponder.create({
      // Capture phase so this wins over children — but ONLY for a
      // clearly horizontal, rightward drag that started at the left edge.
      // Taps and vertical scrolling are never touched.
      onMoveShouldSetPanResponderCapture: (evt, g) => {
        const startX = evt.nativeEvent.pageX - g.dx;
        return (
          startX < EDGE_SWIPE_ZONE &&
          g.dx > 12 &&
          Math.abs(g.dx) > Math.abs(g.dy) * 1.5
        );
      },
      onPanResponderRelease: (_, g) => {
        if (g.dx > 50 || g.vx > 0.5) openDrawerRef.current();
      },
    })
  ).current;

  return (
    <View className="flex-1" {...edgeSwipe.panHandlers}>
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