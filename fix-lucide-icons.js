import fs from "fs";
import path from "path";

const replacements = {
  Warning: "AlertTriangle",
  Error: "CircleX",
  Success: "CheckCircle2",
  UnlockKeyholeOpen: "LockKeyholeOpen",
  UnlockKeyholeRound: "LockKeyholeRound",
  UnlockKeyholeSquare: "LockKeyholeSquare",
  PlusCircle: "CirclePlus",
  MinusCircle: "CircleMinus",
  CheckCircle: "CheckCircle2",
  ArrowRightCircle: "ArrowRight",
  ArrowLeftCircle: "ArrowLeft",
  ClipboardCheck: "ClipboardCheck2",
  ClipboardList: "ClipboardList2",
  ChevronDownUp: "ChevronUpDown",
};

const targetDir = "./components";

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  for (const [oldIcon, newIcon] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${oldIcon}\\b`, "g");
    if (regex.test(content)) {
      content = content.replace(regex, newIcon);
      changed = true;
    }
  }

  if (changed) {
    fs.copyFileSync(filePath, filePath + ".bak"); // backup originale
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Updated: ${filePath}`);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      replaceInFile(fullPath);
    }
  }
}

console.log("🔍 Scanning and fixing Lucide icon imports...");
scanDir(targetDir);
console.log("✨ Done! Backup files (.bak) created for each modified file.");
