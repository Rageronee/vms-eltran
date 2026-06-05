"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ChevronLeft, ArrowRight, FileText, AlertTriangle } from "lucide-react";

// Interactive File Upload Input Component
const FileUploadInput = ({
  label,
  required,
  placeholder,
  fileName,
  onFileSelect,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  fileName?: string;
  onFileSelect: (name: string) => void;
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
        {label} {required && <span className="text-[#EC1E25]">*</span>}
      </label>
      <div className="flex items-center h-12 w-full rounded-xl border border-border/50 bg-surface-dim overflow-hidden transition-all hover:border-primary/50">
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
          className="h-full rounded-none px-6 bg-primary hover:bg-primary-hover text-white shadow-none shrink-0 cursor-pointer"
        >
          Upload
        </Button>
        <span className="text-sm text-slate-700 px-4 truncate w-full">
          {fileName ? (
            <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
              ✓ {fileName}
            </span>
          ) : (
            placeholder
          )}
        </span>
      </div>
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

    // Step 4: Supporting Documents
    selfAssessmentFile: "",
    agreeToStatementLetter: false,
  });

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToStatementLetter) {
      setSubmitError("Anda harus menyetujui Statement Letter Agreement terlebih dahulu.");
      return;
    }

    if (!formData.selfAssessmentFile) {
      setSubmitError("Silakan unggah dokumen Self-Assessment Form terlebih dahulu.");
      return;
    }

    setSubmitError("");
    setIsPreviewOpen(true);
  };

  const handleFinalSubmit = () => {
    setIsPreviewOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <>
      <SiteHeader />
      <div className="relative min-h-screen pb-24 flex flex-col bg-slate-50/50">
        {/* Decorative background */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] overflow-hidden pointer-events-none select-none">
          <div className="absolute inset-0 bg-[url('/bg.avif')] object-cover opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
        </div>

        {/* Spacious Main Container with pt-36 offset for Fixed Header */}
        <main className="flex-1 w-full max-w-[1100px] mx-auto px-6 pt-36 pb-12 lg:px-10">
          <div className="rounded-[2rem] bg-white p-8 md:p-14 shadow-elegant border border-border/40 backdrop-blur-sm">
            <Stepper current={step} onJump={setStep} />

            <div className="mt-16 border-t border-border/60 pt-12">
              <h2 className="text-xl font-bold tracking-widest text-primary uppercase mb-10 text-center md:text-left">
                {step === 1 && "Basic Information"}
                {step === 2 && "Company Profile"}
                {step === 3 && "Documents Vault"}
                {step === 4 && "Supporting Documents"}
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
                        placeholder="e.g. PT, CV, UD"
                        value={formData.companyType}
                        onChange={(e) => handleInputChange("companyType", e.target.value)}
                      />
                      <Input
                        label="Company Name"
                        required
                        placeholder="e.g. Eltran Indonesia"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                      />
                      <Input
                        label="Business Field"
                        required
                        placeholder="e.g. Telecommunications"
                        value={formData.businessField}
                        onChange={(e) => handleInputChange("businessField", e.target.value)}
                      />
                      <Input
                        label="Sub Business Field"
                        required
                        placeholder="e.g. Fiber Optic Construction"
                        value={formData.subBusinessField}
                        onChange={(e) => handleInputChange("subBusinessField", e.target.value)}
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Company Owner / CEO Name"
                          required
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
                        placeholder="e.g. Indonesia"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                      />
                      <Input
                        label="Province"
                        required
                        placeholder="e.g. Jawa Barat"
                        value={formData.province}
                        onChange={(e) => handleInputChange("province", e.target.value)}
                      />
                      <Input
                        label="City"
                        required
                        placeholder="e.g. Bandung"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                      <Input
                        label="District"
                        required
                        placeholder="e.g. Coblong"
                        value={formData.district}
                        onChange={(e) => handleInputChange("district", e.target.value)}
                      />
                      <div className="col-span-full">
                        <Input
                          label="Full Address"
                          required
                          placeholder="Detailed street address, office suite, block..."
                          value={formData.fullAddress}
                          onChange={(e) => handleInputChange("fullAddress", e.target.value)}
                        />
                      </div>
                      <Input
                        label="Zip Code"
                        required
                        placeholder="e.g. 40135"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      />
                    </div>

                    <hr className="border-border/60" />

                    <div className="grid gap-8 md:grid-cols-2">
                      <Input
                        label="Company Phone Number"
                        required
                        type="tel"
                        placeholder="+62..."
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                      <Input
                        label="Company Fax"
                        type="tel"
                        placeholder="+62..."
                        value={formData.fax}
                        onChange={(e) => handleInputChange("fax", e.target.value)}
                      />
                      <Input
                        label="Company Email Address"
                        required
                        type="email"
                        placeholder="procurement@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                      <Input
                        label="Company Website"
                        type="url"
                        placeholder="https://company.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                      <div className="col-span-full">
                        <Input
                          label="Our Product / Services Description"
                          required
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
                          placeholder="Number"
                          value={formData.deedNumber}
                          onChange={(e) => handleInputChange("deedNumber", e.target.value)}
                        />
                        <Input
                          label="Establishment Date"
                          required
                          type="date"
                          value={formData.deedDate}
                          onChange={(e) => handleInputChange("deedDate", e.target.value)}
                        />
                        <FileUploadInput
                          label="Upload Deed"
                          required
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
                          placeholder="Number"
                          value={formData.skNumber}
                          onChange={(e) => handleInputChange("skNumber", e.target.value)}
                        />
                        <Input
                          label="Date"
                          required
                          type="date"
                          value={formData.skDate}
                          onChange={(e) => handleInputChange("skDate", e.target.value)}
                        />
                        <FileUploadInput
                          label="Attachment"
                          required
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
                          placeholder="Number"
                          value={formData.deedAmendmentNumber}
                          onChange={(e) => handleInputChange("deedAmendmentNumber", e.target.value)}
                        />
                        <Input
                          label="Establishment Date"
                          type="date"
                          value={formData.deedAmendmentDate}
                          onChange={(e) => handleInputChange("deedAmendmentDate", e.target.value)}
                        />
                        <FileUploadInput
                          label="Upload Deed"
                          placeholder="Deed of Amendment.pdf"
                          fileName={formData.deedAmendmentFile}
                          onFileSelect={(name) => handleInputChange("deedAmendmentFile", name)}
                        />
                      </div>
                      <div className="space-y-6">
                        <h3 className="font-bold text-primary tracking-wide text-sm uppercase">SK Kemenhumham</h3>
                        <Input
                          label="Number"
                          placeholder="Number"
                          value={formData.skAmendmentNumber}
                          onChange={(e) => handleInputChange("skAmendmentNumber", e.target.value)}
                        />
                        <Input
                          label="Date"
                          type="date"
                          value={formData.skAmendmentDate}
                          onChange={(e) => handleInputChange("skAmendmentDate", e.target.value)}
                        />
                        <FileUploadInput
                          label="Attachment"
                          placeholder="SK Kemenhumhan.pdf"
                          fileName={formData.skAmendmentFile}
                          onFileSelect={(name) => handleInputChange("skAmendmentFile", name)}
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
                          placeholder="Number"
                          value={formData.nibNumber}
                          onChange={(e) => handleInputChange("nibNumber", e.target.value)}
                        />
                        <Input
                          label="Date"
                          required
                          type="date"
                          value={formData.nibDate}
                          onChange={(e) => handleInputChange("nibDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-6 md:pt-11 flex flex-col justify-end">
                        <FileUploadInput
                          label="Attachment"
                          required
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
                          placeholder="NPWP Number"
                          value={formData.npwpNumber}
                          onChange={(e) => handleInputChange("npwpNumber", e.target.value)}
                        />
                      </div>
                      <FileUploadInput
                        label="NPWP Number Attachment"
                        required
                        placeholder="NPWP Number.pdf"
                        fileName={formData.npwpFile}
                        onFileSelect={(name) => handleInputChange("npwpFile", name)}
                      />

                      <div>
                        <Input
                          label="SKT Number"
                          required
                          placeholder="SKT Number"
                          value={formData.sktNumber}
                          onChange={(e) => handleInputChange("sktNumber", e.target.value)}
                        />
                      </div>
                      <FileUploadInput
                        label="SKT Number Attachment"
                        required
                        placeholder="SKT Number.pdf"
                        fileName={formData.sktFile}
                        onFileSelect={(name) => handleInputChange("sktFile", name)}
                      />

                      <div>
                        <Input
                          label="SKPP Number"
                          required
                          placeholder="SKPP Number"
                          value={formData.skppNumber}
                          onChange={(e) => handleInputChange("skppNumber", e.target.value)}
                        />
                      </div>
                      <FileUploadInput
                        label="SKPP Number Attachment"
                        required
                        placeholder="SKPP Number.pdf"
                        fileName={formData.skppFile}
                        onFileSelect={(name) => handleInputChange("skppFile", name)}
                      />

                      <div>
                        <Input
                          label="Latest Financial Report"
                          required
                          placeholder="Latest Financial Report"
                          value={formData.financialReportNumber}
                          onChange={(e) => handleInputChange("financialReportNumber", e.target.value)}
                        />
                      </div>
                      <FileUploadInput
                        label="Latest Financial Report Attachment"
                        required
                        placeholder="Latest Financial Report.pdf"
                        fileName={formData.financialReportFile}
                        onFileSelect={(name) => handleInputChange("financialReportFile", name)}
                      />

                      <div>
                        <Input
                          label="Other Legal Documents"
                          required
                          placeholder="Other Legal Documents"
                          value={formData.otherDocNumber}
                          onChange={(e) => handleInputChange("otherDocNumber", e.target.value)}
                        />
                      </div>
                      <FileUploadInput
                        label="Other Legal Documents Attachment"
                        required
                        placeholder="Other Legal Documents.pdf"
                        fileName={formData.otherDocFile}
                        onFileSelect={(name) => handleInputChange("otherDocFile", name)}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: SUPPORTING DOCUMENTS & AGREEMENTS */}
                {step === 4 && (
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

                          <label className="flex items-center gap-3 cursor-pointer select-none border border-border/60 p-3 rounded-lg bg-white/50 hover:bg-white transition-colors">
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
                <div className="mt-16 flex items-center justify-end gap-4 pt-8 border-t border-border/60">
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

                  {step < 4 ? (
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
                      className="px-10 bg-secondary hover:bg-secondary-hover text-white shadow-elegant group cursor-pointer animate-pulse"
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
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 animate-in zoom-in-95 duration-500 max-h-[85vh] flex flex-col">
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

            <div className="flex justify-end gap-4 border-t border-border pt-4 shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsStatementOpen(false)}
                className="px-6 cursor-pointer"
              >
                Tutup
              </Button>
              <Button
                type="button"
                onClick={() => {
                  handleInputChange("agreeToStatementLetter", true);
                  setIsStatementOpen(false);
                }}
                className="px-6 bg-primary hover:bg-primary-hover text-white cursor-pointer"
              >
                Setuju & Setujui Pernyataan
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PRATINJAU DATA REGISTRASI (PREVIEW MODAL) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
            <h3 className="text-xl font-bold text-primary border-b border-border pb-4 uppercase tracking-wider">
              Pratinjau Data Registrasi Vendor
            </h3>

            <div className="flex-1 overflow-y-auto my-6 pr-2 space-y-6">
              <p className="text-xs text-muted-foreground leading-relaxed bg-blue-50 border border-blue-100 p-3 rounded-xl">
                Mohon tinjau kembali data pendaftaran Anda sebelum dikirimkan. Data yang telah dikirimkan akan diproses oleh tim Procurement PT Eltran Indonesia untuk verifikasi.
              </p>

              {/* Basic Information */}
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-[#EC1E25] pl-2 mb-3">
                  Informasi Dasar (Step 1)
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/50 p-4 rounded-xl border border-border/40">
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
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-[#EC1E25] pl-2 mb-3">
                  Profil Perusahaan (Step 2)
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/50 p-4 rounded-xl border border-border/40">
                  <div><span className="font-semibold text-slate-500 block">Negara:</span> <span className="text-slate-800 font-medium">{formData.country}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Provinsi:</span> <span className="text-slate-800 font-medium">{formData.province || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Kota:</span> <span className="text-slate-800 font-medium">{formData.city || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Kecamatan:</span> <span className="text-slate-800 font-medium">{formData.district || "-"}</span></div>
                  <div className="col-span-2"><span className="font-semibold text-slate-500 block">Alamat Lengkap:</span> <span className="text-slate-800 font-medium">{formData.fullAddress || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Kode Pos:</span> <span className="text-slate-800 font-medium">{formData.zipCode || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Telepon Kantor:</span> <span className="text-slate-800 font-medium">{formData.phone || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Email Kantor:</span> <span className="text-slate-800 font-medium">{formData.email || "-"}</span></div>
                  <div><span className="font-semibold text-slate-500 block">Website:</span> <span className="text-slate-800 font-medium">{formData.website || "-"}</span></div>
                  <div className="col-span-2"><span className="font-semibold text-slate-500 block">Deskripsi Produk/Jasa:</span> <span className="text-slate-800 font-medium">{formData.description || "-"}</span></div>
                </div>
              </div>

              {/* Legal Documents */}
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-[#EC1E25] pl-2 mb-3">
                  Dokumen Legalitas & Perizinan (Step 3)
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs bg-slate-50/50 p-4 rounded-xl border border-border/40">
                  <div>
                    <span className="font-semibold text-slate-500 block">Akte Pendirian:</span>
                    <span className="text-slate-800 font-medium">{formData.deedNumber || "-"} ({formData.deedDate || "-"})</span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">{formData.deedFile ? `✓ ${formData.deedFile}` : "✘ Belum diunggah"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">SK Kemenkumham Pendirian:</span>
                    <span className="text-slate-800 font-medium">{formData.skNumber || "-"} ({formData.skDate || "-"})</span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">{formData.skFile ? `✓ ${formData.skFile}` : "✘ Belum diunggah"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">Nomor NPWP:</span>
                    <span className="text-slate-800 font-medium">{formData.npwpNumber || "-"}</span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">{formData.npwpFile ? `✓ ${formData.npwpFile}` : "✘ Belum diunggah"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">Nomor NIB:</span>
                    <span className="text-slate-800 font-medium">{formData.nibNumber || "-"} ({formData.nibDate || "-"})</span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">{formData.nibFile ? `✓ ${formData.nibFile}` : "✘ Belum diunggah"}</span>
                  </div>
                </div>
              </div>

              {/* Step 4 Agreements */}
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-[#EC1E25] pl-2 mb-3">
                  Dokumen Pendukung & Pakta Integritas (Step 4)
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/50 p-4 rounded-xl border border-border/40">
                  <div>
                    <span className="font-semibold text-slate-500 block">Statement Letter Agreement:</span>
                    <span className="text-emerald-600 font-bold">✓ Disetujui (Pakta Integritas)</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">Self-Assessment Form:</span>
                    <span className="text-emerald-600 font-bold">✓ {formData.selfAssessmentFile}</span>
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

            <div className="flex justify-end gap-4 border-t border-border pt-4 shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreviewOpen(false)}
                className="px-6 cursor-pointer"
              >
                Kembali & Edit
              </Button>
              <Button
                type="button"
                disabled={!dataConfirmed}
                onClick={handleFinalSubmit}
                className="px-8 bg-secondary hover:bg-secondary-hover text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Konfirmasi & Kirim
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SUCCESS CONFIRMATION MODAL */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
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
