import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;
const getFramePath = (idx) => `${import.meta.env.BASE_URL}frames/frame_${String(idx).padStart(4, "0")}.webp`;

export default function ScrollyCanvas({ onProgressUpdate, children }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);
  const images = useRef([]);
  const lastRenderedIndex = useRef(-1);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    // Connect Lenis with GSAP ScrollTrigger ticker using monotonic time
    lenis.on('scroll', ScrollTrigger.update);

    const onTickerUpdate = () => {
      lenis.raf(performance.now());
    };

    gsap.ticker.add(onTickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTickerUpdate);
      window.__lenis = null;
      lenis.destroy();
    };
  }, []);

  // Preload Image Sequence with High Priority & Fallback Guard
  useEffect(() => {
    let loaded = 0;
    const imgList = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      const onComplete = () => {
        loaded++;
        const pct = Math.floor((loaded / TOTAL_FRAMES) * 100);
        setProgressPercent(pct);
        if (loaded >= TOTAL_FRAMES) {
          setTimeout(() => setIsReady(true), 300);
        }
      };

      img.onload = onComplete;
      img.onerror = onComplete; // Procedural fallback guard
      imgList[i - 1] = img;
    }
    images.current = imgList;
  }, []);

  // Canvas Render Function
  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(index, TOTAL_FRAMES - 1));
    lastRenderedIndex.current = clampedIndex;
    setActiveFrame(clampedIndex);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    }

    const img = images.current[clampedIndex];

    if (img && img.complete && img.naturalWidth > 0) {
      // High-DPI Aspect-ratio Cover math
      const wRatio = canvas.width / img.naturalWidth;
      const hRatio = canvas.height / img.naturalHeight;
      const ratio = Math.max(wRatio, hRatio);
      const renderW = img.naturalWidth * ratio;
      const renderH = img.naturalHeight * ratio;
      const cx = (canvas.width - renderW) / 2;
      const cy = (canvas.height - renderH) / 2;

      ctx.fillStyle = "#07090C";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, cx, cy, renderW, renderH);

      // Subtle cybernetic edge vignette
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.35,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.75
      );
      gradient.addColorStop(0, "rgba(7, 9, 12, 0)");
      gradient.addColorStop(1, "rgba(7, 9, 12, 0.65)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

    } else {
      // Procedural Cybernetic Fallback Wireframe
      ctx.fillStyle = "#07090C";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glowing Hexagonal Core Wireframe
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 100 * dpr;

      ctx.save();
      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 2 * dpr;

      ctx.beginPath();
      for (let side = 0; side < 6; side++) {
        const angle = (side * Math.PI) / 3;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        if (side === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner Core Visor
      ctx.strokeStyle = "#00F0FF";
      ctx.lineWidth = 3 * dpr;
      ctx.beginPath();
      ctx.moveTo(cx - 60 * dpr, cy);
      ctx.lineTo(cx + 60 * dpr, cy);
      ctx.stroke();

      // Diagnostics text
      ctx.fillStyle = "#00F0FF";
      ctx.font = `${14 * dpr}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.fillText(`ARMOR SIMULATION ACTIVE // FRAME: ${clampedIndex + 1}/${TOTAL_FRAMES}`, cx, cy + 140 * dpr);
      ctx.restore();
    }
  }, []);

  // GSAP ScrollTrigger Integration
  useEffect(() => {
    if (!isReady || !containerRef.current || !canvasRef.current) return;

    renderFrame(0);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=3500",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.min(TOTAL_FRAMES - 1, Math.floor(self.progress * (TOTAL_FRAMES - 1)));
        renderFrame(idx);
        if (onProgressUpdate) {
          onProgressUpdate(self.progress, idx);
        }
      },
    });

    const handleResize = () => {
      renderFrame(lastRenderedIndex.current >= 0 ? lastRenderedIndex.current : 0);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      trigger.kill();
    };
  }, [isReady, renderFrame, onProgressUpdate]);

  return (
    <div
      id="hero-section"
      ref={containerRef}
      className="relative w-full h-screen bg-[#07090C] overflow-hidden select-none"
    >
      {/* Tactical Boot Sequence Loader */}
      {!isReady && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#07090C] text-[#00F0FF] font-mono px-4">
          <div className="relative w-28 h-28 flex items-center justify-center mb-6">
            {/* Outer Rotating HUD Ring */}
            <div className="absolute inset-0 border-2 border-[#00F0FF]/20 border-t-[#00F0FF] rounded-full animate-spin" />
            {/* Inner Counter Ring */}
            <div
              className="absolute inset-3 border border-[#D97736]/30 border-b-[#D97736] rounded-full animate-spin"
              style={{ animationDirection: 'reverse', animationDuration: '3s' }}
            />
            {/* Core percentage */}
            <span className="text-xl font-bold font-display tracking-wider text-[#00F0FF]">
              {progressPercent}%
            </span>
          </div>

          <div className="text-center max-w-md">
            <p className="text-xs tracking-[0.25em] text-[#00F0FF] font-bold mb-2 uppercase">
              CALIBRATING EXO-ARMOR SUITE
            </p>
            <div className="w-64 h-1.5 bg-black/60 border border-[#00F0FF]/30 mx-auto rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-[#00F0FF] to-[#D97736] transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-500 tracking-wider">
              STREAMING HIGH-DEF TELEMETRY SAMPLES // 192 FRAMES
            </p>
          </div>
        </div>
      )}

      {/* Primary Scrolly Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Children: Floating Tactical HUD Overlay */}
      {isReady && children}
    </div>
  );
}
