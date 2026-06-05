"use client";

import React from "react";
import { X, ClipboardCheck, Building2, User, FileText, CheckCircle, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "./Button";

interface VendorRecheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VendorRecheckModal({ isOpen, onClose }: VendorRecheckModalProps) {
  if (!isOpen) return null;

  const data = {
    region: "Indonesia",
    companyType: "PT",
    companyName: "PT Sinar Tower Nusantara",
    businessField: "Konstruksi Telekomunikasi & Fiber Optic",
    picName: "Ir. Bambang Triyono",
    country: "Indonesia",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    district: "Setiabudi",
    fullAddress: "Gedung Cyber 2, Lt. 12, Jl. H. R. Rasuna Said Blok X-5 No.13, Jakarta Selatan, 12950",
    phone: "+62 21 555-4321",
    email: "admin@sinartower.co.id",
    website: "https://sinartower.co.id",
    description: "Penyedia jasa instalasi jaringan fiber optic dan menara telekomunikasi.",
    documents: [
      { name: "Akta Pendirian Perusahaan", file: "Akta_Pendirian_STN.pdf", date: "15 Jan 2026", status: "Verified" },
      { name: "Nomor Induk Berusaha (NIB)", file: "NIB_STN_2026.pdf", date: "15 Jan 2026", status: "Verified" },
      { name: "NPWP Perusahaan", file: "NPWP_STN.pdf", date: "16 Jan 2026", status: "Verified" },
      { name: "Surat Keterangan Terdaftar (SKT)", file: "SKT_STN_2026.pdf", date: "16 Jan 2026", status: "Verified" },
      { name: "Self-Assessment Form K3LH", file: "Self_Assessment_STN.pdf", date: "27 May 2026", status: "Verified" },
    ],
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 px-4">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-300 flex flex-col border border-border max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0">
              <ClipboardCheck className="size-5.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight leading-none">
                Pengecekan Ulang Data Pendaftaran
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                Tinjauan data dan dokumen yang telah Anda masukkan dalam sistem VMS.
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
          
          {/* Basic Info */}
          <div>
            <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
              1. Informasi Dasar
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-border/40 text-xs">
              <div>
                <span className="font-semibold text-slate-400 block">Tipe Wilayah</span>
                <span className="text-slate-800 font-bold mt-1 block">{data.region}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block">Bentuk Badan Usaha & Nama</span>
                <span className="text-slate-800 font-bold mt-1 block">{data.companyType}. {data.companyName}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block">Bidang Usaha Utama</span>
                <span className="text-slate-800 font-semibold mt-1 block">{data.businessField}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block">Nama Direktur / PIC Utama</span>
                <span className="text-slate-800 font-semibold mt-1 block">{data.picName}</span>
              </div>
            </div>
          </div>

          {/* Profile & Contacts */}
          <div>
            <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
              2. Detail Profil & Alamat Kantor
            </h4>
            <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-border/40 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <span className="font-semibold text-slate-400 block">Negara</span>
                  <span className="text-slate-700 font-medium mt-0.5 block">{data.country}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block">Provinsi / Kota</span>
                  <span className="text-slate-700 font-medium mt-0.5 block">{data.province}, {data.city}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block">Kecamatan</span>
                  <span className="text-slate-700 font-medium mt-0.5 block">{data.district}</span>
                </div>
              </div>
              <div className="border-t border-slate-200/60 pt-3">
                <span className="font-semibold text-slate-400 block">Alamat Lengkap</span>
                <span className="text-slate-700 font-medium mt-1.5 block leading-relaxed">{data.fullAddress}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200/60 pt-3">
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-slate-400" />
                  <span className="text-slate-600 font-medium">{data.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-slate-400" />
                  <span className="text-slate-600 font-medium truncate">{data.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="size-3.5 text-slate-400" />
                  <span className="text-slate-600 font-medium truncate">{data.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submitted Documents */}
          <div>
            <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
              3. Berkas & Dokumen Legalitas terunggah
            </h4>
            <div className="divide-y divide-slate-100 border border-border/50 rounded-2xl overflow-hidden bg-white text-xs">
              {data.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <FileText className="size-4 text-primary shrink-0" />
                    <div>
                      <span className="font-bold text-slate-700 block">{doc.name}</span>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{doc.file} ({doc.date})</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    ✓ Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
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
