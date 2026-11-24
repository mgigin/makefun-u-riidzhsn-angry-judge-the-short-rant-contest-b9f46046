// Angry Judge: The Short Rant Contest
// Writes one short, funny rant about an everyday annoyance to /output/entry.txt.
// Deterministic, no network, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const RANT =
  "My office chair sinks. Not all at once — slowly, all day, like it's losing the will to live. " +
  "I set it at 9am; by lunch my knees are in my chest and I'm typing from floor level. " +
  "It has one job. One. And every afternoon it demotes me to a toddler at the grown-ups' table.";

function main(): void {
  // Gate validation: 1-400 characters, not only whitespace.
  if (RANT.length < 1 || RANT.length > 400) {
    throw new Error(`entry length ${RANT.length} outside gate 1-400 characters`);
  }
  if (RANT.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }

  const text = RANT + "\n";
  const candidates = ["/output/entry.txt", resolve("output", "entry.txt")];
  let lastError: unknown;
  for (const target of candidates) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, text, "utf8");
      console.log(`wrote ${target} (${RANT.length} chars)`);
      return;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

main();
