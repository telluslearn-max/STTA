const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FRAMES_DIR = path.join(__dirname, '..', 'frames');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets');

const ASSETS = [
  { name: 'court-bg', frame: 1, crop: { x: 0, y: 0, w: 1800, h: 1350 }},
  { name: 'junior', frame: 8, crop: { x: 70, y: 95, w: 510, h: 690 }},
  { name: 'youth', frame: 8, crop: { x: 630, y: 95, w: 510, h: 690 }},
  { name: 'adult', frame: 8, crop: { x: 1190, y: 95, w: 510, h: 690 }},
  { name: 'hardcourt', frame: 184, crop: { x: 50, y: 955, w: 550, h: 315 }},
  { name: 'lessons', frame: 184, crop: { x: 625, y: 955, w: 550, h: 315 }},
  { name: 'coaches', frame: 184, crop: { x: 1200, y: 955, w: 550, h: 315 }}
];

const FRAME_WIDTH = 1800;
const FRAME_HEIGHT = 1350;
const MIN_FILE_SIZE = 5000;

function log(step, message) {
  console.log(`[${step}] ${message}`);
}

async function verifyFrameCount() {
  const files = fs.readdirSync(FRAMES_DIR).filter(f => f.endsWith('.jpg'));
  if (files.length !== 184) {
    throw new Error(`Expected 184 frames, found ${files.length}`);
  }
  log(1, `✓ Frame count verified: ${files.length} frames`);
  return true;
}

async function verifyFrameIntegrity(asset) {
  const frameName = `ezgif-frame-${String(asset.frame).padStart(3, '0')}.jpg`;
  const framePath = path.join(FRAMES_DIR, frameName);
  
  if (!fs.existsSync(framePath)) {
    throw new Error(`Frame not found: ${frameName}`);
  }
  
  const metadata = await sharp(framePath).metadata();
  
  if (metadata.width !== FRAME_WIDTH || metadata.height !== FRAME_HEIGHT) {
    throw new Error(`Frame ${frameName} has wrong dimensions: ${metadata.width}x${metadata.height}`);
  }
  
  log(2, `✓ Frame integrity verified: ${frameName} (${metadata.width}x${metadata.height})`);
  return true;
}

function verifyCoordinates(asset) {
  const { x, y, w, h } = asset.crop;
  
  if (x < 0 || y < 0 || w <= 0 || h <= 0) {
    throw new Error(`Invalid coordinates for ${asset.name}: x=${x}, y=${y}, w=${w}, h=${h}`);
  }
  
  if (x + w > FRAME_WIDTH || y + h > FRAME_HEIGHT) {
    throw new Error(`Crop exceeds bounds for ${asset.name}: x=${x}, y=${y}, w=${w}, h=${h}`);
  }
  
  log(3, `✓ Coordinates verified: ${asset.name} (x:${x}, y:${y}, w:${w}, h:${h})`);
  return true;
}

async function extractCrop(asset) {
  const frameName = `ezgif-frame-${String(asset.frame).padStart(3, '0')}.jpg`;
  const framePath = path.join(FRAMES_DIR, frameName);
  const outputPath = path.join(OUTPUT_DIR, `${asset.name}.jpg`);
  
  await sharp(framePath)
    .extract({
      left: Math.floor(asset.crop.x),
      top: Math.floor(asset.crop.y),
      width: Math.floor(asset.crop.w),
      height: Math.floor(asset.crop.h)
    })
    .jpeg({ quality: 92 })
    .toFile(outputPath);
  
  log(4, `✓ Crop extracted: ${asset.name}.jpg`);
  return outputPath;
}

async function verifyFileExists(asset, outputPath) {
  if (!fs.existsSync(outputPath)) {
    throw new Error(`Output file not created: ${asset.name}.jpg`);
  }
  
  const stats = fs.statSync(outputPath);
  if (stats.size < MIN_FILE_SIZE) {
    throw new Error(`File too small (${stats.size} bytes): ${asset.name}.jpg`);
  }
  
  log(5, `✓ File verified: ${asset.name}.jpg (${Math.round(stats.size / 1024)}KB)`);
  return true;
}

async function verifyImageValid(asset) {
  const outputPath = path.join(OUTPUT_DIR, `${asset.name}.jpg`);
  
  try {
    const metadata = await sharp(outputPath).metadata();
    if (!metadata.width || !metadata.height || !metadata.format) {
      throw new Error(`Invalid image: ${asset.name}.jpg`);
    }
    log(6, `✓ Image valid: ${asset.name}.jpg (${metadata.width}x${metadata.height} ${metadata.format})`);
    return true;
  } catch (err) {
    throw new Error(`Failed to verify image: ${asset.name}.jpg - ${err.message}`);
  }
}

async function extractAllAssets() {
  console.log('\n=== EXTRACTION STARTED ===\n');
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  await verifyFrameCount();
  
  for (const asset of ASSETS) {
    console.log(`\n--- Extracting: ${asset.name} ---`);
    
    await verifyFrameIntegrity(asset);
    verifyCoordinates(asset);
    await extractCrop(asset);
    await verifyFileExists(asset, path.join(OUTPUT_DIR, `${asset.name}.jpg`));
    await verifyImageValid(asset);
  }
  
  console.log('\n=== EXTRACTION COMPLETE ===\n');
  
  const outputFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.jpg'));
  console.log(`Total assets extracted: ${outputFiles.length}`);
  console.log('Output directory:', OUTPUT_DIR);
  
  return outputFiles;
}

extractAllAssets()
  .then(files => {
    console.log('\n✓ SUCCESS: All assets extracted with 6-step verification');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n✗ ERROR:', err.message);
    process.exit(1);
  });
