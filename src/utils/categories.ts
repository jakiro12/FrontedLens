export const CATEGORIES = ["Todas", "Web", "Mobile", "Web + Mobile"] as const;
export type Category = typeof CATEGORIES[number];

export const CATEGORY_TAG_MAP: Record<Exclude<Category, "Todas">, string[]> = {
  Web: ["react", "vue", "angular", "next.js", "svelte", "javascript", "frontend"],
  Mobile: ["react native", "flutter", "swift", "kotlin", "ionic", "android", "ios"],
  "Web + Mobile": ["react", "react native", "angular", "ionic", "flutter", "vue"]
};