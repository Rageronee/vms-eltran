"use client";

import React, { useState } from "react";
import { ShieldCheck, FileCheck, AlertCircle, Calendar, UploadCloud, FileText, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { VendorRecheckModal } from "@/components/ui/VendorRecheckModal";

export default function LegalitasPage() {
  const [isRecheckOpen, setIsRecheckOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <FileText className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dokumen Legalitas</h1>
            <p className="text-sm text-muted-foreground">Kelola dan unggah dokumen legalitas perusahaan Anda.</p>
          </div>
        </div>
        
        {/* Vendor Status Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100 shadow-sm">
          <ShieldCheck className="size-5 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-800">PT Sinar Tower Nusantara</span>
          <span className="inline-flex bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ml-2">
            Verified
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-3xl border border-border/50 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl">
              <FileText className="size-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Documents</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">12</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-border/50 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Documents</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">10</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-rose-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="absolute right-0 top-0 w-2 h-full bg-rose-500" />
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
              <AlertCircle className="size-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Missing Documents</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">2</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Notifications</h2>
        <div className="space-y-4">
          
          <div className="flex items-start gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10 transition-all hover:shadow-md">
            <div className="p-2.5 bg-white text-primary rounded-xl shadow-sm shrink-0">
              <Calendar className="size-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-800">SPH Upload</h4>
              <p className="text-xs text-slate-600 mt-1">Segera unggah dokumen SPH (Surat Penawaran Harga) untuk proyek pemasangan Fiber Optic yang baru diajukan. Tenggat waktu tersisa 3 hari.</p>
            </div>
            <button className="shrink-0 text-xs font-bold bg-white text-primary border border-primary/20 px-4 py-2 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
              Lihat Detail
            </button>
          </div>

          <div className="flex items-start gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10 transition-all hover:shadow-md">
            <div className="p-2.5 bg-white text-primary rounded-xl shadow-sm shrink-0">
              <Calendar className="size-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-800">Company Legality Documents</h4>
              <p className="text-xs text-slate-600 mt-1">Sertifikat Badan Usaha (SBU) Anda akan segera kedaluwarsa bulan depan. Harap perbarui dokumen tersebut agar status verified Anda tidak dicabut.</p>
            </div>
            <button className="shrink-0 text-xs font-bold bg-white text-primary border border-primary/20 px-4 py-2 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
              Perbarui
            </button>
          </div>

        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-6 pl-2">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          
          <Link href="#" className="group bg-white p-6 rounded-3xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col items-center text-center gap-4">
            <div className="size-14 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all">
              <UploadCloud className="size-6 text-slate-400 group-hover:text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">Unggah NIB Baru</h4>
              <p className="text-xs text-muted-foreground mt-1">Perbarui Nomor Induk Berusaha</p>
            </div>
          </Link>

          <Link href="#" className="group bg-white p-6 rounded-3xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col items-center text-center gap-4">
            <div className="size-14 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all">
              <UploadCloud className="size-6 text-slate-400 group-hover:text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">Perbarui Akta Pendirian</h4>
              <p className="text-xs text-muted-foreground mt-1">Unggah dokumen akta notaris terbaru</p>
            </div>
          </Link>

          <button
            onClick={() => setIsRecheckOpen(true)}
            className="group bg-white p-6 rounded-3xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col items-center text-center gap-4 cursor-pointer w-full"
          >
            <div className="size-14 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all">
              <ChevronRight className="size-6 text-slate-400 group-hover:text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">Tinjau Data Pendaftaran</h4>
              <p className="text-xs text-muted-foreground mt-1">Periksa kembali seluruh berkas masuk</p>
            </div>
          </button>

        </div>
      </div>

      {/* Vendor Recheck Registration Data Modal */}
      <VendorRecheckModal
        isOpen={isRecheckOpen}
        onClose={() => setIsRecheckOpen(false)}
      />
    </div>
  );
}
