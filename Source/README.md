# Source Materials — Ingestion Guide

## Supported Formats
PDF, DOCX, PPTX, EPUB, TXT

## Steps to Add New Content

### Step 1: Drop files into this folder
Place your source documents (PDF, DOCX, PPTX, EPUB, TXT) directly into `Source/`.

### Step 2: Extract text
```bash
npm run ingest
```
This scans `Source/` for new files, extracts text content, and saves it to `Source/extracted/` as `.txt` files. A `manifest.json` tracks what's been processed (hash-based deduplication — it won't re-extract unchanged files).

### Step 3: Review extracted text
Check `Source/extracted/` to verify the text was extracted correctly. Large PDFs or scanned documents may have extraction issues.

### Step 4: Update the knowledge base
Start a Claude session and ask it to:
- Read the extracted text files in `Source/extracted/`
- Identify new concepts, terms, or topics from the material
- Either update existing topic articles in `src/content/topics/` or create new ones
- Add any new glossary terms to `src/data/glossary.json`
- Update cross-references and related topics as needed

Example prompt:
> "Read the new extracted text files in Source/extracted/ and update the knowledge base. Add new topics or enrich existing articles with the new information. Also add any new glossary terms."

### Step 5: Build and verify
```bash
npm run build && npx astro preview
```
Open http://localhost:4321 to review the changes.

### Step 6: Push updates
```bash
git add .
git commit -m "feat: update knowledge base with new source material"
git push
```
Vercel will auto-deploy on push.

## Notes
- Extracted text files and manifest are gitignored (they're intermediate artifacts)
- Source files (PDF, EPUB, etc.) are also gitignored (too large for git)
- The ingestion script uses: `pdf-parse` for PDFs, `mammoth` for DOCX, `adm-zip` for PPTX/EPUB
