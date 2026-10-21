// Finds message bodies on the LinkedIn page and adds a label under each one.
// Read-only: nothing is sent anywhere and nothing in the account is changed.

// LinkedIn class names change from time to time, so exact selectors come first,
// then looser partial matches as a fallback.
const messageSelectors = [
  ".msg-s-event-listitem__body",
  ".msg-s-message-group__msg",
  "[data-test-message-body]",
  "[class*='event-listitem__body']",
  "[class*='message-body']",
];

const reportUrl = "https://github.com/vovanka0-netizen/recruiter-spam-filter/issues";
let labeled = 0;

function labelMessage(el) {
  // Fallback selectors can match both a message and its wrapper; label it once.
  if (el.dataset.rsfDone || el.closest("[data-rsf-done]")) return;
  el.dataset.rsfDone = "1";

  const result = scoreMessage(el.innerText || "");
  const label = document.createElement("div");
  label.className = `rsf-label rsf-${result.verdict}`;
  label.textContent = result.verdict === "template" ? "⚠ Looks like a template" : "✓ Looks personal";
  if (result.reasons.length) label.title = result.reasons.join("\n");
  el.after(label);
  labeled++;
}

function scan() {
  for (const sel of messageSelectors) {
    document.querySelectorAll(sel).forEach(labelMessage);
  }
}

// If nothing was found on the messaging page, say so instead of failing silently.
function checkFound() {
  if (labeled > 0 || !location.pathname.startsWith("/messaging")) return;
  const banner = document.createElement("div");
  banner.className = "rsf-banner";
  banner.innerHTML = `Recruiter Spam Filter couldn't find any messages on this page. LinkedIn may have changed its layout. <a href="${reportUrl}" target="_blank" rel="noopener">Report it</a> and I'll fix it.`;
  banner.addEventListener("click", e => { if (e.target.tagName !== "A") banner.remove(); });
  document.body.append(banner);
}

// LinkedIn loads messages without a page reload, so keep watching the DOM.
scan();
new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
setTimeout(checkFound, 5000);
