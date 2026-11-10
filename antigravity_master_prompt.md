# SYSTEM PROMPT: Interactive 3D Scrollytelling Exo-Armor Portfolio (React + GSAP + Lenis)

---

## 1. Project Overview & Role
You are an expert Creative Technologist and Senior Front-End Systems Architect. Your objective is to build a high-performance, single-page creative portfolio in **React (Vite + Tailwind CSS)** featuring an Apple-style **3D Canvas Scrollytelling Hero** synchronized with scroll progress, transitioning seamlessly into a dark tactical cybernetics portfolio sheet.

The hero section uses a pre-rendered image sequence (`.webp`) extracted from a cinematic 3D exo-armor animation where a futuristic titanium/graphite armor helmet retracts mechanically to reveal the engineer's face, accompanied by real-time HUD telemetry, normal relighting, and smooth spring physics.

---

## 2. Tech Stack & Dependencies
- **Runtime & Build:** React 18+ (Vite, TypeScript/ESM)
- **Styling:** Tailwind CSS + custom CSS variables for chamfered `clip-path` cards
- **Scroll Engine:** `lenis` (smooth inertia scrolling)
- **Animation & Scrubbing:** `gsap` + `ScrollTrigger`
- **Canvas Rendering:** High-DPI HTML5 2D Context (optimized `drawImage` with `object-fit: cover` math)
- **Icons:** `lucide-react`

### Dependencies command:
```bash
npm install gsap lenis lucide-react
npm install -D tailwindcss postcss autoprefixer
```

---

## 3. Visual Art Direction & Tokens

| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg-void` | `#07090C` | Dark studio void matching the animation backdrop |
| `--bg-surface` | `rgba(14, 18, 26, 0.75)` | Chamfered HUD panel fill |
| `--accent-cyan` | `#00F0FF` | Arc reactor core, glowing visor slit, scanlines |
| `--accent-copper` | `#D97736` | Armor accent trim, telemetry status markers |
| `--border-hud` | `rgba(0, 240, 255, 0.2)` | 1px tactical perimeter borders |
| `--font-display` | `'Oswald', sans-serif` | Impact display headlines & numerical telemetry |
| `--font-sans` | `'Space Grotesk', sans-serif` | Conversational text, bio, project descriptions |
| `--font-mono` | `'JetBrains Mono', monospace` | HUD coordinates, terminal logs, code badges |

---

## 4. Key Engineering Components

### Component A: `ScrollyCanvas.jsx` (Core Scrollytelling Engine)
1. **Asset Preloader:**
   - Preload a sequence of frames (`TOTAL_FRAMES = 192`, path: `/frames/frame_XXXX.webp`).
   - Display a tactical boot sequence loader (`0% -> 100%`) with an animated circular ring and status indicator before unlocking user scroll.
2. **Procedural Fallback (Zero-Error Guard):**
   - If image assets fail or the `/frames/` directory is empty, draw a procedural animated wireframe armor silhouette, glowing hexagonal core, and frame progress counter on the canvas so development never breaks.
3. **Canvas Responsive Cover:**
   - Calculate canvas dimensions based on `window.innerWidth`, `window.innerHeight`, and `window.devicePixelRatio`.
   - Scale and center the active frame utilizing `Math.max(wRatio, hRatio)` centering calculus.
4. **GSAP ScrollTrigger Integration:**
   - Pin the canvas section for `3500px` (`start: "top top"`, `end: "+=3500"`, `pin: true`, `scrub: 0.5`).
   - Map normalized scroll progress `(0.0 -> 1.0)` directly to the active frame index `Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)))`.
   - Expose `scrollProgress` callback to trigger floating HUD overlay elements.

### Component B: `HudOverlay.jsx` (Dynamic Story Beats)
Overlay absolute positioned tactical UI elements on top of the pinned canvas based on `scrollProgress`:
- **Phase 1: `0.0 - 0.35` (Armor System Standby):**
  - Corner brackets with telemetry: `STATUS: HEX_CORE_ONLINE`, `SYS_LATENCY: 0.42ms`.
  - Subtle animated scanline overlay.
