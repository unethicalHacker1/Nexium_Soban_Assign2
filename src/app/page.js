"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/summarize");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col items-center justify-center px-6 py-10 font-sans">
      {/* ✨ Starfield */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-50 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>



      {/* 🌌 Main Content */}
      <div className="z-10 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          ✨ Blog Summarizer <br /> with AI & Urdu Support
        </h1>
        <p className="text-lg md:text-xl text-slate-300">
          Paste any blog link or text and get an instant AI-powered summary{" "}
          <br />
          translated into Urdu. Save your summaries, track history, and learn
          faster.
        </p>
        <Button
          onClick={handleGetStarted}
          className="relative px-8 py-4 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-[0_0_25px_#9333ea70] hover:brightness-110 transition-transform hover:scale-105"
        >
          🚀 Get Started
        </Button>
      </div>
    </main>
  );
}
