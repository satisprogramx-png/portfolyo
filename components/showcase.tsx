"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* Apple tarzı tanıtım sayfaları için ortak yapı taşları */

export const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export function ShowcaseHero({
  eyebrow,
  title,
  subtitle,
  scrollHint,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  scrollHint: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);

  return (
    <div ref={ref} className="relative h-[120vh]">
      <motion.section
        style={{ opacity, scale }}
        className="sticky top-0 flex h-dvh flex-col items-center justify-center px-4 text-center sm:px-6"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold tracking-[0.3em] text-accent uppercase"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-4xl bg-linear-to-b from-fg to-fg/60 bg-clip-text text-5xl leading-[1.05] font-bold tracking-tight text-transparent sm:text-8xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-7 max-w-xl text-lg text-muted sm:text-2xl"
        >
          {subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-10 text-sm text-muted"
        >
          {scrollHint} ↓
        </motion.p>
      </motion.section>
    </div>
  );
}

export function MockupSlot({ children }: { children: ReactNode }) {
  return (
    <motion.section
      {...reveal}
      className="mx-auto -mt-[20vh] max-w-4xl px-4 sm:px-6"
    >
      {children}
    </motion.section>
  );
}

export function Statement({ title, body }: { title: string; body: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-36">
      <motion.h2
        {...reveal}
        className="bg-linear-to-br from-fg to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl"
      >
        {title}
      </motion.h2>
      <motion.p {...reveal} className="mt-7 text-lg text-muted sm:text-xl">
        {body}
      </motion.p>
    </section>
  );
}

export function SplitStatement({
  emoji,
  title,
  body,
  flip = false,
}: {
  emoji: string;
  title: string;
  body: string;
  flip?: boolean;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <div
        className={`flex flex-col items-center gap-10 sm:gap-16 ${
          flip ? "sm:flex-row-reverse" : "sm:flex-row"
        }`}
      >
        <motion.div
          {...reveal}
          className="flex size-36 shrink-0 items-center justify-center rounded-[2.5rem] border border-line bg-linear-to-br from-accent/25 to-surface text-6xl shadow-[0_16px_64px_-24px_var(--accent)] backdrop-blur sm:size-48 sm:text-7xl"
        >
          {emoji}
        </motion.div>
        <div
          className={`text-center ${flip ? "sm:text-right" : "sm:text-left"}`}
        >
          <motion.h2
            {...reveal}
            className="text-3xl font-bold tracking-tight sm:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            {...reveal}
            className="mt-5 text-lg leading-relaxed text-muted"
          >
            {body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export function BrowserFrame({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface/80 shadow-[0_24px_80px_-24px_var(--accent)] backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-line/60 px-5 py-3.5">
        <span className="size-3 rounded-full bg-line" />
        <span className="size-3 rounded-full bg-line" />
        <span className="size-3 rounded-full bg-line" />
        <span className="ml-3 text-xs text-muted">{url}</span>
      </div>
      {children}
    </div>
  );
}
