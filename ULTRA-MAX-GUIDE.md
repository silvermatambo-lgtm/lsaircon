# WebDevPro Ultra Max 4 TEMPLATE — MASTER RULES

This is the preferred reusable WebDevPro client-demo base.

## Core rule
Rebrand content and images only. Do not add npm, Tailwind, Vite, Lovable, Nitro or external asset dependencies unless a future project genuinely needs them.

## PWA behavior
- Chromium browsers on Android/Windows can expose a native install prompt through `beforeinstallprompt`.
- iOS/iPadOS does not expose the same automatic native prompt. The template therefore provides clear Safari Share → Add to Home Screen instructions.
- A custom install suggestion appears after 25 seconds when the site is not already installed.
- Mobile navigation always includes an Install button.

## Five pages
Home / About / Services / Gallery / Contact all open as separate documents rather than one-page anchor sections.

## Animation system
Hero slider, typewriter text, hero entry animation, scroll reveal, counters, cards, gallery zoom and floating/pulse UI are included by default.

## Interactive chatbot
The assistant welcomes the visitor, asks what they need, asks their name, asks for job details/location/timing, and then hands the completed enquiry to WhatsApp.