- **Phase 2: `0.35 - 0.70` (Sub-system Diagnostics):**
  - Left and right glass plates reveal core engineering competencies (Full-Stack Engineering, IoT & Embedded Systems, Cloud Infrastructure).
- **Phase 3: `0.70 - 1.00` (Face Reveal & Hero Identity):**
  - As the helmet retracts revealing the real engineer's face, smoothly fade in the main Hero identity:
    - **Name:** `LINGGA NUGRAHA MANDAJAYA`
    - **Title:** `IT SUPPORT & SOFTWARE / IOT ENGINEER`
    - **Action Buttons:** `[ EXPLORE PROTOCOLS ]` and `[ TRANSMIT COMMS ]` with chamfered cut corners.

### Component C: Post-Scroll Portfolio Sections
Once the pinned scrollytelling canvas unpins, the document continues into:
1. **Core Telemetry & Technical Arsenal (Skill Matrix):**
   - Categorized cards: Web & Cloud Architecture (Laravel, React, Node.js), Hardware & Embedded Systems (ESP32, C++, Sensor Bus), and Enterprise IT Ops (Networking, Server Administration).
2. **Mission Archive (Projects Timeline):**
   - Stepped-corner dark cards with glowing cyan connector rails featuring highlighted projects (e.g., *Vortex Sign Digital Signage CMS*, *IoT Environmental Telemetry Monitor*, *AI Support Bot*).
3. **Encrypted Comms Uplink (Contact Terminal):**
   - Interactive terminal form, response simulator, and direct social dispatch relays.

---

## 5. Starter Code Architecture

```jsx
// src/components/ScrollyCanvas.jsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;
const getFramePath = (idx) => `/frames/frame_${String(idx).padStart(4, "0")}.webp`;

export default function ScrollyCanvas({ onProgressUpdate }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const images = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 1.2 });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    let loaded = 0;
    const imgList = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        setProgressPercent(Math.floor((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) setIsReady(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setIsReady(true);
      };
      imgList.push(img);
    }
    images.current = imgList;
  }, []);

  useEffect(() => {
    if (!isReady || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const render = (index) => {
      const img = images.current[Math.min(index, TOTAL_FRAMES - 1)];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (img && img.complete && img.naturalWidth > 0) {
        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const cx = (canvas.width - img.width * ratio) / 2;
        const cy = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
      } else {
        // Fallback procedural canvas rendering
        ctx.fillStyle = "#07090C";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#00F0FF";
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width / 2 - 120, canvas.height / 2 - 120, 240, 240);
        ctx.fillStyle = "#00F0FF";
        ctx.font = "14px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`STANDBY // FRAME: ${index + 1}/${TOTAL_FRAMES}`, canvas.width / 2, canvas.height / 2 + 160);
      }
    };

    render(0);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=3500",
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const idx = Math.min(TOTAL_FRAMES - 1, Math.floor(self.progress * (TOTAL_FRAMES - 1)));
        render(idx);
        if (onProgressUpdate) onProgressUpdate(self.progress);
      },
    });

    return () => trigger.kill();
  }, [isReady]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#07090C] overflow-hidden">
      {!isReady && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#07090C] text-[#00F0FF] font-mono text-xs">
          <div className="w-10 h-10 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="tracking-widest">CALIBRATING EXO-ARMOR SUITE... {progressPercent}%</p>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
```

---

## 6. Implementation Deliverables
1. Deliver clean, modular React components (`ScrollyCanvas`, `HudOverlay`, `TelemetrySection`, `ProjectsTimeline`, `ContactTerminal`).
2. Include styling with custom Tailwind utilities for cut corners (`clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)`).
3. Ensure fluid responsiveness across both desktop and mobile viewports with smooth 60fps performance.