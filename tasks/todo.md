# Google Ads push: re-roofing + guttering leads

Goal: drive more re-roofing and guttering leads via Google Ads ($185/day budget).
Build the conversion infrastructure + dedicated PPC landing pages, and hand over a
ready-to-load campaign. (Running the ads + setting IDs in Vercel = Heath/client action.)

## Decisions (locked in)
- Landing pages: DEDICATED, noindex PPC pages (/re-roofing-quote, /guttering-quote). Keeps SEO pages untouched.
- Budget: $185/day (~$5,550/mo). Smart bidding once tracking has data.
- Account: exists, has conversion ID. Wire to it; confirm env vars in Vercel.

## Build (this session)
- [ ] tasks/todo.md plan (this file)
- [ ] components/GoogleTag.tsx - site-wide gtag.js (Ads + optional GA4), env-gated
- [ ] components/CallTracking.tsx - fire Ads call conversion on tel: clicks, env-gated
- [ ] components/LeadForm.tsx - reusable on-page lead form (reuses submitContactForm)
- [ ] components/LandingHeader.tsx + LandingFooter.tsx - minimal chrome (no nav menu = fewer leaks)
- [ ] app/re-roofing-quote/page.tsx - dedicated landing page (noindex)
- [ ] app/guttering-quote/page.tsx - dedicated landing page (noindex)
- [ ] app/layout.tsx - mount GoogleTag + CallTracking site-wide
- [ ] app/thank-you/page.tsx - de-dupe gtag load (library now site-wide); fire event only
- [ ] app/actions/contact.ts - message optional + hidden `source` field in lead email
- [ ] app/robots.ts - disallow the two landing pages
- [ ] clients/sandhurst-roofing/google-ads-campaign.md - full campaign deliverable

## Verify before done
- [ ] npm run build passes (no type errors, routes generated)
- [ ] /re-roofing-quote & /guttering-quote render: form on page, click-to-call, noindex meta
- [ ] /thank-you still fires conversion (single gtag load, no double-config)
- [ ] robots.txt disallows the PPC pages
- [ ] Push to main, confirm live (HTTP 200, form present, noindex present)

## Handover (Heath/client action - documented in campaign md)
- [ ] Confirm NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID + _LABEL set in Vercel
- [ ] (Optional) add NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL (call-click conversion) + NEXT_PUBLIC_GA4_ID
- [ ] Load campaign into Google Ads, point ads at the new /…-quote pages
- [ ] Set landing pages as final URLs; verify conversion in Google Tag Assistant

## Review
Done & verified:
- 2 dedicated PPC landing pages built (/re-roofing-quote, /guttering-quote), noindex,
  form on the page, click-to-call, stripped nav. Build = 165 pages (was 163).
- Prerendered HTML confirms: noindex,nofollow; hidden service+source fields; address
  field; tel: CTA present on both pages.
- Site-wide GoogleTag + CallTracking added to layout (env-gated, no-op until IDs set).
- /thank-you conversion de-duplicated (library now loads once site-wide). No regression:
  both old and new paths gate on the same NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID.
- Contact action: message now optional; hidden `source` tags each lead by campaign.
- robots.ts disallows both PPC pages. Lint + typecheck clean.
- Full campaign deliverable written to Clients/sandhurst-roofing/google-ads-campaign.md.

Handover (account owner, can't be done from code):
- Confirm AW- conversion ID + label in Vercel; add call label + (optional) GA4 ID.
- Build the 2 campaigns + create the 2 conversion actions; point ads at the /…-quote pages.
- I can't run ads or spend on the account - that stays with Heath/client.
