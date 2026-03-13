import path from "path";

export function sanitizeOutputName(filename) {
  const ext = path.extname(filename);
  const base = filename.slice(0, filename.length - ext.length);
  const safeBase = base.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").trim() || "document";
  const sourceType = ext.slice(1).toLowerCase() || "file";
  return `${safeBase}.${sourceType}.txt`;
}
