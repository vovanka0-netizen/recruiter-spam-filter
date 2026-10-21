// Run: node test/rules.test.cjs
const assert = require("node:assert");
const { scoreMessage } = require("../rules.js");

const cases = [
  ["Hi ✅ Alex, quick question", "template"],
  ["Hi {first_name}, hello", "template"],
  ["I came across your profile, exciting opportunity!", "template"],
  ["Book a time: calendly.com/x/15min", "template"],
  ["Hi Alex, I read your post about Postgres advisory locks. Two questions?", "personal"],
  ["Thanks, see you Tuesday", "personal"],
];

for (const [text, expected] of cases) {
  const r = scoreMessage(text);
  assert.strictEqual(r.verdict, expected, `"${text}" -> ${r.verdict}, expected ${expected}`);
}
console.log(`ok: ${cases.length} cases`);
