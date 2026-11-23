// Dad Joke Showdown — a program that writes one dad joke to
// /output/entry.txt.
//
// The joke is a fixed string on purpose: the entry is judged on the
// writing, so the program's job is to deliver exactly that joke, byte
// for byte, every run.

import { mkdirSync, writeFileSync } from "node:fs";

// Why this joke, against the judge's brief:
// - It is a dad joke a father would tell at the table: a dad talking
//   to his suitcase about the holiday that is not happening.
// - The pun lands cleanly on the first read: "emotional baggage" is
//   both the luggage standing by the door and the feelings about the
//   cancelled trip, and the turn needs no explaining.
// - It feels fresh inside the tradition: the suitcase is the one being
//   told, not the usual setup, and the punchline is the last clause.
// - It is tight: two short sentences, every word earning its place,
//   and it reads aloud with a rhythm a father could deliver across
//   a dinner table.
const JOKE =
  "I told my suitcase there would be no vacation this year. Now I'm dealing with emotional baggage.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // The gate only accepts 1 to 200 characters of UTF-8 text, so refuse
  // loudly instead of shipping a joke the gate would throw away. It
  // also refuses text that is only white space, so check that too.
  if (JOKE.length < 1 || JOKE.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${JOKE.length}`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // A dad joke is told out loud in one breath: refuse a line break
  // inside it, so a typo can never slip a second line past the gate.
  if (/[\r\n]/.test(JOKE)) {
    throw new Error("entry must be a single line");
  }
  // The gate counts every byte, so write exactly the joke and nothing
  // else: no trailing newline.
  // /output is a mount point in the grader sandbox: never delete the
  // directory itself, only create it if missing and write the file.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JOKE, "utf8");
  console.log(`Wrote ${JOKE.length} characters to ${OUT_FILE}`);
}

main();
