import type { LucideIcon } from "lucide-react-native";
import {
  Utensils,
  Shirt,
  BookOpen,
  ToyBrick,
  Armchair,
  Home,
  Backpack,
  Laptop,
  Baby,
  BedDouble,
  Sprout,
  Package,
} from "lucide-react-native";

export type CategorySlug =
  | "food"
  | "clothes"
  | "books"
  | "toys"
  | "furniture"
  | "household"
  | "school_supplies"
  | "electronics"
  | "baby_supplies"
  | "bedding"
  | "plants"
  | "other";

export interface Category {
  slug: CategorySlug;
  label: string;
  icon: LucideIcon;
  emoji: string;
  /** Whether this category ships in the MVP */
  isMvp: boolean;
}

export const CATEGORIES: Category[] = [
  { slug: "food", label: "Food", icon: Utensils, emoji: "🍱", isMvp: true },
  { slug: "clothes", label: "Clothes", icon: Shirt, emoji: "👕", isMvp: true },
  { slug: "books", label: "Books", icon: BookOpen, emoji: "📚", isMvp: true },
  { slug: "household", label: "Household", icon: Home, emoji: "🏠", isMvp: true },
  { slug: "other", label: "Other", icon: Package, emoji: "📦", isMvp: true },
  { slug: "toys", label: "Toys", icon: ToyBrick, emoji: "🧸", isMvp: false },
  { slug: "furniture", label: "Furniture", icon: Armchair, emoji: "🪑", isMvp: false },
  { slug: "school_supplies", label: "School supplies", icon: Backpack, emoji: "🎒", isMvp: false },
  { slug: "electronics", label: "Electronics", icon: Laptop, emoji: "💻", isMvp: false },
  { slug: "baby_supplies", label: "Baby supplies", icon: Baby, emoji: "🍼", isMvp: false },
  { slug: "bedding", label: "Bedding", icon: BedDouble, emoji: "🛏️", isMvp: false },
  { slug: "plants", label: "Plants", icon: Sprout, emoji: "🌱", isMvp: false },
];

export const MVP_CATEGORIES = CATEGORIES.filter((c) => c.isMvp);

export function getCategory(slug: CategorySlug): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}