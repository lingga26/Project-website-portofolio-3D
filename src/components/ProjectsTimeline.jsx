import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Terminal, 
  Radio, 
  Cpu, 
  Monitor, 
  Layers, 
  Activity,
  CheckCircle,
  Clock,
  Sparkles,
  X,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { smoothScrollTo } from '../utils/scrollHelper.js';

const missionProjects = [
  {
    id: 'vortex-sign',
    title: 'Vortex Sign Digital Signage CMS',
    category: 'software',
    status: 'DEPLOYED // PRODUCTION',
    timeline: '2025 - PRESENT',
    client: 'COMMERCIAL ADVERTISING & RETAIL NETWORKS',
    summary: 'Cloud-managed centralized digital signage orchestration platform enabling real-time content scheduling, screen sync, and remote telemetry playback diagnostics.',
    stack: ['Laravel 11', 'React 19', 'WebSockets', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'FFmpeg Transcoding'],
    highlights: [
      'Engineered sub-second content push across 200+ remote display endpoints via WebSockets.',
      'Implemented automated canvas layout designer and offline media caching fallback for zero-downtime display.',
      'Built hardware watchdog health monitoring detecting offline signage nodes in real-time.'
    ],
    liveUrl: '#',
    repoUrl: '#',
    accent: '#00F0FF'
  },
  {
    id: 'iot-telemetry',
    title: 'IoT Environmental Telemetry Monitor',
    category: 'hardware',
    status: 'OPERATIONAL // INDUSTRIAL',
    timeline: '2024 - 2025',
    client: 'SMART AGRICULTURE & WAREHOUSE FACILITIES',
    summary: 'Autonomous distributed sensor cluster utilizing ESP32 microcontrollers and LoRaWAN/MQTT bridges to monitor ambient temperature, humidity, CO2 levels, and soil telemetry.',
    stack: ['ESP32', 'C++ / FreeRTOS', 'MQTT Broker', 'LoRaWAN', 'InfluxDB', 'Grafana', 'I2C Sensors'],
    highlights: [
      'Low-power sleep routine achieving 8+ months uninterrupted battery runtime on solar trickle charging.',
      'Designed custom PCB shield with surge protection and ESD shielding for harsh industrial conditions.',
      'Automated alert thresholds broadcasting SMS and Telegram notifications upon temperature spikes.'
    ],
    liveUrl: '#',
    repoUrl: '#',
    accent: '#D97736'
  },
  {
    id: 'ai-support-terminal',
    title: 'AI Automated IT Support & Triage Bot',
    category: 'software',
    status: 'DEPLOYED // ENTERPRISE',
    timeline: '2024',
    client: 'INTERNAL IT HELPDESK & OPS',
    summary: 'Generative and rule-based diagnostic ticketing assistant integrated into internal chat systems to resolve common network, printer, and credential issues autonomously.',
    stack: ['Node.js', 'Python', 'OpenAI API / Local LLM', 'Vector DB', 'PowerShell Automation', 'Discord / Slack Webhooks'],
    highlights: [
      'Reduced tier-1 helpdesk response time by 74% with automated self-service resolution workflows.',
      'Implemented secure Active Directory password reset tokens with multi-factor biometric verification.',
      'Trained vector embeddings on 5,000+ internal IT post-mortem logs and network runbooks.'
    ],
    liveUrl: '#',
    repoUrl: '#',
    accent: '#00F0FF'
  },
  {
    id: 'enterprise-mesh-network',
    title: 'Zero-Trust Enterprise Network Mesh & Infrastructure',
    category: 'infrastructure',
    status: 'VERIFIED // MISSION CRITICAL',
    timeline: '2023 - 2024',
    client: 'CORPORATE HQ & MULTI-BRANCH CAMPUS',
    summary: 'Designed and deployed high-availability dual-WAN failover network architecture, 802.1Q VLAN segmentation, and perimeter firewall security rules for multi-department operations.',
    stack: ['MikroTik RouterOS', 'Cisco Switches', 'WireGuard VPN', 'RADIUS 802.1X', 'Zabbix Monitoring', 'VLAN 802.1Q'],
    highlights: [
      'Engineered seamless VRRP dual-ISP failover with automatic BGP routing switches in <1.8 seconds.',
      'Segmented voice, CCTV surveillance, guest Wi-Fi, and corporate servers into isolated security zones.',
      'Configured centralized SNMP telemetry visualization with real-time bandwidth throttling policies.'
    ],
    liveUrl: '#',
    repoUrl: '#',
    accent: '#00F0FF'
  },
  {
    id: 'smart-energy-monitor',
    title: 'Industrial Smart Energy Meter & Power Quality Analyzer',
    category: 'hardware',
    status: 'OPERATIONAL // FACILITY',
    timeline: '2023',
    client: 'MANUFACTURING PLANT POWER SUBSTATION',
    summary: 'Non-invasive 3-phase electrical power monitoring hardware measuring voltage drops, current surges, active power, and power factor with real-time cloud data logging.',
    stack: ['ESP32', 'PZEM-004T Sensors', 'Modbus RTU RS485', 'Node-RED', 'ThingSpeak API', 'OLED HUD'],
    highlights: [
      'Calculated power factor penalties in real-time, helping plant operators reduce reactive power penalties.',
      'Isolated high-voltage sensing lines with optocouplers and industrial din-rail enclosures.',
      'Exported compliance CSV audit logs directly to plant management database via automated REST endpoints.'
    ],
    liveUrl: '#',
    repoUrl: '#',
    accent: '#D97736'
  }
];

