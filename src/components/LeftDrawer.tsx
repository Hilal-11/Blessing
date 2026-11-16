import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
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

// The columns of public.users the drawer header actually needs.
type UserProfile = {
  full_name: string;
  username: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  is_verified: boolean;
  trust_score: number;
  given_count: number;
  received_count: number;
  helped_count: number;
  created_at: string;
  last_area: string | null;
  last_city: string | null;
  last_state: string | null;
  last_country: string | null;
  last_postal_code: string | null;
  last_location_at: string | null;
};

const PROFILE_COLUMNS =
  'full_name, username, email, phone, avatar_url, bio, is_verified, trust_score, given_count, received_count, helped_count, created_at, last_area, last_city, last_state, last_country, last_postal_code, last_location_at';

// "just now" / "12m ago" / "3h ago" / "2d ago"
function timeAgo(iso: string | null | undefined) {
  if (!iso) return null;
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function LeftDrawer({ isOpen, onClose }: LeftDrawerProps) {
  const translateX = useRef(new Animated.Value(-width)).current;
  const router = useRouter();
  // Which footer action is currently running — disables both buttons so a
  // second tap can't start another request mid-flight.
  const [busy, setBusy] = useState<'logout' | 'delete' | null>(null);

  // ---------- Open / close animation ----------
  // The Modal has to stay mounted until the slide-out has finished —
  // flipping `visible` to false the instant isOpen changes would make the
  // drawer vanish with no closing animation at all.
  const [mounted, setMounted] = useState(isOpen);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const animateTo = (toValue: number, onDone?: () => void) => {
    Animated.spring(translateX, {
      toValue,
      useNativeDriver: true,
      stiffness: 260,
      damping: 28,
      mass: 1,
      // Never overshoot past 0 — that would open a gap at the left edge.
      overshootClamping: true,
    }).start(({ finished }) => {
      // `finished` is false when something interrupted this animation
      // (e.g. reopened mid-close), in which case we must NOT unmount.
      if (finished) onDone?.();
    });
  };

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Wait a frame so the Modal content exists before animating it in.
      const id = requestAnimationFrame(() => animateTo(0));
      return () => cancelAnimationFrame(id);
    }
    if (mounted) {
      animateTo(-width, () => setMounted(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Dim the screen behind the panel while it slides, so there's a sense
  // of depth instead of a flat white wipe.
  const backdropOpacity = translateX.interpolate({
    inputRange: [-width, 0],
    outputRange: [0, 0.4],
    extrapolate: 'clamp',
  });

  // ---------- Swipe left to close ----------
  // The panel follows the finger. On release it closes if dragged far
  // enough (or flicked), otherwise springs back open.
  const panResponder = useRef(
    PanResponder.create({
      // Only claim clearly horizontal, leftward drags — vertical scrolling
      // of the menu and plain taps are left alone.
      onMoveShouldSetPanResponder: (_, g) =>
        g.dx < -12 && Math.abs(g.dx) > Math.abs(g.dy) * 1.5,
      onPanResponderGrant: () => translateX.stopAnimation(),
      onPanResponderMove: (_, g) => translateX.setValue(Math.min(0, g.dx)),
      onPanResponderRelease: (_, g) => {
        if (g.dx < -width * 0.3 || g.vx < -0.6) {
          animateTo(-width, () => onCloseRef.current());
        } else {
          animateTo(0);
        }
      },
      onPanResponderTerminate: () => animateTo(0),
    })
  ).current;

  // ---------- Header data (public.users) ----------
  const [profile, setProfile] = useState<UserProfile | null>(null);
  // Basics from the auth session, shown instantly (and kept as the
  // fallback if there's no public.users row yet or the query fails) so
  // the header is never blank.
  const [authFallback, setAuthFallback] = useState<{ name: string | null; contact: string | null }>({
    name: null,
    contact: null,
  });

  useEffect(() => {
    // Refetch every time the drawer opens so the counts stay fresh.
    if (!isOpen) return;
    let cancelled = false;

    const loadProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const authUser = session?.user;
        if (!authUser || cancelled) return;

        setAuthFallback({
          name: authUser.user_metadata?.full_name ?? authUser.user_metadata?.name ?? null,
          contact: authUser.email ?? authUser.phone ?? null,
        });

        // users.id is NOT the auth id — the link is users.auth_id.
        const { data, error } = await supabase
          .from('users')
          .select(PROFILE_COLUMNS)
          .eq('auth_id', authUser.id)
          .maybeSingle();

        if (error) throw error;
        if (!cancelled && data) setProfile(data as UserProfile);
      } catch (e) {
        if (__DEV__) console.warn('[drawer] failed to load profile:', e);
        // Keep whatever we already have — the header falls back to the
        // auth-session basics.
      }
    };

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const displayName = profile?.full_name ?? authFallback.name ?? 'Welcome';
  const contactLine = profile?.email ?? profile?.phone ?? authFallback.contact;
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null;
  const handleLine = [
    profile?.username ? `@${profile.username}` : null,
    memberSince ? `Joined ${memberSince}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  // Show an en dash until the real numbers arrive, rather than a
  // misleading 0.
  const stat = (n?: number) => (profile ? String(n ?? 0) : '–');
  const stats = [
    { label: 'Trust', value: stat(profile?.trust_score) },
    { label: 'Given', value: stat(profile?.given_count) },
    { label: 'Received', value: stat(profile?.received_count) },
    { label: 'Helped', value: stat(profile?.helped_count) },
  ];

  // Location card: "Area, City" as the headline, "State, Country · PIN" as
  // the subline.
  const areaCity = [profile?.last_area, profile?.last_city].filter(Boolean).join(', ');
  const stateCountry = [profile?.last_state, profile?.last_country].filter(Boolean).join(', ');
  const stateLine = [stateCountry, profile?.last_postal_code].filter(Boolean).join(' · ');
  const locationMain = areaCity || stateLine;
  const locationSub = areaCity ? stateLine : '';
  const hasPlace = Boolean(locationMain);
  const hasSavedPoint = Boolean(profile?.last_location_at);
  const locationUpdated = timeAgo(profile?.last_location_at);

  // Clears the cached Google account too, so the next "Continue with
  // Google" shows the account picker instead of silently reusing this one.
  // Wrapped because it throws if the user never signed in with Google.
  const clearGoogleSession = async (revoke: boolean) => {
    try {
      if (revoke) await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch {
      // Not a Google user, or already signed out — nothing to clear.
    }
  };

  const performLogout = async () => {
    setBusy('logout');
    try {
      await clearGoogleSession(false);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onClose();
      router.replace('/(onboarding)');
    } catch {
      Alert.alert('Logout failed', 'Something went wrong. Please check your connection and try again.');
    } finally {
      setBusy(null);
    }
  };

  const performDelete = async () => {
    setBusy('delete');
    try {
      // Server-side function deletes the auth user (and, via cascade, the
      // public.users row) — see supabase/delete-my-account.sql.
      const { error } = await supabase.rpc('delete_my_account');
      if (error) throw error;

      await clearGoogleSession(true);
      // The account no longer exists server-side, so only clear the local
      // session — a global sign-out would just 401/404.
      await supabase.auth.signOut({ scope: 'local' });
      onClose();
      router.replace('/(onboarding)');
    } catch {
      Alert.alert(
        "Couldn't delete account",
        'Something went wrong and your account was not deleted. Please try again.'
      );
    } finally {
      setBusy(null);
    }
  };

  const confirmLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', onPress: performLogout },
    ]);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete account?',
      'This permanently deletes your account and all your data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: performDelete },
      ]
    );
  };

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Transparent root: the screen underneath stays visible (and dims)
          while the panel slides over it. */}
      <View style={{ flex: 1 }}>
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { backgroundColor: '#000000', opacity: backdropOpacity }]}
        />

        <Animated.View
          {...panResponder.panHandlers}
          style={{
            width,
            height,
            transform: [{ translateX }],
            backgroundColor: '#ffffff',
            shadowColor: '#000000',
            shadowOffset: { width: 4, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 16,
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View className="relative flex-row w-full justify-between items-center px-6 border-b border-neutral-300 pb-5">
              <View className="w-full py-5 pb-3 h-auto">
                {/* Avatar + identity */}
                <View className="flex-row items-center">
                  <Image
                    source={
                      profile?.avatar_url
                        ? { uri: profile.avatar_url }
                        : require("@/assets/images/user.png")
                    }
                    contentFit="cover"
                    style={{ width: 72, height: 72, borderRadius: 100 }}
                    className="rounded-full"
                  />
                  <View className="ml-4 flex-1 pr-10">
                    <View className="flex-row items-center">
                      <Text
                        numberOfLines={1}
                        className="flex-shrink font-sans font-bold text-[26px]"
                      >
                        {displayName}
                      </Text>
                      {profile?.is_verified ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#000000"
                          style={{ marginLeft: 6 }}
                        />
                      ) : null}
                    </View>
                    {handleLine ? (
                      <Text
                        numberOfLines={1}
                        className="mt-0.5 font-sans font-semibold text-[14px] text-neutral-700"
                      >
                        {handleLine}
                      </Text>
                    ) : null}
                    {contactLine ? (
                      <Text
                        numberOfLines={1}
                        className="mt-0.5 font-sans font-medium text-[14px] text-neutral-500"
                      >
                        {contactLine}
                      </Text>
                    ) : null}
                  </View>
                </View>

                {profile?.bio ? (
                  <Text
                    numberOfLines={2}
                    className="mt-3 font-sans text-[14px] leading-5 text-neutral-600"
                  >
                    {profile.bio}
                  </Text>
                ) : null}

                {/* Location card */}
                {profile ? (
                  <View className="mt-3 flex-row items-center rounded-2xl bg-neutral-50 border border-neutral-200 px-3 py-3">
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-black">
                      <Ionicons
                        name={hasPlace || hasSavedPoint ? 'location-sharp' : 'location-outline'}
                        size={20}
                        color="#ffffff"
                      />
                    </View>
                    <View className="ml-3 flex-1">
                      {hasPlace ? (
                        <>
                          <Text
                            numberOfLines={1}
                            className="font-sans font-semibold text-[15px] text-black"
                          >
                            {locationMain}
                          </Text>
                          {locationSub ? (
                            <Text
                              numberOfLines={1}
                              className="mt-0.5 font-sans text-[13px] text-neutral-500"
                            >
                              {locationSub}
                            </Text>
                          ) : null}
                        </>
                      ) : hasSavedPoint ? (
                        <>
                          <Text className="font-sans font-semibold text-[15px] text-black">
                            Location saved
                          </Text>
                          <Text className="mt-0.5 font-sans text-[13px] text-neutral-500">
                            Place name unavailable on this device
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text className="font-sans font-semibold text-[15px] text-black">
                            Location not shared yet
                          </Text>
                          <Text className="mt-0.5 font-sans text-[13px] text-neutral-500">
                            Allow location access to see your area here
                          </Text>
                        </>
                      )}
                    </View>
                    {locationUpdated ? (
                      <Text className="ml-2 font-sans text-[12px] text-neutral-400">
                        {locationUpdated}
                      </Text>
                    ) : null}
                  </View>
                ) : null}

                {/* Stats */}
                <View className="mt-3 flex-row rounded-2xl bg-neutral-50 border border-neutral-200 py-3">
                  {stats.map((s, i) => (
                    <View
                      key={s.label}
                      className={`flex-1 items-center ${i > 0 ? 'border-l border-neutral-200' : ''}`}
                    >
                      <Text className="font-sans text-[20px] font-bold text-black">
                        {s.value}
                      </Text>
                      <Text className="mt-0.5 font-sans text-[12px] font-medium text-neutral-500">
                        {s.label}
                      </Text>
                    </View>
                  ))}
                </View>
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

            {/* ---------- Footer: Log out + Delete account ---------- */}
            <View className="px-6 pt-4 pb-4 gap-3">
              <TouchableOpacity
                onPress={confirmLogout}
                disabled={busy !== null}
                activeOpacity={0.8}
                className="w-full h-14 flex-row items-center justify-center rounded-full bg-white border border-neutral-200"
                style={{
                  opacity: busy === 'delete' ? 0.5 : 1,
                  shadowColor: '#0F172A',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  elevation: 0.5,
                }}
              >
                {busy === 'logout' ? (
                  <ActivityIndicator size="small" color="#171717" />
                ) : (
                  <>
                    <Ionicons name="log-out-outline" size={22} color="#000000" />
                    <Text className="ml-3 text-[17px] font-semibold text-black">
                      Log out
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmDelete}
                disabled={busy !== null}
                activeOpacity={0.8}
                className="w-full h-14 flex-row items-center justify-center rounded-full bg-red-50 border border-red-200"
                style={{
                  opacity: busy === 'logout' ? 0.5 : 1,
                  shadowColor: '#DC2626',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.18,
                  shadowRadius: 1,
                  elevation: 0.5,
                }}
              >
                {busy === 'delete' ? (
                  <ActivityIndicator size="small" color="#DC2626" />
                ) : (
                  <>
                    <Ionicons name="trash-outline" size={22} color="#DC2626" />
                    <Text className="ml-3 text-[17px] font-semibold text-red-600">
                      Delete account
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}