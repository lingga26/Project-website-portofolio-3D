import React, { useState } from 'react';
import { 
  Send, 
  Terminal, 
  Mail, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Cpu, 
  CheckCircle,
  Copy,
  ExternalLink,
  Radio
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactTerminal() {
  const [formData, setFormData] = useState({
    callsign: '',
    email: '',
    subject: 'SOFTWARE_ENGINEERING_ENGAGEMENT',
    message: ''
  });

  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const directEmail = "mandajayalingga@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setIsTransmitting(true);
    setIsSuccess(false);
    setTerminalLogs([
      '[SYS_INIT] PREPARING SECURE CARRIER WAVE...',
      `[PACKET] INGESTING STREAM FROM ${formData.callsign || 'ANONYMOUS_AGENT'}...`
    ]);

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        '[CIPHER] ENCRYPTING PAYLOAD WITH SHA-256 / AES-GCM...',
        `[ROUTE] RESOLVING UPLINK FOR ${formData.email}...`
      ]);
    }, 600);

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        '[RELAY] SYNCHRONIZING WITH PRIMARY ENGINEER INBOX...',
        `[STATUS: 200 OK] DISPATCH DELIVERED TO ${directEmail}`
      ]);
      setIsTransmitting(false);
      setIsSuccess(true);
      // Auto-open mailto fallback link so message reaches user inbox reliably
      const mailtoLink = `mailto:${directEmail}?subject=${encodeURIComponent(`[EXO-PORTFOLIO] ${formData.subject}: ${formData.callsign}`)}&body=${encodeURIComponent(formData.message + `\n\n---\nFrom: ${formData.callsign} (${formData.email})`)}`;
      window.open(mailtoLink, '_blank');
    }, 1400);
  };

  return (
    <section id="comms-section" className="relative py-28 px-4 md:px-8 bg-[#07090C] bg-tactical-grid border-t border-[#00F0FF]/20 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#00F0FF]/20">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#00F0FF] text-xs font-mono tracking-widest uppercase mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>// PROTOCOL 03 // TRANSMISSION UPLINK</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display uppercase tracking-wider">
              ENCRYPTED COMMS &amp; <span className="text-[#00F0FF]">CONTACT TERMINAL</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-md mt-4 md:mt-0 leading-relaxed">
            Direct telemetry dispatch relay. Open for full-time engineering deployments, IoT architecture contracts, and enterprise IT initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Dispatch Terminal Form */}
          <div className="lg:col-span-7">
            <div className="hud-card p-6 md:p-8 clip-chamfer-lg border border-[#00F0FF]/30">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#00F0FF]/20 text-xs font-mono">
                <div className="flex items-center space-x-2 text-[#00F0FF]">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span className="font-bold tracking-wider">SECURE TRANSMISSION CONSOLE</span>
                </div>
                <span className="text-[10px] text-gray-500">CH-08 // 128-BIT TLS</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sender Name / Callsign */}
                  <div>
                    <label className="block text-gray-400 text-[11px] uppercase tracking-wider mb-1.5">
                      // SENDER CALL-SIGN / NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Commander Marcus / Tech Lead"
                      value={formData.callsign}
                      onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 focus:border-[#00F0FF] focus:outline-none px-3.5 py-2.5 text-white clip-chamfer-sm transition-all text-xs"
                    />
                  </div>

                  {/* Return Frequency / Email */}
                  <div>
                    <label className="block text-gray-400 text-[11px] uppercase tracking-wider mb-1.5">
                      // TRANSMISSION CHANNEL (EMAIL)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 focus:border-[#00F0FF] focus:outline-none px-3.5 py-2.5 text-white clip-chamfer-sm transition-all text-xs"
                    />
                  </div>
                </div>

                {/* Operation Directive / Subject */}
                <div>
                  <label className="block text-gray-400 text-[11px] uppercase tracking-wider mb-1.5">
                    // MISSION DIRECTIVE (SUBJECT)
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 focus:border-[#00F0FF] focus:outline-none px-3.5 py-2.5 text-white clip-chamfer-sm transition-all text-xs cursor-pointer"
                  >
                    <option value="FULL_STACK_WEB_PROJECT">SOFTWARE // FULL-STACK WEB / MOBILE DEPLOYMENT</option>
                    <option value="IOT_EMBEDDED_SYSTEMS">HARDWARE // IOT &amp; EMBEDDED SENSOR INTEGRATION</option>
                    <option value="ENTERPRISE_IT_NETWORKING">INFRASTRUCTURE // IT SYSTEMS &amp; NETWORK AUDIT</option>
                    <option value="CAREER_RECRUITMENT">TALENT // FULL-TIME / CONTRACT RECRUITMENT</option>
                    <option value="GENERAL_CONSULTATION">COMMS // GENERAL ARCHITECTURAL INQUIRY</option>
                  </select>
                </div>

                {/* Encrypted Message Payload */}
                <div>
                  <label className="block text-gray-400 text-[11px] uppercase tracking-wider mb-1.5">
                    // ENCRYPTED PAYLOAD (MESSAGE)
                  </label>
                  <textarea
                    rows="5"
                    required
                    placeholder="Enter project parameters, scope, tech stack requirements, or collaboration brief..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 focus:border-[#00F0FF] focus:outline-none p-3 text-white clip-chamfer-sm transition-all text-xs resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isTransmitting}
                  className="w-full py-3.5 bg-[#00F0FF] hover:bg-[#2bf4ff] disabled:opacity-50 text-[#07090C] font-mono font-bold text-xs tracking-widest clip-chamfer flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                >
                  {isTransmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#07090C] border-t-transparent rounded-full animate-spin" />
                      <span>ENCRYPTING &amp; TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT PACKET TO ENGINEER</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Terminal Logs Window */}
              {terminalLogs.length > 0 && (
                <div className="mt-6 p-4 bg-black/80 border border-white/10 rounded-xs font-mono text-[11px] space-y-1">
                  <div className="text-gray-500 pb-1 border-b border-white/5 flex items-center justify-between text-[10px]">
                    <span>TERMINAL_OUTPUT_STREAM</span>
                    <span className="text-[#00F0FF]">LIVE</span>
                  </div>
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className={log.includes('200 OK') ? 'text-emerald-400 font-bold' : 'text-gray-300'}>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Tactical Comm Relays & Pilot Credentials */}
          <div className="lg:col-span-5 space-y-6 font-mono">
            {/* Direct Email Relay Card */}
            <div className="hud-card p-6 clip-chamfer border-l-4 border-l-[#00F0FF]">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                // DIRECT COMMS RELAY
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">
                PRIMARY CARRIER INBOX
              </h3>
              <p className="text-xs text-gray-300 mb-4 font-sans font-light">
                Direct responses typically acknowledged within 120 minutes during operational hours.
              </p>

              <div className="flex items-center justify-between p-3 bg-black/60 border border-white/10 rounded-xs text-xs">
                <div className="flex items-center space-x-2 text-[#00F0FF] truncate">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="truncate">{directEmail}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 bg-white/10 hover:bg-[#00F0FF] hover:text-black transition-all clip-chamfer-sm text-[10px] flex items-center space-x-1 cursor-pointer shrink-0 ml-2"
                >
                  {copied ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Pilot Bio & Location Coordinates */}
            <div className="hud-card p-6 clip-chamfer border-l-4 border-l-[#D97736]">
              <div className="text-[10px] text-[#D97736] uppercase tracking-widest mb-1">
                // OPERATIONAL BASE &amp; TELEMETRY
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">
                LINGGA NUGRAHA MANDAJAYA
              </h3>
              <p className="text-xs text-gray-300 font-sans font-light leading-relaxed mb-4">
                Full-stack web engineer, embedded IoT researcher, and enterprise IT administrator based in Indonesia. Available for worldwide asynchronous and on-site engineering missions.
              </p>

              <div className="space-y-1.5 text-xs text-gray-400 border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span>BASE STATION:</span>
                  <span className="text-white">Bandung / Jakarta, Indonesia</span>
                </div>
                <div className="flex justify-between">
                  <span>STATUS:</span>
                  <span className="text-emerald-400 font-bold">READY FOR DEPLOYMENT</span>
                </div>
                <div className="flex justify-between">
                  <span>TIMEZONE:</span>
                  <span className="text-white">WIB (UTC+7)</span>
                </div>
              </div>
            </div>

            {/* Tactical Social & Network Links */}
            <div className="hud-card p-6 clip-chamfer">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
                // EXTERNAL SATELLITE LINKS
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <a
                  href="https://github.com/linggamandajaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/40 border border-white/10 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all flex items-center justify-between clip-chamfer-sm"
                >
                  <div className="flex items-center space-x-2">
                    <GithubIcon className="w-4 h-4" />
                    <span>GITHUB</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>

                <a
                  href="https://linkedin.com/in/lingga-nugraha-mandajaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/40 border border-white/10 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all flex items-center justify-between clip-chamfer-sm"
                >
                  <div className="flex items-center space-x-2">
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LINKEDIN</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>

                <a
                  href={`mailto:${directEmail}`}
                  className="p-3 bg-black/40 border border-white/10 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all flex items-center justify-between clip-chamfer-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>DIRECT DISPATCH</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>

                <a
                  href="#hero-section"
                  className="p-3 bg-black/40 border border-white/10 hover:border-[#D97736] hover:text-[#D97736] transition-all flex items-center justify-between clip-chamfer-sm"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>DOSSIER / CV</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
