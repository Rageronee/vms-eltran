"use client";

import React, { useState } from "react";
import { UserCircle, Save, Building2, MapPin, Phone, Mail, FileBadge } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function ProfilPage() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    companyName: "PT Sinar Tower Nusantara",
    category: "Konstruksi Telekomunikasi & Fiber Optic",
    npwp: "01.234.567.8-901.000",
    picName: "Ir. Bambang Triyono",
    email: "admin@sinartower.co.id",
    phone: "+62 21 5551234",
    address: "Gedung Cyber 2, Lt. 12, Jl. H. R. Rasuna Said Blok X-5 No.13, Jakarta Selatan, 12950",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.companyName || !formData.category || !formData.npwp || !formData.picName || !formData.email || !formData.phone || !formData.address) {
      toast("Harap lengkapi semua kolom profil perusahaan.", "warning");
      return;
    }
    
    // Show themed custom toast for save action
    toast("Perubahan profil perusahaan berhasil disimpan secara aman.", "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <UserCircle className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Profil Perusahaan</h1>
            <p className="text-sm text-muted-foreground">Tinjau dan perbarui informasi legalitas serta data kontak penanggung jawab perusahaan.</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg shadow-primary/20 cursor-pointer"
        >
          <Save className="size-4" /> Simpan Perubahan
        </button>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm space-y-8">
        
        {/* Basic Info */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-border/50 pb-4">
            <Building2 className="size-5 text-primary" /> Informasi Dasar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Perusahaan</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-border/60 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-slate-800 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori Bisnis</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-border/60 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-slate-800 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">NPWP Perusahaan</label>
              <div className="relative">
                <FileBadge className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.npwp}
                  onChange={(e) => handleInputChange("npwp", e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-border/60 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-slate-800 font-mono text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Direktur / PIC</label>
              <input
                type="text"
                value={formData.picName}
                onChange={(e) => handleInputChange("picName", e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-border/60 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-slate-800 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contact & Address */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-border/50 pb-4">
            <MapPin className="size-5 text-primary" /> Kontak & Alamat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Perusahaan</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-border/60 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-slate-800 text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nomor Telepon</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-border/60 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-slate-800 font-mono text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alamat Lengkap</label>
              <textarea
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full p-4 rounded-xl border border-border/60 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-slate-800 resize-none text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
