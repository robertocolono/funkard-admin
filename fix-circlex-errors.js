import fs from "fs";
import path from "path";

const rootDirs = ["components", "src", "app"]; // scandisce tutte le aree principali

function scanAndFix(filePath) {
  if (!filePath.endsWith(".ts") && !filePath.endsWith(".tsx")) return;

  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Rimuove new CircleX(...)
  if (/new\s+CircleX\s*\(/.test(content)) {
    content = content.replace(/new\s+CircleX\s*\(/g, 'new Error(');
    modified = true;
  }

  // Rimuove instanceof CircleX
  if (/instanceof\s+CircleX/.test(content)) {
    content = content.replace(/instanceof\s+CircleX/g, 'instanceof Error');
    modified = true;
  }

  if (modified) {
    fs.copyFileSync(filePath, filePath + ".bak"); // backup
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Fixed: ${filePath}`);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath);
    else scanAndFix(fullPath);
  }
}

console.log("🔍 Scanning for invalid CircleX usage...");
for (const dir of rootDirs) {
  if (fs.existsSync(dir)) walk(dir);
}
console.log("✨ Done! All CircleX references replaced with Error. Backups (.bak) created.");
