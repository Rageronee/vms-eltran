"use client";

import React, { useState } from "react";
import { Home, Calendar, ShieldCheck, FileText, CheckCircle, Clock, UserCircle } from "lucide-react";
import { ProjectDetailModal } from "@/components/ui/ProjectDetailModal";
import { VendorRecheckModal } from "@/components/ui/VendorRecheckModal";
import { useToast } from "@/components/ui/Toast";

export default function VendorDashboard() {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRecheckOpen, setIsRecheckOpen] = useState(false);
  const handleProjectDetail = (project: any) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleDownloadProjectDoc = (docName: string) => {
    toast(`Berhasil mengunduh dokumen proyek: "${docName}"`, "success");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <Home className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard Vendor</h1>
            <p className="text-sm text-muted-foreground">Kelola kemitraan, verifikasi profil, dan pantau proyek berjalan Anda.</p>
          </div>
        </div>
        
        {/* Contact info and date */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-600 bg-white px-5 py-3 rounded-2xl border border-border/50 shadow-sm shrink-0">
          <div>
            <span className="text-slate-400 font-medium block">Helpdesk VMS Eltran</span>
            <span className="text-primary text-[13px] font-bold">vendor@eltran.id</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-border/50" />
          <div>
            <span className="text-slate-400 font-medium block">Waktu Sistem</span>
            <span className="flex items-center gap-1.5 text-slate-700 text-[13px]">
              <Calendar className="size-3.5 text-slate-400" /> 
              {new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })} WIB
            </span>
          </div>
        </div>
      </div>

      {/* Verification Status Banner */}
      <div className="bg-white border border-border/40 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-800">Status Akun Mitra</span>
              <span className="inline-flex bg-emerald-100 text-emerald-800 px-3 py-0.5 rounded-full font-bold text-[10px] uppercase border border-emerald-200">
                Terverifikasi
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">PT Sinar Tower Nusantara telah terverifikasi secara resmi untuk berpartisipasi dalam penawaran proyek PT Eltran Indonesia.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setIsRecheckOpen(true)}
            className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 border border-border/80 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors"
          >
            Tinjau Data Pendaftaran
          </button>
          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3.5 py-1.5 rounded-xl text-xs font-bold border border-primary/20">
            ISO 37001 SMAP
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Summary Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-border/50 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <UserCircle className="size-5 text-primary" /> Profil Perusahaan
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 border-b border-border/30 pb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Vendor</span>
                <span className="text-sm font-bold text-slate-800 md:col-span-2">PT Sinar Tower Nusantara</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 border-b border-border/30 pb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori Bisnis</span>
                <span className="text-sm font-semibold text-slate-800 md:col-span-2">Konstruksi Telekomunikasi & Fiber Optic</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 border-b border-border/30 pb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">NPWP / Tax ID</span>
                <span className="text-sm font-mono text-slate-800 md:col-span-2">01.234.567.8-901.000</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 border-b border-border/30 pb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Direktur / PIC</span>
                <span className="text-sm font-medium text-slate-800 md:col-span-2">Ir. Bambang Triyono</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kelengkapan Berkas</span>
                <div className="md:col-span-2 flex items-center gap-2">
                  <span className="inline-flex bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-200">
                    Lengkap (100%)
                  </span>
                  <span className="text-xs text-muted-foreground">NIB, Deed, NPWP, SKT, SKPP Terverifikasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Project Progress Metric Card */}
        <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm flex flex-col items-center justify-between text-center">
          <div className="w-full text-left">
            <h2 className="text-lg font-bold text-primary mb-6">Progress Proyek Aktif</h2>
          </div>
          
          <div className="relative flex items-center justify-center size-44 my-4">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="3.5" strokeDasharray="100" strokeDashoffset="25" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-800 tracking-tight">75%</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1">Selesai</span>
            </div>
          </div>
          
          <div className="w-full space-y-3 mt-6 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-primary" />
                <span>Pekerjaan Rampung</span>
              </div>
              <span className="font-bold text-slate-800">75%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-slate-200" />
                <span>Sedang Berjalan</span>
              </div>
              <span className="font-bold text-slate-800">25%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Project Table Section */}
      <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-primary">Proyek Kemitraan Sedang Berjalan</h2>
          <span className="inline-flex bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
            2 Proyek Aktif
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-border/60 text-slate-500 text-xs uppercase tracking-wider">
                <th className="pb-4 font-bold w-2/5">Nama Pekerjaan</th>
                <th className="pb-4 font-bold w-1/3">Kemajuan Fisik</th>
                <th className="pb-4 font-bold w-1/6">Status Proyek</th>
                <th className="pb-4 font-bold w-1/12 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-sm">
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-5 pr-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-slate-800">Pemasangan Infrastruktur Fiber Optic Jakarta - Bandung</span>
                    <span className="text-xs text-muted-foreground">No. Kontrak: ELT-FO-2025-089</span>
                  </div>
                </td>
                <td className="py-5 pr-8">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-border/20">
                      <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '75%' }} />
                    </div>
                    <span className="text-xs font-black text-slate-700">75%</span>
                  </div>
                </td>
                <td className="py-5">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
                    <CheckCircle className="size-3" /> Berjalan Lancar
                  </span>
                </td>
                <td className="py-5 text-center">
                  <button
                    onClick={() => handleProjectDetail({
                      name: "Pemasangan Infrastruktur Fiber Optic Jakarta - Bandung",
                      contractNo: "ELT-FO-2025-089",
                      progress: 75,
                      status: "Berjalan Lancar"
                    })}
                    className="text-primary hover:text-primary-hover font-bold text-xs transition-colors hover:underline cursor-pointer"
                  >
                    Detail
                  </button>
                </td>
              </tr>
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-5 pr-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-slate-800">Instalasi BTS Tower West Java Area - Phase II</span>
                    <span className="text-xs text-muted-foreground">No. Kontrak: ELT-BTS-2025-112</span>
                  </div>
                </td>
                <td className="py-5 pr-8">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-border/20">
                      <div className="bg-[#EC1E25] h-full rounded-full transition-all duration-500" style={{ width: '40%' }} />
                    </div>
                    <span className="text-xs font-black text-slate-700">40%</span>
                  </div>
                </td>
                <td className="py-5">
                  <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold">
                    <Clock className="size-3" /> Peninjauan Jadwal
                  </span>
                </td>
                <td className="py-5 text-center">
                  <button
                    onClick={() => handleProjectDetail({
                      name: "Instalasi BTS Tower West Java Area - Phase II",
                      contractNo: "ELT-BTS-2025-112",
                      progress: 40,
                      status: "Peninjauan Jadwal"
                    })}
                    className="text-primary hover:text-primary-hover font-bold text-xs transition-colors hover:underline cursor-pointer"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        project={selectedProject}
        onDownloadDoc={handleDownloadProjectDoc}
      />

      {/* Vendor Recheck Registration Data Modal */}
      <VendorRecheckModal
        isOpen={isRecheckOpen}
        onClose={() => setIsRecheckOpen(false)}
      />
    </div>
  );
}
