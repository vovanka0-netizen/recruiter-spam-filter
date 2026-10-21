// Rules that score a message as templated. Each rule adds points and a reason
// shown to the user. Works in the browser and in Node (for tests).

const templatePhrases = [
  "came across your profile",
  "came across your background",
  "your profile caught my eye",
  "your experience caught my eye",
  "impressive background",
  "impressed by your background",
  "exciting opportunity",
  "exciting role",
  "hope this message finds you well",
  "hope you're doing well",
  "perfect fit",
  "great fit for",
  "open to new opportunities",
  "open to exploring",
  "quick call",
  "quick chat",
  "15-minute",
  "15 minute",
  "fast-growing",
  "stealth startup",
  "competitive compensation",
  "competitive salary",
  "would love to connect",
  "i'd love to connect",
  "top talent",
  "rockstar",
  "ninja",
];

const calendarLinks = /\b(calendly\.com|cal\.com|meetings\.hubspot\.com|chili ?piper|savvycal\.com)\b/i;

// Unfilled mail-merge fields: {first_name}, [Name], {{name}}.
const placeholders = /\{\{?\s*\w*name\w*\s*\}?\}|\[(first ?)?name\]/i;

// "Hi ✅ John": the sender copied an emoji from your profile name.
const emojiGreeting = /^\s*(hi|hello|hey|dear)\s+\p{Extended_Pictographic}/iu;

function scoreMessage(text) {
  const lower = text.toLowerCase();
  const reasons = [];
  let score = 0;

  const hits = templatePhrases.filter(p => lower.includes(p));
  if (hits.length) {
    score += hits.length;
    reasons.push(`template phrases: ${hits.map(h => `“${h}”`).join(", ")}`);
  }
  if (calendarLinks.test(text)) {
    score += 2;
    reasons.push("booking link instead of a question");
  }
  if (placeholders.test(text)) {
    score += 3;
    reasons.push("unfilled mail-merge placeholder");
  }
  if (emojiGreeting.test(text)) {
    score += 3;
    reasons.push("emoji copied from your profile name into the greeting");
  }

  const verdict = score >= 2 ? "template" : "personal";
  return { verdict, score, reasons };
}

if (typeof module !== "undefined") module.exports = { scoreMessage };
