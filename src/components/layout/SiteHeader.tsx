"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogIn, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function SiteHeader() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (!isLanding) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled((prev) => {
        if (prev === scrolled) return prev;
        return scrolled;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLanding]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-white/95 border-b border-border/60 shadow-elegant py-3 backdrop-blur-md"
          : isLanding
            ? "bg-transparent border-transparent py-4"
            : "bg-primary border-transparent py-4"
      )}
    >
      <div className="w-full px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="transition-all duration-500">
            <Image
              src="/logo_b.svg"
              alt="PT Eltran Indonesia Logo"
              width={140}
              height={40}
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <span
            className={cn(
              "text-md font-bold tracking-widest uppercase transition-colors duration-500",
              isScrolled ? "text-primary" : "text-white"
            )}
          >
            <span className="md:hidden">VMS</span>
            <span className="hidden md:inline">Vendor Management System</span>
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 mr-2">
            <Link
              href="/register"
              className={cn(
                "text-xs font-bold tracking-wider uppercase transition-colors duration-300 hover:text-secondary cursor-pointer",
                isScrolled ? "text-primary/75" : "text-white/75"
              )}
            >
              {t("header.partnership")}
            </Link>
          </div>
          <Link
            href="/login"
            className={cn(
              "flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 px-5 py-2.5 rounded-full border shadow-sm cursor-pointer",
              isScrolled
                ? "text-primary border-primary hover:bg-primary hover:text-white"
                : "text-white border-white/30 hover:bg-white hover:text-primary"
            )}
          >
            <LogIn className="size-4" />
            {t("header.login")}
          </Link>
          <button
            onClick={() => setLanguage(language === "id" ? "en" : "id")}
            className={cn(
              "flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 px-3.5 py-2.5 rounded-full border cursor-pointer hover:scale-105 shadow-sm",
              isScrolled
                ? "text-primary border-primary/30 hover:border-primary/60 hover:bg-slate-50 bg-white"
                : "text-white border-white/20 hover:border-white/50 hover:bg-white/10 bg-white/5"
            )}
            title="Switch Language"
          >
            <Globe className="size-3.5" />
            <span>{language === "id" ? "EN" : "ID"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
