"use client";

import React, { useState } from "react";
import { X, FileText, Check, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface PendingDocument {
  id: string;
  vendorName: string;
  docName: string;
  docType: string;
  uploadDate: string;
  status: "Pending" | "Verified" | "Revision Needed";
}

interface AdminReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: PendingDocument | null;
  onConfirm: (decision: "approve" | "reject", reason: string) => void;
}

export function AdminReviewModal({
  isOpen,
  onClose,
  document,
  onConfirm,
}: AdminReviewModalProps) {
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null);
  const [reason, setReason] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !document) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!decision) {
      setErrorMsg("Harap pilih keputusan (Setujui atau Tolak) terlebih dahulu.");
      return;
    }

    if (!reason.trim()) {
      setErrorMsg("Alasan keputusan wajib diisi untuk mendokumentasikan hasil audit berkas.");
      return;
    }

    onConfirm(decision, reason);
    // Reset state and close
    setDecision(null);
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 px-4">
      <div className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-300 flex flex-col border border-border max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0">
              <FileText className="size-5.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight leading-none">
                Peninjauan & Verifikasi Berkas
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                Oleh Auditor Procurement PT Eltran Indonesia
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setDecision(null);
              setReason("");
              setErrorMsg("");
              onClose();
            }}
            className="bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content Area - 2 columns for preview and decision form */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-8 pr-1 py-1">
          
          {/* Left Column: Simulated Document Viewer Preview */}
          <div className="flex flex-col h-full">
            <span className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3 block">
              Pratinjau Berkas
            </span>
            <div className="flex-1 min-h-[300px] border border-border/60 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner select-none">
              
              {/* Geometric pattern simulating a corporate scan */}
              <div className="absolute inset-0 bg-radar-pattern opacity-[0.015] pointer-events-none" />
              
              <div className="w-full max-w-sm bg-white border border-border/60 rounded-xl p-8 shadow-sm flex flex-col gap-4 text-slate-600 font-mono text-[9px] leading-relaxed relative">
                {/* Stamp */}
                <div className="absolute top-4 right-4 border-2 border-primary/20 text-primary/20 text-[8px] font-black uppercase rounded-lg px-2 py-0.5 tracking-wider rotate-12 select-none">
                  PT ELTRAN
                </div>
                
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="size-7 bg-primary/10 text-primary rounded flex items-center justify-center p-1 shrink-0 font-sans font-bold">
                    ELT
                  </div>
                  <div className="flex flex-col leading-none font-sans">
                    <span className="font-bold text-slate-800 text-[10px] tracking-tight">{document.vendorName}</span>
                    <span className="text-[8px] text-slate-400 mt-1 uppercase font-bold tracking-wider">{document.docType} ATTACHMENT</span>
                  </div>
                </div>

                <div className="space-y-2.5 mt-2">
                  <div className="h-3.5 bg-slate-100 rounded w-3/4" />
                  <div className="h-2.5 bg-slate-50 rounded w-full" />
                  <div className="h-2.5 bg-slate-50 rounded w-11/12" />
                  <div className="h-2.5 bg-slate-50 rounded w-5/6" />
                  <div className="h-3.5 bg-slate-100 rounded w-1/2 mt-4" />
                  <div className="h-2.5 bg-slate-50 rounded w-full" />
                  <div className="h-2.5 bg-slate-50 rounded w-4/5" />
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center font-sans text-[8px] text-slate-400">
                  <span>Diupload: {document.uploadDate}</span>
                  <span className="font-bold text-slate-500 font-mono">FILE_SIZE: 1.4 MB</span>
                </div>
              </div>

              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                Simulasi Preview Dokumen PDF
              </span>
            </div>
          </div>

          {/* Right Column: Decision Form */}
          <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-6">
            
            {/* Decison Info */}
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3 block">
                  Detail Berkas
                </span>
                <div className="bg-slate-50 p-4 rounded-xl border border-border/40 text-xs space-y-2">
                  <div><span className="font-semibold text-slate-400">Nama Vendor:</span> <span className="text-slate-800 font-bold ml-1">{document.vendorName}</span></div>
                  <div><span className="font-semibold text-slate-400">Nama Berkas:</span> <span className="text-slate-800 font-bold ml-1">{document.docName}</span></div>
                </div>
              </div>

              {/* Decision Choice */}
              <div>
                <span className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3 block">
                  Keputusan Verifikasi <span className="text-[#EC1E25]">*</span>
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setDecision("approve");
                      setErrorMsg("");
                    }}
                    className={cn(
                      "flex items-center justify-center gap-2 h-14 rounded-xl border font-bold text-xs transition-all cursor-pointer",
                      decision === "approve"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-500 shadow-sm"
                        : "border-border/60 bg-slate-50 text-slate-600 hover:bg-slate-100/60"
                    )}
                  >
                    <Check className="size-4" />
                    Setujui Berkas
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDecision("reject");
                      setErrorMsg("");
                    }}
                    className={cn(
                      "flex items-center justify-center gap-2 h-14 rounded-xl border font-bold text-xs transition-all cursor-pointer",
                      decision === "reject"
                        ? "bg-red-50 text-red-800 border-red-500 shadow-sm"
                        : "border-border/60 bg-slate-50 text-slate-600 hover:bg-slate-100/60"
                    )}
                  >
                    <X className="size-4" />
                    Tolak / Minta Revisi
                  </button>
                </div>
              </div>

              {/* Decision Reason */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 block">
                  Alasan Keputusan <span className="text-[#EC1E25]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder={
                    decision === "approve"
                      ? "Contoh: Dokumen lengkap, tanda tangan basah, dan masa berlaku masih aktif."
                      : decision === "reject"
                      ? "Contoh: Scan dokumen Akta Pendirian buram dan halaman terakhir terpotong."
                      : "Harap ketikkan alasan persetujuan atau penolakan berkas ini secara terperinci..."
                  }
                  className="w-full p-4 rounded-xl border border-border/60 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-semibold text-slate-800 text-xs resize-none"
                />
                <span className="text-[10px] text-slate-400 italic block leading-relaxed pl-1">
                  * Alasan keputusan wajib diisi untuk transparansi proses audit pendaftaran vendor.
                </span>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-2 text-[11px] font-semibold animate-in fade-in duration-200">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Submit Actions */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDecision(null);
                  setReason("");
                  setErrorMsg("");
                  onClose();
                }}
                className="flex-1 py-5 rounded-xl text-xs font-bold text-slate-600 cursor-pointer"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1 py-5 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white cursor-pointer shadow-md shadow-primary/20"
              >
                Kirim Keputusan
              </Button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
