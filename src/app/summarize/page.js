"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    console.log({ url, text }); // Placeholder
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col items-center justify-center px-4 py-10 overflow-hidden text-white font-sans">
      {/* ✨ Stars Background */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-40 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 🔙 Back Button */}
      <div className="w-full max-w-3xl z-10 flex justify-start mb-4">
        <Button
          onClick={() => router.push("/")}
          className="relative px-6 py-3 text-white border border-purple-400 rounded-full overflow-hidden group z-10 shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-md group-hover:opacity-60 transition duration-300"></span>
          <span className="relative z-10">← Back to Home</span>
        </Button>
      </div>

      {/* 💫 Card */}
      <div className="z-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl p-8 space-y-6 text-white">
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            🚀 AI Blog Summarizer
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Paste a blog URL or blog text to generate an AI summary with Urdu
            translation.
          </p>
        </header>

        <div className="space-y-4">
          <Input
            placeholder="🌐 Paste blog URL"
            className="bg-white/20 text-white placeholder:text-white/60 border border-white/30 hover:border-purple-400 transition"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="text-center text-slate-300">
            or paste blog text manually
          </div>
          <Textarea
            rows={6}
            placeholder="📜 Enter blog text here..."
            className="bg-white/20 text-white placeholder:text-white/60 border border-white/30 hover:border-purple-400 transition"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 text-white font-bold text-lg py-6 rounded-xl transition duration-300 ease-in-out shadow-[0_0_20px_#9333ea50]"
          >
            🔍 Generate Summary
          </Button>
        </div>
      </div>
    </main>
  );
}
