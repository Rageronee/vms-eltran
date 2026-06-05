"use client";

import React, { useState } from "react";
import { TrendingUp, Users, ShieldCheck, Clock, FileWarning, ArrowUpRight } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function StatistikPortalPage() {
  const { toast } = useToast();

  // Mock data stats
  const stats = [
    {
      title: "Total Vendor Terdaftar",
      value: "1,256",
      change: "+12% Bulan Ini",
      icon: Users,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Vendor Terverifikasi",
      value: "842",
      change: "67% dari Total",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Pendaftaran Pending",
      value: "214",
      change: "Butuh Review Segera",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Dokumen Perlu Revisi",
      value: "200",
      change: "Telah Diberitahu",
      icon: FileWarning,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
  ];

  // Bidang usaha distribution data
  const categories = [
    { name: "Konstruksi FO", count: 480, percentage: 38, color: "#195192" }, // Corporate Blue
    { name: "IT & Networking", count: 320, percentage: 25, color: "#4FA0FF" }, // Light Blue
    { name: "Elektronik & APD", count: 256, percentage: 20, color: "#EC1E25" }, // Signal Red
    { name: "Kontraktor Sipil", count: 200, percentage: 17, color: "#48B365" }, // Green
  ];

  // Monthly registration trend
  const monthlyTrend = [
    { month: "Jan", count: 120 },
    { month: "Feb", count: 180 },
    { month: "Mar", count: 150 },
    { month: "Apr", count: 260 },
    { month: "May", count: 320 },
    { month: "Jun", count: 420 },
  ];

  const handleExportData = () => {
    toast("Mengekspor laporan statistik portal dalam format PDF...", "info");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <TrendingUp className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Statistik Portal</h1>
            <p className="text-sm text-muted-foreground">Tinjauan analitik pendaftaran vendor, verifikasi kepatuhan berkas, dan kategori kemitraan.</p>
          </div>
        </div>
        <button
          onClick={handleExportData}
          className="flex items-center gap-2 bg-[#4FA0FF] hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-sm shadow-blue-500/10 shrink-0"
        >
          <ArrowUpRight className="size-4" /> Ekspor Laporan Statistik
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-border/50 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.title}</span>
              <div className={`p-2.5 rounded-xl border shrink-0 ${s.color}`}>
                <s.icon className="size-4.5" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{s.value}</h3>
              <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wide">{s.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Visualizations Card Section */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Monthly Trend Bar Chart using pure SVG */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-border/50 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">Tren Pendaftaran Vendor</h3>
            <p className="text-xs text-muted-foreground mb-8">Peningkatan registrasi mitra baru PT Eltran Indonesia tahun 2026.</p>
          </div>

          {/* SVG Bar Chart */}
          <div className="relative w-full aspect-[2/1] min-h-[220px]">
            <svg className="w-full h-full" viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
              {/* Grid lines */}
              <line x1="30" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1="70" x2="480" y2="70" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1="120" x2="480" y2="120" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1="170" x2="480" y2="170" stroke="#e2e8f0" strokeWidth="1" />
              
              {/* Bars */}
              {monthlyTrend.map((t, idx) => {
                const barWidth = 40;
                const gap = 34;
                const xPos = 46 + idx * (barWidth + gap);
                const maxVal = 500;
                const height = (t.count / maxVal) * 150;
                const yPos = 170 - height;
                
                return (
                  <g key={idx} className="group cursor-pointer">
                    {/* Hover tooltip logic or simple styled rect */}
                    <rect
                      x={xPos}
                      y={yPos}
                      width={barWidth}
                      height={height}
                      rx="6"
                      fill="#195192"
                      className="transition-all hover:fill-[#EC1E25] duration-300"
                    />
                    {/* Count label above the bar */}
                    <text
                      x={xPos + barWidth / 2}
                      y={yPos - 8}
                      textAnchor="middle"
                      className="text-[10px] font-black fill-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {t.count}
                    </text>
                    {/* Month Label below chart */}
                    <text
                      x={xPos + barWidth / 2}
                      y="190"
                      textAnchor="middle"
                      className="text-[10px] font-bold fill-slate-400"
                    >
                      {t.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Categories Distribution Donut Chart */}
        <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">Sebaran Kategori Bidang</h3>
            <p className="text-xs text-muted-foreground mb-6">Persentase mitra berdasarkan kualifikasi bidang usaha.</p>
          </div>

          {/* SVG Donut Chart */}
          <div className="flex items-center justify-center my-2">
            <div className="relative size-36">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                {/* Background Circle */}
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
                
                {/* Section 1: Konstruksi FO (38%) */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#195192"
                  strokeWidth="4.2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="transition-all duration-500"
                  style={{ strokeDashoffset: 100 - 38 }}
                />
                
                {/* Section 2: IT & Networking (25%) */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#4FA0FF"
                  strokeWidth="4"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="transition-all duration-500"
                  style={{ strokeDashoffset: 100 - 25, transform: "rotate(136.8deg)", transformOrigin: "center" }}
                />

                {/* Section 3: Elektronik & APD (20%) */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#EC1E25"
                  strokeWidth="4"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="transition-all duration-500"
                  style={{ strokeDashoffset: 100 - 20, transform: "rotate(226.8deg)", transformOrigin: "center" }}
                />

                {/* Section 4: Sipil (17%) */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#48B365"
                  strokeWidth="4"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="transition-all duration-500"
                  style={{ strokeDashoffset: 100 - 17, transform: "rotate(298.8deg)", transformOrigin: "center" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800">VMS</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Mitra</span>
              </div>
            </div>
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-semibold text-slate-600 border-t border-slate-100 pt-6">
            {categories.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="truncate">{c.name}</span>
                <span className="font-bold text-slate-800 ml-auto">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
