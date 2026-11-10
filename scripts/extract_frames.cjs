const { spawnSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

const videoPath = path.resolve(__dirname, '../generate video web 20 detik.mp4');
const outDir = path.resolve(__dirname, '../public/frames');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Extracting frames from video:', videoPath);
console.log('Output directory:', outDir);

// Target 192 frames across 20.033 seconds
// fps = 192 / 20.033333 = 9.58402
const fpsRate = (192 / 20.033333).toFixed(5);
console.log(`Using sampling rate fps=${fpsRate}`);

const args = [
  '-y',
  '-i', videoPath,
  '-vf', `fps=${fpsRate}`,
  '-c:v', 'libwebp',
  '-q:v', '82',
  path.join(outDir, 'frame_%04d.webp')
];

console.log('Running ffmpeg...');
const start = Date.now();
const result = spawnSync(ffmpeg, args, { stdio: 'inherit' });
console.log(`FFmpeg finished in ${((Date.now() - start)/1000).toFixed(2)}s`);

// Check resulting frames
let files = fs.readdirSync(outDir).filter(f => f.startsWith('frame_') && f.endsWith('.webp')).sort();
console.log(`Total frames extracted: ${files.length}`);

const TARGET_FRAMES = 192;
if (files.length > TARGET_FRAMES) {
  console.log(`Trimming ${files.length - TARGET_FRAMES} excess frames...`);
  for (let i = TARGET_FRAMES; i < files.length; i++) {
    fs.unlinkSync(path.join(outDir, files[i]));
  }
} else if (files.length < TARGET_FRAMES && files.length > 0) {
  console.log(`Padding ${TARGET_FRAMES - files.length} frames...`);
  const lastFile = path.join(outDir, files[files.length - 1]);
  for (let i = files.length + 1; i <= TARGET_FRAMES; i++) {
    const padName = `frame_${String(i).padStart(4, '0')}.webp`;
    fs.copyFileSync(lastFile, path.join(outDir, padName));
  }
}

files = fs.readdirSync(outDir).filter(f => f.startsWith('frame_') && f.endsWith('.webp')).sort();
console.log(`Final frame count: ${files.length} (from ${files[0]} to ${files[files.length - 1]})`);
