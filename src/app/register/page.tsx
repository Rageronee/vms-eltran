"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TableData } from "@/components/ui/TableData";
import { ChevronLeft, ArrowRight, FileText, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
// Interactive File Upload Input Component
const FileUploadInput = ({
  label,
  required,
  placeholder,
  fileName,
  onFileSelect,
  error,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  fileName?: string;
  onFileSelect: (name: string) => void;
  error?: string;
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0].name);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground">
        {label} {required && <span className="text-secondary">*</span>}
      </label>
      <div className={cn(
        "flex items-center h-12 w-full rounded-xl border bg-surface-dim overflow-hidden transition-all",
        error ? "border-secondary" : "border-border/50 hover:border-primary/50"
      )}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf"
        />
        <Button
          type="button"
          onClick={handleButtonClick}
          className={cn(
            "h-full rounded-none px-6 text-white shadow-none shrink-0 cursor-pointer",
            error ? "bg-secondary hover:bg-secondary-hover" : "bg-primary hover:bg-primary-hover"
          )}
        >
          Upload
        </Button>
        <span className="flex-1 min-w-0 text-sm text-slate-700 px-4 truncate">
          {fileName ? (
            <span className="font-semibold text-emerald-600 block truncate">
              ✓ {fileName}
            </span>
          ) : (
            <span className="block truncate">{placeholder}</span>
          )}
        </span>
      </div>
      {error && (
        <span className="text-xs font-semibold text-secondary animate-in fade-in duration-200">
          {error}
        </span>
      )}
    </div>
  );
};

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitError, setSubmitError] = useState("");
  const [isStatementOpen, setIsStatementOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [dataConfirmed, setDataConfirmed] = useState(false);

  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Consolidated Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    region: "Indonesia",
    companyType: "",
    companyName: "",
    businessField: "",
    subBusinessField: "",
    ceoName: "",

    // Step 2: Company Profile
    country: "Indonesia",
    province: "",
    city: "",
    district: "",
    fullAddress: "",
    zipCode: "",
    phone: "",
    fax: "",
    email: "",
    website: "",
    description: "",

    // Step 3: Legal Documents
    deedNumber: "",
    deedDate: "",
    deedFile: "",

    skNumber: "",
    skDate: "",
    skFile: "",

    deedAmendmentNumber: "",
    deedAmendmentDate: "",
    deedAmendmentFile: "",

    skAmendmentNumber: "",
    skAmendmentDate: "",
    skAmendmentFile: "",

    nibNumber: "",
    nibDate: "",
    nibFile: "",

    npwpNumber: "",
    npwpFile: "",

    sktNumber: "",
    sktFile: "",

    skppNumber: "",
    skppFile: "",

    financialReportNumber: "",
    financialReportFile: "",

    otherDocNumber: "",
    otherDocFile: "",

    // Step 4: Product Catalog & Items
    brochureFile: "",
    products: [] as { id: string; name: string; type: string; category: string }[],

    // Step 5: Supporting Documents & Agreements
    selfAssessmentFile: "",
    agreeToStatementLetter: false,
  });

  // Format NPWP helper (XX.XXX.XXX.X-XXX.XXX)
  const formatNPWP = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 15);
    let formatted = "";
    if (digits.length > 0) formatted += digits.slice(0, 2);
    if (digits.length > 2) formatted += "." + digits.slice(2, 5);
    if (digits.length > 5) formatted += "." + digits.slice(5, 8);
    if (digits.length > 8) formatted += "." + digits.slice(8, 9);
    if (digits.length > 9) formatted += "-" + digits.slice(9, 12);
    if (digits.length > 12) formatted += "." + digits.slice(12, 15);
    return formatted;
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("vendorRegisterDraft");
    if (savedDraft && savedDraft.trim()) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed && typeof parsed === "object" && parsed.formData) {
          setFormData(parsed.formData);
        }
      } catch (e) {
        console.error("Failed to parse register draft", e);
      }
    }
  }, []);

  // Save to localStorage with debounce on change to keep typing smooth and responsive
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const timer = setTimeout(() => {
      localStorage.setItem("vendorRegisterDraft", JSON.stringify({ step, formData }));
    }, 800);

    return () => clearTimeout(timer);
  }, [step, formData]);

  const handleFinalSubmit = () => {
    // Clear draft on success
    localStorage.removeItem("vendorRegisterDraft");
    setIsPreviewOpen(false);
    setIsSuccessOpen(true);
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when edited
    if (errors[field]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[field];
        return nextErrors;
      });
    }
  };

  // Input Handlers with restrictions
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 5);
    handleInputChange("zipCode", val);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9+\-\s]/g, "");
    handleInputChange("phone", val);
  };

  const handleFaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9+\-\s]/g, "");
    handleInputChange("fax", val);
  };

  const handleNpwpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const formatted = formatNPWP(val);
    handleInputChange("npwpNumber", formatted);
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.companyType.trim()) newErrors.companyType = "Bentuk badan usaha wajib diisi (misal: PT, CV).";
      if (!formData.companyName.trim()) newErrors.companyName = "Nama perusahaan wajib diisi.";
      if (!formData.businessField.trim()) newErrors.businessField = "Bidang usaha wajib diisi.";
      if (!formData.subBusinessField.trim()) newErrors.subBusinessField = "Sub bidang usaha wajib diisi.";
      if (!formData.ceoName.trim()) newErrors.ceoName = "Nama pemilik / CEO wajib diisi.";
    }

    if (currentStep === 2) {
      if (!formData.country.trim()) newErrors.country = "Negara wajib diisi.";
      if (!formData.province.trim()) newErrors.province = "Provinsi wajib diisi.";
      if (!formData.city.trim()) newErrors.city = "Kota wajib diisi.";
      if (!formData.district.trim()) newErrors.district = "Kecamatan wajib diisi.";
      if (!formData.fullAddress.trim()) newErrors.fullAddress = "Alamat lengkap wajib diisi.";
      
      // Zip code validation
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = "Kode pos wajib diisi.";
      } else if (!/^\d{5}$/.test(formData.zipCode.trim())) {
        newErrors.zipCode = "Kode pos harus terdiri dari 5 digit angka.";
      }

      // Phone validation
      if (!formData.phone.trim()) {
        newErrors.phone = "Nomor telepon wajib diisi.";
      } else {
        const cleanPhone = formData.phone.trim().replace(/\s|\-/g, "");
        if (!/^\+?[0-9]{8,15}$/.test(cleanPhone)) {
          newErrors.phone = "Format nomor telepon tidak valid (8-15 digit angka, contoh: +62812345678).";
        }
      }

      // Fax validation (optional)
      if (formData.fax.trim()) {
        const cleanFax = formData.fax.trim().replace(/\s|\-/g, "");
        if (!/^\+?[0-9]{8,15}$/.test(cleanFax)) {
          newErrors.fax = "Format nomor fax tidak valid.";
        }
      }

      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = "Email perusahaan wajib diisi.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = "Format email tidak valid.";
      }

      // Website validation (optional)
      if (formData.website.trim()) {
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        if (!urlPattern.test(formData.website.trim())) {
          newErrors.website = "Format URL website tidak valid (contoh: https://company.com).";
        }
      }

      if (!formData.description.trim()) newErrors.description = "Deskripsi produk/jasa wajib diisi.";
    }

    if (currentStep === 3) {
      // Deed of Establishment
      if (!formData.deedNumber.trim()) newErrors.deedNumber = "Nomor akte pendirian wajib diisi.";
      if (!formData.deedDate.trim()) newErrors.deedDate = "Tanggal akte pendirian wajib diisi.";
      if (!formData.deedFile) newErrors.deedFile = "Dokumen akte pendirian wajib diunggah.";

      // SK Kemenkumham
      if (!formData.skNumber.trim()) newErrors.skNumber = "Nomor SK Kemenkumham wajib diisi.";
      if (!formData.skDate.trim()) newErrors.skDate = "Tanggal SK Kemenkumham wajib diisi.";
      if (!formData.skFile) newErrors.skFile = "Dokumen SK Kemenkumham wajib diunggah.";

      // NIB
      if (!formData.nibNumber.trim()) newErrors.nibNumber = "Nomor NIB wajib diisi.";
      if (!formData.nibDate.trim()) newErrors.nibDate = "Tanggal NIB wajib diisi.";
      if (!formData.nibFile) newErrors.nibFile = "Dokumen NIB wajib diunggah.";

      // NPWP
      if (!formData.npwpNumber.trim()) {
        newErrors.npwpNumber = "Nomor NPWP wajib diisi.";
      } else {
        const cleanNPWP = formData.npwpNumber.replace(/[^0-9]/g, "");
        if (cleanNPWP.length !== 15 && cleanNPWP.length !== 16) {
          newErrors.npwpNumber = "Nomor NPWP tidak valid (harus 15 atau 16 digit angka).";
        }
      }
      if (!formData.npwpFile) newErrors.npwpFile = "Dokumen NPWP wajib diunggah.";
      
      // Conditional checks for optional documents
      if (formData.deedAmendmentNumber.trim() && !formData.deedAmendmentFile) {
        newErrors.deedAmendmentFile = "Dokumen akte perubahan wajib diunggah jika nomor diisi.";
      }
      if (formData.deedAmendmentFile && !formData.deedAmendmentNumber.trim()) {
        newErrors.deedAmendmentNumber = "Nomor akte perubahan wajib diisi jika dokumen diunggah.";
      }

      if (formData.sktNumber.trim() && !formData.sktFile) {
        newErrors.sktFile = "Dokumen SKT wajib diunggah jika nomor diisi.";
      }
      if (formData.sktFile && !formData.sktNumber.trim()) {
        newErrors.sktNumber = "Nomor SKT wajib diisi jika dokumen diunggah.";
      }

      if (formData.skppNumber.trim() && !formData.skppFile) {
        newErrors.skppFile = "Dokumen SKPP wajib diunggah jika nomor diisi.";
      }
      if (formData.skppFile && !formData.skppNumber.trim()) {
        newErrors.skppNumber = "Nomor SKPP wajib diisi jika dokumen diunggah.";
      }

      if (formData.financialReportNumber.trim() && !formData.financialReportFile) {
        newErrors.financialReportFile = "Dokumen laporan keuangan wajib diunggah jika nomor diisi.";
      }
      if (formData.financialReportFile && !formData.financialReportNumber.trim()) {
        newErrors.financialReportNumber = "Nomor laporan keuangan wajib diisi jika dokumen diunggah.";
      }

      if (formData.otherDocNumber.trim() && !formData.otherDocFile) {
        newErrors.otherDocFile = "Dokumen legalitas lainnya wajib diunggah jika nomor diisi.";
      }
      if (formData.otherDocFile && !formData.otherDocNumber.trim()) {
        newErrors.otherDocNumber = "Nomor dokumen legalitas lainnya wajib diisi jika dokumen diunggah.";
      }
    }

    if (currentStep === 4) {
      if (formData.products.length === 0) {
        newErrors.products = "Silakan tambahkan minimal 1 barang atau jasa yang disediakan perusahaan Anda.";
      }
    }

    if (currentStep === 5) {
      if (!formData.agreeToStatementLetter) {
        newErrors.agreeToStatementLetter = "Anda harus menyetujui Integrity Pact Statement Letter Agreement.";
      }
      if (!formData.selfAssessmentFile) {
        newErrors.selfAssessmentFile = "Dokumen Self-Assessment Form wajib diunggah.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(5, s + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepJump = (targetStep: number) => {
    if (targetStep > step) {
      // Validate intermediate steps
      for (let s = step; s < targetStep; s++) {
        if (!validateStep(s)) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
    }
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(step)) {
      setSubmitError("Silakan periksa kembali semua input wajib pada langkah ini.");
      return;
    }

    setSubmitError("");
    setIsPreviewOpen(true);
  };


  return (
    <>
      <SiteHeader />
      <div className="relative min-h-screen pb-24 flex flex-col bg-slate-50/50">
        {/* Decorative background */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] overflow-hidden pointer-events-none select-none">
          <div className="absolute inset-0 bg-[url('/bg.avif')] object-cover opacity-[0.03]" />
          <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-transparent to-background" />
        </div>

        {/* Spacious Main Container with pt-36 offset for Fixed Header */}
        <main className="flex-1 w-full max-w-[1100px] mx-auto px-4 sm:px-6 pt-36 pb-12 lg:px-10">
          <div className="rounded-4xl bg-white p-5 sm:p-8 md:p-14 shadow-elegant border border-border/40 backdrop-blur-sm">
            <Stepper current={step} onJump={handleStepJump} />

            <div className="mt-16 border-t border-border/60 pt-12">
              <h2 className="text-xl font-bold tracking-widest text-primary uppercase mb-10 text-center md:text-left">
                {step === 1 && "Basic Information"}
                {step === 2 && "Company Profile"}
                {step === 3 && "Documents Vault"}
                {step === 4 && "Product & Catalog"}
                {step === 5 && "Supporting Documents"}
              </h2>

              <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
                {/* STEP 1: BASIC INFORMATION */}
                {step === 1 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-semibold text-foreground">
                        Region Type <span className="text-secondary">*</span>
                      </label>
                      <div className="inline-flex w-fit rounded-xl bg-surface-muted p-1 border border-border/30">
                        {(["Indonesia", "Internasional"] as const).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => handleInputChange("region", r)}
                            className={`rounded-lg px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${formData.region === r ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-primary"
                              }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                      <Input
                        label="Company Type"
                        required
                        error={errors.companyType}
                        placeholder="e.g. PT, CV, UD"
                        value={formData.companyType}
                        onChange={(e) => handleInputChange("companyType", e.target.value)}
                      />
                      <Input
                        label="Company Name"
                        required
                        error={errors.companyName}
                        placeholder="e.g. Eltran Indonesia"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                      />
                      <Input
                        label="Business Field"
                        required
                        error={errors.businessField}
                        placeholder="e.g. Telecommunications"
                        value={formData.businessField}
                        onChange={(e) => handleInputChange("businessField", e.target.value)}
                      />
                      <Input
                        label="Sub Business Field"
                        required
                        error={errors.subBusinessField}
                        placeholder="e.g. Fiber Optic Construction"
                        value={formData.subBusinessField}
                        onChange={(e) => handleInputChange("subBusinessField", e.target.value)}
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Company Owner / CEO Name"
                          required
                          error={errors.ceoName}
                          placeholder="Full Name"
                          value={formData.ceoName}
                          onChange={(e) => handleInputChange("ceoName", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: COMPANY PROFILE */}
                {step === 2 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid gap-8 md:grid-cols-2">
                      <Input
                        label="Country"
                        required
                        error={errors.country}
                        placeholder="e.g. Indonesia"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                      />
                      <Input
                        label="Province"
                        required
                        error={errors.province}
                        placeholder="e.g. Jawa Barat"
                        value={formData.province}
                        onChange={(e) => handleInputChange("province", e.target.value)}
                      />
                      <Input
                        label="City"
                        required
                        error={errors.city}
                        placeholder="e.g. Bandung"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                      <Input
                        label="District"
                        required
                        error={errors.district}
                        placeholder="e.g. Coblong"
                        value={formData.district}
                        onChange={(e) => handleInputChange("district", e.target.value)}
                      />
                      <div className="col-span-full">
                        <Input
                          label="Full Address"
                          required
                          error={errors.fullAddress}
                          placeholder="Detailed street address, office suite, block..."
                          value={formData.fullAddress}
                          onChange={(e) => handleInputChange("fullAddress", e.target.value)}
                        />
                      </div>
                      <Input
                        label="Zip Code"
                        required
                        error={errors.zipCode}
                        placeholder="e.g. 40135"
                        value={formData.zipCode}
                        onChange={handleZipCodeChange}
                      />
                    </div>

                    <hr className="border-border/60" />

                    <div className="grid gap-8 md:grid-cols-2">
                      <Input
                        label="Company Phone Number"
                        type="tel"
                        required
                        error={errors.phone}
                        placeholder="+62..."
                        value={formData.phone}
                        onChange={handlePhoneChange}
                      />
                      <Input
                        label="Company Fax"
                        type="tel"
                        error={errors.fax}
                        placeholder="+62..."
                        value={formData.fax}
                        onChange={handleFaxChange}
                      />
                      <Input
                        label="Company Email Address"
                        type="email"
                        required
                        error={errors.email}
                        placeholder="procurement@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                      <Input
                        label="Company Website"
                        type="url"
                        error={errors.website}
                        placeholder="https://company.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                      <div className="col-span-full">
                        <Input
                          label="Our Product / Services Description"
                          required
                          error={errors.description}
                          placeholder="Briefly describe products/services offered"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: DOCUMENTS VAULT */}
                {step === 3 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Section 1: Deed of Establishment & SK Kemenhumham */}
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-6">
                        <h3 className="font-bold text-primary tracking-wide text-sm uppercase">Deed of Establishment</h3>
                        <Input
                          label="Deed Number"
                          required
                          error={errors.deedNumber}
                          placeholder="Number"
                          value={formData.deedNumber}
                          onChange={(e) => handleInputChange("deedNumber", e.target.value)}
                        />
                        <Input
                          label="Establishment Date"
                          type="date"
                          required
                          error={errors.deedDate}
                          value={formData.deedDate}
                          onChange={(e) => handleInputChange("deedDate", e.target.value)}
                        />
                        <FileUploadInput
                          label="Upload Deed"
                          required
                          error={errors.deedFile}
                          placeholder="Deed of Establishment.pdf"
                          fileName={formData.deedFile}
                          onFileSelect={(name) => handleInputChange("deedFile", name)}
                        />
                      </div>
                      <div className="space-y-6">
                        <h3 className="font-bold text-primary tracking-wide text-sm uppercase">SK Kemenhumham</h3>
                        <Input
                          label="Number"
                          required
                          error={errors.skNumber}
                          placeholder="Number"
                          value={formData.skNumber}
                          onChange={(e) => handleInputChange("skNumber", e.target.value)}
                        />
                        <Input
                          label="Date"
                          type="date"
                          required
                          error={errors.skDate}
                          value={formData.skDate}
                          onChange={(e) => handleInputChange("skDate", e.target.value)}
                        />
                        <FileUploadInput
                          label="Attachment"
                          required
                          error={errors.skFile}
                          placeholder="SK Kemenhumhan.pdf"
                          fileName={formData.skFile}
                          onFileSelect={(name) => handleInputChange("skFile", name)}
                        />
                      </div>
                    </div>

                    <hr className="border-border/60" />

                    {/* Section 2: Deed of Amendment & SK Kemenhumham */}
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-6">
                        <h3 className="font-bold text-primary tracking-wide text-sm uppercase">Deed of Amendment</h3>
                        <Input
                          label="Deed Number"
                          error={errors.deedAmendmentNumber}
                          placeholder="Number"
                          value={formData.deedAmendmentNumber}
                          onChange={(e) => handleInputChange("deedAmendmentNumber", e.target.value)}
                        />
                        <Input
                          label="Establishment Date"
                          type="date"
                          error={errors.deedAmendmentDate}
                          value={formData.deedAmendmentDate}
                          onChange={(e) => handleInputChange("deedAmendmentDate", e.target.value)}
                        />
                        <FileUploadInput
                          label="Upload Deed"
                          error={errors.deedAmendmentFile}
                          placeholder="Deed of Amendment.pdf"
                          fileName={formData.deedAmendmentFile}
                          onFileSelect={(name) => handleInputChange("deedAmendmentFile", name)}
                        />
                      </div>
                    </div>

                    <hr className="border-border/60" />

                    {/* Section 3: NIB */}
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-6">
                        <h3 className="font-bold text-primary tracking-wide text-sm uppercase">NIB</h3>
                        <Input
                          label="Number"
                          required
                          error={errors.nibNumber}
                          placeholder="Number"
                          value={formData.nibNumber}
                          onChange={(e) => handleInputChange("nibNumber", e.target.value)}
                        />
                        <Input
                          label="Date"
                          type="date"
                          required
                          error={errors.nibDate}
                          value={formData.nibDate}
                          onChange={(e) => handleInputChange("nibDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-6 md:pt-11 flex flex-col justify-end">
                        <FileUploadInput
                          label="Attachment"
                          required
                          error={errors.nibFile}
                          placeholder="NIB.pdf"
                          fileName={formData.nibFile}
                          onFileSelect={(name) => handleInputChange("nibFile", name)}
                        />
                      </div>
                    </div>

                    <hr className="border-border/60" />

                    {/* Section 4: Other Legal Documents */}
                    <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 items-end">
                      <div>
                        <Input
                          label="NPWP Number"
                          required
                          error={errors.npwpNumber}
                          placeholder="NPWP Number"
                          value={formData.npwpNumber}
                          onChange={handleNpwpChange}
                        />
                      </div>
                      <FileUploadInput
                        label="NPWP Number Attachment"
                        required
                        error={errors.npwpFile}
                        placeholder="NPWP Number.pdf"
                        fileName={formData.npwpFile}
                        onFileSelect={(name) => handleInputChange("npwpFile", name)}
                      />

                      <div>
                        <Input
                          label="SKT Number"
                          error={errors.sktNumber}
                          placeholder="SKT Number"
                          value={formData.sktNumber}
                          onChange={(e) => handleInputChange("sktNumber", e.target.value)}
                        />
                      </div>
                      <FileUploadInput
                        label="SKT Number Attachment"
                        error={errors.sktFile}
                        placeholder="SKT Number.pdf"
                        fileName={formData.sktFile}
                        onFileSelect={(name) => handleInputChange("sktFile", name)}
                      />

                      <div>
                        <Input
                          label="SKPP Number"
                          error={errors.skppNumber}
                          placeholder="SKPP Number"
                          value={formData.skppNumber}
                          onChange={(e) => handleInputChange("skppNumber", e.target.value)}
                        />
                      </div>
                      <FileUploadInput
                        label="SKPP Number Attachment"
                        error={errors.skppFile}
                        placeholder="SKPP Number.pdf"
                        fileName={formData.skppFile}
                        onFileSelect={(name) => handleInputChange("skppFile", name)}
                      />

                      <div>
                        <Input
                          label="Latest Financial Report"
                          error={errors.financialReportNumber}
                          placeholder="Latest Financial Report"
                          value={formData.financialReportNumber}
                          onChange={(e) => handleInputChange("financialReportNumber", e.target.value)}
                        />
                      </div>
                      <FileUploadInput
                        label="Latest Financial Report Attachment"
                        error={errors.financialReportFile}
                        placeholder="Latest Financial Report.pdf"
                        fileName={formData.financialReportFile}
                        onFileSelect={(name) => handleInputChange("financialReportFile", name)}
                      />

                      <div>
                        <Input
                          label="Other Legal Documents"
                          error={errors.otherDocNumber}
                          placeholder="Other Legal Documents"
                          value={formData.otherDocNumber}
                          onChange={(e) => handleInputChange("otherDocNumber", e.target.value)}
                        />
                      </div>
                      <FileUploadInput
                        label="Other Legal Documents Attachment"
                        error={errors.otherDocFile}
                        placeholder="Other Legal Documents.pdf"
                        fileName={formData.otherDocFile}
                        onFileSelect={(name) => handleInputChange("otherDocFile", name)}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: PRODUCT CATALOG & ITEMS */}
                {step === 4 && (
                  <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Full Width: Product Brochure / Catalog */}
                    <div className="flex flex-col gap-6 md:col-span-2">
                      <div className="space-y-4 border border-border/50 bg-primary/5 p-6 rounded-xl flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-primary tracking-wide uppercase block mb-2">
                            Katalog Produk / Brosur
                          </label>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                            Silakan unggah brosur, katalog, atau daftar barang/jasa yang perusahaan Anda tawarkan. Dokumen ini akan membantu tim kami memahami lini produk Anda secara lebih baik.
                          </p>
                        </div>
                        <div className="max-w-md">
                          <FileUploadInput
                            label="Unggah Brosur / Katalog"
                            placeholder="Brosur_Produk.pdf"
                            fileName={formData.brochureFile}
                            onFileSelect={(name) => handleInputChange("brochureFile", name)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Data Barang Table */}
                    <div className="flex flex-col gap-6">
                      <div className="space-y-4 border border-border/50 bg-white p-6 rounded-xl flex-1 flex flex-col justify-between">
                        <div>
                          <label className="text-sm font-bold text-primary tracking-wide uppercase block mb-2">
                            Database Barang / Jasa <span className="text-secondary">*</span>
                          </label>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                            Tambahkan daftar barang, material, atau jasa yang disediakan oleh perusahaan Anda beserta kategorinya. Data ini akan disimpan di sistem VMS kami.
                          </p>
                        </div>
                        <TableData
                          items={formData.products}
                          onChange={(newItems) => handleInputChange("products", newItems)}
                        />
                        {errors.products && (
                          <span className="text-xs font-semibold text-secondary animate-in fade-in duration-200 mt-2 block">
                            {errors.products}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: SUPPORTING DOCUMENTS & AGREEMENTS */}
                {step === 5 && (
                  <div className="grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Left Side: Statement Letter text modal based flow */}
                    <div className="flex flex-col gap-6">
                      <div className="space-y-4 border border-border/50 bg-surface-dim/50 p-6 rounded-xl flex-1 flex flex-col justify-between">
                        <div>
                          <label className="text-sm font-bold text-primary tracking-wide uppercase block mb-2">
                            Statement Letter Agreement <span className="text-secondary">*</span>
                          </label>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                            Meningkatnya tata kelola perusahaan yang baik dan profesionalisme, Anda diwajibkan membaca serta menyetujui Integrity Pact Statement Letter Agreement PT Eltran Indonesia.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsStatementOpen(true)}
                            className="w-full bg-white hover:bg-surface-muted transition-colors cursor-pointer border-primary/20 hover:border-primary/50 text-primary flex items-center justify-center gap-2 py-5"
                          >
                            <FileText className="size-4" />
                            Baca Statement Letter Agreement
                          </Button>

                          <label className={cn(
                            "flex items-center gap-3 cursor-pointer select-none border p-3 rounded-lg bg-white/50 hover:bg-white transition-colors",
                            errors.agreeToStatementLetter ? "border-secondary" : "border-border/60"
                          )}>
                            <input
                              type="checkbox"
                              checked={formData.agreeToStatementLetter}
                              onChange={(e) => handleInputChange("agreeToStatementLetter", e.target.checked)}
                              className="size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                            />
                            <span className="text-xs font-semibold text-slate-700">
                              Saya menyetujui seluruh isi Statement Letter Agreement
                            </span>
                          </label>
                          {errors.agreeToStatementLetter && (
                            <span className="text-xs font-semibold text-secondary animate-in fade-in duration-200 block mt-1">
                              {errors.agreeToStatementLetter}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Self-Assessment Form */}
                    <div className="flex flex-col gap-6">
                      <div className="space-y-4 border border-border/50 bg-surface-dim/50 p-6 rounded-xl flex-1 flex flex-col justify-between">
                        <div>
                          <label className="text-sm font-bold text-primary tracking-wide uppercase block mb-2">
                            Self-Assessment Form <span className="text-secondary">*</span>
                          </label>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                            Silakan unduh formulir penilaian mandiri vendor (Self-Assessment Form) mengenai operasional, K3LH, dan kesiapan infrastruktur perusahaan Anda, isi dengan lengkap, lalu unggah kembali.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-white hover:bg-surface-muted transition-colors cursor-pointer border-primary/20 hover:border-primary/50 text-primary flex items-center justify-center gap-2 py-5"
                          >
                            <FileText className="size-4" />
                            Unduh Template Self-Assessment
                          </Button>

                          <FileUploadInput
                            label="Unggah Dokumen Self-Assessment"
                            required
                            error={errors.selfAssessmentFile}
                            placeholder="Self Assessment Form.pdf"
                            fileName={formData.selfAssessmentFile}
                            onFileSelect={(name) => handleInputChange("selfAssessmentFile", name)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Feedback Error Panel */}
                {submitError && (
                  <div className="mt-8 p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex items-start gap-3 text-secondary animate-in fade-in duration-300">
                    <AlertTriangle className="size-5 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold">{submitError}</span>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="mt-16 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/60">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={back}
                      className="px-6 group cursor-pointer"
                    >
                      <ChevronLeft className="size-4 mr-2 transition-transform group-hover:-translate-x-0.5" />
                      Kembali
                    </Button>
                  ) : (
                    <Button asChild variant="ghost" className="px-6 group cursor-pointer">
                      <Link href="/">
                        <ChevronLeft className="size-4 mr-2 transition-transform group-hover:-translate-x-0.5" />
                        Kembali
                      </Link>
                    </Button>
                  )}

                  {step < 5 ? (
                    <Button
                      type="button"
                      onClick={next}
                      className="px-10 group bg-primary hover:bg-primary-hover text-white cursor-pointer"
                    >
                      Next Step
                      <ArrowRight className="size-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      onClick={handleSubmitClick}
                      className="w-full sm:w-auto px-10 bg-secondary hover:bg-secondary-hover text-white shadow-elegant group cursor-pointer animate-pulse"
                    >
                      Submit Registration
                      <ArrowRight className="size-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <SiteFooter />

      {/* MODAL 1: STATEMENT LETTER AGREEMENT */}
      {isStatementOpen && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 animate-in zoom-in-95 duration-500 max-h-[85vh] flex flex-col">
            <h3 className="text-xl font-bold text-primary border-b border-border pb-4 uppercase tracking-wider">
              Statement Letter Agreement
            </h3>

            <div className="flex-1 overflow-y-auto my-6 pr-2 space-y-4 text-sm text-slate-600 leading-relaxed">
              <p className="font-bold text-center text-slate-800 uppercase tracking-wide">
                SURAT PERNYATAAN KEPATUHAN & INTEGRITAS VENDOR<br />
                PT ELTRAN INDONESIA
              </p>
              <p>
                Sebagai salah satu syarat pendaftaran mitra kerja (vendor) PT Eltran Indonesia, kami dengan ini menyatakan setuju dan berkomitmen untuk mematuhi hal-hal sebagai berikut:
              </p>
              <div className="space-y-3 pl-4 list-decimal">
                <div>
                  <span className="font-bold text-slate-800">1. Kebenaran & Keabsahan Data</span>
                  <p className="pl-4 text-xs mt-1">Seluruh data, dokumen hukum, dan sertifikasi yang diunggah dalam Vendor Management System (VMS) adalah benar, akurat, dan sesuai dengan keadaan perusahaan kami yang sebenarnya.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800">2. Sistem Manajemen Anti-Suap (ISO 37001)</span>
                  <p className="pl-4 text-xs mt-1">Kami tidak akan menawarkan, menjanjikan, memberikan, meminta, atau menerima suap, komisi, gratifikasi, atau imbalan dalam bentuk apa pun kepada atau dari manajemen maupun staf PT Eltran Indonesia untuk mendapatkan perlakuan khusus.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800">3. Kerahasiaan Informasi (Non-Disclosure)</span>
                  <p className="pl-4 text-xs mt-1">Kami bersedia menjaga kerahasiaan data operasional, teknis, komersial, maupun finansial yang diperoleh dari PT Eltran Indonesia selama proses registrasi dan kerja sama berlangsung.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800">4. Kepatuhan K3LH</span>
                  <p className="pl-4 text-xs mt-1">Kami berkomitmen untuk menerapkan prinsip Keselamatan dan Kesehatan Kerja serta Lindung Lingkungan (K3LH) di seluruh proyek dan wilayah kerja PT Eltran Indonesia.</p>
                </div>
              </div>
              <p className="pt-4 border-t border-border/60 text-xs italic">
                Pernyataan ini dibuat dengan penuh kesadaran dan tanggung jawab demi membangun integritas kemitraan yang berkelanjutan bersama PT Eltran Indonesia.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 border-t border-border pt-4 shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsStatementOpen(false)}
                className="w-full sm:w-auto px-6 cursor-pointer"
              >
                Tutup
              </Button>
              <Button
                type="button"
                onClick={() => {
                  handleInputChange("agreeToStatementLetter", true);
                  setIsStatementOpen(false);
                }}
                className="w-full sm:w-auto px-6 bg-primary hover:bg-primary-hover text-white cursor-pointer"
              >
                Setuju & Setujui Pernyataan
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PRATINJAU DATA REGISTRASI (PREVIEW MODAL) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
            <h3 className="text-xl font-bold text-primary border-b border-border pb-4 uppercase tracking-wider">
              Pratinjau Data Registrasi Vendor
            </h3>

            <div className="flex-1 overflow-y-auto my-6 pr-2 space-y-6">
              <h3 className="text-sm font-bold text-slate-800 mb-2 border-b border-border/30 pb-2">3. Penilaian Mandiri & Integritas</h3>
              <p className="text-xs text-muted-foreground leading-relaxed bg-primary/5 border border-primary/20 p-3 rounded-xl">
                Mohon tinjau kembali data pendaftaran Anda sebelum dikirimkan. Data yang telah dikirimkan akan diproses oleh tim Procurement PT Eltran Indonesia untuk verifikasi.
              </p>

              {/* Basic Information */}
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
                  Informasi Dasar (Step 1)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50/50 p-4 rounded-xl border border-border/40">
                  <div><span className="font-semibold text-slate-500 block">Tipe Wilayah:</span> <span className="text-slate-800 font-medium">{formData.region}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Bentuk Badan Usaha:</span> <span className="text-slate-800 font-medium">{formData.companyType || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Nama Perusahaan:</span> <span className="text-slate-800 font-medium">{formData.companyName || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Bidang Usaha:</span> <span className="text-slate-800 font-medium">{formData.businessField || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Sub Bidang Usaha:</span> <span className="text-slate-800 font-medium">{formData.subBusinessField || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Nama Pemilik / Direktur:</span> <span className="text-slate-800 font-medium">{formData.ceoName || "-"}</span></div>
                </div>
              </div>

              {/* Company Profile */}
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
                  Profil Perusahaan (Step 2)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50/50 p-4 rounded-xl border border-border/40">
                  <div><span className="font-semibold text-slate-500 block">Negara:</span> <span className="text-slate-800 font-medium">{formData.country}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Provinsi:</span> <span className="text-slate-800 font-medium">{formData.province || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Kota:</span> <span className="text-slate-800 font-medium">{formData.city || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Kecamatan:</span> <span className="text-slate-800 font-medium">{formData.district || "-"}</span></div>
                  <div className="col-span-1 md:col-span-2"><span className="font-semibold text-slate-500 block">Alamat Lengkap:</span> <span className="text-slate-800 font-medium">{formData.fullAddress || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Kode Pos:</span> <span className="text-slate-800 font-medium">{formData.zipCode || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Telepon Kantor:</span> <span className="text-slate-800 font-medium">{formData.phone || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Email Kantor:</span> <span className="text-slate-800 font-medium">{formData.email || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Website:</span> <span className="text-slate-800 font-medium">{formData.website || "-"}</span></div>
                  <div className="col-span-1 md:col-span-2"><span className="font-semibold text-slate-500 block">Deskripsi Produk/Jasa:</span> <span className="text-slate-800 font-medium">{formData.description || "-"}</span></div>
                </div>
              </div>

              {/* Legal Documents */}
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
                  Dokumen Legalitas & Perizinan (Step 3)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-xs bg-slate-50/50 p-4 rounded-xl border border-border/40">
                  <div>
                    <span className="font-semibold text-slate-500 block">Akte Pendirian:</span>
                    <span className="text-slate-800 font-medium">{formData.deedNumber || "-"} ({formData.deedDate || "-"})</span>
                    <span className={cn("text-[10px] font-bold block mt-0.5", formData.deedFile ? "text-emerald-600" : "text-slate-400")}>{formData.deedFile ? `✓ ${formData.deedFile}` : "✘ Belum diunggah"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">SK Kemenkumham Pendirian:</span>
                    <span className="text-slate-800 font-medium">{formData.skNumber || "-"} ({formData.skDate || "-"})</span>
                    <span className={cn("text-[10px] font-bold block mt-0.5", formData.skFile ? "text-emerald-600" : "text-slate-400")}>{formData.skFile ? `✓ ${formData.skFile}` : "✘ Belum diunggah"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">Nomor NPWP:</span>
                    <span className="text-slate-800 font-medium">{formData.npwpNumber || "-"}</span>
                    <span className={cn("text-[10px] font-bold block mt-0.5", formData.npwpFile ? "text-emerald-600" : "text-slate-400")}>{formData.npwpFile ? `✓ ${formData.npwpFile}` : "✘ Belum diunggah"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">Nomor NIB:</span>
                    <span className="text-slate-800 font-medium">{formData.nibNumber || "-"} ({formData.nibDate || "-"})</span>
                    <span className={cn("text-[10px] font-bold block mt-0.5", formData.nibFile ? "text-emerald-600" : "text-slate-400")}>{formData.nibFile ? `✓ ${formData.nibFile}` : "✘ Belum diunggah"}</span>
                  </div>
                </div>
              </div>

              {/* Step 4 Product Catalog */}
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
                  Katalog Produk & Data Barang (Step 4)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50/50 p-4 rounded-xl border border-border/40">
                  <div>
                    <span className="font-semibold text-slate-500 block">Brosur / Katalog Produk:</span>
                    <span className={cn("text-[10px] font-bold block mt-0.5", formData.brochureFile ? "text-emerald-600" : "text-slate-400")}>{formData.brochureFile ? `✓ ${formData.brochureFile}` : "✘ Belum diunggah"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">Total Data Barang/Jasa:</span>
                    <span className="text-slate-800 font-bold">{formData.products.length} Items</span>
                  </div>
                </div>
              </div>

              {/* Step 5 Agreements */}
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-secondary pl-2 mb-3">
                  Dokumen Pendukung & Pakta Integritas (Step 5)
                </h4>
                <div className="grid grid-cols-1 gap-3 text-xs bg-slate-50/50 p-4 rounded-xl border border-border/40">
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                    <span className="text-xs font-semibold text-slate-500">Persetujuan Pakta Integritas</span>
                    <span className={cn("font-bold text-xs", formData.agreeToStatementLetter ? "text-emerald-600" : "text-slate-400")}>{formData.agreeToStatementLetter ? "✓ Disetujui" : "✘ Belum Disetujui"}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg mt-2">
                    <span className="text-xs font-semibold text-slate-500">Dokumen Self-Assessment</span>
                    <span className={cn("font-bold text-xs", formData.selfAssessmentFile ? "text-emerald-600" : "text-slate-400")}>{formData.selfAssessmentFile ? `✓ ${formData.selfAssessmentFile}` : "✘ Belum diunggah"}</span>
                  </div>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none border border-primary/20 p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors my-4">
                <input
                  type="checkbox"
                  checked={dataConfirmed}
                  onChange={(e) => setDataConfirmed(e.target.checked)}
                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer mt-0.5"
                />
                <span className="text-xs font-semibold text-slate-700 leading-relaxed">
                  Saya secara sadar menyatakan bahwa seluruh informasi dan berkas pendukung yang telah diisi di atas adalah benar, sah, dan sesuai dengan dokumen asli perusahaan kami.
                </span>
              </label>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 border-t border-border pt-4 shrink-0 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreviewOpen(false)}
                className="w-full sm:w-auto px-6 cursor-pointer"
              >
                Kembali & Edit
              </Button>
              <Button
                type="button"
                disabled={!dataConfirmed}
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto px-8 bg-secondary hover:bg-secondary-hover text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Konfirmasi & Kirim
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SUCCESS CONFIRMATION MODAL */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
          <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 animate-in zoom-in-95 duration-500 text-center flex flex-col items-center">
            <div className="size-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-primary mb-2 uppercase tracking-wide">
              Registrasi Dikirim!
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              Terima kasih! Pendaftaran vendor Anda telah berhasil kami terima. Tim Procurement PT Eltran Indonesia akan meninjau kelengkapan dokumen Anda.
            </p>

            <Button
              type="button"
              onClick={() => {
                setIsSuccessOpen(false);
                router.push("/dashboard/vendor");
              }}
              className="w-full bg-primary hover:bg-primary-hover text-white py-6 cursor-pointer font-bold rounded-xl"
            >
              Masuk ke Dashboard Vendor
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
