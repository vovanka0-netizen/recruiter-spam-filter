# Recruiter Spam Filter

A small Firefox extension that puts a label under each LinkedIn message: "looks like a template" or "looks personal". Hover the label to see why.

I made it after reading [this comment on Hacker News](https://news.ycombinator.com/item?id=50022196). The emoji-in-your-name trick for catching mass recruiter mail stopped working, and someone asked for an extension that does the sorting right in the open tab.

## What it checks

No AI yet, just a few rules:

- stock phrases like "came across your profile", "exciting opportunity", "quick call"
- a Calendly-type booking link instead of an actual question
- leftover mail-merge placeholders like `{first_name}`
- an emoji from your profile name copied into the greeting

Two or more points and the message gets the "template" label. The extension only reads the page you already have open. It doesn't send anything anywhere and doesn't touch your account.

## Install

It isn't on addons.mozilla.org yet, so you load it by hand:

1. Download this repo (Code → Download ZIP) and unzip it.
2. Open `about:debugging#/runtime/this-firefox` in Firefox.
3. Click "Load Temporary Add-on…" and pick `manifest.json`.
4. Open your LinkedIn messages.

Firefox removes temporary add-ons when it restarts, so you'll need to load it again after that.

## Known issue

I couldn't get a LinkedIn account past the signup captcha, so I've only tested this on a mock of the messaging page (`test/index.html`). If LinkedIn's markup is different, the extension shows a note saying it found no messages. If you see that, please [open an issue](https://github.com/vovanka0-netizen/recruiter-spam-filter/issues) and I'll fix it.

## Tests

```
node test/rules.test.cjs
```
