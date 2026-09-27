---
name: add_badge
description: Add a new professional certification badge to the portfolio website, updating metadata, schema, types, and visual layouts. Use when the user wants to add an AWS or other industry certification badge to danivpv.com, or asks to register a new Credly credential in the portfolio codebase.
disable-model-invocation: true
---

# Add Certification Badge

Follow this procedure whenever adding an earned certification badge to the `portfolio` project.

## Workflow

### 1. Asset Storage
- Place the transparent PNG badge image in `public/badges/` using kebab-case:
  ```
  public/badges/<provider>-<code/acronym>.png
  # e.g., public/badges/aws-aip.png, public/badges/aws-saa.png
  ```

### 2. Register Certification Data
In `lib/types.ts`, ensure `CertificationItem` interface includes:
```typescript
export interface CertificationItem {
  name: string;
  shortName: string;
  acronym: string;
  issuer: string;
  date: string;
  issueDateISO: string;
  credlyUrl: string;
  badgeImage: string;
}
```

In `lib/data.ts`, prepend the new badge to the `CERTIFICATIONS` array (most recent first):
```typescript
export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: "AWS Certified Generative AI Developer \u2013 Professional",
    shortName: "AWS AIP-C01",
    acronym: "AIP-C01",
    issuer: "Amazon Web Services",
    date: "September 2026",
    issueDateISO: "2026-09-21",
    credlyUrl: "https://www.credly.com/badges/<id>/public_url",
    badgeImage: "/badges/aws-aip.png",
  },
  // ... earlier certifications
];
```

### 3. Hero Badge Eyebrow Dynamic Rendering
In `components/sections/HeroSection.tsx`, render the eyebrow using dynamic array mapping:
- Show certification count dynamically (`${CERTIFICATIONS.length}x`).
- Map each certification to an interactive Credly link showing its `acronym`.

### 4. Portrait Badge Overlap, Sizing & Hexagonal Stacking Rules
To keep badges aesthetically balanced within the bottom-right quadrant of the circular portrait frame without overflowing the right half:
- **Badge dimensions:** Current baseline is `w-[84px] h-[84px] sm:w-[94px] sm:h-[94px] xl:w-[104px] xl:h-[104px]`.
- **Corner anchoring:** Place container at `-bottom-4 -right-4 sm:-bottom-2 sm:-right-2 lg:-bottom-1 lg:-right-1`.
- **Layout Evolution by Badge Count:**
  - **1 to 2 badges (Current)**: Single horizontal row with gentle touch (`-space-x-2 sm:-space-x-2.5`).
  - **3 badges (Hexagonal apex)**: Place the 3rd badge centered on top of the bottom two, nesting naturally into their shared hexagonal notch (pyramidal/triangular layout), or use card-stacking overlap (`-space-x-5 sm:-space-x-6 xl:-space-x-7`).
  - **4 to 5 badges (Two-tier cluster)**:
    - Increase portrait image container size by ~10% if needed to provide breathing room.
    - Tier 1 (bottom floor): 2-3 badges across.
    - Tier 2 (second floor): 1-2 badges resting on top, interlocking the hexagonal geometries.
  - **Incremental z-index & interaction**: Always maintain `style={{ zIndex: index + 1 }}` and `hover:scale-110 hover:z-30` so hovering any badge brings it to the forefront.
- **Design Iteration Expectation**: Visual balance with hexagonal assets requires previewing with the user in the browser. Be prepared for interactive back-and-forth adjustments to coordinate offsets (`translate-x`, `translate-y`), negative spacing, and scale factors.

### 5. SEO & Metadata Cascade
Update these files whenever a new credential is added:
1. `app/layout.tsx`:
   - `title`: Reflect updated count or prominent credentials.
   - `description`, `openGraph`, `twitter`: Update descriptions and alt tags.
2. `app/page.tsx`:
   - Verify `jsonLd.hasCredential` maps `CERTIFICATIONS` with `issueDateISO` and `credlyUrl`.
3. `app/opengraph-image.alt.txt` & `app/twitter-image.alt.txt`:
   - Keep text summaries synchronized with the new credentials.

### 6. Validation
Run the linter and type-checker to ensure zero regressions:
```bash
bunx --bun eslint --max-warnings 0
bunx --bun tsc --noEmit
```
