"use client";

import React, { useState } from "react";
import { LayoutGrid, Download, Plus, Printer, ShieldCheck, Clock, RefreshCw, AlertOctagon, Eye } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { VendorDetailModal } from "@/components/ui/VendorDetailModal";

export default function AdminDashboard() {
  const { toast } = useToast();

  const [pageSize, setPageSize] = useState("10");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const vendors = [
    {
      name: "PT Sinar Tower Nusantara",
      category: "Konstruksi Telekomunikasi & Fiber Optic",
      pic: "Ir. Bambang Triyono",
      status: "Verified",
      date: "02 Jun 2026",
    },
    {
      name: "PT Global Net Solutions",
      category: "IT, Networking & Cloud Infrastructure",
      pic: "Dewi Lestari",
      status: "Pending",
      date: "04 Jun 2026",
    },
    {
      name: "CV TechSys Telecom",
      category: "Penyedia Kabel & Elektronik Daya",
      pic: "Hendry Prasetya",
      status: "Revision Needed",
      date: "03 Jun 2026",
    },
    {
      name: "PT Mahakarya Sipil Utama",
      category: "Kontraktor Sipil, Mekanikal & Elektrikal",
      pic: "Ir. H. Mulyono",
      status: "Rejected",
      date: "28 May 2026",
    },
    {
      name: "UD Prima Safety Equipment",
      category: "Supplier Alat Pelindung Diri & K3LH",
      pic: "Sutrisno",
      status: "Verified",
      date: "25 May 2026",
    },
  ];

  const pageSizeOptions = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

  const handleExportCSV = () => {
    toast("Mengekspor berkas CSV database vendor...", "success");
  };

  const handleAddManual = () => {
    toast("Fitur penambahan vendor manual membutuhkan hak akses SuperAdmin.", "warning");
  };

  const handlePrint = () => {
    toast("Mempersiapkan dokumen cetak database vendor...", "info");
  };

  const handleDetail = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsDetailOpen(true);
  };

  const handleVerifyVendor = (name: string) => {
    toast(`Akun Mitra "${name}" telah diverifikasi sepenuhnya!`, "success");
  };

  // Filter vendors based on search query
  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.pic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 px-4 sm:px-0">
      
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <LayoutGrid className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Manajemen Database Vendor</h1>
            <p className="text-sm text-muted-foreground">Kelola, verifikasi, dan pantau kelengkapan berkas legalitas dari calon mitra bisnis.</p>
          </div>
        </div>
        
        {/* Quick Stats Badges */}
        <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-600 bg-white p-3 rounded-2xl border border-border/50 shadow-sm shrink-0">
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-100">
            2 Terverifikasi
          </span>
          <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg border border-amber-100">
            1 Menunggu
          </span>
          <span className="bg-red-50 text-red-700 px-3 py-1 rounded-lg border border-red-100">
            1 Ditolak
          </span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border/50 shadow-sm">
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-bold text-primary uppercase tracking-wider">Dataset Pendaftaran Mitra</h2>
          <span className="text-xs text-muted-foreground font-semibold">Total: 1,256 Mitra Terdaftar</span>
        </div>
        <div className="w-full h-px bg-slate-100 mb-8" />

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-[#4FA0FF] hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-sm shadow-blue-500/10"
          >
            <Download className="size-4" /> Export Berkas CSV
          </button>
          <button
            onClick={handleAddManual}
            className="flex items-center gap-2 bg-[#48B365] hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-sm shadow-green-500/10"
          >
            <Plus className="size-4" /> Tambah Vendor Manual
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 size-10 rounded-xl transition-colors cursor-pointer border border-border/50"
          >
            <Printer className="size-4" />
          </button>
        </div>

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6 text-xs font-semibold text-slate-600">
          {/* Custom Select pagination control */}
          <div className="flex items-center gap-3 w-full sm:w-44 shrink-0">
            <span>Tampilkan</span>
            <div className="flex-1">
              <Select
                value={pageSize}
                onChange={setPageSize}
                options={pageSizeOptions}
                placeholder="10"
              />
            </div>
            <span>entri</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <label htmlFor="search" className="font-bold shrink-0">Cari Vendor:</label>
            <input 
              id="search"
              type="text" 
              placeholder="Ketik nama vendor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-border/50 rounded-xl px-4 py-2 h-12 outline-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/50 transition-all w-full sm:w-60 font-semibold text-slate-800"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mb-6 border border-border/40 rounded-2xl bg-slate-50">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-800 text-white/90 text-xs font-bold uppercase tracking-wider">
                <th className="py-4.5 px-6">Nama Badan Usaha</th>
                <th className="py-4.5 px-6">Kategori Kemitraan</th>
                <th className="py-4.5 px-6">Penanggung Jawab (PIC)</th>
                <th className="py-4.5 px-6">Tanggal Daftar</th>
                <th className="py-4.5 px-6">Status Akun</th>
                <th className="py-4.5 px-6 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 bg-white text-xs">
              {filteredVendors.map((vendor, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-800">{vendor.name}</td>
                  <td className="py-4 px-6 font-medium text-slate-600">{vendor.category}</td>
                  <td className="py-4 px-6 text-slate-700 font-semibold">{vendor.pic}</td>
                  <td className="py-4 px-6 text-slate-500 font-mono font-medium">{vendor.date}</td>
                  <td className="py-4 px-6">
                    {vendor.status === "Verified" && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                        <ShieldCheck className="size-3.5" /> Terverifikasi
                      </span>
                    )}
                    {vendor.status === "Pending" && (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-bold">
                        <Clock className="size-3.5 animate-pulse" /> Pending
                      </span>
                    )}
                    {vendor.status === "Revision Needed" && (
                      <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-800 border border-orange-200 px-3 py-1 rounded-full font-bold">
                        <RefreshCw className="size-3.5" /> Butuh Revisi
                      </span>
                    )}
                    {vendor.status === "Rejected" && (
                      <span className="inline-flex items-center gap-1 bg-red-50 text-red-800 border border-red-200 px-3 py-1 rounded-full font-bold">
                        <AlertOctagon className="size-3.5" /> Ditolak
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleDetail(vendor)}
                        className="flex items-center gap-1 text-primary hover:text-primary-hover font-bold hover:underline cursor-pointer"
                      >
                        <Eye className="size-3.5" /> Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVendors.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold">
                    Tidak ditemukan data vendor yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <p>Menampilkan 1 hingga {filteredVendors.length} dari {filteredVendors.length} entri (Disaring dari 1,256 total entri)</p>
          
          <div className="flex items-center border border-border/50 rounded-xl overflow-hidden shadow-sm bg-white">
            <button className="px-4 py-2 hover:bg-slate-50 border-r border-border/50 transition-colors cursor-pointer text-slate-400 disabled:opacity-50" disabled>Sebelumnya</button>
            <button className="px-4 py-2 bg-primary text-white font-bold border-r border-border/50 cursor-pointer">1</button>
            <button className="px-4 py-2 hover:bg-slate-50 border-r border-border/50 transition-colors cursor-pointer">2</button>
            <button className="px-4 py-2 hover:bg-slate-50 border-r border-border/50 transition-colors cursor-pointer">3</button>
            <button className="px-4 py-2 hover:bg-slate-50 transition-colors cursor-pointer">Berikutnya</button>
          </div>
        </div>
      </div>

      {/* Vendor Detail Modal */}
      <VendorDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        vendor={selectedVendor}
        onVerify={handleVerifyVendor}
      />
    </div>
  );
}
