import React from "react";
import { X, Clock, ArrowRight } from "lucide-react";
import { Button } from "./Button";

interface DataHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockHistory = [
  {
    field: "Nama Perusahaan",
    oldValue: "CV Sinar Tower",
    newValue: "PT Sinar Tower Nusantara",
    date: "10 Juni 2026, 09:15 WIB",
    user: "Bambang Triyono",
  },
  {
    field: "Alamat Lengkap",
    oldValue: "Jl. Merdeka No. 10",
    newValue: "Gedung Sinar Tower Lt. 5, Jl. Merdeka No. 10",
    date: "10 Juni 2026, 09:20 WIB",
    user: "Bambang Triyono",
  },
  {
    field: "Dokumen NPWP",
    oldValue: "NPWP_Lama.pdf",
    newValue: "NPWP_Terbaru_2026.pdf",
    date: "09 Juni 2026, 14:30 WIB",
    user: "Admin Procurement",
  },
];

export function DataHistoryModal({ isOpen, onClose }: DataHistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-10 animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-border pb-4 mb-6 shrink-0">
          <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
            <Clock className="size-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">
              Riwayat Perubahan Data
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Menampilkan perbandingan data lama dan terbaru yang telah diedit.
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-6">
            {mockHistory.map((history, idx) => (
              <div key={idx} className="bg-slate-50 border border-border/50 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-primary">{history.field}</span>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">{history.user}</span>
                    <span className="text-[10px] text-muted-foreground">{history.date}</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-1 w-full bg-rose-50/50 border border-rose-100 p-4 rounded-xl">
                    <span className="text-[10px] font-bold text-rose-500 uppercase mb-1 block">Data Sebelumnya</span>
                    <p className="text-sm font-medium text-slate-700 wrap-break-word">{history.oldValue}</p>
                  </div>

                  <div className="hidden md:flex size-8 shrink-0 bg-white border border-border/50 rounded-full items-center justify-center text-slate-400">
                    <ArrowRight className="size-4" />
                  </div>

                  <div className="flex-1 w-full bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase mb-1 block">Data Terbaru</span>
                    <p className="text-sm font-medium text-slate-700 wrap-break-word">{history.newValue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-border pt-6 mt-4 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-8 cursor-pointer"
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
