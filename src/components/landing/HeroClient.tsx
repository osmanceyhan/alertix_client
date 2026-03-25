"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe } from "lucide-react";
import { I18nProvider, useI18n } from "@/i18n/context";

const Scene3D = dynamic(() => import("@/components/landing/Scene3D"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10" />,
});

export function HeroBackground() {
  return (
    <>
      <Scene3D />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B] pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none z-[1]" />
    </>
  );
}

export function ParallaxWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-16">
      <HeroBackground />
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {children}
      </motion.div>
    </section>
  );
}

export function FadeInView({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LangSwitcher() {
  return (
    <I18nProvider>
      <LangButton />
    </I18nProvider>
  );
}

function LangButton() {
  const { locale, setLocale } = useI18n();
  return (
    <button
      onClick={() => setLocale(locale === "tr" ? "en" : "tr")}
      className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition"
      aria-label="Dil değiştir / Change language"
    >
      <Globe className="w-3.5 h-3.5" />
      {locale === "tr" ? "EN" : "TR"}
    </button>
  );
}
