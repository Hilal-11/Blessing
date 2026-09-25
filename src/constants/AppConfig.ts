export const AppConfig = {
  name: "Blessing",
  defaultSearchRadiusKm: 5,
  maxSearchRadiusKm: 25,
  defaultFoodExpiryHours: 6,
  maxPhotosPerBlessing: 5,
  /** How long a claim holds a "Reserved" status before auto-releasing */
  claimReservationMinutes: 15,
} as const;

// Table names — centralize so a rename doesn't mean hunting through the app
export const SupabaseTables = {
  users: "users",
  blessings: "blessings",
  blessingItems: "blessing_items",
  categories: "categories",
  needs: "needs",
  claims: "claims",
  pickups: "pickups",
  messages: "messages",
  conversations: "conversations",
  notifications: "notifications",
  organizations: "organizations",
  volunteers: "volunteers",
  reports: "reports",
  verifications: "verifications",
} as const;