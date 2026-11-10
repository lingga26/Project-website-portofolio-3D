import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import ScrollyCanvas from './components/ScrollyCanvas.jsx';
import HudOverlay from './components/HudOverlay.jsx';
import TelemetrySection from './components/TelemetrySection.jsx';
import ProjectsTimeline from './components/ProjectsTimeline.jsx';
import ContactTerminal from './components/ContactTerminal.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);

  const handleProgressUpdate = useCallback((progress, frameIndex) => {
    setScrollProgress(progress);
    if (typeof frameIndex === 'number') {
      setActiveFrame(frameIndex);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#07090C] text-[#E2E8F0] selection:bg-[#00F0FF]/30 selection:text-[#00F0FF]">
      {/* Tactical Top Bar */}
      <Navbar scrollProgress={scrollProgress} />

      {/* Pinned Scrollytelling Hero (3500px GSAP Pin with Lenis smooth scroll) */}
      <main>
        <ScrollyCanvas onProgressUpdate={handleProgressUpdate}>
          <HudOverlay scrollProgress={scrollProgress} activeFrame={activeFrame} />
        </ScrollyCanvas>

        {/* Post-Scroll Tactical Portfolio Sheet */}
        <div className="relative z-30 bg-[#07090C]">
          <TelemetrySection />
          <ProjectsTimeline />
          <ContactTerminal />
        </div>
      </main>

      {/* Tactical Cybernetics Footer */}
      <Footer />
    </div>
  );
}
