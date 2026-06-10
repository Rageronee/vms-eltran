"use client";

import React from "react";
import { X, Building2, User, FileText, CheckCircle, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface Vendor {
  name: string;
  category: string;
  pic: string;
  status: string;
  date: string;
}

interface VendorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor | null;
  onVerify?: (name: string) => void;
}

export function VendorDetailModal({
  isOpen,
  onClose,
  vendor,
  onVerify,
}: VendorDetailModalProps) {
  if (!isOpen || !vendor) return null;

  // Mock details for display based on the selected vendor
  const details = {
    npwp: "01.234.567.8-901.000",
    email: `${vendor.pic.toLowerCase().replace(/\s+/g, "")}@${vendor.name.toLowerCase().replace(/\s+/g, "").substring(0, 10)}.co.id`,
    phone: "+62 21 555-4321",
    address: "Gedung Cyber 2, Lt. 12, Jl. H. R. Rasuna Said Blok X-5 No.13, Jakarta Selatan, 12950",
    documents: [
      { name: "Nomor Induk Berusaha (NIB)", status: "Verified" },
      { name: "Akta Pendirian Perusahaan", status: "Verified" },
      { name: "NPWP Perusahaan", status: "Verified" },
      { name: "Surat Keterangan Terdaftar (SKT)", status: vendor.status === "Revision Needed" ? "Revision Needed" : "Verified" },
      { name: "Laporan Keuangan 2025", status: vendor.status === "Pending" ? "Pending" : "Verified" },
    ],
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 px-4">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-300 flex flex-col border border-border max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="size-5.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight leading-none">
                Detail Profil Vendor
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                Terdaftar sejak {vendor.date}
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
              Informasi Umum
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-border/40 text-xs">
              <div>
                <span className="font-semibold text-slate-400 block">Nama Badan Usaha</span>
                <span className="text-slate-800 font-bold mt-1 block">{vendor.name}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block">Kategori Kemitraan</span>
                <span className="text-slate-800 font-semibold mt-1 block">{vendor.category}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block">Penanggung Jawab (PIC)</span>
                <span className="text-slate-800 font-semibold mt-1 block">{vendor.pic}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block">NPWP Perusahaan</span>
                <span className="text-slate-800 font-mono font-medium mt-1 block">{details.npwp}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
              Kontak & Alamat
            </h4>
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-border/40 text-xs">
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 text-slate-400" />
                <span className="text-slate-700 font-medium">{details.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 text-slate-400" />
                <span className="text-slate-700 font-medium font-mono">{details.phone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 text-slate-400 mt-0.5 shrink-0" />
                <span className="text-slate-600 font-medium leading-relaxed">{details.address}</span>
              </div>
            </div>
          </div>

          {/* Document Status */}
          <div>
            <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
              Kelengkapan Dokumen Legalitas
            </h4>
            <div className="divide-y divide-slate-100 border border-border/50 rounded-2xl overflow-hidden bg-white text-xs">
              {details.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <FileText className="size-4 text-primary shrink-0" />
                    <span className="font-semibold text-slate-700">{doc.name}</span>
                  </div>
                  <span>
                    {doc.status === "Verified" && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        Verified
                      </span>
                    )}
                    {doc.status === "Pending" && (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
                        Pending
                      </span>
                    )}
                    {doc.status === "Revision Needed" && (
                      <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-800 border border-orange-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        Revisi
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 mt-8 border-t border-slate-100 pt-4 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 py-5 rounded-xl text-xs font-bold text-slate-600 cursor-pointer"
          >
            Tutup
          </Button>
          {vendor.status !== "Verified" && onVerify && (
            <Button
              type="button"
              onClick={() => {
                onVerify(vendor.name);
                onClose();
              }}
              className="flex-1 py-5 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white cursor-pointer"
            >
              <ShieldCheck className="size-4 mr-1.5" /> Verifikasi Vendor
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
