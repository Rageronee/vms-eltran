"use client";

import React, { useState } from "react";
import { FileSignature, Download, Upload, FileText, FileUp, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function PenawaranPage() {
  const { toast } = useToast();

  const [status, setStatus] = useState<"Pending Upload" | "Submitted">("Pending Upload");
  const [complyFile, setComplyFile] = useState<string | null>(null);
  const [sphFile, setSphFile] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDownload = (docName: string) => {
    toast(`Berhasil mengunduh dokumen "${docName}" dari SCM.`, "success");
  };

  const simulateUpload = (type: "comply" | "sph") => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    if (type === "comply") {
      setComplyFile(`Comply_List_STN_${randomSuffix}.pdf`);
      toast("Dokumen Comply List berhasil diunggah.", "success");
    } else {
      setSphFile(`SPH_STN_${randomSuffix}.pdf`);
      toast("Dokumen SPH berhasil diunggah.", "success");
    }
  };

  const handleSubmitClick = () => {
    if (!complyFile || !sphFile) {
      toast("Harap unggah kedua dokumen (Comply List & SPH) sebelum mengirim.", "warning");
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmSubmit = () => {
    setStatus("Submitted");
    toast("Dokumen penawaran proyek Anda berhasil dikirimkan ke tim Procurement!", "success");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
          <FileSignature className="size-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Penawaran Proyek</h1>
          <p className="text-sm text-muted-foreground">Kelola penawaran proyek aktif dan unggah dokumen kelengkapan teknis serta komersial.</p>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reference ID</p>
          <p className="text-sm font-bold text-slate-800 mt-1">ELT-FO-2025-089</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Closing Date</p>
          <p className="text-sm font-semibold text-slate-600 mt-1">26 September 2025</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sisa Waktu</p>
          <p className="text-sm font-bold text-secondary mt-1">3 Hari Tersisa</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status Penawaran</p>
          {status === "Pending Upload" ? (
            <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
              Pending Upload
            </span>
          ) : (
            <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
              Terkirim (Submitted)
            </span>
          )}
        </div>
      </div>

      {/* Document from SCM */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 pl-1">
          <FileText className="size-5 text-primary" /> Dokumen Acuan dari SCM
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          
          <div className="bg-slate-50 rounded-2xl p-5 flex items-center justify-between border border-border/60 group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/5 text-primary rounded-xl shrink-0">
                <FileText className="size-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 block">Comply List Template</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Spesifikasi Teknis</span>
              </div>
            </div>
            <button
              onClick={() => handleDownload("Comply List Template.docx")}
              className="flex items-center gap-1.5 text-primary hover:text-primary-hover font-bold text-xs px-3.5 py-2 rounded-xl bg-white border border-primary/20 hover:bg-primary/5 transition-all cursor-pointer"
            >
              <Download className="size-4" /> Unduh
            </button>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 flex items-center justify-between border border-border/60 group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/5 text-primary rounded-xl shrink-0">
                <FileText className="size-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 block">Format Surat Penawaran Harga</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Format Komersial</span>
              </div>
            </div>
            <button
              onClick={() => handleDownload("Format Surat Penawaran Harga (SPH).docx")}
              className="flex items-center gap-1.5 text-primary hover:text-primary-hover font-bold text-xs px-3.5 py-2 rounded-xl bg-white border border-primary/20 hover:bg-primary/5 transition-all cursor-pointer"
            >
              <Download className="size-4" /> Unduh
            </button>
          </div>

        </div>
      </div>

      {/* Document Upload */}
      <div className="space-y-4 pt-6">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 pl-1">
          <FileUp className="size-5 text-primary" /> Pengunggahan Berkas Balasan
        </h2>
        <div className="space-y-4 bg-white p-6 md:p-8 rounded-3xl border border-border/50 shadow-sm">
          
          {/* Item 1 */}
          <div className="bg-slate-50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary text-white rounded-xl shrink-0">
                <FileText className="size-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 block">Isian Comply List</span>
                <span className="text-xs text-slate-500">
                  {complyFile ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      ✓ {complyFile}
                    </span>
                  ) : (
                    "PDF, DOCX (Maksimal 5MB)"
                  )}
                </span>
              </div>
            </div>
            {status === "Pending Upload" && (
              <button
                onClick={() => simulateUpload("comply")}
                className="w-full sm:w-auto bg-white border border-primary/20 text-primary hover:bg-primary/5 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                {complyFile ? "Unggah Ulang" : "Unggah Berkas"}
              </button>
            )}
          </div>

          {/* Item 2 */}
          <div className="bg-slate-50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary text-white rounded-xl shrink-0">
                <FileText className="size-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 block">Surat Penawaran Harga (SPH)</span>
                <span className="text-xs text-slate-500">
                  {sphFile ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      ✓ {sphFile}
                    </span>
                  ) : (
                    "PDF Terenkripsi (Maksimal 5MB)"
                  )}
                </span>
              </div>
            </div>
            {status === "Pending Upload" && (
              <button
                onClick={() => simulateUpload("sph")}
                className="w-full sm:w-auto bg-white border border-primary/20 text-primary hover:bg-primary/5 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                {sphFile ? "Unggah Ulang" : "Unggah Berkas"}
              </button>
            )}
          </div>

          {/* Submit Action */}
          {status === "Pending Upload" && (
            <div className="pt-6 flex justify-end">
              <button
                onClick={handleSubmitClick}
                className="bg-primary hover:bg-primary-hover text-white font-bold text-xs px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg shadow-primary/20 cursor-pointer"
              >
                Kirim Penawaran
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ConfirmModal for Submission */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Kirim Berkas Penawaran Proyek"
        description="Apakah Anda yakin ingin mengirimkan berkas penawaran Anda? Dokumen yang terkirim bersifat final dan akan ditinjau oleh tim Procurement PT Eltran Indonesia."
        confirmText="Ya, Kirim"
        cancelText="Batal"
      />
    </div>
  );
}
