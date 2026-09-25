// Centralized Expo Router paths — avoids typo'd string literals scattered
// through the app when calling router.push()
export const Routes = {
  onboarding: {
    intro: "/",
    welcome: "/welcome",
  },
  auth: {
    login: "/login",
    signup: "/signup",
  },
  tabs: {
    home: "/(tabs)/home",
    explore: "/(tabs)/explore",
    give: "/(tabs)/give",
    activity: "/(tabs)/activity",
    profile: "/(tabs)/profile",
  },
  blessing: {
    details: (id: string) => `/blessing/${id}` as const,
  },
  need: {
    details: (id: string) => `/need/${id}` as const,
  },
} as const;