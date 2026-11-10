import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Wifi, Radio, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { smoothScrollTo } from '../utils/scrollHelper.js';
import { playBlip, setTacticalAudioMute } from '../utils/tacticalAudio.js';

export default function Navbar({ scrollProgress = 0 }) {
  const [time, setTime] = useState('');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Keep audio state in sync
    setTacticalAudioMute(!isAudioEnabled);
  }, [isAudioEnabled]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0] + ' UTC' + (now.getTimezoneOffset() <= 0 ? '+' : '-') + Math.abs(now.getTimezoneOffset() / 60));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const nextState = !isAudioEnabled;
    setIsAudioEnabled(nextState);
    setTacticalAudioMute(!nextState);
    if (nextState) {
      setTimeout(() => playBlip(1040, 0.1), 50);
    }
  };

  const scrollTo = (id) => {
    playBlip();
    setIsMobileMenuOpen(false);
    smoothScrollTo(id, { duration: 1.8 });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#07090C]/90 backdrop-blur-md border-b border-[#00F0FF]/20 px-4 md:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
        {/* Brand / Call-sign */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('hero-section')}>
          <div className="w-7 h-7 bg-[#00F0FF]/10 border border-[#00F0FF] flex items-center justify-center clip-chamfer-sm text-[#00F0FF]">
            <Shield className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#E2E8F0] tracking-wider">EXO-ARMOR // MK-IV</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 bg-[#00F0FF]/15 text-[#00F0FF] text-[10px] rounded-xs border border-[#00F0FF]/40">
                ACTIVE
              </span>
            </div>
            <div className="text-[10px] text-[#00F0FF]/70 tracking-widest hidden sm:block">
              PILOT: LINGGA N. MANDAJAYA
            </div>
          </div>
        </div>

        {/* Tactical Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6 text-[#94A3B8]">
          <button
            onClick={() => scrollTo('hero-section')}
            className="hover:text-[#00F0FF] transition-colors flex items-center space-x-1.5 cursor-pointer py-1"
          >
            <span className="text-[#00F0FF]/60">//</span>
            <span>SYSTEM</span>
          </button>
          <button
            onClick={() => scrollTo('arsenal-section')}
            className="hover:text-[#00F0FF] transition-colors flex items-center space-x-1.5 cursor-pointer py-1"
          >
            <span className="text-[#00F0FF]/60">//</span>
            <span>ARSENAL</span>
          </button>
          <button
            onClick={() => scrollTo('missions-section')}
            className="hover:text-[#00F0FF] transition-colors flex items-center space-x-1.5 cursor-pointer py-1"
          >
            <span className="text-[#00F0FF]/60">//</span>
            <span>MISSIONS</span>
          </button>
          <button
            onClick={() => scrollTo('comms-section')}
            className="hover:text-[#00F0FF] transition-colors flex items-center space-x-1.5 cursor-pointer py-1"
          >
            <span className="text-[#00F0FF]/60">//</span>
            <span>UPLINK</span>
          </button>
        </nav>

        {/* Telemetry Clock & Audio Relay */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-[11px]">
          <div className="hidden lg:flex items-center space-x-2 text-[#64748B] border border-white/5 px-2.5 py-1 bg-black/40 rounded-xs">
            <Radio className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
            <span className="text-[#00F0FF] font-medium">{time}</span>
          </div>

          <button
            onClick={handleAudioToggle}
            title={isAudioEnabled ? 'Disable Tactical Audio FX' : 'Enable Tactical Audio FX'}
            className={`p-1.5 border transition-all cursor-pointer ${
              isAudioEnabled
                ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF]'
                : 'border-white/10 bg-black/40 text-gray-400 hover:border-[#00F0FF]/40'
            }`}
          >
            {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => scrollTo('comms-section')}
            className="hidden sm:inline-block px-3 py-1.5 bg-[#00F0FF] hover:bg-[#00D2DF] text-[#07090C] font-bold text-[11px] clip-chamfer-sm transition-all tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
          >
            COMMS UPLINK
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF] clip-chamfer-sm cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Tactical Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#00F0FF]/20 flex flex-col space-y-2 text-xs font-mono bg-[#07090C]/95 p-4 rounded-xs">
          <button
            onClick={() => scrollTo('hero-section')}
            className="text-left py-2 px-3 hover:bg-[#00F0FF]/10 text-gray-300 hover:text-[#00F0FF] flex items-center space-x-2 border-l-2 border-transparent hover:border-[#00F0FF]"
          >
            <span className="text-[#00F0FF]">//</span>
            <span>00 // SYSTEM CORE</span>
          </button>
          <button
            onClick={() => scrollTo('arsenal-section')}
            className="text-left py-2 px-3 hover:bg-[#00F0FF]/10 text-gray-300 hover:text-[#00F0FF] flex items-center space-x-2 border-l-2 border-transparent hover:border-[#00F0FF]"
          >
            <span className="text-[#00F0FF]">//</span>
            <span>01 // ARSENAL MATRIX</span>
          </button>
          <button
            onClick={() => scrollTo('missions-section')}
            className="text-left py-2 px-3 hover:bg-[#00F0FF]/10 text-gray-300 hover:text-[#00F0FF] flex items-center space-x-2 border-l-2 border-transparent hover:border-[#00F0FF]"
          >
            <span className="text-[#00F0FF]">//</span>
            <span>02 // DEPLOYED MISSIONS</span>
          </button>
          <button
            onClick={() => scrollTo('comms-section')}
            className="text-left py-2 px-3 hover:bg-[#00F0FF]/10 text-gray-300 hover:text-[#00F0FF] flex items-center space-x-2 border-l-2 border-transparent hover:border-[#00F0FF]"
          >
            <span className="text-[#00F0FF]">//</span>
            <span>03 // TRANSMISSION UPLINK</span>
          </button>
        </div>
      )}
    </header>
  );
}
