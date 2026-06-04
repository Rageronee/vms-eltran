import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import {
  ClipboardCheck,
  Gauge,
  ShieldCheck,
  FileSearch,
  Workflow,
  Users,
  ArrowRight,
  Award,
  CheckCircle,
  Building,
  Star,
  Quote
} from "lucide-react";

const features = [
  { icon: ClipboardCheck, title: "Easy Registration", desc: "Quick and straightforward registration process for vendors with step-by-step guidance." },
  { icon: Gauge, title: "Real-time Tracking", desc: "Track your registration status, document review, and partnership progress in real time." },
  { icon: ShieldCheck, title: "Secure & Compliant", desc: "Built with enterprise-grade security and full compliance with anti-bribery (SMAP) policy." },
  { icon: FileSearch, title: "Document Management", desc: "Centralized vault for deeds, NPWP, SKT, SKPP, and supporting legal documents." },
  { icon: Workflow, title: "Streamlined Workflow", desc: "Automated review pipeline from submission to final partnership approval." },
  { icon: Users, title: "Dedicated Support", desc: "Direct line to Eltran's procurement team for onboarding and ongoing collaboration." },
];

const stats = [
  { value: "500+", label: "Verified Vendors" },
  { value: "99.8%", label: "SLA Compliance" },
  { value: "24/7", label: "System Security Audit" },
  { value: "15 Mins", label: "Average Setup Time" }
];

const testimonials = [
  {
    quote: "Registering as a vendor for PT Eltran was incredibly straightforward. The four-step system was transparent, and we got approved in record time.",
    author: "Ir. Bambang Triyono",
    role: "Director of PT Sinar Tower Nusantara",
    rating: 5
  },
  {
    quote: "The document manager in this VMS ensures our legal papers are secure and trackable. Excellent compliance control.",
    author: "Dewi Lestari",
    role: "Finance Lead, Global Net Solutions",
    rating: 5
  },
  {
    quote: "Very helpful interface, minimal downtime, and direct access to procurement officials. A premium enterprise portal.",
    author: "Hendry Prasetya",
    role: "Co-Founder, TechSys Telecom",
    rating: 5
  }
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center">
        {/* HERO - Full height and width (whole page) */}
        <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center text-center px-6 overflow-hidden">
          <Image
            src="/bg.jpg"
            alt="Background infrastructure"
            fill
            className="object-cover absolute inset-0 select-none pointer-events-none"
            priority
          />
          {/* Elegant dark gradient overlay with subtle noise */}
          <div className="absolute inset-0 bg-primary/65 bg-gradient-to-tr from-primary/95 via-primary/75 to-transparent backdrop-blur-[1px]" />

          {/* Tech grid layout overlay */}
          <div className="absolute inset-0 bg-radar-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-4xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
              Register Your Vendor,<br />
              <span className="underline decoration-[#EC1E25] decoration-8 underline-offset-8">
                Easily Online.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-white/80 md:text-lg">
              Partner with PT Eltran Indonesia. Register through our secure, transparent, and professional onboarding portal designed for modern enterprises.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-white text-primary hover:bg-white hover:text-primary-hover shadow-xl transition-all duration-300 pr-8 cursor-pointer"
              >
                <Link href="/register" className="inline-flex items-center gap-2">
                  Register Vendor
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group border-white/30 text-white backdrop-blur-md hover:bg-[#EC1E25] hover:text-white transition-all duration-300 pr-8 cursor-pointer"
              >
                <a href="#features" className="inline-flex items-center gap-2">
                  Learn More
                  <ArrowRight className="size-4 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* TRUST BADGES / CERTIFICATIONS */}
        <section className="w-full bg-white border-y border-border py-12">
          <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-around gap-8">
            <div className="flex items-center gap-3 text-primary/70">
              <ShieldCheck className="size-10 text-primary" />
              <div>
                <h4 className="font-bold text-sm tracking-wide uppercase">ISO 37001 Certified</h4>
                <p className="text-xs text-muted-foreground">Anti-Bribery Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary/70">
              <Award className="size-10 text-primary" />
              <div>
                <h4 className="font-bold text-sm tracking-wide uppercase">SMAP Compliance</h4>
                <p className="text-xs text-muted-foreground">Clean & Integrity Partnerships</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary/70">
              <CheckCircle className="size-10 text-primary" />
              <div>
                <h4 className="font-bold text-sm tracking-wide uppercase">K3LH Verified</h4>
                <p className="text-xs text-muted-foreground">High Safety & Health Standards</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES / CAPABILITIES */}
        <section id="features" className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 mt-32 scroll-mt-24">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">Capabilities</span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl tracking-tight">Key Features</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance">
              Our platform offers a comprehensive range of features designed to simplify vendor registration, document management, and ongoing partnership operations.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <article
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/45 hover:shadow-elegant"
              >
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-[2]" />
                <div className="relative flex size-14 items-center justify-center rounded-xl bg-surface-dim text-primary border border-border/50 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <f.icon className="size-6" strokeWidth={2} />
                </div>
                <h3 className="relative mt-6 text-xl font-bold text-foreground group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80">{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="w-full bg-primary text-white mt-32 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-radar-pattern opacity-5 pointer-events-none" />
          <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">{s.value}</span>
                  <span className="text-xs md:text-sm font-semibold text-white/70 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 mt-32">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">Testimonials</span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl tracking-tight">Trust From Partners</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance">
              Hear what our registered vendors have to say about PT Eltran Indonesia's digital procurement experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between bg-white border border-border/60 rounded-3xl p-8 shadow-sm hover:shadow-elegant transition-shadow duration-300"
              >
                <div>
                  <div className="flex gap-1 text-amber-500 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="size-8 text-primary/10 mb-4" />
                  <p className="text-sm italic leading-relaxed text-foreground/80 mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Building className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary">{t.author}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="w-full mt-32">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-hover py-16 md:py-20 px-6 lg:px-20 shadow-elegant flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="absolute inset-0 bg-[url('/bg.jpg')] opacity-10 object-cover mix-blend-overlay pointer-events-none" />
            <div className="relative z-10 max-w-2xl flex flex-col items-center md:items-start">
              <div className="mb-6 bg-white/10 p-3 rounded-2xl backdrop-blur-sm w-fit">
                <Image src="/eltran.png" alt="PT Eltran Indonesia" width={180} height={60} className="h-10 w-auto object-contain drop-shadow-md" />
              </div>
              <h3 className="text-3xl font-bold text-white md:text-5xl tracking-tight">Ready to become an Eltran partner?</h3>
              <p className="mt-6 text-lg leading-relaxed text-white/90">
                Complete your vendor registration in four guided steps. Our procurement team is here to support you at every stage.
              </p>
            </div>
            <div className="relative z-10 shrink-0">
              <Button
                asChild
                size="lg"
                className="group relative bg-white text-primary hover:bg-white/95 hover:text-primary-hover shadow-lg px-12 py-8 text-lg rounded-2xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <Link href="/register" className="inline-flex items-center gap-3">
                  Start Registration
                  <ArrowRight className="size-6 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
