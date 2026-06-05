"use client";

import React, { useState } from "react";
import { Bell, CheckCircle, AlertTriangle, Info, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Notifications Data
const initialNotifications = [
  {
    id: 1,
    type: "success",
    title: "Dokumen Disetujui",
    message: "Akta Pendirian PT Sinar Tower Nusantara disetujui admin.",
    timestamp: "15 menit lalu",
    isRead: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Tenggat Waktu SPH",
    message: "Segera unggah dokumen SPH Anda untuk proyek Fiber Optic. Tenggat waktu hampir habis.",
    timestamp: "3 hari tersisa",
    isRead: false,
  },
  {
    id: 3,
    type: "info",
    title: "Pesan Sistem",
    message: "Selamat datang di Portal VMS PT Eltran Indonesia. Silakan lengkapi profil Anda.",
    timestamp: "1 minggu lalu",
    isRead: true,
  },
  {
    id: 4,
    type: "success",
    title: "Akun Terverifikasi",
    message: "Proses verifikasi akun Vendor telah selesai. Sekarang Anda dapat mengikuti tender.",
    timestamp: "1 minggu lalu",
    isRead: true,
  }
];

export default function VendorNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <Bell className="size-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Notifikasi Sistem
            </h1>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              Pemberitahuan aktivitas, validasi dokumen, dan pengumuman tender.
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Check className="size-4" />
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      <div className="bg-white rounded-[2rem] border border-border/40 shadow-sm p-6 md:p-10 relative overflow-hidden">
        {/* Decorative corner bg */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        {/* Mobile mark all as read */}
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="md:hidden flex w-full justify-center items-center gap-2 mb-6 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Check className="size-4" />
            Tandai Semua Dibaca
          </button>
        )}

        <div className="space-y-6 relative z-10">
          {notifications.map((notif) => {
            const Icon = notif.type === "success" ? CheckCircle : notif.type === "warning" ? AlertTriangle : Info;
            const iconBg = notif.type === "success" ? "bg-emerald-100 text-emerald-600" : notif.type === "warning" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600";
            
            return (
              <div 
                key={notif.id}
                onClick={() => !notif.isRead && markAsRead(notif.id)}
                className={cn(
                  "group relative flex gap-4 md:gap-6 p-4 md:p-6 rounded-2xl border transition-all duration-300",
                  notif.isRead ? "bg-slate-50 border-transparent" : "bg-white border-primary/20 shadow-md shadow-primary/5 cursor-pointer hover:border-primary/40"
                )}
              >
                {/* Unread indicator dot */}
                {!notif.isRead && (
                  <span className="absolute -top-1.5 -right-1.5 size-3 bg-secondary rounded-full animate-pulse border-2 border-white" />
                )}

                <div className={cn("size-10 md:size-12 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
                  <Icon className="size-5 md:size-6" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4 mb-1">
                    <h3 className={cn("text-sm md:text-base font-bold", notif.isRead ? "text-slate-700" : "text-slate-900")}>
                      {notif.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-slate-400 font-medium whitespace-nowrap">
                      <Clock className="size-3 md:size-3.5" />
                      {notif.timestamp}
                    </div>
                  </div>
                  <p className={cn("text-xs md:text-sm leading-relaxed", notif.isRead ? "text-slate-500" : "text-slate-700 font-medium")}>
                    {notif.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
