import React from 'react';
import { Shield, ChevronUp, Terminal, Radio } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050709] border-t border-[#00F0FF]/15 py-10 px-4 md:px-8 text-xs font-mono text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Terminal Copyright & Version */}
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="w-6 h-6 border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center clip-chamfer-sm">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-gray-300 font-bold tracking-wider">
              EXO-ARMOR // MK-IV SCROLLYTELLING ENGINE
            </div>
            <div className="text-[10px] text-gray-500 tracking-widest">
              DESIGNED &amp; ARCHITECTED BY LINGGA NUGRAHA MANDAJAYA &copy; {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Center: System Telemetry Fingerprint */}
        <div className="hidden lg:flex items-center space-x-4 text-[10px] text-gray-500 border border-white/5 px-4 py-2 bg-black/40 rounded-xs">
          <span>CHECKSUM: <span className="text-[#00F0FF]">0x8F9C2B4E</span></span>
          <span>FPS: <span className="text-emerald-400">60 SYNCHRONOUS</span></span>
          <span>PROTOCOL: <span className="text-[#D97736]">GSAP / LENIS / REACT 19</span></span>
        </div>

        {/* Right: Return to Orbit Button */}
        <button
          onClick={scrollToTop}
          className="px-4 py-2 bg-[#0E121A] hover:bg-[#161D2A] border border-[#00F0FF]/30 hover:border-[#00F0FF] text-[#00F0FF] transition-all clip-chamfer-sm flex items-center space-x-2 cursor-pointer text-xs tracking-wider"
        >
          <span>RETURN TO APEX</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
