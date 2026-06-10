"use client";

import React, { useState } from "react";
import { ShieldCheck, FileCheck, AlertCircle, Calendar, UploadCloud, FileText, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { VendorRecheckModal } from "@/components/ui/VendorRecheckModal";
import { DashboardPageWrapper, DashboardHeader, DashboardCard, DashboardCardHeader } from "@/components/layout/DashboardWrappers";

export default function LegalitasPage() {
  const [isRecheckOpen, setIsRecheckOpen] = useState(false);

  return (
    <DashboardPageWrapper>
      
      {/* Header */}
      <DashboardHeader
        icon={<FileText className="size-7" />}
        title="Dokumen Legalitas"
        description="Kelola dan unggah dokumen legalitas perusahaan Anda."
      >
        {/* Vendor Status Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100 shadow-sm">
          <ShieldCheck className="size-5 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-800">PT Sinar Tower Nusantara</span>
          <span className="inline-flex bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ml-2">
            Verified
          </span>
        </div>
      </DashboardHeader>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard className="!p-6 flex-row items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl shrink-0">
            <FileText className="size-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Documents</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">12</h3>
          </div>
        </DashboardCard>
        
        <DashboardCard className="!p-6 flex-row items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl shrink-0">
            <CheckCircle2 className="size-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Documents</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">10</h3>
          </div>
        </DashboardCard>
        
        <DashboardCard className="!p-6 flex-row items-center gap-4 !border-rose-200">
          <div className="absolute right-0 top-0 w-2 h-full bg-rose-500" />
          <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl shrink-0">
            <AlertCircle className="size-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Missing Documents</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">2</h3>
          </div>
        </DashboardCard>
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
    </DashboardPageWrapper>
  );
}
