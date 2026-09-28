import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const ICON_SIZE_BOOST = 4;
const BAR_HEIGHT = 60;
const BAR_RADIUS = BAR_HEIGHT / 2;
const BAR_WIDTH = 380;
const PILL_SIZE = { width: 76, height: 46 };
const USE_REAL_GLASS = Platform.OS === "ios" && isLiquidGlassAvailable();

const ICONS: Record<string, number> = {
  home: require("@/assets/images/home.png"),
  search: require("@/assets/images/search.png"),
  activity: require("@/assets/images/activity.png"),
  profile: require("@/assets/images/user.png"),
};

function PlainTabButton({
  onPress,
  onLayout,
  children,
}: {
  onPress: () => void;
  onLayout?: (e: LayoutChangeEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      android_ripple={null}
      style={{
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center", // explicit centering, not left to defaults
      }}
    >
      {children}
    </Pressable>
  );
}

function TabIconImage({ source, size }: { source: number; size: number }) {
  return (
    <Image
      source={source}
      style={{
        width: size + ICON_SIZE_BOOST,
        height: size + ICON_SIZE_BOOST,
      }}
      resizeMode="contain"
    />
  );
}

function GiveTabButton({ onPress }: { onPress: () => void }) {
  return (
    <View
      style={{
        top: -26,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        // No overflow restriction on this wrapper, or anything above it in
        // the tree — this is what lets the button float above the bar.
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 3,
            borderColor: "rgba(255,255,255,0.9)",
            transform: [{ scale: pressed ? 0.94 : 1 }],
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 6,
          },
        ]}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </Pressable>
    </View>
  );
}

// Custom tab bar: we own this container outright, so centering is plain
// flexbox (alignItems: "center" on a full-width absolute wrapper) instead
// of left/right/width math that React Navigation's internal tabBarStyle
// merge was silently overriding.
function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // Per-route x/width measured via onLayout, used to slide the shared pill
  // under whichever icon is currently active.
  const layoutsRef = useRef<Record<string, { x: number; width: number }>>({});
  const pillX = useRef(new Animated.Value(0)).current;
  const pillOpacity = useRef(new Animated.Value(0)).current;
  const initializedRef = useRef(false);

  const movePill = (routeKey: string, animate: boolean) => {
    const layout = layoutsRef.current[routeKey];
    if (!layout) return;
    const target = layout.x + layout.width / 2 - PILL_SIZE.width / 2;

    if (animate) {
      Animated.spring(pillX, {
        toValue: target,
        useNativeDriver: true,
        speed: 16,
        bounciness: 6,
      }).start();
      Animated.timing(pillOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      pillX.setValue(target);
      pillOpacity.setValue(1);
    }
  };

  useEffect(() => {
    const activeRoute = state.routes[state.index];

    if (activeRoute.name === "give") {
      // The Give button is a floating action, not a highlighted tab —
      // hide the pill rather than leaving it stuck on the last tab.
      Animated.timing(pillOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
      return;
    }

    movePill(activeRoute.key, initializedRef.current);
    initializedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.index]);

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 22,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: BAR_WIDTH,
            height: BAR_HEIGHT,
            borderRadius: BAR_RADIUS,
            flexDirection: "row",
            paddingHorizontal: 12,
            borderTopWidth: 1,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            backgroundColor: "#f6f6f6",
            elevation: 0.3,
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 100,
            shadowRadius: 2,
            // overflow left visible (not "hidden") on this container so the
            // Give button's raised top half is never clipped — the rounded
            // blur fill below is a separate, clipped layer instead.
          }}
        >
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              { borderRadius: BAR_RADIUS, overflow: "hidden" },
            ]}
          >
            <BlurView
              intensity={90}
              tint="light"
              style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(255,255,255,0.55)" }]}
            />
          </View>

          <Animated.View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: (BAR_HEIGHT - PILL_SIZE.height) / 2,
              width: PILL_SIZE.width,
              height: PILL_SIZE.height,
              borderRadius: PILL_SIZE.height / 2,
              opacity: pillOpacity,
              transform: [{ translateX: pillX }],
            }}
          >
            {USE_REAL_GLASS ? (
              <GlassView
                glassEffectStyle="regular"
                style={{ flex: 1, borderRadius: PILL_SIZE.height / 2 }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  borderRadius: PILL_SIZE.height / 2,
                  backgroundColor: "#FFFFFF",
                  borderTopWidth: 0.08,
                  borderLeftWidth: 0.08,
                  borderRightWidth: 0.08,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              />
            )}
          </Animated.View>

          {state.routes.map((route, index) => {
            const focused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            if (route.name === "give") {
              return <GiveTabButton key={route.key} onPress={onPress} />;
            }

            const onLayout = (e: LayoutChangeEvent) => {
              const { x, width } = e.nativeEvent.layout;
              layoutsRef.current[route.key] = { x, width };
              if (!initializedRef.current && focused) {
                movePill(route.key, false);
                initializedRef.current = true;
              }
            };

            return (
              <PlainTabButton key={route.key} onPress={onPress} onLayout={onLayout}>
                <TabIconImage source={ICONS[route.name]} size={24} />
              </PlainTabButton>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="give" />
      <Tabs.Screen name="activity" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}