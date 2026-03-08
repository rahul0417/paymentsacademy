#!/usr/bin/env node

/**
 * Source Ingestion Pipeline
 *
 * Scans Source/ for PDF, DOCX, PPTX, EPUB, and TXT files,
 * extracts their text content, and saves it to Source/extracted/.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "Source");
const EXTRACTED_DIR = path.join(SOURCE_DIR, "extracted");
const MANIFEST_PATH = path.join(EXTRACTED_DIR, "manifest.json");

const SUPPORTED_EXTENSIONS = new Set([".pdf", ".docx", ".pptx", ".epub", ".txt"]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function computeHash(filePath) {
  const data = fs.readFileSync(filePath);
  return "sha256-" + crypto.createHash("sha256").update(data).digest("hex");
}

function loadManifest() {
  if (fs.existsSync(MANIFEST_PATH)) {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  }
  return { lastRun: null, files: [] };
}

function saveManifest(manifest) {
  manifest.lastRun = new Date().toISOString();
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

function sanitizeOutputName(filename) {
  // Replace the original extension with .txt
  const ext = path.extname(filename);
  const base = filename.slice(0, filename.length - ext.length);
  // Keep the name but make it filesystem-safe for the output
  return base + ".txt";
}

function stripHtmlTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&rsquo;/gi, "\u2019")
    .replace(/&lsquo;/gi, "\u2018")
    .replace(/&rdquo;/gi, "\u201D")
    .replace(/&ldquo;/gi, "\u201C")
    .replace(/&mdash;/gi, "\u2014")
    .replace(/&ndash;/gi, "\u2013")
    .replace(/&#\d+;/g, (match) => {
      const code = parseInt(match.slice(2, -1), 10);
      return String.fromCharCode(code);
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ---------------------------------------------------------------------------
// Extractors
// ---------------------------------------------------------------------------

async function extractPdf(filePath) {
  const pdfParse = (await import("pdf-parse")).default;
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return { text: data.text, pageCount: data.numpages };
}

async function extractDocx(filePath) {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ path: filePath });
  return { text: result.value, pageCount: null };
}

async function extractPptx(filePath) {
  const AdmZip = (await import("adm-zip")).default;
  const zip = new AdmZip(filePath);
  const entries = zip.getEntries();

  // Collect slide entries and sort them by slide number
  const slideEntries = entries
    .filter((e) => /^ppt\/slides\/slide\d+\.xml$/i.test(e.entryName))
    .sort((a, b) => {
      const numA = parseInt(a.entryName.match(/slide(\d+)/)[1], 10);
      const numB = parseInt(b.entryName.match(/slide(\d+)/)[1], 10);
      return numA - numB;
    });

  const texts = [];
  for (const entry of slideEntries) {
    const xml = entry.getData().toString("utf-8");
    // Extract text from <a:t> tags
    const matches = xml.match(/<a:t[^>]*>([\s\S]*?)<\/a:t>/g) || [];
    const slideText = matches
      .map((m) => m.replace(/<[^>]+>/g, ""))
      .join(" ");
    if (slideText.trim()) {
      texts.push(slideText.trim());
    }
  }

  return { text: texts.join("\n\n"), pageCount: slideEntries.length };
}

async function extractEpub(filePath) {
  const AdmZip = (await import("adm-zip")).default;
  const zip = new AdmZip(filePath);
  const entries = zip.getEntries();

  // Find the OPF file to get the reading order
  let opfEntry = entries.find((e) => e.entryName.endsWith(".opf"));

  // If no OPF found directly, check container.xml for the path
  if (!opfEntry) {
    const containerEntry = entries.find(
      (e) => e.entryName === "META-INF/container.xml"
    );
    if (containerEntry) {
      const containerXml = containerEntry.getData().toString("utf-8");
      const rootfileMatch = containerXml.match(
        /full-path="([^"]+\.opf)"/
      );
      if (rootfileMatch) {
        opfEntry = entries.find((e) => e.entryName === rootfileMatch[1]);
      }
    }
  }

  let orderedFiles = [];

  if (opfEntry) {
    const opfXml = opfEntry.getData().toString("utf-8");
    const opfDir = path.dirname(opfEntry.entryName);

    // Extract manifest items (id -> href)
    const manifestItems = {};
    const itemRegex = /<item\s[^>]*?id="([^"]+)"[^>]*?href="([^"]+)"[^>]*?\/?>(?:<\/item>)?/gi;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(opfXml)) !== null) {
      const id = itemMatch[1];
      const href = itemMatch[2];
      manifestItems[id] = opfDir !== "." ? opfDir + "/" + href : href;
    }

    // Extract spine order
    const spineRegex = /<itemref\s[^>]*?idref="([^"]+)"[^>]*?\/?>/gi;
    let spineMatch;
    while ((spineMatch = spineRegex.exec(opfXml)) !== null) {
      const idref = spineMatch[1];
      if (manifestItems[idref]) {
        orderedFiles.push(manifestItems[idref]);
      }
    }
  }

  // Fallback: just grab all HTML/XHTML files alphabetically
  if (orderedFiles.length === 0) {
    orderedFiles = entries
      .filter((e) => /\.(x?html?|htm)$/i.test(e.entryName))
      .sort((a, b) => a.entryName.localeCompare(b.entryName))
      .map((e) => e.entryName);
  }

  const texts = [];
  const seen = new Set();
  for (const fileName of orderedFiles) {
    if (seen.has(fileName)) continue;
    seen.add(fileName);
    const entry = entries.find((e) => e.entryName === fileName);
    if (!entry) continue;
    const html = entry.getData().toString("utf-8");
    const text = stripHtmlTags(html);
    if (text.trim()) {
      texts.push(text);
    }
  }

  return { text: texts.join("\n\n---\n\n"), pageCount: orderedFiles.length };
}

async function extractTxt(filePath) {
  const text = fs.readFileSync(filePath, "utf-8");
  return { text, pageCount: null };
}

const EXTRACTORS = {
  ".pdf": extractPdf,
  ".docx": extractDocx,
  ".pptx": extractPptx,
  ".epub": extractEpub,
  ".txt": extractTxt,
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // Ensure extracted directory exists
  if (!fs.existsSync(EXTRACTED_DIR)) {
    fs.mkdirSync(EXTRACTED_DIR, { recursive: true });
  }

  const manifest = loadManifest();
  const manifestMap = new Map(
    manifest.files.map((f) => [f.filename, f])
  );

  // Scan source directory for supported files
  const allFiles = fs.readdirSync(SOURCE_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    if (!SUPPORTED_EXTENSIONS.has(ext)) return false;
    const fullPath = path.join(SOURCE_DIR, f);
    return fs.statSync(fullPath).isFile();
  });

  if (allFiles.length === 0) {
    console.log("No supported files found in Source/");
    return;
  }

  console.log(`Found ${allFiles.length} supported file(s) in Source/\n`);

  let processed = 0;
  let skipped = 0;
  let failed = 0;
  const newManifestFiles = [];

  for (const filename of allFiles) {
    const filePath = path.join(SOURCE_DIR, filename);
    const ext = path.extname(filename).toLowerCase();
    const stat = fs.statSync(filePath);
    const hash = computeHash(filePath);

    // Check if already processed and unchanged
    const existing = manifestMap.get(filename);
    if (existing && existing.hash === hash) {
      // Also verify the extracted file still exists
      const extractedPath = path.join(EXTRACTED_DIR, existing.extractedTo);
      if (fs.existsSync(extractedPath)) {
        console.log(`  SKIP  ${filename} (unchanged)`);
        newManifestFiles.push(existing);
        skipped++;
        continue;
      }
    }

    // Extract
    console.log(`  EXTRACT  ${filename}`);
    try {
      const extractor = EXTRACTORS[ext];
      if (!extractor) {
        throw new Error(`No extractor for ${ext}`);
      }

      const { text, pageCount } = await extractor(filePath);
      const outputName = sanitizeOutputName(filename);
      const outputPath = path.join(EXTRACTED_DIR, outputName);
      fs.writeFileSync(outputPath, text, "utf-8");

      newManifestFiles.push({
        filename,
        extractedTo: outputName,
        type: ext.slice(1),
        size: stat.size,
        hash,
        extractedAt: new Date().toISOString(),
        pageCount,
      });

      const sizeKb = Math.round(text.length / 1024);
      console.log(`           -> ${outputName} (${sizeKb} KB text)`);
      processed++;
    } catch (err) {
      console.error(`  FAIL  ${filename}: ${err.message}`);
      failed++;
    }
  }

  // Save manifest
  manifest.files = newManifestFiles;
  saveManifest(manifest);

  // Summary
  console.log("\n--- Summary ---");
  console.log(`  Processed: ${processed}`);
  console.log(`  Skipped:   ${skipped} (already up to date)`);
  console.log(`  Failed:    ${failed}`);
  console.log(`  Total:     ${allFiles.length}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
