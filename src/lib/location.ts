import { supabase } from "@/lib/supabase";
import * as Location from "expo-location";
import { Platform } from "react-native";

// Checks location permission, requests it if not yet decided, and — only if
// granted — reads the current position and writes it to the user's row in
// public.users. Designed to be called fire-and-forget from a screen's
// mount: it never throws and never blocks rendering, so a slow GPS fix or
// a "no thanks" from the user never holds up the UI.
export async function ensureLocationSynced() {
  try {
    let { status, canAskAgain } = await Location.getForegroundPermissionsAsync();

    if (status !== "granted" && canAskAgain) {
      // This is the line that actually triggers the native OS prompt.
      const requested = await Location.requestForegroundPermissionsAsync();
      status = requested.status;
    }

    if (status !== "granted") {
      // Denied, or the user already said "don't ask again" — degrade
      // gracefully. Nothing here should trap the user or nag them.
      return;
    }

    // App permission is granted, but the device's system-wide Location
    // Services toggle can still be off — that's a separate thing from
    // per-app permission, and getCurrentPositionAsync() throws
    // "Current location is unavailable" if it is. On Android,
    // enableNetworkProviderAsync() shows the native "Turn on Location?"
    // system dialog right in the app; there's no equivalent on iOS (the
    // user has to go to Settings themselves there), so we just bail out
    // gracefully on iOS if services are off.
    const servicesEnabled = await Location.hasServicesEnabledAsync();
    if (!servicesEnabled) {
      if (Platform.OS === "android") {
        try {
          await Location.enableNetworkProviderAsync();
        } catch {
          // User dismissed the dialog or it's genuinely unavailable —
          // nothing more we can do here.
          return;
        }
      } else {
        return;
      }
    }

    let coords;
    try {
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      coords = position.coords;
    } catch (freshFixError) {
      // A fresh fix can genuinely fail (weak signal, or — very commonly —
      // an emulator with no GPS ever set). A cached last-known position is
      // better than nothing; if even that's null, we truly have no data
      // and bail out below.
      const lastKnown = await Location.getLastKnownPositionAsync();
      if (!lastKnown) {
        throw freshFixError;
      }
      coords = lastKnown.coords;
    }

    // Turn the coordinates into a readable place (area / city / state ...)
    // once, here, and store it next to the point — so the UI never has to
    // geocode. The platform geocoder can be unavailable (e.g. an emulator
    // image without Google Play services) or return nothing; that must
    // never block saving the coordinates, so failures just leave the
    // address parts null.
    let area: string | null = null;
    let city: string | null = null;
    let state: string | null = null;
    let country: string | null = null;
    let postalCode: string | null = null;
    try {
      const [place] = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (place) {
        // In India the useful neighbourhood name usually lands in
        // `district`; `city` is sometimes empty, with the city name in
        // `subregion` instead.
        area = place.district ?? place.street ?? null;
        city = place.city ?? place.subregion ?? null;
        state = place.region ?? null;
        country = place.country ?? null;
        postalCode = place.postalCode ?? null;
      }
    } catch (geocodeError) {
      if (__DEV__) {
        console.warn("[location] reverse geocoding failed:", geocodeError);
      }
    }

    // users.last_location is a PostGIS geography column — writing it from
    // the client goes through an RPC that does the ST_MakePoint(...)
    // conversion server-side (see supabase/add-location-address.sql),
    // rather than a plain .update() with raw lat/lng numbers.
    const { error } = await supabase.rpc("update_last_location", {
      lat: coords.latitude,
      lng: coords.longitude,
      area,
      city,
      state,
      country,
      postal_code: postalCode,
    });

    if (error && __DEV__) {
      console.warn("[location] update_last_location RPC failed:", error);
    }
  } catch (e) {
    if (__DEV__) {
      console.warn("[location] ensureLocationSynced failed:", e);
    }
    // Swallow — a failed location sync should never break Home.
  }
}