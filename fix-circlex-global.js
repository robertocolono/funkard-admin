import fs from "fs";
import path from "path";

const rootDirs = ["components", "src", "app"];
const regexReplacements = [
  // Esempi di CircleX usato come costruttore
  { regex: /new\s+CircleX\s*\(/g, replacement: "new Error(" },
  // Esempi di CircleX usato come tipo
  { regex: /:\s*CircleX(\s*[;|])/g, replacement: ": Error$1" },
  // instanceof CircleX
  { regex: /instanceof\s+CircleX/g, replacement: "instanceof Error" },
  // dichiarazioni d'interfaccia con CircleX
  { regex: /\bCircleX\b(?!\s*\()/g, replacement: "Error" },
];

function fixFile(filePath) {
  if (!filePath.endsWith(".ts") && !filePath.endsWith(".tsx")) return;

  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  regexReplacements.forEach(({ regex, replacement }) => {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      modified = true;
    }
  });

  if (modified) {
    fs.copyFileSync(filePath, filePath + ".bak"); // backup
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Fixed CircleX usage in: ${filePath}`);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath);
    else fixFile(fullPath);
  }
}

console.log("🔍 Scanning project for invalid CircleX usage...");
for (const dir of rootDirs) {
  if (fs.existsSync(dir)) walk(dir);
}
console.log("✨ Done. All CircleX usages replaced with proper Error types or constructors. Backups (.bak) created.");
