// Brand palette — from the Blessing design spec
export const Colors = {
  background: {
    white: "#FFFFFF",
    cloud: "#F7FCFF",
    lightSky: "#E9F8FD",
    softSky: "#CDEFFA",
    sky: "#9EDAF2",
    blue: "#72C2E5",
  },
  brand: {
    green: "#247A59",
    darkGreen: "#176044",
  },
  text: {
    primary: "#164238",
    // NOTE: secondary/muted are not in the spec — adjust to taste
    secondary: "#4B6B62",
    muted: "#8AA69C",
  },
  accent: {
    gold: "#E9B83F",
  },
  status: {
    available: "#247A59",
    reserved: "#E9B83F",
    completed: "#176044",
    expired: "#9CA3AF",
    cancelled: "#9CA3AF",
    reported: "#DC2626",
  },
  semantic: {
    success: "#247A59",
    warning: "#E9B83F",
    error: "#DC2626",
    info: "#72C2E5",
  },
} as const;

// Ordered stops for the radial background gradient
export const BACKGROUND_GRADIENT = [
  "#FFFFFF",
  "#F7FCFF",
  "#E9F8FD",
  "#CDEFFA",
  "#9EDAF2",
  "#72C2E5",
] as const;