export default function ProjectsTimeline() {
  const [filter, setFilter] = useState('all');
  const [selectedMission, setSelectedMission] = useState(null);

  const filteredMissions = filter === 'all'
    ? missionProjects
    : missionProjects.filter(m => m.category === filter);

  return (
    <section id="missions-section" className="relative py-28 px-4 md:px-8 bg-[#07090C] border-t border-[#00F0FF]/20 overflow-hidden">
      {/* Background Cybernetic Glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#D97736]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#00F0FF]/20">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#00F0FF] text-xs font-mono tracking-widest uppercase mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>// PROTOCOL 02 // MISSION ARCHIVE</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display uppercase tracking-wider">
              DEPLOYED MISSIONS &amp; <span className="text-[#00F0FF]">SYSTEMS</span>
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 mt-6 md:mt-0 text-xs font-mono">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 clip-chamfer-sm border cursor-pointer transition-all ${
                filter === 'all'
                  ? 'bg-[#00F0FF] text-[#07090C] font-bold border-[#00F0FF]'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              ALL MISSIONS
            </button>
            <button
              onClick={() => setFilter('software')}
              className={`px-3 py-1.5 clip-chamfer-sm border cursor-pointer transition-all ${
                filter === 'software'
                  ? 'bg-[#00F0FF] text-[#07090C] font-bold border-[#00F0FF]'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              SOFTWARE / CLOUD
            </button>
            <button
              onClick={() => setFilter('hardware')}
              className={`px-3 py-1.5 clip-chamfer-sm border cursor-pointer transition-all ${
                filter === 'hardware'
                  ? 'bg-[#D97736] text-[#07090C] font-bold border-[#D97736]'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              IOT / HARDWARE
            </button>
            <button
              onClick={() => setFilter('infrastructure')}
              className={`px-3 py-1.5 clip-chamfer-sm border cursor-pointer transition-all ${
                filter === 'infrastructure'
                  ? 'bg-[#00F0FF] text-[#07090C] font-bold border-[#00F0FF]'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              IT INFRASTRUCTURE
            </button>
          </div>
        </div>

        {/* Mission Timeline Container */}
        <div className="relative">
          {/* Glowing Vertical Connector Rail */}
          <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#00F0FF] via-[#D97736] to-[#00F0FF] opacity-40 shadow-[0_0_10px_#00F0FF]" />

          <div className="space-y-12">
            {filteredMissions.map((mission, index) => {
              const isCopper = mission.accent === '#D97736';

              return (
                <div
                  key={mission.id}
                  className="relative md:pl-20 group"
                >
                  {/* Timeline Glowing Node */}
                  <div 
                    className="hidden md:flex absolute left-[26px] top-8 w-4 h-4 rounded-full border-2 bg-[#07090C] items-center justify-center transition-all duration-300 group-hover:scale-125"
                    style={{ borderColor: mission.accent, boxShadow: `0 0 10px ${mission.accent}` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: mission.accent }} />
                  </div>

                  {/* Stepped-corner Dark Mission Card */}
                  <div 
                    className="hud-card p-6 md:p-8 clip-chamfer-lg border transition-all duration-300 group-hover:border-opacity-80"
                    style={{ borderTopColor: mission.accent, borderTopWidth: '2px' }}
                  >
                    {/* Top Mission Metadata Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono gap-2">
                      <div className="flex items-center space-x-3">
                        <span 
                          className="px-2.5 py-1 text-[10px] font-bold clip-chamfer-sm border"
                          style={{ 
                            backgroundColor: `${mission.accent}15`, 
                            borderColor: `${mission.accent}50`, 
                            color: mission.accent 
                          }}
                        >
                          {mission.status}
                        </span>
                        <span className="text-gray-400">
                          {mission.timeline}
                        </span>
                      </div>

                      <div className="text-[11px] text-gray-400 tracking-wider font-light">
                        TARGET: <strong className="text-gray-200">{mission.client}</strong>
                      </div>
                    </div>

                    {/* Mission Title & Narrative */}
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-wide mb-3 group-hover:text-[#00F0FF] transition-colors">
                      {mission.title}
                    </h3>

                    <p className="text-sm text-gray-300 font-light leading-relaxed mb-6 max-w-4xl">
                      {mission.summary}
                    </p>

                    {/* Engineering Breakthroughs / Highlights */}
                    <div className="mb-6 p-4 bg-black/40 border border-white/5 rounded-xs space-y-2">
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center space-x-1.5 mb-2">
                        <Sparkles className="w-3 h-3 text-[#00F0FF]" />
                        <span>TACTICAL ACHIEVEMENTS &amp; ARCHITECTURAL IMPACT:</span>
                      </div>
                      {mission.highlights.map((h, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-gray-300 font-sans">
                          <span className="text-[#00F0FF] font-mono text-[11px] mt-0.5">❯</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology Chips & Direct Dispatch Action */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-white/10 gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {mission.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 text-gray-300 clip-chamfer-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-3 text-xs font-mono">
                        <span className="text-gray-500 hidden sm:inline">SYS_REF: {mission.id.toUpperCase()}</span>
                        <button
                          onClick={() => setSelectedMission(mission)}
                          className="inline-flex items-center space-x-1 text-[#00F0FF] hover:underline cursor-pointer"
                        >
                          <span>INQUIRE SPECS</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Tactical Hologram Modal */}
      {selectedMission && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedMission(null)}
        >
          <div 
            className="hud-card w-full max-w-2xl p-6 md:p-8 clip-chamfer-lg border border-[#00F0FF] relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#00F0FF]/30">
              <div className="flex items-center space-x-2 text-[#00F0FF] text-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-bold tracking-wider">MISSION DOSSIER // {selectedMission.id.toUpperCase()}</span>
              </div>
              <button 
                onClick={() => setSelectedMission(null)}
                className="p-1 border border-white/20 hover:border-[#00F0FF] text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">PROJECT TITLE</span>
                <h3 className="text-2xl font-display font-bold text-white tracking-wide">{selectedMission.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-black/60 border border-white/10 rounded-xs">
                <div>
                  <span className="text-[10px] text-gray-500 block">TIMELINE</span>
                  <span className="text-white font-bold">{selectedMission.timeline}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">CLIENT / SECTOR</span>
                  <span className="text-[#00F0FF] font-bold">{selectedMission.client}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">SYSTEM OVERVIEW</span>
                <p className="text-gray-300 font-sans font-light leading-relaxed text-sm">{selectedMission.summary}</p>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2">KEY ARCHITECTURAL MILESTONES</span>
                <div className="space-y-2 p-3 bg-black/40 border border-white/5 rounded-xs">
                  {selectedMission.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-gray-300 font-sans">
                      <span className="text-[#00F0FF] font-mono text-[11px] mt-0.5">❯</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2">TECHNOLOGY DEPLOYED</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMission.stack.map(tech => (
                    <span key={tech} className="px-2.5 py-1 bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[#00F0FF] text-[11px] clip-chamfer-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSelectedMission(null);
                    smoothScrollTo('comms-section', { duration: 1.8 });
                  }}
                  className="px-4 py-2 bg-[#00F0FF] hover:bg-[#00D2DF] text-black font-bold clip-chamfer-sm text-xs tracking-wider transition-all cursor-pointer"
                >
                  DISCUSS SIMILAR DEPLOYMENT
                </button>
                <button
                  onClick={() => setSelectedMission(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 clip-chamfer-sm text-xs cursor-pointer"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
