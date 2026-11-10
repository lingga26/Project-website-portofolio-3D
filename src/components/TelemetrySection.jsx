import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  Wifi, 
  Database, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  HardDrive, 
  Code2, 
  Activity,
  CheckCircle2,
  Sliders
} from 'lucide-react';

const arsenalCategories = [
  {
    id: 'software',
    title: 'Web & Cloud Architecture',
    code: 'SUBSYSTEM_ALPHA',
    icon: Code2,
    accent: '#00F0FF',
    description: 'Full-stack development of resilient, high-throughput web applications, cloud backends, and decoupled API microservices.',
    metrics: { efficiency: '98.4%', latency: '<45ms', testCoverage: '92%' },
    skills: [
      { name: 'Laravel / PHP 8+', level: 95, tags: ['REST API', 'Eloquent', 'Queues', 'Blade'] },
      { name: 'React 19 / Vite / Next.js', level: 92, tags: ['SPA', 'Hooks', 'State Engine', 'Tailwind'] },
      { name: 'Node.js / Express.js', level: 88, tags: ['WebSockets', 'Async I/O', 'JWT Auth'] },
      { name: 'PostgreSQL / MySQL / Redis', level: 90, tags: ['Query Optimization', 'Caching', 'Transactions'] },
      { name: 'Docker / Cloud Deployments', level: 85, tags: ['Containers', 'CI/CD Pipelines', 'Nginx'] },
      { name: 'TypeScript & JavaScript ESM', level: 90, tags: ['Strong Typing', 'ES6+', 'Modules'] },
    ]
  },
  {
    id: 'hardware',
    title: 'Hardware & Embedded IoT',
    code: 'SUBSYSTEM_BETA',
    icon: Cpu,
    accent: '#D97736',
    description: 'Physical computing, custom microcontroller firmware, industrial sensor interfaces, and reliable edge-to-cloud telemetry pipelines.',
    metrics: { busSpeed: '400 kHz', packetLoss: '0.01%', uptime: '99.98%' },
    skills: [
      { name: 'ESP32 / ESP8266 Architecture', level: 94, tags: ['Dual-Core', 'Wi-Fi/BLE', 'Deep Sleep', 'OTA'] },
      { name: 'Embedded C / C++ / Arduino', level: 92, tags: ['Bare-metal Logic', 'Interrupts', 'Memory Optimization'] },
      { name: 'Sensor Bus & Protocols', level: 90, tags: ['I2C', 'SPI', 'UART', 'RS485 Modbus', 'ADC'] },
      { name: 'MQTT / LoRaWAN / HTTP Edge', level: 88, tags: ['Pub/Sub Broker', 'Low-power Radio', 'JSON Payload'] },
      { name: 'Circuit Prototyping & PCB', level: 82, tags: ['Schematics', 'Power Regulators', 'Soldering'] },
      { name: 'Actuators, Relays & Robotics', level: 86, tags: ['PWM Control', 'Servo/Stepper', 'Optocouplers'] },
    ]
  },
  {
    id: 'infrastructure',
    title: 'Enterprise IT Operations & Network',
    code: 'SUBSYSTEM_GAMMA',
    icon: Server,
    accent: '#00F0FF',
    description: 'Enterprise IT systems administration, high-availability networking, hardware troubleshooting, and perimeter security governance.',
    metrics: { mtu: '1500', failoverTime: '<2s', slaTarget: '99.9%' },
    skills: [
      { name: 'Network Architecture & Routing', level: 92, tags: ['MikroTik RouterOS', 'Cisco CLI', 'VLAN Segregation'] },
      { name: 'Linux Server Administration', level: 90, tags: ['Ubuntu / Debian', 'Bash Scripting', 'Systemd', 'SSH'] },
      { name: 'Windows Server & Active Directory', level: 88, tags: ['Group Policy', 'DNS / DHCP', 'Hyper-V'] },
      { name: 'Enterprise Hardware Diagnostics', level: 95, tags: ['Component Level', 'Bench Repair', 'Thermal Mgmt'] },
      { name: 'CCTV, Access Control & Surveillance', level: 90, tags: ['IP Cameras', 'NVR Systems', 'Biometrics'] },
      { name: 'IT Helpdesk & Disaster Recovery', level: 94, tags: ['SLA Management', 'Backup Strategies', 'End-User Support'] },
    ]
  }
];

