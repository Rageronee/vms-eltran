"use client";

import React, { useState } from "react";
import { FolderOpen, Search, Download, FileText, Calendar, Filter, FileCode } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";

interface ArchiveDocument {
  id: string;
  vendorName: string;
  docName: string;
  category: string;
  uploadDate: string;
  fileSize: string;
}

export default function BerkasMasukPage() {
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Mock list of files in the archive
  const [documents] = useState<ArchiveDocument[]>([
    {
      id: "arc-1",
      vendorName: "PT Sinar Tower Nusantara",
      docName: "Nomor Induk Berusaha (NIB).pdf",
      category: "NIB",
      uploadDate: "04 Jun 2026",
      fileSize: "1.4 MB",
    },
    {
      id: "arc-2",
      vendorName: "PT Global Net Solutions",
      docName: "Akta Pendirian PT.pdf",
      category: "Deed",
      uploadDate: "04 Jun 2026",
      fileSize: "4.2 MB",
    },
    {
      id: "arc-3",
      vendorName: "CV TechSys Telecom",
      docName: "Dokumen NPWP Perusahaan.pdf",
      category: "NPWP",
      uploadDate: "03 Jun 2026",
      fileSize: "920 KB",
    },
    {
      id: "arc-4",
      vendorName: "PT Mahakarya Sipil Utama",
      docName: "Laporan Keuangan Audit 2025.pdf",
      category: "Financial Report",
      uploadDate: "02 Jun 2026",
      fileSize: "3.8 MB",
    },
    {
      id: "arc-5",
      vendorName: "UD Prima Safety Equipment",
      docName: "Surat Keterangan Terdaftar (SKT).pdf",
      category: "SKT",
      uploadDate: "28 May 2026",
      fileSize: "1.1 MB",
    },
    {
      id: "arc-6",
      vendorName: "PT Sinar Tower Nusantara",
      docName: "Self-Assessment Form K3LH.pdf",
      category: "Self-Assessment",
      uploadDate: "27 May 2026",
      fileSize: "2.3 MB",
    },
  ]);

  const categoryOptions = [
    { value: "All", label: "Semua Kategori" },
    { value: "NIB", label: "NIB" },
    { value: "Deed", label: "Akta Pendirian (Deed)" },
    { value: "NPWP", label: "NPWP" },
    { value: "SKT", label: "SKT" },
    { value: "Self-Assessment", label: "Self-Assessment" },
    { value: "Financial Report", label: "Laporan Keuangan" },
  ];

  const handleDownload = (docName: string) => {
    // Show themed custom toast for download action
    toast(`Berhasil mengunduh dokumen "${docName}" ke komputer Anda.`, "success");
  };

  // Filtered lists (memoized to avoid re-run on other state changes)
  const filteredDocuments = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return documents.filter((doc) => {
      const matchesSearch =
        !query ||
        doc.vendorName.toLowerCase().includes(query) ||
        doc.docName.toLowerCase().includes(query);
        
      const matchesCategory = categoryFilter === "All" || doc.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter, documents]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 px-4 sm:px-0">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
          <FolderOpen className="size-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Berkas Masuk</h1>
          <p className="text-sm text-muted-foreground">Arsip digital seluruh kelengkapan dokumen yang diunggah oleh mitra bisnis PT Eltran Indonesia.</p>
        </div>
      </div>

      {/* Main card grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border/50 shadow-sm">
        
        {/* Search and Filter Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-border/40">
          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama vendor atau berkas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white border border-border/60 rounded-xl text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground font-semibold text-slate-800"
            />
          </div>

          {/* Custom Select Filter */}
          <div className="w-full md:w-64 shrink-0">
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={categoryOptions}
              placeholder="Kategori dokumen"
            />
          </div>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto border border-border/40 rounded-2xl bg-slate-50">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-800 text-white/90 text-xs font-bold uppercase tracking-wider">
                <th className="py-4.5 px-6">Nama Badan Usaha (Vendor)</th>
                <th className="py-4.5 px-6">Nama File Dokumen</th>
                <th className="py-4.5 px-6">Kategori</th>
                <th className="py-4.5 px-6">Ukuran File</th>
                <th className="py-4.5 px-6">Tanggal Diterima</th>
                <th className="py-4.5 px-6 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 bg-white text-xs">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-800">{doc.vendorName}</td>
                  <td className="py-4 px-6 font-medium text-slate-700">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-primary shrink-0" />
                      <span>{doc.docName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-bold border border-slate-200">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-mono font-medium">{doc.fileSize}</td>
                  <td className="py-4 px-6 text-slate-500 font-mono font-medium">{doc.uploadDate}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleDownload(doc.docName)}
                      className="flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer shadow-sm shadow-primary/10 mx-auto"
                    >
                      <Download className="size-3.5" /> Unduh
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                    Tidak ditemukan berkas yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
