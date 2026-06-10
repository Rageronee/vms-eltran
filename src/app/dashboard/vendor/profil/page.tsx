"use client";

import React, { useState } from "react";
import { UserCircle, Save, Building2, MapPin, Phone, Mail, FileBadge, Edit3, X } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

export default function ProfilPage() {
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "PT Sinar Tower Nusantara",
    category: "Konstruksi Telekomunikasi & Fiber Optic",
    npwp: "01.234.567.8-901.000",
    picName: "Ir. Bambang Triyono",
    email: "admin@sinartower.co.id",
    phone: "+62 21 5551234",
    address: "Gedung Cyber 2, Lt. 12, Jl. H. R. Rasuna Said Blok X-5 No.13, Jakarta Selatan, 12950",
  });

  const [draftData, setDraftData] = useState(formData);

  const handleInputChange = (field: keyof typeof draftData, value: string) => {
    setDraftData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!draftData.companyName || !draftData.category || !draftData.npwp || !draftData.picName || !draftData.email || !draftData.phone || !draftData.address) {
      toast("Harap lengkapi semua kolom profil perusahaan.", "warning");
      return;
    }
    
    setFormData(draftData);
    setIsEditing(false);
    toast("Perubahan profil perusahaan berhasil disimpan secara aman.", "success");
  };

  const handleCancel = () => {
    setDraftData(formData); // Revert to original
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10 px-4 sm:px-0">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <UserCircle className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Profil Perusahaan</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Tinjau dan perbarui informasi legalitas serta data kontak penanggung jawab perusahaan.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
              >
                <X className="size-4" /> Batal
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg shadow-secondary/20 cursor-pointer"
              >
                <Save className="size-4" /> Simpan Perubahan
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 border border-border/80 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <Edit3 className="size-4" /> Edit Profil
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border/50 shadow-sm space-y-8 relative overflow-hidden">
        
        {/* Read-only overlay hint */}
        {!isEditing && (
          <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest border-l border-b border-border/50">
            Mode Baca
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-border/50 pb-4">
            <Building2 className="size-5 text-primary" /> Informasi Dasar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Nama Perusahaan */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Perusahaan</label>
              {isEditing ? (
                <input
                  type="text"
                  value={draftData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className="w-full h-12 px-4 rounded-xl outline-none border border-border/60 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-slate-800 shadow-sm font-medium text-xs sm:text-sm transition-all"
                />
              ) : (
                <div className="w-full font-bold text-slate-800 text-xs sm:text-sm py-2 leading-relaxed min-h-10 flex items-center">
                  {draftData.companyName}
                </div>
              )}
            </div>

            {/* Kategori Bisnis */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kategori Bisnis</label>
              {isEditing ? (
                <input
                  type="text"
                  value={draftData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full h-12 px-4 rounded-xl outline-none border border-border/60 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-slate-800 shadow-sm font-medium text-xs sm:text-sm transition-all"
                />
              ) : (
                <div className="w-full font-semibold text-slate-700 text-xs sm:text-sm py-2 leading-relaxed min-h-10 flex items-center">
                  {draftData.category}
                </div>
              )}
            </div>

            {/* NPWP Perusahaan */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">NPWP Perusahaan</label>
              {isEditing ? (
                <div className="relative flex items-center">
                  <FileBadge className="absolute left-4 size-4 text-slate-400" />
                  <input
                    type="text"
                    value={draftData.npwp}
                    onChange={(e) => handleInputChange("npwp", e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl outline-none border border-border/60 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-slate-800 shadow-sm font-mono text-xs sm:text-sm transition-all"
                  />
                </div>
              ) : (
                <div className="w-full font-mono font-medium text-slate-700 text-xs sm:text-sm py-2 leading-relaxed min-h-10 flex items-center gap-2">
                  <FileBadge className="size-4 text-primary shrink-0" />
                  <span>{draftData.npwp}</span>
                </div>
              )}
            </div>

            {/* Nama Direktur / PIC */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Direktur / PIC</label>
              {isEditing ? (
                <input
                  type="text"
                  value={draftData.picName}
                  onChange={(e) => handleInputChange("picName", e.target.value)}
                  className="w-full h-12 px-4 rounded-xl outline-none border border-border/60 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-slate-800 shadow-sm font-medium text-xs sm:text-sm transition-all"
                />
              ) : (
                <div className="w-full font-medium text-slate-700 text-xs sm:text-sm py-2 leading-relaxed min-h-10 flex items-center">
                  {draftData.picName}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Contact & Address */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-border/50 pb-4 mt-8">
            <MapPin className="size-5 text-primary" /> Kontak & Alamat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Email Perusahaan */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Perusahaan</label>
              {isEditing ? (
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 size-4 text-slate-400" />
                  <input
                    type="email"
                    value={draftData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl outline-none border border-border/60 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-slate-800 shadow-sm font-medium text-xs sm:text-sm transition-all"
                  />
                </div>
              ) : (
                <div className="w-full font-medium text-slate-700 text-xs sm:text-sm py-2 leading-relaxed min-h-10 flex items-center gap-2">
                  <Mail className="size-4 text-primary shrink-0" />
                  <span>{draftData.email}</span>
                </div>
              )}
            </div>

            {/* Nomor Telepon */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nomor Telepon</label>
              {isEditing ? (
                <div className="relative flex items-center">
                  <Phone className="absolute left-4 size-4 text-slate-400" />
                  <input
                    type="tel"
                    value={draftData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl outline-none border border-border/60 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-slate-800 shadow-sm font-mono text-xs sm:text-sm transition-all"
                  />
                </div>
              ) : (
                <div className="w-full font-mono font-medium text-slate-700 text-xs sm:text-sm py-2 leading-relaxed min-h-10 flex items-center gap-2">
                  <Phone className="size-4 text-primary shrink-0" />
                  <span>{draftData.phone}</span>
                </div>
              )}
            </div>

            {/* Alamat Lengkap */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alamat Lengkap</label>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={draftData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full rounded-xl outline-none transition-all font-medium resize-none text-xs sm:text-sm p-4 border border-border/60 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-slate-800 shadow-sm animate-in fade-in duration-200"
                />
              ) : (
                <div className="w-full font-medium text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap py-2">
                  {draftData.address}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
