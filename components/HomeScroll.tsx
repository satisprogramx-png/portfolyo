"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { type Theme } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";
import { BrowserFrame } from "./showcase";

/* Bölüm görünüme girince tüm site temasını o kategoriye morph eder */
function useThemeOnView(theme: Theme) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const { setTheme } = useTheme();

  useEffect(() => {
    if (inView) setTheme(theme);
  }, [inView, theme, setTheme]);

  return ref;
}

const inViewReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

function HeroSection() {
  const t = useTranslations("hero");
  const ref = useThemeOnView("default");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.95]);

  return (
    <section ref={ref} className="relative h-[130vh]">
      <motion.div
        style={{ opacity, scale }}
        className="sticky top-0 flex h-dvh flex-col items-center justify-center px-4 text-center sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-sm text-muted backdrop-blur"
        >
          <span className="pulse-dot inline-block size-2 rounded-full bg-accent" />
          {t("badge")}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl bg-linear-to-br from-fg via-fg to-accent bg-clip-text text-5xl leading-[1.08] font-bold tracking-tight text-transparent sm:text-7xl"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 max-w-xl text-base text-muted sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="absolute bottom-10 text-sm text-muted"
        >
          {t("scrollHint")} ↓
        </motion.p>
      </motion.div>
    </section>
  );
}

function SectionHeader({
  index,
  title,
  tagline,
}: {
  index: number;
  title: string;
  tagline: string;
}) {
  return (
    <div className="text-center">
      <motion.p
        {...inViewReveal}
        className="text-sm font-semibold tracking-[0.35em] text-accent uppercase"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.p>
      <motion.h2
        {...inViewReveal}
        className="mt-5 bg-linear-to-b from-fg to-accent bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-8xl"
      >
        {title}
      </motion.h2>
      <motion.p
        {...inViewReveal}
        className="mx-auto mt-6 max-w-md text-lg text-muted sm:text-xl"
      >
        {tagline}
      </motion.p>
    </div>
  );
}

