"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, User, Shield, Stethoscope, Phone } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const dummyUsers = [
    {
      role: "Psikolog",
      identifier: "psikolog@psyhealth.com",
      password: "password123",
      icon: Stethoscope,
      redirect: "/psychologist",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200",
    },
    {
      role: "Admin",
      identifier: "admin@psyhealth.com",
      password: "password123",
      icon: Shield,
      redirect: "/admin",
      color: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200",
    },
  ];

  const handleDemoLogin = (user: typeof dummyUsers[0]) => {
    setIdentifier(user.identifier);
    setPassword(user.password);
    
    // Simulate slight delay for demo feel
    setTimeout(() => {
      router.push(user.redirect);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default fallback routing for demo based on identifier
    if (identifier.includes("admin")) {
      router.push("/admin");
    } else if (identifier.includes("psikolog")) {
      router.push("/psychologist");
    } else {
      router.push("/dashboard"); // Fallback to client dashboard
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-[#dfe4d8]/50 blur-3xl" />
        <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#e8e4d9]/60 blur-3xl" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-[#607062] hover:text-[#52634a] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
        </Link>
        <div className="flex justify-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6e8063] text-2xl text-white shadow-sm">
            ✦
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-serif tracking-tight text-[#52634a]">
          Selamat datang kembali
        </h2>
        <p className="mt-2 text-center text-sm text-[#607062]">
          Masuk ke akun Anda untuk melanjutkan
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        {/* DEMO ACCOUNTS SECTION */}
        <div className="bg-white/80 backdrop-blur-xl p-5 shadow-sm sm:rounded-2xl border border-teal-200/60 mb-6">
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-4 text-center">
            Mode Demo: Akses Cepat Login
          </p>
          <div className="grid grid-cols-2 gap-3">
            {dummyUsers.map((user) => (
              <button
                key={user.role}
                type="button"
                onClick={() => handleDemoLogin(user)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98] ${user.color}`}
              >
                <user.icon className="h-6 w-6 mb-2" />
                <span className="text-[11px] font-bold text-center leading-tight">{user.role}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-xl shadow-[#dfe4d8]/50 sm:rounded-2xl sm:px-10 border border-[#dfe4d8]/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-[#52634a]">
                Nomor HP atau Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#9ca3af]" />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-[#dfe4d8] rounded-xl shadow-sm placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6e8063] focus:border-transparent sm:text-sm bg-white transition-shadow"
                  placeholder="0812xxxx atau anda@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#52634a]">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9ca3af]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-[#dfe4d8] rounded-xl shadow-sm placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6e8063] focus:border-transparent sm:text-sm bg-white transition-shadow"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#52634a] hover:bg-[#41523b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e8063] transition-colors"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
