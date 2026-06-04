"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isLanding) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
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
              src="/eltran.png"
              alt="PT Eltran Indonesia Logo"
              width={140}
              height={40}
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <span
            className={cn(
              "text-md font-bold tracking-[0.10em] uppercase transition-colors duration-500",
              isScrolled ? "text-primary" : "text-white"
            )}
          >
            <span className="md:hidden">VMS</span>
            <span className="hidden md:inline">Vendor Management System</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 mr-2">
            <Link
              href="/#features"
              className={cn(
                "text-xs font-bold tracking-wider uppercase transition-colors duration-300 hover:text-[#EC1E25] cursor-pointer",
                isScrolled ? "text-primary/75" : "text-white/75"
              )}
            >
              Key Features
            </Link>
            <Link
              href="/register"
              className={cn(
                "text-xs font-bold tracking-wider uppercase transition-colors duration-300 hover:text-[#EC1E25] cursor-pointer",
                isScrolled ? "text-primary/75" : "text-white/75"
              )}
            >
              Partnership
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
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
