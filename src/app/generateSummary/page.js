"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ summary: "", summaryUrdu: "" });
  const router = useRouter();

  const starPositions = useMemo(() => (
    Array.from({ length: 80 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
    }))
  ), []);

  const handleSubmit = async () => {
    try {
      console.log("🚀 Submitting:", { url, text });
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, text }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "API error");
      }
      console.log("✅ Summary:", data.summary);
      console.log("✅ Urdu:", data.summaryUrdu);
      setModalContent({ summary: data.summary, summaryUrdu: data.summaryUrdu });
      setModalOpen(true);
    } catch (err) {
      console.error("❌ Error:", err);
      setModalContent({ summary: "", summaryUrdu: "" });
      setModalOpen(true);
    }
  };



  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col items-center justify-center px-2 sm:px-4 md:px-8 py-4 sm:py-8 md:py-12 overflow-hidden text-white font-sans">
      {/* Modal for summary */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-modal-overlay px-2 sm:px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div
            className="relative bg-gradient-to-br from-[#1e293b] to-[#9333ea] border border-purple-400/60 rounded-2xl shadow-2xl p-2 sm:p-4 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-xl text-white animate-modal-in overflow-y-auto max-h-[80vh] focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400/60"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white/70 hover:text-pink-400 text-2xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-green-400 text-2xl mr-2">✔️</span>
              <h2 className="text-xl sm:text-2xl font-bold">Summary Generated</h2>
            </div>
            <div className="mb-3 sm:mb-4">
              <div className="font-semibold text-base sm:text-lg mb-1">Summary:</div>
              <div className="bg-white/10 rounded-lg p-2 sm:p-3 text-white/90 whitespace-pre-line max-h-32 sm:max-h-40 overflow-y-auto border border-white/20 text-sm sm:text-base">
                {modalContent.summary || <span className="text-red-400">Error generating summary.</span>}
              </div>
            </div>
            <div>
              <div className="font-semibold text-base sm:text-lg mb-1 flex items-center"><span className="mr-2">📝</span>Urdu:</div>
              <div className="bg-white/10 rounded-lg p-2 sm:p-3 text-white/90 whitespace-pre-line max-h-32 sm:max-h-40 overflow-y-auto border border-white/20 text-sm sm:text-base text-right" dir="rtl">
                {modalContent.summaryUrdu || <span className="text-red-400">No Urdu summary.</span>}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ✨ Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {starPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-40 animate-pulse"
            style={pos}
          />
        ))}
      </div>

      {/* 🔙 Back Button */}
      <div className="w-full max-w-3xl z-10 flex justify-start mb-4">
        <Button
          onClick={() => router.push("/")}
          className="relative px-4 md:px-6 py-2 md:py-3 text-white border border-purple-400 rounded-full overflow-hidden group z-10 shadow-lg hover:scale-105 transition-transform duration-300 text-base md:text-lg"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-md group-hover:opacity-60 transition duration-300"></span>
          <span className="relative z-10">← Back to Home</span>
        </Button>
      </div>

      {/* 💫 Card */}
      <div className="z-10 w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white/10 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl p-2 sm:p-4 md:p-8 space-y-3 sm:space-y-4 md:space-y-6 text-white transition-all duration-500 animate-fade-in">
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            🚀 AI Blog Summarizer
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-300">
            Paste a blog URL or blog text to generate an AI summary with Urdu translation.
          </p>
        </header>
        <div className="space-y-4">
          <Input
            placeholder="🌐 Paste blog URL"
            className="bg-white/20 text-white placeholder:text-white/60 border border-white/30 hover:border-purple-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40 transition-all duration-300 rounded-lg shadow-inner backdrop-blur-md px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm md:text-base lg:text-lg outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
            autoComplete="off"
            aria-label="Blog URL"
          />
          <div className="text-center text-slate-300 text-sm md:text-base">
            or paste blog text manually
          </div>
          <Textarea
            rows={6}
            placeholder="📜 Enter blog text here..."
            className="bg-white/20 text-white placeholder:text-white/60 border border-white/30 hover:border-purple-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40 transition-all duration-300 rounded-lg shadow-inner backdrop-blur-md px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm md:text-base lg:text-lg outline-none resize-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            autoComplete="off"
            aria-label="Blog Text"
          />
          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 hover:scale-[1.03] active:scale-95 text-white font-bold text-xs sm:text-base md:text-lg py-3 sm:py-4 md:py-6 rounded-xl transition-all duration-300 ease-in-out shadow-[0_0_20px_#9333ea50] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 animate-bounce-once"
            tabIndex={0}
            aria-label="Generate Summary"
          >
            🔍 Generate Summary
          </Button>
        </div>
      </div>
      {/* Add this style block at the end of the file for fade-in and bounce-once animation if not present */}
      <style jsx global>{`
@keyframes fade-in {
  from { opacity: 0; transform: translateY(30px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(0.4,0,0.2,1);
}
@keyframes bounce-once {
  0% { transform: scale(1); }
  20% { transform: scale(1.08); }
  40% { transform: scale(0.97); }
  60% { transform: scale(1.03); }
  80% { transform: scale(0.99); }
  100% { transform: scale(1); }
}
.animate-bounce-once {
  animation: bounce-once 0.5s;
}
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.92) translateY(40px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-in {
  animation: modal-in 0.45s cubic-bezier(0.4,0,0.2,1);
}
@keyframes modal-overlay {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-modal-overlay {
  animation: modal-overlay 0.3s;
}
`}</style>
    </main>
  );
}
