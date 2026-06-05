"use client";

import React from "react";
import { X, FileSignature, CheckCircle2, Clock, Calendar, FileText, Download } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface Project {
  name: string;
  contractNo: string;
  progress: number;
  status: string;
}

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onDownloadDoc?: (name: string) => void;
}

export function ProjectDetailModal({
  isOpen,
  onClose,
  project,
  onDownloadDoc,
}: ProjectDetailModalProps) {
  if (!isOpen || !project) return null;

  // Custom timeline progress based on actual percentage
  const timelineSteps = [
    { label: "Kontrak Ditandatangani", date: "15 Jan 2026", done: true },
    { label: "Survey Lapangan & Rekayasa Desain", date: "28 Jan 2026", done: true },
    { label: "Mobilisasi & Pengadaan Material", date: "10 Feb 2026", done: true },
    {
      label: "Instalasi Fisik & Konstruksi Utama",
      date: project.progress >= 75 ? "Selesai 75%" : `Sedang Berjalan (${project.progress}%)`,
      done: project.progress >= 75,
      active: project.progress < 100 && project.progress > 0,
    },
    { label: "Commissioning & Serah Terima Proyek", date: "Menunggu", done: false },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 px-4">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-300 flex flex-col border border-border max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0">
              <FileSignature className="size-5.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight leading-none">
                Detail Proyek Pekerjaan
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                No. Kontrak: {project.contractNo}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1">
          {/* Main Info */}
          <div>
            <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
              Informasi Pekerjaan
            </h4>
            <div className="bg-slate-50 p-5 rounded-2xl border border-border/40 text-xs space-y-4">
              <div>
                <span className="font-semibold text-slate-400 block">Nama Pekerjaan</span>
                <span className="text-slate-800 font-bold mt-1.5 block leading-normal">{project.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3.5">
                <div>
                  <span className="font-semibold text-slate-400 block">Kemajuan Fisik</span>
                  <div className="flex items-center gap-2.5 mt-1.5">
                    <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                    <span className="font-black text-slate-800 shrink-0">{project.progress}%</span>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block">Status Proyek</span>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold mt-1.5">
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Progres */}
          <div>
            <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
              Milestone & Kemajuan Progres
            </h4>
            <div className="relative border-l-2 border-slate-100 ml-4.5 pl-6 space-y-6 text-xs py-1">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Circle Indicator */}
                  <div
                    className={cn(
                      "absolute -left-[27px] top-0 size-4.5 rounded-full border-2 bg-white flex items-center justify-center transition-all",
                      step.done
                        ? "border-primary bg-primary text-white"
                        : step.active
                        ? "border-secondary bg-white text-secondary"
                        : "border-slate-200 bg-white text-slate-400"
                    )}
                  >
                    {step.done && <CheckCircle2 className="size-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className={cn("font-bold text-slate-800", !step.done && !step.active && "text-slate-400")}>
                      {step.label}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1 font-semibold">
                      {step.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Log Dokumen */}
          {onDownloadDoc && (
            <div>
              <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
                Dokumen Terlampir
              </h4>
              <div className="divide-y divide-slate-100 border border-border/50 rounded-2xl overflow-hidden bg-white text-xs">
                <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <FileText className="size-4 text-primary shrink-0" />
                    <span className="font-semibold text-slate-700">Surat Penawaran Harga (SPH).pdf</span>
                  </div>
                  <button
                    onClick={() => onDownloadDoc("Surat Penawaran Harga (SPH).pdf")}
                    className="text-primary hover:text-primary-hover font-bold text-xs p-1.5 hover:bg-primary/5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Download className="size-3.5" /> Unduh
                  </button>
                </div>
                <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <FileText className="size-4 text-primary shrink-0" />
                    <span className="font-semibold text-slate-700">Comply_List_Mitra.pdf</span>
                  </div>
                  <button
                    onClick={() => onDownloadDoc("Comply_List_Mitra.pdf")}
                    className="text-primary hover:text-primary-hover font-bold text-xs p-1.5 hover:bg-primary/5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Download className="size-3.5" /> Unduh
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end mt-8 border-t border-slate-100 pt-4 shrink-0">
          <Button
            type="button"
            onClick={onClose}
            className="w-28 py-5 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white cursor-pointer"
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
