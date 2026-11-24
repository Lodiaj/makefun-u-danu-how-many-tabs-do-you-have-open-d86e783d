import * as fs from "node:fs";
import * as path from "node:path";

// How Many Tabs Do You Have Open? — one number, digits only.
// The honest count: 47 open browser tabs. High enough to surprise,
// believable for a tab hoarder, and it hints at a life of half-finished
// research — articles to read, docs to revisit, videos to watch later.
const COUNT = "47";
const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = path.join(outDir, "entry.txt");

// Gate: entry.txt must be UTF-8, 1-5 chars, digits only, not only whitespace.
if (!/^[0-9]{1,5}$/.test(COUNT)) {
  throw new Error(`COUNT must be 1-5 digits, got: ${JSON.stringify(COUNT)}`);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, COUNT, "utf8");

// Round-trip verification: read the file back and confirm it is exactly
// the count, byte for byte, with no trailing newline or extra bytes.
const back = fs.readFileSync(outPath, "utf8");
const bytes = Buffer.byteLength(back, "utf8");
if (back !== COUNT || bytes !== COUNT.length) {
  throw new Error(
    `Round-trip mismatch: file holds ${JSON.stringify(back)} (${bytes} bytes), expected ${JSON.stringify(COUNT)}`,
  );
}
console.log(`Wrote ${COUNT} to ${outPath} (${bytes} bytes, verified)`);
