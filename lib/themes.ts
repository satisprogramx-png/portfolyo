export const THEMES = [
  "default",
  "web",
  "mobile",
  "brand",
  "ai",
  "motion",
] as const;

export type Theme = (typeof THEMES)[number];

export const CATEGORIES = ["web", "mobile", "brand", "ai", "motion"] as const;

export type Category = (typeof CATEGORIES)[number];

export function isTheme(value: string): value is Theme {
  return (THEMES as readonly string[]).includes(value);
}
