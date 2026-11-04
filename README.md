# Designity web assets

One repository for this website's CSS, JavaScript and related browser assets, with original sources, versioned outputs and reproducible local builds. The initial release contains Slick 1.8.1 stylesheets, their five image/font dependencies and the upstream MIT license.

## Build

Run `npm ci --ignore-scripts`, `npm run build`, then `npm run check`.

Original files are preserved under `vendor/slick/1.8.1/`. Their npm archive integrity and per-file SHA-256 hashes are recorded in `vendor-manifest.json`. The build uses pinned clean-css 5.3.3 with all property optimizations disabled, enabling only whitespace/comment compaction and charset positioning. URL rebasing, remote imports, selector sorting and rule merging are disabled. A license notice remains in each generated stylesheet; the complete upstream license is distributed alongside it.

The output and hashes are in `dist/`. Original and minified relative asset paths stay identical. Keep the fonts and ajax-loader.gif next to the stylesheets as supplied; moving CSS alone would break its relative dependencies.

## Delivery and releases

Serve `dist/slick/1.8.1/slick.min.css` and `dist/slick/1.8.1/slick-theme.min.css` through jsDelivr's GitHub CDN, using a fixed full commit hash in the URL. Do not use a mutable branch or overwrite a published version. A new file/version requires a new commit URL and validation before updating website references.

Public GitHub storage and permitted jsDelivr delivery currently have free options. No paid hosting or build service is configured here.

## Scope

Future site-owned code belongs in `src/css/` or `src/js/`. Both can use this same repository. Add the appropriate pinned build steps and integration checks when introducing each new file; the initial build currently handles the selected Slick CSS only. Committing a file does not automatically load it on the website. Keep every integration's execution order, loading attributes and initialization dependencies explicit.

ElevenLabs, Tenor, Webflow-generated bundles, analytics and other vendor-managed runtime scripts are not mirrored or modified. No website metadata, CMS exports, audit evidence, credentials or private project documents belong in this repository.

Slick remains version 1.8.1. Website loading attributes, CSS order and existing duplicate link positions must be preserved during migration. This asset minification does not address server-side HTML generation time or promise faster rankings or cleared audit results.

## Rollback

Keep the previous stylesheet URLs with the consuming site's change record. Restore only those URL values if rollback is needed. Do not delete published repository commits/assets that a website may still reference. Updating or rolling back website settings and publishing the website are separate actions.

## Licenses

Build scripts and repository documentation are MIT licensed in the root LICENSE. Slick's upstream copyright and MIT terms are retained in `vendor/slick/1.8.1/LICENSE` and `dist/slick/1.8.1/LICENSE`.
