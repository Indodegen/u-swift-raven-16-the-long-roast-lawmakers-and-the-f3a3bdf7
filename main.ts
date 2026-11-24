import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Entry writer for make.fun "The Long Roast: Lawmakers and the File
// They Cannot Convert" (u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7).
// Reads the champion one-liner from entry.txt next to this file, checks it
// against the bounty gate — "/output/entry.txt is UTF-8 text of 1 to 320
// characters, not only white space" — and copies it byte-identical to the
// output directory (default "out", or $MAKEFUN_OUTPUT_DIR).
// Prints nothing: stdout stays 0 bytes.
const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

if (text.length < 1 || text.length > 320 || text.trim().length === 0) {
  process.exit(1);
}

// One line only: the roast is a single sentence, so any embedded newline
// means the file was corrupted or replaced with multi-line text.
if (text.includes("\n") || text.includes("\r")) {
  process.exit(1);
}

const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "out");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
