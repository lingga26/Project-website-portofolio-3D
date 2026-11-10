# Interactive 3D Scrollytelling Exo-Armor Portfolio

> High-performance, single-page creative portfolio built with **React 19**, **Vite**, **Tailwind CSS v4**, **GSAP ScrollTrigger**, and **Lenis smooth inertia scrolling**. Features an Apple-style **3D Canvas Scrollytelling Hero** synchronized with scroll progress, transitioning seamlessly into a dark tactical cybernetics portfolio sheet.

---

## ⚡ Highlights & Features

- **Apple-Style 3D Canvas Scrollytelling:**
  - High-DPI HTML5 2D Canvas rendering synchronized with normalized scroll progress `(0.0 -> 1.0)`.
  - Responsive `object-fit: cover` math across all viewport resolutions and DPRs.
  - Zero-error procedural wireframe armor fallback guard if assets fail to load.
- **Dynamic Story Beats HUD (`HudOverlay.jsx`):**
  - **Phase 1 (0.00 - 0.35):** Standby mode with real-time HUD telemetry, corner brackets, and scrub guidance.
  - **Phase 2 (0.35 - 0.70):** Sub-system Diagnostics with dual holographic glass plates (Full-Stack Architecture & IoT Embedded Systems).
  - **Phase 3 (0.70 - 1.00):** Biometric identity reveal as the exo-armor helmet mechanically retracts.
- **Lenis Smooth Inertia Scrolling:** 60fps buttery-smooth inertia scrolling locked to 3500px GSAP pin distance.
- **Tactical Cybernetics Portfolio Sheet:**
  - **Technical Arsenal (`TelemetrySection`):** Subsystem matrix covering Full-Stack Web, Embedded IoT (ESP32/C++), and Enterprise IT Ops with simulated real-time RTOS telemetry strip.
  - **Mission Archive (`ProjectsTimeline`):** Stepped-corner dark cards with glowing cyan connector rail, category filters, and interactive architectural spec modals.
  - **Encrypted Comms Terminal (`ContactTerminal`):** Interactive cybernetic terminal form with typewriter encryption simulator and direct dispatch channels.
- **Tactical Audio FX:** Web Audio API sound synthesizer blips on navigation interactions.
- **Fully Responsive:** Custom chamfered polygon clip-path cards, tactical scanlines, and mobile menu drawer.

---

## 🛠️ Tech Stack

- **Runtime & Build:** React 19, Vite, ESM
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), custom CSS chamfered polygon variables
- **Animation & Scrubbing:** GSAP, ScrollTrigger
- **Scroll Engine:** Lenis Smooth Scroll
- **Canvas Rendering:** High-DPI HTML5 2D Context
- **Icons:** Lucide React
- **Video/Asset Processing:** FFmpeg Static (`libwebp` batch extraction)

---

## 📁 Project Architecture

```
├── public/
│   └── frames/                 # 192 extracted .webp sequence frames (frame_0001.webp - frame_0192.webp)
├── scripts/
│   └── extract_frames.cjs      # Automated FFmpeg frame extraction & trimming script
├── src/
│   ├── components/
│   │   ├── ContactTerminal.jsx # Encrypted transmission console & contact channels
│   │   ├── Footer.jsx          # Tactical system checksum & apex navigator
│   │   ├── HudOverlay.jsx      # Story beats HUD overlay (Phases 1-3)
│   │   ├── Navbar.jsx          # Top telemetry bar, audio synthesizer & mobile drawer
│   │   ├── ProjectsTimeline.jsx# Deployed missions timeline & modal inspector
│   │   ├── ScrollyCanvas.jsx   # Core scrollytelling canvas engine & preloader
│   │   └── TelemetrySection.jsx# Skill matrix & live RTOS diagnostics
│   ├── App.jsx                 # Master application controller
│   ├── index.css               # Tailwind directives, HUD borders & chamfer clips
│   └── main.jsx                # React DOM entrypoint
├── index.html                  # Tactical fonts (Oswald, Space Grotesk, JetBrains Mono)
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/project-website-portofolio-3d.git
cd project-website-portofolio-3d
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Run development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 4. Build for production:
```bash
npm run build
```

---

## 🎞️ Extracting Frames from Raw Video

If you wish to re-extract or change the video asset:
```bash
node scripts/extract_frames.cjs
```
This script reads `generate video web 20 detik.mp4`, extracts 192 high-fidelity `.webp` frames into `public/frames/`, and automatically balances and trims any frame count discrepancies.
---

## 📄 License
MIT License &copy; 2026 Lingga Nugraha Mandajaya
