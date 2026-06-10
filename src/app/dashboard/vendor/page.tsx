"use client";

import React, { useState } from "react";
import { Home, Calendar, ShieldCheck, FileText, CheckCircle, Clock, UserCircle, TrendingUp, FileSignature } from "lucide-react";
import Link from "next/link";
import { ProjectDetailModal } from "@/components/ui/ProjectDetailModal";
import { VendorRecheckModal } from "@/components/ui/VendorRecheckModal";
import { useToast } from "@/components/ui/Toast";
import { DashboardPageWrapper, DashboardHeader, DashboardCard, DashboardCardHeader } from "@/components/layout/DashboardWrappers";

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
    <DashboardPageWrapper>
      
      {/* Top Header Section */}
      <DashboardHeader 
        icon={<Home className="size-7" />}
        title="Dashboard Vendor"
        description="Kelola kemitraan, verifikasi profil, dan pantau proyek berjalan Anda."
      >
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
      </DashboardHeader>

      {/* Verification Status Banner */}
      <DashboardCard className="p-6 md:flex-row md:items-center justify-between gap-6 !rounded-3xl">
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
        <div className="flex flex-wrap items-center gap-3 shrink-0 mt-4 md:mt-0">
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
      </DashboardCard>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Summary Card */}
        <DashboardCard className="lg:col-span-2 group">
          <DashboardCardHeader 
            title={<><UserCircle className="size-5 text-primary" /> Profil Perusahaan</>}
            className="!text-primary"
          >
             <Link 
                href="/dashboard/vendor/profil" 
                className="inline-flex w-fit items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 shrink-0"
              >
                <UserCircle className="size-4" /> Kelola Profil
              </Link>
          </DashboardCardHeader>
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
        </DashboardCard>

        {/* Detailed Progress Card */}
        <DashboardCard>
          <DashboardCardHeader 
            title="Ringkasan Kinerja"
            subtitle="Performa proyek & tagihan"
          >
             <div className="p-2 bg-slate-50 border border-border/50 rounded-xl text-primary">
              <TrendingUp className="size-5" />
            </div>
          </DashboardCardHeader>
          
          <div className="relative z-10 space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Proyek Selesai</span>
                <span className="text-2xl font-black text-slate-800">12</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-full rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Proyek Berjalan</span>
                <span className="text-2xl font-black text-slate-800">2</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full w-[40%]" />
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Total Tagihan Terbayar</span>
              <span className="text-xl font-bold text-slate-800 font-mono">Rp 4.250.000.000</span>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Tasks and Activities Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Pending Tasks (Notifications) */}
        <DashboardCard className="h-full">
          <DashboardCardHeader title="Tugas Tertunda">
            <span className="inline-flex bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-border/50">
              2 Aksi
            </span>
          </DashboardCardHeader>
          
          <div className="space-y-4 flex-1">
            <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl border-l-4 border-l-secondary border border-border/60 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/10 text-secondary rounded-lg border border-secondary/20 shrink-0">
                  <FileText className="size-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800">Unggah SPH Proyek Fiber Optic</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">SPH untuk proyek Jakarta-Bandung ditunggu. Tenggat waktu tersisa 3 hari.</p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button className="text-xs font-bold border border-secondary/20 text-secondary hover:bg-secondary/10 px-5 py-2 rounded-xl transition-colors cursor-pointer">
                  Unggah SPH
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl border-l-4 border-l-amber-500 border border-border/60 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 text-amber-500 rounded-lg border border-border/50 shrink-0">
                  <ShieldCheck className="size-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800">Pembaruan SBU</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Sertifikat Badan Usaha akan kedaluwarsa bulan depan. Mohon segera perbarui.</p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button className="text-xs font-bold border border-amber-200 text-amber-600 hover:bg-amber-50 px-5 py-2 rounded-xl transition-colors cursor-pointer">
                  Perbarui Dokumen
                </button>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Recent Activities */}
        <DashboardCard className="h-full">
          <DashboardCardHeader title="Aktivitas Terkini" />
          
          <div className="relative pl-4 border-l-2 border-slate-100 space-y-6 flex-1 py-2">
            
            <div className="relative">
              <div className="absolute -left-[23px] top-1 size-3 bg-emerald-600 rounded-full ring-4 ring-white" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-800">Invoice #INV-2026-042 Terbayar</span>
                <span className="text-xs text-slate-500">Pembayaran termin ke-2 proyek Fiber Optic telah ditransfer.</span>
                <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Kemarin, 14:30 WIB</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[23px] top-1 size-3 bg-primary rounded-full ring-4 ring-white" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-800">Persetujuan Dokumen NIB</span>
                <span className="text-xs text-slate-500">Admin Procurement menyetujui dokumen NIB terbaru Anda.</span>
                <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">08 Juni 2026, 09:15 WIB</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[23px] top-1 size-3 bg-amber-500 rounded-full ring-4 ring-white" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-800">Penugasan Proyek Baru</span>
                <span className="text-xs text-slate-500">Anda ditugaskan pada proyek &quot;Maintenance Menara BTS Jawa Barat&quot;.</span>
                <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">05 Juni 2026, 11:00 WIB</span>
              </div>
            </div>

          </div>
        </DashboardCard>
      </div>

      {/* Current Project Table Section */}
      <DashboardCard>
        <DashboardCardHeader title="Proyek Kemitraan Sedang Berjalan">
          <span className="inline-flex w-fit shrink-0 items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold border border-primary/20 whitespace-nowrap">
            <TrendingUp className="size-3.5" /> 2 Proyek Aktif
          </span>
        </DashboardCardHeader>
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold rounded-l-xl">Info Proyek</th>
                <th className="p-4 font-bold w-1/4">Tenggat Waktu</th>
                <th className="p-4 font-bold w-1/4">Kemajuan & Status</th>
                <th className="p-4 font-bold text-center rounded-r-xl">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-sm">
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-800 line-clamp-1">Pemasangan Infrastruktur Fiber Optic Jakarta - Bandung</span>
                    <span className="text-xs text-primary font-mono bg-primary/5 inline-flex w-fit px-2 py-0.5 rounded border border-primary/10">ELT-FO-2025-089</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1 text-slate-600">
                    <span className="text-sm font-semibold flex items-center gap-1.5"><Calendar className="size-4 text-slate-400" /> 15 Ags 2026</span>
                    <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">2 Bulan Lagi</span>
                  </div>
                </td>
                <td className="p-4 pr-8">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-xs font-black text-slate-700">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                        <CheckCircle className="size-3" /> Berjalan Lancar
                      </span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-border/20">
                      <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: '75%' }} />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => handleProjectDetail({
                        name: "Pemasangan Infrastruktur Fiber Optic Jakarta - Bandung",
                        contractNo: "ELT-FO-2025-089",
                        progress: 75,
                        status: "Berjalan Lancar"
                      })}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors tooltip-trigger relative group/btn"
                    >
                      <FileText className="size-4" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Detail</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors tooltip-trigger relative group/btn">
                      <TrendingUp className="size-4" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Upload Laporan</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors tooltip-trigger relative group/btn">
                      <FileSignature className="size-4" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Kirim Invoice</span>
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-800 line-clamp-1">Maintenance Menara BTS Jawa Barat</span>
                    <span className="text-xs text-primary font-mono bg-primary/5 inline-flex w-fit px-2 py-0.5 rounded border border-primary/10">ELT-MT-2026-012</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1 text-slate-600">
                    <span className="text-sm font-semibold flex items-center gap-1.5"><Calendar className="size-4 text-slate-400" /> 30 Nov 2026</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Aman</span>
                  </div>
                </td>
                <td className="p-4 pr-8">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-xs font-black text-slate-700">
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                        <Clock className="size-3" /> Persiapan
                      </span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-border/20">
                      <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '15%' }} />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => handleProjectDetail({
                        name: "Maintenance Menara BTS Jawa Barat",
                        contractNo: "ELT-MT-2026-012",
                        progress: 15,
                        status: "Persiapan"
                      })}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors relative group/btn"
                    >
                      <FileText className="size-4" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Detail</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors relative group/btn">
                      <TrendingUp className="size-4" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Upload Laporan</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors relative group/btn">
                      <FileSignature className="size-4" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Kirim Invoice</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DashboardCard>

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

    </DashboardPageWrapper>
  );
}
