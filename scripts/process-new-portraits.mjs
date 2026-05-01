// Convert the 8 ChatGPT-generated PNGs from the parent root folder into
// optimized JPGs under public/portraits/ with semantic filenames.
import { Jimp } from "jimp";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "..");
const OUT = path.resolve(process.cwd(), "public", "portraits");

// Mapping: source filename → output filename (chosen by composition).
const MAP = [
  // wide hero shots (subject right, lots of negative space left)
  ["ChatGPT Image May 1, 2026, 04_07_50 PM (1).png", "doyin-hero-1.jpg", 2200],
  ["ChatGPT Image May 1, 2026, 04_09_05 PM (3).png", "doyin-hero-2.jpg", 2200],
  ["ChatGPT Image May 1, 2026, 04_09_07 PM (7).png", "doyin-hero-3.jpg", 2200],
  // alt wide (subject left)
  ["ChatGPT Image May 1, 2026, 04_09_05 PM (2).png", "doyin-aux-1.jpg", 1800],
  ["ChatGPT Image May 1, 2026, 04_09_06 PM (4).png", "doyin-contact.jpg", 1800],
  // portrait 4/5 plates
  ["ChatGPT Image May 1, 2026, 04_09_06 PM (5).png", "doyin-research.jpg", 1600],
  ["ChatGPT Image May 1, 2026, 04_09_06 PM (6).png", "doyin-portfolio-1.jpg", 1600],
  ["ChatGPT Image May 1, 2026, 04_09_07 PM (8).png", "doyin-about.jpg", 1600],
];

await fs.mkdir(OUT, { recursive: true });

for (const [src, dst, maxW] of MAP) {
  const inPath = path.join(ROOT, src);
  const outPath = path.join(OUT, dst);
  process.stdout.write(`→ ${dst} ... `);
  const img = await Jimp.read(inPath);
  if (img.bitmap.width > maxW) {
    img.resize({ w: maxW });
  }
  await img.write(outPath, { quality: 86 });
  const sz = (await fs.stat(outPath)).size;
  console.log(`${(sz / 1024).toFixed(0)} KB`);
}

console.log("\n✅ Done. 8 portraits written to public/portraits/.");
