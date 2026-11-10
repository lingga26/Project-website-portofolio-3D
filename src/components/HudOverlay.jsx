import React from 'react';
import { 
  Cpu, 
  Activity, 
  Terminal, 
  Layers, 
  Wifi, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight, 
  Send, 
  Radio, 
  Crosshair,
  Server,
  Zap
} from 'lucide-react';
import { smoothScrollTo } from '../utils/scrollHelper.js';

export default function HudOverlay({ scrollProgress = 0, activeFrame = 0 }) {
  // Phase calculations with smooth interpolation
  // Phase 1: Standby (0.00 - 0.35)
  // Phase 2: Diagnostics (0.35 - 0.70)
  // Phase 3: Identity Reveal (0.70 - 1.00)
  
  // Phase 1 opacity: fully visible at 0 -> 0.25, fades out by 0.35
  const phase1Opacity = Math.max(0, Math.min(1, (0.35 - scrollProgress) / 0.15));

  // Phase 2 opacity: fades in 0.32 -> 0.40, fully visible 0.40 -> 0.65, fades out 0.65 -> 0.75
  const phase2Opacity = scrollProgress < 0.32 
    ? 0 
    : scrollProgress <= 0.65 
      ? Math.min(1, (scrollProgress - 0.32) / 0.08)
      : Math.max(0, 1 - (scrollProgress - 0.65) / 0.08);

  // Phase 3 opacity: starts fading in at 0.68, fully visible 0.80 -> 1.00
  const phase3Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.68) / 0.14));

  const scrollTo = (id) => {
    smoothScrollTo(id, { duration: 1.8 });
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 md:p-8 overflow-hidden select-none">
      {/* Background Cybernetic Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-40" />

      {/* Persistent Tactical HUD Corner Brackets */}
      <div className="absolute top-16 left-6 md:left-10 w-8 h-8 border-t-2 border-l-2 border-[#00F0FF]/60 pointer-events-none" />
      <div className="absolute top-16 right-6 md:right-10 w-8 h-8 border-t-2 border-r-2 border-[#00F0FF]/60 pointer-events-none" />
      <div className="absolute bottom-6 left-6 md:left-10 w-8 h-8 border-b-2 border-l-2 border-[#00F0FF]/60 pointer-events-none" />
      <div className="absolute bottom-6 right-6 md:right-10 w-8 h-8 border-b-2 border-r-2 border-[#00F0FF]/60 pointer-events-none" />

      {/* Top Persistent Telemetry Readouts */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#00F0FF]/80 mt-14">
        <div className="flex items-center space-x-3 bg-[#07090C]/80 px-3 py-1.5 border border-[#00F0FF]/25 backdrop-blur-sm clip-chamfer-sm">
          <Crosshair className="w-3.5 h-3.5 text-[#00F0FF] animate-spin" style={{ animationDuration: '8s' }} />
          <span>SYS_LATENCY: <strong className="text-white">0.42ms</strong></span>
          <span className="text-[#00F0FF]/40">|</span>
          <span className="hidden sm:inline">INTEGRITY: <strong className="text-[#00F0FF]">99.8%</strong></span>
        </div>

        <div className="flex items-center space-x-3 bg-[#07090C]/80 px-3 py-1.5 border border-[#00F0FF]/25 backdrop-blur-sm clip-chamfer-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          <span>FRAME: <strong className="text-white">{String(activeFrame + 1).padStart(3, '0')} / 192</strong></span>
          <span className="text-[#00F0FF]/40">|</span>
          <span className="text-[#D97736] font-bold">SECTOR 07</span>
        </div>
      </div>

      {/* =========================================================================
          PHASE 1 (0.00 - 0.35): Armor System Standby & Deployment Hook
      ========================================================================= */}
      <div 
        className="my-auto transition-opacity duration-300 pointer-events-none"
        style={{ opacity: phase1Opacity, display: phase1Opacity > 0 ? 'block' : 'none' }}
      >
        <div className="max-w-xl mx-auto text-center px-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[#00F0FF] text-[11px] font-mono tracking-widest clip-chamfer-sm mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#00F0FF]" />
            <span>STATUS: HEX_CORE_ONLINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wider font-display uppercase mb-4 drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
            EXO-ARMOR <span className="text-[#00F0FF]">INITIALIZED</span>
          </h1>

          <p className="text-sm md:text-base font-sans text-gray-300 max-w-md mx-auto mb-8 font-light tracking-wide leading-relaxed">
            High-performance cybernetics portfolio architecture. Mechanical armor sequence armed for retraction.
          </p>

          {/* Interactive Scrub Prompt */}
          <button 
            type="button"
            className="inline-flex flex-col items-center space-y-2 pointer-events-auto cursor-pointer group bg-transparent border-0 p-0 outline-none" 
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo(3000, { duration: 2.5 });
            }}
          >
            <div className="px-5 py-2.5 border border-[#00F0FF]/40 bg-[#07090C]/85 backdrop-blur-md text-[#00F0FF] text-xs font-mono tracking-widest clip-chamfer flex items-center space-x-2.5 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:border-[#00F0FF] hover:bg-[#00F0FF]/15 transition-all group-hover:scale-105 active:scale-95">
              <span>SCRUB TO DEPLOY RETRACTION</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-[#00F0FF]" />
            </div>
            <span className="text-[10px] font-mono text-gray-500 tracking-wider">
              [ CLICK TO AUTORUN // OR SCROLL MANUALLY ]
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          PHASE 2 (0.35 - 0.70): Sub-system Diagnostics & Competency Plates
      ========================================================================= */}
      <div 
        className="my-auto transition-opacity duration-300 pointer-events-none"
        style={{ opacity: phase2Opacity, display: phase2Opacity > 0 ? 'block' : 'none' }}
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 px-4">
          {/* Left Glass Plate: Full-Stack Architecture */}
          <div 
            className="hud-card p-6 border-l-4 border-l-[#00F0FF] clip-chamfer-tl-br transform transition-transform duration-300"
            style={{ transform: `translateX(${(1 - phase2Opacity) * -30}px)` }}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#00F0FF]/20">
              <div className="flex items-center space-x-2 text-[#00F0FF]">
                <Cpu className="w-5 h-5 text-[#00F0FF]" />
                <span className="font-display font-bold text-lg tracking-wider text-white">
                  FULL-STACK SYSTEMS
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#00F0FF] px-2 py-0.5 bg-[#00F0FF]/10 border border-[#00F0FF]/30 clip-chamfer-sm">
                CORE_LAYER_01
              </span>
            </div>

            <p className="text-xs md:text-sm text-gray-300 mb-4 font-light leading-relaxed">
              Architecting mission-critical web applications, high-concurrency cloud backends, and responsive real-time client systems with modern stacks.
            </p>

            <div className="space-y-2 text-xs font-mono text-gray-400">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300">Laravel / PHP 8+ / React 19 / Vite</span>
                <span className="text-[#00F0FF] font-bold">OPTIMIZED</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300">Node.js / Express / REST & GraphQL</span>
                <span className="text-[#00F0FF] font-bold">READY</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300">PostgreSQL / Redis / MySQL Cluster</span>
                <span className="text-[#00F0FF] font-bold">SYNCED</span>
              </div>
            </div>

            {/* Diagnostic Bar */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span>SYNAPSE THROUGHPUT</span>
              <span className="text-[#00F0FF]">1.24 GB/s</span>
            </div>
            <div className="w-full bg-black/60 h-1.5 border border-[#00F0FF]/30 mt-1 rounded-full overflow-hidden">
              <div className="bg-[#00F0FF] h-full" style={{ width: `${Math.min(100, (scrollProgress / 0.7) * 94)}%` }} />
            </div>
          </div>

          {/* Right Glass Plate: Hardware & IoT Systems */}
          <div 
            className="hud-card p-6 border-r-4 border-r-[#D97736] clip-chamfer-tl-br transform transition-transform duration-300"
            style={{ transform: `translateX(${(1 - phase2Opacity) * 30}px)` }}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D97736]/20">
              <div className="flex items-center space-x-2 text-[#D97736]">
                <Zap className="w-5 h-5 text-[#D97736]" />
                <span className="font-display font-bold text-lg tracking-wider text-white">
                  IOT & EMBEDDED HARDWARE
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#D97736] px-2 py-0.5 bg-[#D97736]/10 border border-[#D97736]/30 clip-chamfer-sm">
                SUBSYSTEM_02
              </span>
            </div>

            <p className="text-xs md:text-sm text-gray-300 mb-4 font-light leading-relaxed">
              Engineering autonomous sensor networks, microcontroller firmwares, industrial telemetry buses, and edge-to-cloud IoT bridges.
            </p>

            <div className="space-y-2 text-xs font-mono text-gray-400">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300">ESP32 / ESP8266 / Arduino C++</span>
                <span className="text-[#D97736] font-bold">ARMED</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300">Sensor Bus (I2C / SPI / UART / LoRa)</span>
                <span className="text-[#D97736] font-bold">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300">MQTT Broker / Edge Telemetry</span>
                <span className="text-[#D97736] font-bold">POLLING</span>
              </div>
            </div>

            {/* Diagnostic Bar */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span>BUS SIGNAL STRENGTH</span>
              <span className="text-[#D97736]">-48 dBm (EXCELLENT)</span>
            </div>
            <div className="w-full bg-black/60 h-1.5 border border-[#D97736]/30 mt-1 rounded-full overflow-hidden">
              <div className="bg-[#D97736] h-full" style={{ width: `${Math.min(100, (scrollProgress / 0.7) * 98)}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PHASE 3 (0.70 - 1.00): Face Reveal & Hero Identity
      ========================================================================= */}
      <div 
        className="my-auto transition-all duration-500 pointer-events-none"
        style={{ 
          opacity: phase3Opacity, 
          display: phase3Opacity > 0 ? 'block' : 'none',
          transform: `translateY(${(1 - phase3Opacity) * 20}px)`
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 pointer-events-auto">
          {/* Tactical Clearance Badges */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-[#00F0FF]/15 border border-[#00F0FF] text-[#00F0FF] text-[11px] font-mono tracking-wider clip-chamfer-sm">
              EXO-HELMET RETRACTED // BIOMETRIC VERIFIED
            </span>
            <span className="px-3 py-1 bg-[#D97736]/15 border border-[#D97736] text-[#D97736] text-[11px] font-mono tracking-wider clip-chamfer-sm">
              ENGINEER CLEARANCE LEVEL 5
            </span>
          </div>

          {/* Engineer Name */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white font-display uppercase tracking-wider mb-2 drop-shadow-[0_0_35px_rgba(0,240,255,0.6)]">
            LINGGA NUGRAHA <span className="text-[#00F0FF]">MANDAJAYA</span>
          </h1>

          {/* Title & Core Philosophy */}
          <div className="inline-block px-4 py-1.5 bg-[#07090C]/90 border border-[#00F0FF]/40 clip-chamfer mb-6">
            <p className="text-xs sm:text-base md:text-lg font-mono text-[#00F0FF] tracking-[0.2em] uppercase font-bold">
              IT SUPPORT &amp; SOFTWARE / IOT ENGINEER
            </p>
          </div>

          <p className="text-sm md:text-base font-sans text-gray-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Bridging physical computing hardware, enterprise IT infrastructure, and robust full-stack software applications into seamless, intelligent digital ecosystems.
          </p>

          {/* Action Buttons with Chamfered Cut Corners */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('arsenal-section')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#00F0FF] hover:bg-[#2bf4ff] text-[#07090C] font-mono font-bold text-sm tracking-widest clip-chamfer flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all hover:scale-105 active:scale-95"
            >
              <span>[ EXPLORE PROTOCOLS ]</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('comms-section')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0E121A]/90 hover:bg-[#161D2A] border border-[#00F0FF]/50 hover:border-[#00F0FF] text-[#00F0FF] font-mono font-bold text-sm tracking-widest clip-chamfer flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all hover:scale-105 active:scale-95"
            >
              <span>[ TRANSMIT COMMS ]</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom HUD Coordinates & Diagnostics */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-gray-400 mb-2">
        <div className="hidden sm:flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>COORDINATES: <span className="text-gray-300">6.9175° S, 107.6191° E</span></span>
        </div>

        <div className="flex items-center space-x-2 mx-auto sm:mx-0">
          <span className="text-[#00F0FF] animate-pulse">●</span>
          <span className="tracking-widest">
            {scrollProgress < 0.35 && 'STANDBY // AWAITING SCRUB'}
            {scrollProgress >= 0.35 && scrollProgress < 0.70 && 'DIAGNOSTICS // CALIBRATING SUBSYSTEMS'}
            {scrollProgress >= 0.70 && 'UNLOCKED // HERO IDENTITY ONLINE'}
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <span>SECURITY: <span className="text-[#00F0FF]">ENCRYPTED_SHA256</span></span>
        </div>
      </div>
    </div>
  );
}