/* Gerçek proje: büyük slogan + mockup görseli, sırayla sağlı sollu */
function ProjectFeature({
  name,
  slogan,
  desc,
  features,
  visual,
  flip = false,
}: {
  name: string;
  slogan: string;
  desc: string;
  features: string[];
  visual: ReactNode;
  flip?: boolean;
}) {
  return (
    <div
      className={`mt-20 flex flex-col items-center gap-10 sm:gap-16 ${
        flip ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      <motion.div
        {...inViewReveal}
        className={`flex-1 text-center ${flip ? "sm:text-right" : "sm:text-left"}`}
      >
        <p className="text-sm font-semibold tracking-[0.25em] text-accent uppercase">
          {name}
        </p>
        <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {slogan}
        </h3>
        <p className="mt-5 text-lg leading-relaxed text-muted">{desc}</p>
        <div
          className={`mt-6 flex flex-wrap gap-2 justify-center ${
            flip ? "sm:justify-end" : "sm:justify-start"
          }`}
        >
          {features.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-muted backdrop-blur"
            >
              {feature}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md flex-1"
      >
        {visual}
      </motion.div>
    </div>
  );
}

/* ---- Proje mockup görselleri ---- */

function MindnoteVisual() {
  const t = useTranslations("mindnote");
  return (
    <BrowserFrame url="mindnote.tech">
      <div className="flex text-left text-sm">
        <div className="hidden w-28 shrink-0 border-r border-line/60 p-3 text-xs sm:block">
          <p className="font-medium tracking-wide text-muted uppercase">
            {t("mockupSidebar")}
          </p>
          <ul className="mt-2.5 space-y-1.5">
            <li className="rounded-md bg-accent/15 px-2 py-1 text-accent">
              📁 Product
            </li>
            <li className="px-2 py-1 text-muted">🧠 Research</li>
            <li className="px-2 py-1 text-muted">👥 Team</li>
          </ul>
        </div>
        <div className="flex-1 p-5">
          <p className="font-semibold">📄 {t("mockupNote")}</p>
        <div className="mt-4 space-y-2.5 text-muted">
          <p className="rounded-lg border border-line/60 bg-bg/50 px-3 py-2">
            {t("mockupBlock1")}
          </p>
          <p className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-accent">
            🔗 {t("mockupBlock2")}
          </p>
            <p className="rounded-lg border border-line/60 bg-bg/50 px-3 py-2">
              ✨ {t("mockupBlock3")}
            </p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function DiyetisyenVisual() {
  const t = useTranslations("diyetisyen");
  const tHome = useTranslations("home");
  const stats = [
    { value: "24", labelKey: "statClients" },
    { value: "8", labelKey: "statAppts" },
    { value: "12", labelKey: "statPlans" },
  ] as const;
  return (
    <BrowserFrame url="diyetisyen-paneli">
      <div className="p-5 text-left text-sm">
        <div className="grid grid-cols-3 gap-2.5 text-center">
          {stats.map((stat) => (
            <div
              key={stat.labelKey}
              className="rounded-xl border border-line/60 bg-bg/50 px-2 py-2.5"
            >
              <p className="text-lg font-bold text-accent">{stat.value}</p>
              <p className="text-xs text-muted">{tHome(stat.labelKey)}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-semibold">🗂️ {t("mockupTitle")}</p>
        <div className="mt-3 space-y-2.5 text-muted">
          <p className="rounded-lg border border-line/60 bg-bg/50 px-3 py-2">
            🥗 {t("mockupBlock1")}
          </p>
          <p className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-accent">
            📅 {t("mockupBlock2")}
          </p>
          <p className="rounded-lg border border-line/60 bg-bg/50 px-3 py-2">
            🤸 {t("mockupBlock3")}
          </p>
        </div>
      </div>
    </BrowserFrame>
  );
}

function FizyoterapistVisual() {
  const t = useTranslations("fizyoterapist");
  return (
    <BrowserFrame url="fizyoterapist-paneli">
      <div className="p-5 text-left text-sm">
        <p className="font-semibold">🗂️ {t("mockupTitle")}</p>
        <div className="mt-4 space-y-3 text-muted">
          <p>🏋️ {t("mockupBlock1")}</p>
          <div className="h-2 overflow-hidden rounded-full bg-bg/60">
            <motion.span
              initial={{ width: "10%" }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="block h-full rounded-full bg-accent"
            />
          </div>
          <p className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-accent">
            📈 {t("mockupBlock3")}
          </p>
        </div>
      </div>
    </BrowserFrame>
  );
}

function BimolaVisual() {
  const t = useTranslations("bimola");
  return (
    <BrowserFrame url="bimola.vercel.app">
      <div className="p-5 text-left text-sm">
        <div className="flex flex-wrap gap-1.5 text-xs">
          <span className="rounded-full bg-accent px-2.5 py-0.5 font-medium text-accent-fg">
            {t("mockCat1")}
          </span>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-muted">
            {t("mockCat2")}
          </span>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-muted">
            {t("mockCat3")}
          </span>
        </div>
        <div className="mt-3 rounded-xl border border-line/60 bg-linear-to-br from-accent/20 to-bg/60 p-4">
          <p className="leading-snug font-bold">{t("mockFeatured")}</p>
          <p className="mt-1.5 text-xs text-accent">{t("mockMeta")}</p>
        </div>
        <div className="mt-2.5 flex items-center gap-3 rounded-xl border border-line/60 bg-bg/50 px-3.5 py-2.5 text-muted">
          <span className="size-8 shrink-0 rounded-lg bg-accent/20" />
          <div>
            <p className="text-xs font-medium text-fg">{t("mockPost2")}</p>
            <p className="mt-0.5 text-xs">{t("mockMeta2")}</p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ---- Proje olmayan kategoriler için mockup sunumları ---- */

function PhoneMockup() {
  const t = useTranslations("home");
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto mt-16 w-64 rounded-[2.8rem] border border-line bg-surface/80 p-3 shadow-[0_24px_80px_-24px_var(--accent)] backdrop-blur"
    >
      <div className="rounded-[2.2rem] border border-line/60 bg-bg/60 px-4 pt-3 pb-6">
        <div className="mx-auto h-1.5 w-16 rounded-full bg-line" />
        <p className="mt-5 text-left text-sm font-semibold">
          💪 {t("mobileMockApp")}
        </p>
        <div className="mt-4 space-y-2.5 text-left text-xs text-muted">
          <p className="rounded-xl border border-accent/40 bg-accent/10 px-3 py-2.5 text-accent">
            {t("mobileMock1")}
          </p>
          <p className="rounded-xl border border-line/60 bg-surface/60 px-3 py-2.5">
            👟 {t("mobileMock2")}
          </p>
          <p className="rounded-xl border border-line/60 bg-surface/60 px-3 py-2.5">
            💧 {t("mobileMock3")}
          </p>
        </div>
        <div className="mt-5 flex items-end justify-between gap-1.5">
          {[40, 70, 55, 90, 65, 80, 50].map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 6 }}
              whileInView={{ height: (h / 100) * 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.06 }}
              className="w-full rounded-full bg-accent/60"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BrandBoardMockup() {
  const t = useTranslations("home");
  return (
    <motion.div
      {...inViewReveal}
      className="mx-auto mt-16 grid w-full max-w-lg grid-cols-2 gap-4"
    >
      <div className="flex aspect-square flex-col items-center justify-center rounded-3xl border border-line bg-surface/70 backdrop-blur">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-accent to-accent/40 text-2xl font-bold text-accent-fg">
          A
        </span>
        <p className="mt-4 text-sm text-muted">{t("brandMock1")}</p>
      </div>
      <div className="flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border border-line bg-surface/70 backdrop-blur">
        <div className="flex gap-2">
          <span className="size-8 rounded-full bg-accent" />
          <span className="size-8 rounded-full bg-accent/60" />
          <span className="size-8 rounded-full bg-accent/30" />
        </div>
        <p className="text-sm text-muted">{t("brandMock2")}</p>
      </div>
      <div className="col-span-2 flex items-center justify-between rounded-3xl border border-line bg-surface/70 px-8 py-6 backdrop-blur">
        <p className="bg-linear-to-br from-fg to-accent bg-clip-text text-5xl font-bold text-transparent">
          Aa
        </p>
        <div className="text-right">
          <p className="text-xl font-semibold">{t("brandMockName")}</p>
          <p className="text-sm text-muted">{t("brandMock3")}</p>
        </div>
      </div>
      <div className="col-span-2 flex items-center gap-5 rounded-3xl border border-line bg-surface/70 px-8 py-6 backdrop-blur">
        <div className="h-24 w-40 shrink-0 rounded-xl border border-line/60 bg-linear-to-br from-accent/20 to-bg/60 p-3 text-left">
          <span className="flex size-6 items-center justify-center rounded-md bg-accent text-xs font-bold text-accent-fg">
            A
          </span>
          <span className="mt-2.5 block h-1.5 w-2/3 rounded-full bg-line" />
          <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-line/60" />
        </div>
        <p className="text-sm text-muted">{t("brandMock4")}</p>
      </div>
    </motion.div>
  );
}

function AiChatMockup() {
  const t = useTranslations("home");
  return (
    <motion.div
      {...inViewReveal}
      className="mx-auto mt-16 w-full max-w-md space-y-3 rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur"
    >
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-left text-sm text-accent-fg">
        {t("aiMockQ")}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-bg/60 px-4 py-2.5 text-left text-sm"
      >
        ✨ {t("aiMockA")}
        <span className="mt-2 block w-fit rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
          {t("aiMockSource")}
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
        className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-left text-sm text-accent-fg"
      >
        {t("aiMockQ2")}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-bg/60 px-4 py-2.5 text-left text-sm"
      >
        ✨ {t("aiMockA2")}
      </motion.div>
    </motion.div>
  );
}

function EkiciVideoVisual() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface/80 shadow-[0_24px_80px_-24px_var(--accent)] backdrop-blur">
      <div className="pointer-events-none aspect-video">
        <iframe
          src="https://player.vimeo.com/video/1200880545?background=1&autoplay=1&loop=1&muted=1&app_id=58479"
          className="h-full w-full"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Ekici Residence"
        />
      </div>
    </div>
  );
}

/* ---- Bölümler ---- */

function WebSection({ index }: { index: number }) {
  const tCat = useTranslations("categories");
  const tHome = useTranslations("home");
  const ref = useThemeOnView("web");

  return (
    <section ref={ref} className="mx-auto max-w-5xl px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeader
        index={index}
        title={tCat("web")}
        tagline={tHome("webTagline")}
      />
      <ProjectFeature
        name={tHome("webShowcase1Name")}
        slogan={tHome("webShowcase1Slogan")}
        desc={tHome("webShowcase1Desc")}
        features={[
          tHome("webShowcase1F1"),
          tHome("webShowcase1F2"),
          tHome("webShowcase1F3"),
        ]}
        visual={<MindnoteVisual />}
      />
      <ProjectFeature
        name={tHome("webShowcase2Name")}
        slogan={tHome("webShowcase2Slogan")}
        desc={tHome("webShowcase2Desc")}
        features={[
          tHome("webShowcase2F1"),
          tHome("webShowcase2F2"),
          tHome("webShowcase2F3"),
        ]}
        visual={<DiyetisyenVisual />}
        flip
      />
      <ProjectFeature
        name={tHome("webShowcase3Name")}
        slogan={tHome("webShowcase3Slogan")}
        desc={tHome("webShowcase3Desc")}
        features={[
          tHome("webShowcase3F1"),
          tHome("webShowcase3F2"),
          tHome("webShowcase3F3"),
        ]}
        visual={<FizyoterapistVisual />}
      />
    </section>
  );
}

function WebsiteSection({ index }: { index: number }) {
  const tCat = useTranslations("categories");
  const tHome = useTranslations("home");
  const ref = useThemeOnView("motion");

  return (
    <section ref={ref} className="mx-auto max-w-5xl px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeader
        index={index}
        title={tCat("motion")}
        tagline={tHome("motionTagline")}
      />
      <ProjectFeature
        name={tHome("motionShowcase1Name")}
        slogan={tHome("motionShowcase1Slogan")}
        desc={tHome("motionShowcase1Desc")}
        features={[
          tHome("motionShowcase1F1"),
          tHome("motionShowcase1F2"),
          tHome("motionShowcase1F3"),
        ]}
        visual={<BimolaVisual />}
        flip
      />
    </section>
  );
}

function MockupSection({
  index,
  theme,
  title,
  tagline,
  children,
}: {
  index: number;
  theme: Theme;
  title: string;
  tagline: string;
  children: ReactNode;
}) {
  const ref = useThemeOnView(theme);

  return (
    <section
      ref={ref}
      className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-4 py-28 sm:px-6"
    >
      <SectionHeader index={index} title={title} tagline={tagline} />
      {children}
    </section>
  );
}

function OutroSection() {
  const t = useTranslations("home");
  const ref = useThemeOnView("default");

  return (
    <section
      ref={ref}
      className="flex min-h-dvh flex-col items-center justify-center px-4 text-center sm:px-6"
    >
      <motion.h2
        {...inViewReveal}
        className="bg-linear-to-br from-fg to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-7xl"
      >
        {t("outroTitle")}
      </motion.h2>
      <motion.p {...inViewReveal} className="mt-6 max-w-md text-muted sm:text-lg">
        {t("outroBody")}
      </motion.p>
      <motion.div
        {...inViewReveal}
        className="mt-10 flex items-center gap-8 text-lg font-medium"
      >
        <Link
          href="/work"
          className="group text-accent underline-offset-8 hover:underline"
        >
          {t("outroWork")}
          <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href="/contact"
          className="group underline-offset-8 hover:text-accent hover:underline"
        >
          {t("outroContact")}
          <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </section>
  );
}

export function HomeScroll() {
  const tCat = useTranslations("categories");
  const tHome = useTranslations("home");

  return (
    <div>
      <HeroSection />
      <WebSection index={0} />
      <MockupSection
        index={1}
        theme="mobile"
        title={tCat("mobile")}
        tagline={tHome("mobileTagline")}
      >
        <PhoneMockup />
      </MockupSection>
      <MockupSection
        index={2}
        theme="brand"
        title={tCat("brand")}
        tagline={tHome("brandTagline")}
      >
        <BrandBoardMockup />
      </MockupSection>
      <MockupSection
        index={3}
        theme="ai"
        title={tCat("ai")}
        tagline={tHome("aiTagline")}
      >
        <AiChatMockup />
        <ProjectFeature
          name={tHome("aiShowcase1Name")}
          slogan={tHome("aiShowcase1Slogan")}
          desc={tHome("aiShowcase1Desc")}
          features={[
            tHome("aiShowcase1F1"),
            tHome("aiShowcase1F2"),
            tHome("aiShowcase1F3"),
          ]}
          visual={<EkiciVideoVisual />}
          flip
        />
      </MockupSection>
      <WebsiteSection index={4} />
      <OutroSection />
    </div>
  );
}
