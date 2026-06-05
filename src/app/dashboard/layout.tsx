"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Bell,
  MessageSquare,
  Maximize,
  ChevronDown,
  Home,
  FileText,
  FileSignature,
  UserCircle,
  Menu,
  X,
  LogOut,
  FolderOpen,
  TrendingUp,
  Settings,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/components/ui/Toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMsgOpen, setIsMsgOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (msgRef.current && !msgRef.current.contains(event.target as Node)) {
        setIsMsgOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAdmin = pathname.includes("/admin");
  const dashboardPath = isAdmin ? "/dashboard/admin" : "/dashboard/vendor";

  // Sidebar Links based on current workspace (Admin / Vendor)
  const navItems = isAdmin
    ? [
      { label: "Dataset Vendor", href: "/dashboard/admin", icon: Home },
      { label: "Persetujuan Dokumen", href: "/dashboard/admin/persetujuan", icon: ShieldCheck },
      { label: "Berkas Masuk", href: "/dashboard/admin/berkas", icon: FolderOpen },
      { label: "Statistik Portal", href: "/dashboard/admin/statistik", icon: TrendingUp },
    ]
    : [
      { label: "Dashboard Utama", href: "/dashboard/vendor", icon: Home },
      { label: "Dokumen Legalitas", href: "/dashboard/vendor/legalitas", icon: FileText },
      { label: "Penawaran Proyek", href: "/dashboard/vendor/penawaran", icon: FileSignature },
      { label: "Profil Perusahaan", href: "/dashboard/vendor/profil", icon: UserCircle },
    ];

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <ToastProvider>
      <div className="flex h-screen w-full bg-slate-50 overflow-hidden relative">

        {/* Mobile Sidebar Backdrop Overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-200"
          />
        )}

        {/* Sidebar - fully responsive */}
        <aside className={cn(
          "w-64 bg-primary text-white/80 flex-shrink-0 flex flex-col z-50 transition-transform duration-300 ease-in-out border-r border-primary-hover shadow-lg",
          "fixed inset-y-0 left-0 md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>

          {/* Sidebar Brand Header */}
          <div className="h-20 flex items-center px-6 border-b border-white/10 gap-3 justify-between">
            <div className="flex items-center gap-3">
              <div className="relative size-8 shrink-0 bg-white rounded-lg flex items-center justify-center p-1">
                <Image
                  src="/logo_b.svg"
                  alt="PT Eltran Logo"
                  width={28}
                  height={28}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-white tracking-wider leading-none">PT ELTRAN INDONESIA</span>
                <span className="text-[8.66px] text-white/60 font-bold tracking-widest mt-1 uppercase">
                  {isAdmin ? "Admin Panel" : "Vendor Panel"}
                </span>
              </div>
            </div>

            {/* Close button on mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-white/60 hover:text-white p-1 rounded-lg"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3.5 px-4 py-3 text-sm rounded-xl font-medium transition-all duration-200 group cursor-pointer",
                    isActive
                      ? "bg-white/15 text-white font-bold shadow-sm border-l-4 border-secondary pl-3"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn(
                    "size-5 transition-transform duration-300 group-hover:scale-105",
                    isActive ? "text-white" : "text-white/60 group-hover:text-white"
                  )} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer / Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-4 py-3 text-sm rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer group"
            >
              <LogOut className="size-5 text-white/60 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5" />
              Keluar (Logout)
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FA]">

          {/* Dashboard Top Header */}
          <header className="h-20 bg-white border-b border-border/50 flex items-center justify-between px-6 md:px-8 shrink-0 shadow-sm relative z-30">

            {/* Hamburger button for mobile toggling */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              >
                <Menu className="size-6" />
              </button>

              {/* Quick Search */}
              <div className="relative w-48 sm:w-64 md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari berkas, proyek, atau info..."
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-border/40 rounded-xl text-xs sm:text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* User actions */}
            <div className="flex items-center gap-4 sm:gap-6">

              {/* Notifications Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => {
                    setIsNotifOpen(!isNotifOpen);
                    setIsMsgOpen(false);
                    setIsProfileOpen(false);
                  }}
                  className={cn(
                    "relative text-muted-foreground hover:text-primary transition-colors cursor-pointer p-2 rounded-xl hover:bg-slate-50",
                    isNotifOpen && "text-primary bg-slate-50"
                  )}
                >
                  <Bell className="size-5" />
                  <span className="absolute top-1 right-1 size-2 bg-secondary rounded-full border border-white" />
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 rounded-2xl border border-border bg-white shadow-elegant animate-in fade-in duration-200">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifikasi Sistem</span>
                      <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded-full">
                        {isAdmin ? "2 Baru" : "2 Baru"}
                      </span>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 p-2">
                      {isAdmin ? (
                        <>
                          <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left">
                            <span className="text-xs font-bold text-slate-800 block">Pendaftaran Vendor Baru</span>
                            <span className="text-[11px] text-slate-500 mt-1 block">PT Global Net Solutions mendaftar ke portal VMS.</span>
                            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 uppercase font-mono">Baru saja</span>
                          </div>
                          <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left">
                            <span className="text-xs font-bold text-slate-800 block">Unggahan Berkas Baru</span>
                            <span className="text-[11px] text-slate-500 mt-1 block">PT Sinar Tower Nusantara mengunggah NIB terbaru.</span>
                            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 uppercase font-mono">10 menit lalu</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left">
                            <span className="text-xs font-bold text-emerald-700 block">Dokumen Disetujui</span>
                            <span className="text-[11px] text-slate-500 mt-1 block">Akta Pendirian PT Sinar Tower Nusantara disetujui admin.</span>
                            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 uppercase font-mono">15 menit lalu</span>
                          </div>
                          <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left">
                            <span className="text-xs font-bold text-secondary block">Tenggat Waktu SPH</span>
                            <span className="text-[11px] text-slate-500 mt-1 block">Segera unggah dokumen SPH Anda untuk proyek Fiber Optic.</span>
                            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 uppercase font-mono">3 hari tersisa</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Messages Dropdown */}
              <div className="relative" ref={msgRef}>
                <button
                  onClick={() => {
                    setIsMsgOpen(!isMsgOpen);
                    setIsNotifOpen(false);
                    setIsProfileOpen(false);
                  }}
                  className={cn(
                    "relative text-muted-foreground hover:text-primary transition-colors p-2 rounded-xl hover:bg-slate-50 cursor-pointer",
                    isMsgOpen && "text-primary bg-slate-50"
                  )}
                >
                  <MessageSquare className="size-5" />
                  <span className="absolute top-1 right-1 size-2 bg-slate-800 rounded-full border border-white" />
                </button>

                {isMsgOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 rounded-2xl border border-border bg-white shadow-elegant animate-in fade-in duration-200">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Pesan Masuk</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 p-2">
                      {isAdmin ? (
                        <>
                          <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left">
                            <span className="text-xs font-bold text-primary block">PT Sinar Tower Nusantara</span>
                            <span className="text-[11px] text-slate-600 mt-1 block truncate">Halo admin, berkas SBU kami sudah kami unggah...</span>
                            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 uppercase font-mono">15 menit lalu</span>
                          </div>
                          <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left">
                            <span className="text-xs font-bold text-primary block">CV TechSys Telecom</span>
                            <span className="text-[11px] text-slate-600 mt-1 block truncate">Apakah template Self-Assessment wajib ditandatangani...</span>
                            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 uppercase font-mono">2 jam lalu</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left">
                            <span className="text-xs font-bold text-primary block">Procurement Helpdesk</span>
                            <span className="text-[11px] text-slate-600 mt-1 block">Silakan hubungi tim kami jika ada kendala berkas.</span>
                            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 uppercase font-mono">1 jam lalu</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown Menu */}
              <div className="relative" ref={profileRef}>
                <div
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotifOpen(false);
                    setIsMsgOpen(false);
                  }}
                  className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-border/50 cursor-pointer group p-1.5 rounded-lg hover:bg-slate-50 transition-all"
                >
                  <div className="size-9 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-sm uppercase">
                    {isAdmin ? "AD" : "VN"}
                  </div>
                  <div className="flex flex-col text-left hidden md:flex">
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {isAdmin ? "Administrator" : "PT Sinar Tower Nusantara"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {isAdmin ? "Eltran Admin" : "Vendor Terdaftar"}
                    </span>
                  </div>
                  <ChevronDown className={cn("size-4 text-muted-foreground group-hover:text-slate-800 transition-transform duration-200", isProfileOpen && "rotate-180")} />
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-48 rounded-xl border border-border bg-white shadow-elegant animate-in fade-in duration-200 p-1.5">
                    <ul className="space-y-0.5">
                      <li>
                        <Link
                          href={isAdmin ? "/dashboard/admin" : "/dashboard/vendor/profil"}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors cursor-pointer"
                        >
                          <UserCircle className="size-4" />
                          {isAdmin ? "Admin Dashboard" : "Profil Perusahaan"}
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            router.push("/");
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-secondary hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <LogOut className="size-4" />
                          Keluar (Logout)
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
