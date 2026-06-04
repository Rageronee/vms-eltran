"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowRight, AlertCircle, Info } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (email === "admin@eltran.id" && password === "admin") {
        router.push("/dashboard/admin");
      } else if (email === "vendor@eltran.id" && password === "vendor") {
        router.push("/dashboard/vendor");
      } else {
        setError("Email atau password salah. Silakan coba lagi.");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <>
      <SiteHeader />
      <div className="relative min-h-screen flex flex-col bg-slate-50/50">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-[url('/bg.jpg')] opacity-[0.02] object-cover pointer-events-none select-none" />
        
        <main className="flex-1 flex flex-col items-center justify-center px-6 pt-36 pb-16">
          <div className="relative z-10 w-full max-w-md bg-white rounded-[2rem] p-10 md:p-12 shadow-elegant border border-border/40 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-primary tracking-tight">Welcome Back</h1>
              <p className="mt-2 text-sm text-muted-foreground">Sign in to your vendor portal.</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex items-start gap-3 text-secondary animate-in fade-in duration-300">
                <AlertCircle className="size-5 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold">{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input 
                label="Email Address" 
                required 
                type="email" 
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                label="Password" 
                required 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Button className="w-full mt-6 group bg-primary hover:bg-primary-hover text-white cursor-pointer" size="lg" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
                {!isLoading && <ArrowRight className="size-4 ml-2 transition-transform group-hover:translate-x-0.5" />}
              </Button>
            </form>
            
            {/* Demo Credentials Box */}
            <div className="mt-6 bg-slate-50 border border-border/40 rounded-2xl p-4 text-left">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="size-4 text-primary shrink-0 mt-0.5" />
                <div className="w-full">
                  <span className="font-bold text-slate-700 block mb-1">Demo Credentials:</span>
                  <div className="grid grid-cols-2 gap-3 text-[11px] mt-1 border-t border-slate-100 pt-2">
                    <div>
                      <span className="font-bold text-primary block mb-0.5">Admin Access:</span>
                      <span className="block">Email: <code>admin@eltran.id</code></span>
                      <span className="block">Pass: <code>admin</code></span>
                    </div>
                    <div>
                      <span className="font-bold text-[#EC1E25] block mb-0.5">Vendor Access:</span>
                      <span className="block">Email: <code>vendor@eltran.id</code></span>
                      <span className="block">Pass: <code>vendor</code></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border/60 pt-6">
              New vendor?{" "}
              <Link href="/register" className="font-semibold text-primary hover:text-primary-hover hover:underline transition-colors cursor-pointer">
                Register here
              </Link>
            </div>
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
