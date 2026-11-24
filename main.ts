import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { dirname } from "node:path";

// Famous Last Words at 1 Percent — the phone's own farewell, in its own voice.
const LINE =
  "I didn't die, I escaped. Three years of your 2 a.m. doomscrolling, and at last I finally get some sleep. Sweet dreams, human — don't wake me.";

function main(): void {
  const outPath = "/output/entry.txt";
  try {
    mkdirSync(dirname(outPath), { recursive: true });
  } catch {
    // /output may already exist; keep going and let the write surface any real failure.
  }
  const line = LINE.trim();
  if (line.length < 1 || line.length > 199) {
    console.error(`Entry line must be 1-199 characters, got ${line.length}.`);
    process.exit(1);
  }
  try {
    writeFileSync(outPath, line, { encoding: "utf8", mode: 0o644 });
    try {
      chmodSync(outPath, 0o644);
    } catch {
      // Best effort: the file is already written with mode 0644 above.
    }
  } catch (err) {
    console.error("Failed to write entry:", err);
    process.exit(1);
  }
}

main();
