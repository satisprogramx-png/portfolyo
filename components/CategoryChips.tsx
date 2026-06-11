"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CATEGORIES, type Category, type Theme } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

type Props = {
  selected?: Category | "all";
  onSelect?: (category: Category | "all") => void;
  showAll?: boolean;
};

export function CategoryChips({ selected, onSelect, showAll = false }: Props) {
  const t = useTranslations("categories");
  const { theme, setTheme } = useTheme();

  const handleClick = (category: Category | "all") => {
    setTheme(category === "all" ? "default" : (category as Theme));
    onSelect?.(category);
  };

  const items: Array<Category | "all"> = showAll
    ? ["all", ...CATEGORIES]
    : [...CATEGORIES];

  const isActive = (item: Category | "all") =>
    selected !== undefined
      ? selected === item
      : theme === (item === "all" ? "default" : item);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {items.map((item, i) => (
        <motion.button
          key={item}
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i, duration: 0.4 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick(item)}
          aria-pressed={isActive(item)}
          className={`rounded-full border px-4 py-2 text-sm font-medium sm:px-5 sm:text-base ${
            isActive(item)
              ? "border-accent bg-accent text-accent-fg"
              : "border-line bg-surface text-fg hover:border-accent"
          }`}
        >
          {t(item)}
        </motion.button>
      ))}
    </div>
  );
}
