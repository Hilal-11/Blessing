# 🌱 Blessing

> **What you don't need may be exactly what someone needs.**

Blessing is a mobile-first, location-aware community platform where people can freely give away surplus resources — food, clothes, books, and more — and nearby people can discover, request, and receive them in real time.

It's not a marketplace, a delivery app, or a donation portal. It's a way for unused resources to find the people who actually need them.

---

## 💡 The idea

Every day, usable resources go to waste — a wedding with 50 extra meals, a family with clothes their kids outgrew, a household with books no one reads anymore. At the same time, someone nearby could use exactly that.

The problem isn't that resources don't exist. It's that **the person who has the excess doesn't know who needs it, and the person who needs it doesn't know where the excess is.**

Blessing connects those two sides, in real time, based on location.

---

## ✨ Core concepts

There's no rigid "donor" and "receiver" split — one person can do both.

| Action | What it means |
| --- | --- |
| **Give a Blessing** | Post something you have in excess |
| **Receive** | Claim something someone nearby is giving |
| **Post a Need** | Say what you're looking for |
| **Volunteer** | Help transport items between giver and receiver |

### Categories

🍱 Food · 👕 Clothes · 📚 Books · 🧸 Toys · 🪑 Furniture · 🏠 Household items · 🎒 School supplies · 💻 Electronics · 🍼 Baby supplies · 🛏️ Bedding · 🌱 Plants

The initial focus is **food + everyday reusable items**, with the architecture built to support more categories over time.

---

## 🎯 Design philosophy

Blessing should never feel like Zomato, Swiggy, Uber, Amazon, or OLX. There's no price, cart, checkout, or delivery fee — just giving, receiving, and community.

It should feel:

- Warm, human, and optimistic
- Trustworthy and dignified for both givers and receivers
- Simple enough to understand a listing in 5 seconds

**Visual language:** bright sky gradients, soft clouds, rounded cards, generous spacing — nature and warmth, not a corporate dashboard.

```
Primary gradient (center → edge):
#FFFFFF → #F7FCFF → #E9F8FD → #CDEFFA → #9EDAF2 → #72C2E5

Brand colors:
Blessing Green   #247A59
Dark Green       #176044
Text             #164238
Accent (gold)    #E9B83F
```

---

## 🔁 Core product loops

**Giving:**

```
Have excess → Create Blessing → Add photos, details, location
  → Publish → Nearby users discover it → Someone requests it
  → Pickup confirmed → Handover → Completed → Impact recorded
```

**Needing:**

```
Need something → Create Need → Nearby people/orgs see it
  → Someone responds → Resource provided → Need fulfilled
```

---

## 📱 App structure

**Bottom navigation:** Home · Explore · Give · Activity · Profile

- **Home** — nearby Blessings, personalized to your area
- **Explore** — browse Blessings and Needs by category, plus a live map
- **Give** — guided flow to post a Blessing (category → details → photos → location → availability → publish)
- **Activity** — your claims, requests, and messages
- **Profile** — identity, impact stats, verification, settings

### Blessing status lifecycle

```
DRAFT → PUBLISHED → AVAILABLE → RESERVED → CLAIMED → PICKED_UP → COMPLETED
                        ↓
                 EXPIRED / CANCELLED / REPORTED
```

---

## 🏗️ Tech stack

**Mobile app**

- React Native + Expo (SDK 57) + TypeScript
- Expo Router
- NativeWind (Tailwind for React Native)
- Zustand for local state, TanStack React Query for server state
- React Native Reanimated + Gesture Handler for motion

**Backend**

- Supabase — Postgres + **PostGIS** (location-aware "nearby" queries), Auth, Storage, and Realtime
- Postgres functions + Row Level Security for core rules (claim limits, status transitions)
- Supabase Edge Functions for logic that needs external calls (push notifications, matching)

**Auth**

- Phone (OTP), Email, Google — via Supabase Auth

**Notifications**

- Expo Notifications / FCM / APNs

**Images**

- Supabase Storage, with compression before upload

---

## 🗺️ Key features

- **Live map** of nearby Blessings and Needs, with category markers
- **Smart expiration** for food (best-before timers, auto-removal from discovery)
- **Claim system** that prevents over-claiming (server-enforced, not client-side)
- **In-app messaging**, unlocked only after a request is accepted
- **Impact tracking** — meals shared, items reused, people helped — instead of money-based metrics
- **Trust signals** — phone/email verification, completed Blessings, no public exposure of exact home addresses
- **Reporting & moderation** for unsafe, misleading, or spam listings

---

## 🚧 Roadmap

**MVP**

- [x] Onboarding
- [ ] Authentication
- [ ] Home feed (nearby Blessings)
- [ ] Blessing details screen
- [ ] Create Blessing flow
- [ ] Categories & photos
- [ ] Location & PostGIS nearby queries
- [ ] Claim / Receive flow
- [ ] Basic messaging
- [ ] Notifications
- [ ] Profile & Activity
- [ ] Basic reporting

**Phase 2**

- [ ] Needs system & matching
- [ ] Live community map
- [ ] Full realtime feed
- [ ] Impact dashboard
- [ ] Organization accounts

**Phase 3**

- [ ] Volunteer delivery network
- [ ] Event Mode (pre-register expected surplus from weddings/events)
- [ ] Recurring giving (bakeries, hostels, messes)
- [ ] Advanced moderation & admin dashboard

---

## 🔒 Safety & trust

Because food and physical items are involved:

- Food listings require prep time, best-before time, veg/non-veg/Jain tags, and storage info
- Exact addresses are never shown publicly — only approximate pickup locations
- No-show tracking and rate limiting to prevent abuse
- Clear reporting flow for unsafe, fake, or spam listings

---

## 🧭 One-line pitch

> Blessing is a mobile-first, location-aware community platform where people can freely give away excess food and useful items, while nearby people discover, request, and receive them in real time — turning what would go to waste into what someone else needs.

---

## 📄 License

_TBD_
