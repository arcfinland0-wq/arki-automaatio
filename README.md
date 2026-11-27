# Arki Automaatio — service landing page

A bilingual service website: Finnish at `/` and English at `/en/`, with visible language links on desktop and mobile. “Arki Automaatio” is a working name, not an established company identity. Plain HTML, CSS and browser JavaScript; no dependencies, build step, external fonts, analytics or requests to third-party services.

## Run locally

From this directory:

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

Open `http://localhost:4173/` or the authenticated Devin browser preview for port 4173.

## GitHub Pages

This dependency-free site also works at a GitHub Pages project URL: all asset references are relative. After the site PR is reviewed and merged, enable **Settings → Pages → Deploy from a branch → main / (root)**. `.nojekyll` disables Jekyll processing. The owner supplied the existing domain `ayraslabs.com`; `CNAME` preserves that custom domain. Set the apex A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and `www` CNAME to `arcfinland0-wq.github.io`. Enforce HTTPS once GitHub issues the certificate. No domain purchase or paid hosting is needed. Publishing was approved by the owner; the contact form deliberately remains a draft-only placeholder.

## Contact form

The form validates required fields and an email address, then opens a local, copyable draft. It never sends a message or stores personal data. Package buttons preselect the matching topic. The preview notice is deliberately explicit: no real address has been supplied. The draft uses text values, not HTML injection. Clipboard denial falls back to selecting the draft for manual copying.

## Before accepting real enquiries

Confirm the business name and seller identity, provide the real contact destination and an appropriate privacy notice, agree a real form-delivery mechanism, and confirm prices, VAT, tool costs, reference-deal availability and commercial terms. There are no invented testimonials, urgency counters or savings guarantees.

## Contents

- `index.html`: semantic Finnish content, prices, FAQ, contact draft dialog.
- `en/index.html`: complete English page with the same prices and terms.
- `styles.css`: responsive layout, focus states and reduced-motion support.
- `app.js`: shared mobile navigation, package selection and contact draft preview/copy, localized from the document language.
- `favicon.svg`: original working-name mark.

Source pricing: supplied business plan and sales-message draft. Listed prices are VAT-exclusive; any applicable VAT and third-party costs are agreed in the quote. No hosting, domains, accounts or customer messages have been purchased or created.
