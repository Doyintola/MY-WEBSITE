// Background-remove + composite Doyin's portraits onto color blocks.
// Run: node scripts/process-portraits.mjs
import { removeBackground } from "@imgly/background-removal-node";
import { Jimp } from "jimp";
import path from "node:path";
import fs from "node:fs/promises";

const ROOT = path.resolve(process.cwd(), "..");
const OUT = path.resolve(process.cwd(), "public", "portraits");

const COLORS = {
  gold: 0xb08742ff,
  goldLight: 0xc9a961ff,
  moss: 0x5a7a5eff,
  mossLight: 0x7a9a7eff,
  rust: 0xa85a3aff,
  ink: 0x0e0e0cff,
  cream: 0xf3eee3ff,
};

// Source images (in workspace root) → output specs.
const JOBS = [
  {
    src: "WhatsApp Image 2026-04-30 at 18.42.52 (3).jpeg", // close graduation portrait
    name: "doyin-hero",
    bg: COLORS.gold,
    accent: COLORS.ink,
    width: 1400,
    height: 1750, // 4:5
    subjectScale: 1.05,
    offsetY: -10, // px from bottom
  },
  {
    src: "WhatsApp Image 2026-04-30 at 18.42.52 (2).jpeg", // graduation full body
    name: "doyin-about",
    bg: COLORS.moss,
    accent: COLORS.gold,
    width: 1200,
    height: 1500,
    subjectScale: 0.95,
    offsetY: 0,
  },
  {
    src: "WhatsApp Image 2026-04-30 at 18.42.53.jpeg", // conference / speaking
    name: "doyin-research",
    bg: COLORS.ink,
    accent: COLORS.rust,
    width: 1600,
    height: 1000,
    subjectScale: 1.1,
    offsetY: 60,
    offsetX: 200,
  },
  {
    src: "WhatsApp Image 2026-04-30 at 18.42.52.jpeg", // outdoor 1
    name: "doyin-portfolio-1",
    bg: COLORS.rust,
    accent: COLORS.cream,
    width: 1200,
    height: 1500,
    subjectScale: 1.0,
    offsetY: 0,
  },
  {
    src: "WhatsApp Image 2026-04-30 at 18.42.52 (1).jpeg", // outdoor 2
    name: "doyin-contact",
    bg: COLORS.goldLight,
    accent: COLORS.ink,
    width: 1200,
    height: 1500,
    subjectScale: 1.0,
    offsetY: 0,
  },
];

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

// Auto-trim transparent margins from the cutout PNG
function autoTrim(img) {
  const { width, height } = img.bitmap;
  let top = height,
    bottom = 0,
    left = width,
    right = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const a = img.bitmap.data[idx + 3];
      if (a > 12) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }

  if (right < left || bottom < top) return img;
  const w = right - left + 1;
  const h = bottom - top + 1;
  return img.crop({ x: left, y: top, w, h });
}

async function processOne(job) {
  // pass relative path (lib treats absolute Windows paths as URLs)
  const relPath = path.join("..", job.src).replace(/\\/g, "/");
  console.log(`\n→ ${job.name}  (${job.src})`);

  // 1. remove background (file path)
  console.log("  · removing background…");
  const blob = await removeBackground(relPath);
  const cutoutBuf = Buffer.from(await blob.arrayBuffer());

  // 2. load + trim
  const cutout = await Jimp.fromBuffer(cutoutBuf);
  const trimmed = autoTrim(cutout);

  // 4. resize subject so its height is `height * subjectScale`
  const targetH = Math.round(job.height * job.subjectScale);
  trimmed.resize({ h: targetH });

  // 5. build canvas with bg + accent strip
  const canvas = new Jimp({
    width: job.width,
    height: job.height,
    color: job.bg,
  });

  // accent vertical strip on the left (18%)
  const accentW = Math.round(job.width * 0.18);
  const accentStrip = new Jimp({
    width: accentW,
    height: job.height,
    color: job.accent,
  });
  canvas.composite(accentStrip, 0, 0);

  // accent bottom band (16px)
  const bottomBand = new Jimp({
    width: job.width,
    height: 16,
    color: job.accent,
  });
  canvas.composite(bottomBand, 0, job.height - 16);

  // accent right edge stripe (24px, semi-trans handled by hex)
  const rightStripe = new Jimp({
    width: 24,
    height: job.height,
    color: job.accent,
  });
  canvas.composite(rightStripe, job.width - 24, 0);

  // 6. place subject — bottom-aligned, horizontally centered + offset
  const subjW = trimmed.bitmap.width;
  const subjH = trimmed.bitmap.height;
  const x = Math.round((job.width - subjW) / 2 + (job.offsetX || 0));
  const y = job.height - subjH + (job.offsetY || 0);
  canvas.composite(trimmed, x, y);

  await ensureDir(OUT);
  const outPath = path.join(OUT, `${job.name}.jpg`);
  await canvas.write(outPath, { quality: 92 });
  console.log(`  ✓ wrote public/portraits/${job.name}.jpg`);
}

(async () => {
  await ensureDir(OUT);
  for (const job of JOBS) {
    try {
      await processOne(job);
    } catch (err) {
      console.error(`  ✗ ${job.name}:`, err.message);
    }
  }
  console.log("\nDone.");
})();

