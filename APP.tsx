/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRESET_FISH_SPECIES } from "./types";
import { Language, translations } from "./utils/i18n";
import AdBanner, { ShopAd } from "./components/AdBanner";
import BreederTools from "./components/BreederTools";
import ShopSubscriptions from "./components/ShopSubscriptions";

import FishCatalog from "./components/FishCatalog";
import BreedingGuide from "./components/BreedingGuide";
import GeneralCare from "./components/GeneralCare";
import AiScanner from "./components/AiScanner";
import TankTracker from "./components/TankTracker";
import DeveloperCard from "./components/DeveloperCard";

import { Sparkles, Heart, Activity, CalendarClock, BookOpen, ShieldCheck, HeartPulse, Globe2 } from "lucide-react";

type TabId = "catalog" | "breeding" | "ai" | "care" | "tracker" | "tools" | "shop";

export default function App() {
  const [lang, setLang] = useState<Language>("ar");
  const [activeTab, setActiveTab] = useState<TabId>("catalog");
  const [userShopAds, setUserShopAds] = useState<ShopAd[]>([]);

  // Localized dictionary index
  const t = translations[lang];

  const tabItems = [
    {
      id: "catalog" as TabId,
      label: t.tabCatalog,
      icon: "🐠",
    },
    {
      id: "breeding" as TabId,
      label: t.tabBreeding,
      icon: "🥚",
    },
    {
      id: "ai" as TabId,
      label: t.tabAi,
      icon: "🤖",
    },
    {
      id: "care" as TabId,
      label: t.tabCare,
      icon: "🏥",
    },
    {
      id: "tracker" as TabId,
      label: t.tabTracker,
      icon: "📅",
    },
    {
      id: "tools" as TabId,
      label: t.tabTools,
      icon: "🛠️",
    },
    {
      id: "shop" as TabId,
      label: t.tabShop,
      icon: "🏪",
    },
  ];

  const handleAdCreated = (newAd: ShopAd) => {
    setUserShopAds((prev) => [newAd, ...prev]);
  };

  const isRtl = lang === "ar";

  return (
    <div
      id="app-root-frame"
      className="min-h-screen bg-blue-50 flex flex-col font-sans transition-all duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Dynamic Header with Vibrant Palette Theme */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-850 to-indigo-900 text-white shadow-xl relative overflow-hidden shrink-0 border-b-4 border-orange-500">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Logo / Title Area with Vibrant Orange Pop */}
          <div className="flex items-center gap-4 text-center md:text-right flex-col md:flex-row">
            <div className="w-14 h-14 rounded-3xl bg-orange-500 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg border border-orange-400/35">
              🐠
            </div>
            <div className="text-center md:text-right">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2 justify-center md:justify-start">
                {t.title} <span className="text-orange-400">{t.subtitle}</span>
              </h1>
              <p className="text-[11px] md:text-xs text-blue-100/90 mt-1.5 leading-relaxed max-w-lg">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Right Column: Controls - Language Toggle and Stats Card */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            
            {/* Custom Multi-Language Selector Dropdown */}
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-2xl border border-white/10 backdrop-blur-md shrink-0 w-full sm:w-auto justify-between">
              <span className="flex items-center gap-1 text-[11px] font-black font-sans text-orange-300 uppercase">
                <Globe2 className="w-4 h-4 text-orange-400 animate-spin" />
                {t.selectLang}:
              </span>
              <select
                id="header-language-selection-dropdown"
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-blue-900/90 text-white font-black text-xs px-3 py-1 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer border border-white/20 hover:bg-orange-500 transition-colors"
              >
                <option value="ar">العربية (Arabic)</option>
                <option value="en">English (English)</option>
                <option value="fr">Français (French)</option>
                <option value="es">Español (Spanish)</option>
                <option value="tr">Türkçe (Turkish)</option>
              </select>
            </div>

            {/* Quick Metrics Header Badge */}
            <div className="flex gap-4 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 backdrop-blur-md w-full sm:w-auto justify-around">
              <div className={`text-center ${isRtl ? "pl-4 border-l" : "pr-4 border-r"} border-white/10`}>
                <span className="block text-[10px] text-orange-300 font-bold">{t.includedSpecies}</span>
                <span className="font-extrabold text-xs md:text-sm text-white">{PRESET_FISH_SPECIES.length} {lang === "ar" ? "فصائل مفصلة" : "Breeds"}</span>
              </div>
              <div className="text-center pr-1">
                <span className="block text-[10px] text-orange-300 font-bold">{t.embeddedTools}</span>
                <span className="font-extrabold text-xs md:text-sm text-white">{t.instantRecognition}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Waves effect at header bottom */}
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-blue-500 to-orange-500"></div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 py-8 flex-1 flex flex-col gap-8">
        
        {/* Global Rotating Sponsorship ad banner (20 seconds) */}
        <AdBanner lang={lang} userShopAds={userShopAds} />

        {/* Navigation Tabs - Vibrant and structured with shadow-sm and blue-100 borders */}
        <nav className="bg-white p-2 rounded-3xl shadow-lg border border-blue-100 flex flex-wrap gap-1 md:gap-2 justify-center">
          {tabItems.map((item) => {
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer z-10 ${
                  isSelected
                    ? "text-orange-600 font-black scale-102"
                    : "text-blue-900 hover:text-orange-500 hover:bg-blue-50/40"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-tab-highlight"
                    className="absolute inset-0 bg-orange-100 rounded-2xl border border-orange-200"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab Contents Frame */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              {activeTab === "catalog" && <FishCatalog lang={lang} />}
              {activeTab === "breeding" && <BreedingGuide lang={lang} />}
              {activeTab === "ai" && <AiScanner lang={lang} />}
              {activeTab === "care" && <GeneralCare lang={lang} />}
              {activeTab === "tracker" && <TankTracker lang={lang} />}
              {activeTab === "tools" && <BreederTools lang={lang} />}
              {activeTab === "shop" && (
                <ShopSubscriptions
                  lang={lang}
                  onAdCreated={handleAdCreated}
                  existingAds={userShopAds}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Developer Profile Information */}
        <DeveloperCard lang={lang} />
      </main>

      {/* Elegant Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 font-bold text-slate-500 text-[11px]">
            <span>{t.title} AI - {lang === "ar" ? "برعاية وتوجيه وتفريخ أسماك الزينة العالمية" : "World Aquarium Species & Breeding Adviser"}</span>
            <span className="text-blue-500">•</span>
            <span>{lang === "ar" ? "يدعم أنظمة iOS والـ Android" : "Compatible with iOS & Android devices"}</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            {lang === "ar"
              ? "مستكشف الكاميرا والذكاء الاصطناعي مدعوم بموديل Gemini 2.5 Flash للحصول على رعاية دقيقة وفورية."
              : "Live visual analysis powered by Google Gemini 2.5 models for accurate and reliable results."}
          </p>
        </div>
      </footer>
    </div>
  );
}
