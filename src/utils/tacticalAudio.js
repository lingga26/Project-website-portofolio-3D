/**
 * Tactical Cybernetic Audio Synthesizer (Web Audio API)
 * Zero external MP3/WAV dependencies — 100% procedurally synthesized in real-time.
 */

let audioCtx = null;
let isAudioMuted = false;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setTacticalAudioMute(muted) {
  isAudioMuted = muted;
}

export function isTacticalAudioMuted() {
  return isAudioMuted;
}

/**
 * Tactical UI Interface Blip
 */
export function playBlip(freq = 880, duration = 0.08) {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // audio fallback
  }
}

/**
 * Mechanical Servo & Pneumatic Valve Sound Effect
 * Synthesizes air release hiss + electric servo whine during armor deployment
 */
export function playServoRetractionSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. Pneumatic Air Release Hiss (White Noise Buffer)
    const bufferSize = ctx.sampleRate * 0.25; // 250ms burst
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1400, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(400, now + 0.25);
    noiseFilter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.03, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.25);

    // 2. High-Tech Hydraulic / Electric Servo Whine
    const servoOsc = ctx.createOscillator();
    const servoGain = ctx.createGain();

    servoOsc.type = 'sawtooth';
    // Frequency ramp simulates mechanical motor opening
    servoOsc.frequency.setValueAtTime(220, now + 0.05);
    servoOsc.frequency.exponentialRampToValueAtTime(740, now + 0.35);
    servoOsc.frequency.exponentialRampToValueAtTime(320, now + 0.65);

    // Low-pass filter to smooth harsh sawtooth harmonics into a sleek robotic hum
    const servoFilter = ctx.createBiquadFilter();
    servoFilter.type = 'lowpass';
    servoFilter.frequency.setValueAtTime(800, now + 0.05);
    servoFilter.frequency.exponentialRampToValueAtTime(1800, now + 0.35);
    servoFilter.frequency.exponentialRampToValueAtTime(600, now + 0.65);

    servoGain.gain.setValueAtTime(0.001, now);
    servoGain.gain.linearRampToValueAtTime(0.025, now + 0.1);
    servoGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

    servoOsc.connect(servoFilter);
    servoFilter.connect(servoGain);
    servoGain.connect(ctx.destination);

    servoOsc.start(now + 0.05);
    servoOsc.stop(now + 0.65);

    // 3. Locking Metallic Click Chime at conclusion
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();

    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(1200, now + 0.62);
    clickOsc.frequency.exponentialRampToValueAtTime(180, now + 0.72);

    clickGain.gain.setValueAtTime(0.04, now + 0.62);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    clickOsc.start(now + 0.62);
    clickOsc.stop(now + 0.72);

  } catch (e) {
    // audio fallback
  }
}
