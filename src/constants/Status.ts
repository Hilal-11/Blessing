// Blessing lifecycle state machine
export const BlessingStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  AVAILABLE: "AVAILABLE",
  RESERVED: "RESERVED",
  CLAIMED: "CLAIMED",
  PICKED_UP: "PICKED_UP",
  COMPLETED: "COMPLETED",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
  REPORTED: "REPORTED",
} as const;

export type BlessingStatusType = keyof typeof BlessingStatus;

export const BLESSING_STATUS_LABELS: Record<BlessingStatusType, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  AVAILABLE: "Available",
  RESERVED: "Reserved",
  CLAIMED: "Claimed",
  PICKED_UP: "Picked up",
  COMPLETED: "Completed",
  EXPIRED: "Expired",
  CANCELLED: "Cancelled",
  REPORTED: "Reported",
};

// Valid forward transitions — mirror this in a Postgres check/trigger too,
// don't rely on the client alone to enforce it.
export const BLESSING_STATUS_TRANSITIONS: Record<BlessingStatusType, BlessingStatusType[]> = {
  DRAFT: ["PUBLISHED", "CANCELLED"],
  PUBLISHED: ["AVAILABLE", "CANCELLED"],
  AVAILABLE: ["RESERVED", "EXPIRED", "CANCELLED", "REPORTED"],
  RESERVED: ["CLAIMED", "AVAILABLE", "CANCELLED", "REPORTED"],
  CLAIMED: ["PICKED_UP", "CANCELLED", "REPORTED"],
  PICKED_UP: ["COMPLETED", "REPORTED"],
  COMPLETED: [],
  EXPIRED: [],
  CANCELLED: [],
  REPORTED: [],
};

export const ReportReasons = [
  { value: "unsafe_food", label: "Unsafe food" },
  { value: "misleading_listing", label: "Misleading listing" },
  { value: "spam", label: "Spam" },
  { value: "scam", label: "Scam" },
  { value: "harassment", label: "Harassment" },
  { value: "illegal_item", label: "Illegal item" },
  { value: "inappropriate_content", label: "Inappropriate content" },
  { value: "fake_account", label: "Fake account" },
] as const;