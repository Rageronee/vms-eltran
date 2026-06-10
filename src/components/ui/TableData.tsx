import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";

export interface ProductItem {
  id: string;
  name: string;
  type: string;
  category: string;
}

interface TableDataProps {
  items: ProductItem[];
  onChange: (items: ProductItem[]) => void;
}

export function TableData({ items, onChange }: TableDataProps) {
  const [newItem, setNewItem] = useState({ name: "", type: "", category: "" });

  const handleAdd = () => {
    if (!newItem.name || !newItem.type || !newItem.category) return;
    
    onChange([
      ...items,
      {
        id: Math.random().toString(36).substring(2, 9),
        ...newItem
      }
    ]);
    
    setNewItem({ name: "", type: "", category: "" });
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Add New Item Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-slate-50 p-4 rounded-xl border border-border/50">
        <Input
          label="Nama Barang / Jasa"
          placeholder="e.g. Kabel Fiber Optic"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <Input
          label="Jenis"
          placeholder="e.g. Material"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
        />
        <Input
          label="Kategori"
          placeholder="e.g. Infrastruktur"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <Button 
          type="button" 
          onClick={handleAdd}
          disabled={!newItem.name || !newItem.type || !newItem.category}
          className="w-full bg-primary hover:bg-primary-hover text-white gap-2 cursor-pointer h-[48px]"
        >
          <Plus className="size-4" /> Tambah
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border/50">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100/80 text-slate-600 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Nama Barang / Jasa</th>
              <th className="px-6 py-4">Jenis</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4 text-center w-[100px]">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 bg-white">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground italic">
                  Belum ada data barang/jasa yang ditambahkan.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.type}</td>
                  <td className="px-6 py-4 text-slate-600">{item.category}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