export default function TelemetrySection() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCategories = activeTab === 'all' 
    ? arsenalCategories 
    : arsenalCategories.filter(c => c.id === activeTab);

  return (
    <section id="arsenal-section" className="relative py-28 px-4 md:px-8 bg-[#07090C] bg-tactical-grid border-t border-[#00F0FF]/20 overflow-hidden">
      {/* Decorative Cyan Radial Flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Tactical HUD Branding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#00F0FF]/20">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#00F0FF] text-xs font-mono tracking-widest uppercase mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>// PROTOCOL 01 // TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display uppercase tracking-wider">
              CORE TELEMETRY &amp; <span className="text-[#00F0FF]">SYSTEM ARSENAL</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-md mt-4 md:mt-0 leading-relaxed">
            Multi-disciplinary technical readiness spanning physical computing silicon, enterprise operating layers, and high-performance cloud codebases.
          </p>
        </div>

        {/* Tactical Subsystem Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 text-xs font-mono">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 clip-chamfer-sm border cursor-pointer transition-all ${
              activeTab === 'all'
                ? 'bg-[#00F0FF] text-[#07090C] font-bold border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-[#0E121A]/80 text-gray-400 border-white/10 hover:border-[#00F0FF]/40'
            }`}
          >
            // ALL SUBSYSTEMS [03]
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className={`px-4 py-2 clip-chamfer-sm border cursor-pointer transition-all ${
              activeTab === 'software'
                ? 'bg-[#00F0FF] text-[#07090C] font-bold border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-[#0E121A]/80 text-gray-400 border-white/10 hover:border-[#00F0FF]/40'
            }`}
          >
            // SOFTWARE ARCHITECTURE
          </button>
          <button
            onClick={() => setActiveTab('hardware')}
            className={`px-4 py-2 clip-chamfer-sm border cursor-pointer transition-all ${
              activeTab === 'hardware'
                ? 'bg-[#D97736] text-[#07090C] font-bold border-[#D97736] shadow-[0_0_15px_rgba(217,119,54,0.4)]'
                : 'bg-[#0E121A]/80 text-gray-400 border-white/10 hover:border-[#D97736]/40'
            }`}
          >
            // IOT &amp; EMBEDDED
          </button>
          <button
            onClick={() => setActiveTab('infrastructure')}
            className={`px-4 py-2 clip-chamfer-sm border cursor-pointer transition-all ${
              activeTab === 'infrastructure'
                ? 'bg-[#00F0FF] text-[#07090C] font-bold border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-[#0E121A]/80 text-gray-400 border-white/10 hover:border-[#00F0FF]/40'
            }`}
          >
            // IT INFRASTRUCTURE &amp; OPS
          </button>
        </div>

        {/* Categorized Arsenal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            const isCopper = cat.accent === '#D97736';

            return (
              <div
                key={cat.id}
                className="hud-card p-6 md:p-8 clip-chamfer-lg flex flex-col justify-between"
                style={{
                  borderLeftColor: cat.accent,
                  borderLeftWidth: '3px'
                }}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-sm flex items-center justify-center border clip-chamfer-sm"
                        style={{ 
                          backgroundColor: `${cat.accent}15`, 
                          borderColor: `${cat.accent}50`, 
                          color: cat.accent 
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-gray-400 block uppercase">
                          {cat.code}
                        </span>
                        <h3 className="text-xl font-display font-bold text-white tracking-wide">
                          {cat.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Telemetry Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-black/40 border border-white/5 rounded-xs mb-6 text-[10px] font-mono">
                    {Object.entries(cat.metrics).map(([key, val]) => (
                      <div key={key} className="text-center">
                        <span className="text-gray-500 uppercase block">{key}</span>
                        <span className="text-white font-bold">{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills List with Progress Bars & Badges */}
                  <div className="space-y-4">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                          <span className="text-gray-200 group-hover:text-[#00F0FF] transition-colors font-medium">
                            {skill.name}
                          </span>
                          <span className="font-bold text-gray-400" style={{ color: cat.accent }}>
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-black/70 border border-white/10 rounded-full overflow-hidden mb-2">
                          <div 
                            className="h-full transition-all duration-700 ease-out"
                            style={{ 
                              width: `${skill.level}%`,
                              backgroundColor: cat.accent 
                            }}
                          />
                        </div>

                        {/* Micro Tags */}
                        <div className="flex flex-wrap gap-1">
                          {skill.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/5 text-gray-400 rounded-2xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subsystem Status Footer */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: cat.accent }} />
                    <span className="tracking-wider">MODULE CALIBRATED</span>
                  </div>
                  <span className="text-gray-500">REV: 2026.4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Simulation Telemetry HUD Strip */}
        <div className="mt-12 p-4 md:p-6 bg-[#0E121A]/80 border border-[#00F0FF]/30 clip-chamfer-lg flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-[#00F0FF] animate-pulse" />
            <div>
              <span className="text-[#00F0FF] font-bold tracking-wider">LIVE TELEMETRY STREAM</span>
              <p className="text-[11px] text-gray-400">KERNEL: EXO_RTOS_v5.14-LNM // ZERO ANOMALIES DETECTED</p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-6 text-[11px] text-gray-300">
            <div>
              <span className="text-gray-500 block text-[10px]">CPU UTILIZATION</span>
              <span className="text-[#00F0FF] font-bold">14.8% NORMAL</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">HEAP ALLOCATION</span>
              <span className="text-white font-bold">2.41 / 16.0 GB</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">TCP SOCKETS</span>
              <span className="text-[#D97736] font-bold">128 ESTABLISHED</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">LATENCY PROBE</span>
              <span className="text-emerald-400 font-bold">9ms PING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
