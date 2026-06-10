"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after 1.5 seconds on the landing page
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div className="relative max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="size-5" />
        </button>
        <div className="relative w-full aspect-4/3 md:aspect-video">
          <Image
            src="/POP UP.jpg"
            alt="Eltran Promo Announcement"
            fill
            className="object-contain bg-surface-dim"
            priority
          />
        </div>
      </div>
    </div>
  );
}
