"use client";

import React, { useState } from "react";
import { ShieldCheck, Check, X, FileText, Eye, ArrowLeftRight } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { AdminReviewModal } from "@/components/ui/AdminReviewModal";
import { useToast } from "@/components/ui/Toast";

interface PendingDocument {
  id: string;
  vendorName: string;
  docName: string;
  docType: string;
  uploadDate: string;
  status: "Pending" | "Verified" | "Revision Needed";
}

export default function PersetujuanDokumenPage() {
  const { toast } = useToast();
  
  // State for mock documents list
  const [documents, setDocuments] = useState<PendingDocument[]>([
    {
      id: "doc-1",
      vendorName: "PT Sinar Tower Nusantara",
      docName: "Nomor Induk Berusaha (NIB)",
      docType: "NIB",
      uploadDate: "04 Jun 2026",
      status: "Pending",
    },
    {
      id: "doc-2",
      vendorName: "PT Global Net Solutions",
      docName: "Akta Pendirian Perusahaan",
      docType: "Deed",
      uploadDate: "04 Jun 2026",
      status: "Pending",
    },
    {
      id: "doc-3",
      vendorName: "CV TechSys Telecom",
      docName: "Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)",
      docType: "SKPP",
      uploadDate: "03 Jun 2026",
      status: "Pending",
    },
    {
      id: "doc-4",
      vendorName: "PT Mahakarya Sipil Utama",
      docName: "Laporan Keuangan 2025",
      docType: "Financial Report",
      uploadDate: "02 Jun 2026",
      status: "Revision Needed",
    },
    {
      id: "doc-5",
      vendorName: "UD Prima Safety Equipment",
      docName: "Surat Keterangan Terdaftar (SKT)",
      docType: "SKT",
      uploadDate: "28 May 2026",
      status: "Verified",
    },
  ]);

  // Dropdown filter state
  const [statusFilter, setStatusFilter] = useState("All");
  
  // AdminReviewModal state
  const [selectedDoc, setSelectedDoc] = useState<PendingDocument | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Filter options for custom Select
  const filterOptions = [
    { value: "All", label: "Semua Status" },
    { value: "Pending", label: "Menunggu Verifikasi (Pending)" },
    { value: "Verified", label: "Terverifikasi (Verified)" },
    { value: "Revision Needed", label: "Butuh Revisi (Revision Needed)" },
  ];

  const handleReviewDecision = (decision: "approve" | "reject", reason: string) => {
    if (!selectedDoc) return;

    // Update status in local state
    setDocuments((prev) =>
      prev.map((d) => {
        if (d.id === selectedDoc.id) {
          return {
            ...d,
            status: decision === "approve" ? "Verified" : "Revision Needed",
          };
        }
        return d;
      })
    );

    // Show themed toast notification with the decision and reason
    if (decision === "approve") {
      toast(
        `Dokumen "${selectedDoc.docName}" dari ${selectedDoc.vendorName} disetujui. Alasan: "${reason}"`,
        "success"
      );
    } else {
      toast(
        `Revisi dokumen "${selectedDoc.docName}" (${selectedDoc.vendorName}) telah diajukan. Alasan: "${reason}"`,
        "warning"
      );
    }
  };

  // Filtered documents list
  const filteredDocuments = documents.filter((doc) => {
    if (statusFilter === "All") return true;
    return doc.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <ShieldCheck className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Persetujuan Dokumen</h1>
            <p className="text-sm text-muted-foreground">Tinjau, verifikasi, dan kelola dokumen legalitas yang diajukan oleh mitra vendor.</p>
          </div>
        </div>

        {/* Quick summary badges */}
        <div className="flex gap-3 text-xs font-bold text-slate-600 bg-white p-3 rounded-2xl border border-border/50 shadow-sm shrink-0">
          <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg border border-amber-100 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
            {documents.filter((d) => d.status === "Pending").length} Menunggu
          </span>
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-100">
            {documents.filter((d) => d.status === "Verified").length} Disetujui
          </span>
        </div>
      </div>

      {/* Main card panel */}
      <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-[15px] font-bold text-primary uppercase tracking-wider">Antrean Verifikasi Berkas</h2>
          
          {/* Custom Select Filter instead of default HTML select */}
          <div className="w-full sm:w-72 shrink-0">
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              options={filterOptions}
              placeholder="Saring status..."
            />
          </div>
        </div>

        <div className="w-full h-px bg-slate-100 mb-8" />

        {/* Table of pending approvals */}
        <div className="overflow-x-auto border border-border/40 rounded-2xl bg-slate-50">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-800 text-white/90 text-xs font-bold uppercase tracking-wider">
                <th className="py-4.5 px-6">Nama Vendor</th>
                <th className="py-4.5 px-6">Nama Dokumen</th>
                <th className="py-4.5 px-6">Tipe Berkas</th>
                <th className="py-4.5 px-6">Tanggal Upload</th>
                <th className="py-4.5 px-6">Status</th>
                <th className="py-4.5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 bg-white text-xs">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4.5 px-6 font-bold text-slate-800">{doc.vendorName}</td>
                  <td className="py-4.5 px-6 font-medium text-slate-700">{doc.docName}</td>
                  <td className="py-4.5 px-6 font-semibold text-slate-500 font-mono">{doc.docType}</td>
                  <td className="py-4.5 px-6 text-slate-500 font-medium font-mono">{doc.uploadDate}</td>
                  <td className="py-4.5 px-6">
                    {doc.status === "Verified" && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                        <Check className="size-3.5" /> Terverifikasi
                      </span>
                    )}
                    {doc.status === "Pending" && (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-bold">
                        <span className="size-2 bg-amber-500 rounded-full animate-pulse mr-1" /> Pending
                      </span>
                    )}
                    {doc.status === "Revision Needed" && (
                      <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-800 border border-orange-200 px-3 py-1 rounded-full font-bold">
                        <ArrowLeftRight className="size-3.5" /> Butuh Revisi
                      </span>
                    )}
                  </td>
                  <td className="py-4.5 px-6">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setSelectedDoc(doc);
                          setIsReviewOpen(true);
                        }}
                        className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer border border-border/60 hover:text-primary"
                      >
                        <Eye className="size-3.5" /> Lihat
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                    Tidak ada berkas yang memenuhi kriteria penyaringan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Document Review Modal */}
      <AdminReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        document={selectedDoc}
        onConfirm={handleReviewDecision}
      />
    </div>
  );
}
