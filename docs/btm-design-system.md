# BTM Outsourcing — Design System 2.0 Specification

**Version:** 2.0  
**Status:** Approved & Implemented Foundation  
**Framework:** React 19 + TypeScript + Vite + Framer Motion + Three.js + Vanilla CSS Tokens  
**Primary Aesthetic:** Enterprise Technology Advisor (Restrained Electric Blue, Deep Cosmic Dark Surfaces, Editorial Typography, Progressive Disclosure)

---

## 1. Design Direction & Brand Personality

The BTM digital visual language moves away from generic software-agency templates and establishes an **intelligent, high-credibility technology advisor** presence.

| Trait | How It Is Expressed in the UI |
|---|---|
| **Premium & Modern** | Deep dark canvas (`#070A0F`), fine micro-grids, refined 1px subtle borders, and smooth spring micro-interactions. |
| **Technical & Intelligent** | High-precision typography (`Manrope` + `Inter`), interactive 3D particle constellation, and filterable capability matrices. |
| **Trustworthy & Human** | Prominent real Wall Street leadership backgrounds (Goldman Sachs, Lehman Brothers, Deutsche Bank) and authentic US (NJ) + India (Gurgaon) office presence. |
| **Enterprise-Ready** | Rigorous WCAG contrast ratios, zero gimmicks, clean progressive disclosure modals and sliding drawers. |

---

## 2. Typography System

### Typeface Hierarchy
- **Primary Display Font (Headings, Metrics, Hero):** `Manrope` (Google Fonts)  
  *Geometric, modern, highly legible with enterprise gravitas.*
- **Secondary UI Font (Body, Labels, Forms, Navigation):** `Inter` (Google Fonts)  
  *Engineered for maximum screen clarity at all font sizes.*

### Font Weight Mapping
- `400` — Body copy, general descriptions
- `500` — UI Labels, input placeholders, category metadata
- `600` — Buttons, active navigation anchors, tabs, card badges
- `700` — Subheadings, card titles, section headers
- `800` — Hero headlines, dominant value statements

### Responsive Type Scale

| Scale Token | Mobile (< 768px) | Tablet (768px – 1024px) | Desktop ($\ge$ 1280px) | CSS Clamp Definition |
|---|---|---|---|---|
| `--fs-hero` | `40px` – `48px` | `56px` – `68px` | `72px` – `84px` | `clamp(2.5rem, 6vw + 1rem, 5.25rem)` |
| `--fs-h1` | `32px` – `36px` | `40px` – `48px` | `54px` – `60px` | `clamp(2.125rem, 4vw + 0.5rem, 3.75rem)` |
| `--fs-h2` | `26px` – `30px` | `32px` – `36px` | `40px` – `44px` | `clamp(1.75rem, 3vw + 0.5rem, 2.75rem)` |
| `--fs-h3` | `20px` – `22px` | `24px` – `26px` | `28px` – `32px` | `clamp(1.375rem, 2vw + 0.25rem, 2rem)` |
| `--fs-h4` | `18px` | `20px` | `22px` – `24px` | `clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)` |
| `--fs-body-lg` | `17px` | `18px` | `20px` | `clamp(1.125rem, 0.5vw + 1rem, 1.25rem)` |
| `--fs-body` | `15px` – `16px` | `16px` | `16px` | `1rem` |
| `--fs-body-sm` | `13px` – `14px` | `14px` | `14px` | `0.875rem` |
| `--fs-caption` | `12px` | `12px` | `12px` | `0.75rem` |

---

## 3. Color System & Design Tokens

All colors are codified in [`/src/styles/design-tokens.css`](file:///c:/infabio/BTM-NEW-WEBSITE/src/styles/design-tokens.css) with strict WCAG AA/AAA contrast ratios:

```css
:root {
  /* Base Surfaces */
  --background: #070A0F;
  --surface: #0D121A;
  --surface-elevated: #111823;
  --surface-card: #0F1622;
  --surface-highlight: #16202E;

  /* Typography Hierarchy */
  --text-primary: #F5F7FA;
  --text-secondary: #9AA4B2;
  --text-tertiary: #64748B;
  --text-muted: #475569;

  /* Borders & Dividers */
  --border: #202936;
  --border-subtle: #182230;
  --border-focus: #3B82F6;
  --border-hover: #2D3D52;

  /* Restrained Electric Blue Accent */
  --primary: #2563EB;
  --primary-hover: #1D4ED8;
  --primary-active: #1E40AF;
  --primary-glow: #3B82F6;
  --primary-subtle: rgba(37, 99, 235, 0.12);
  --primary-border: rgba(59, 130, 246, 0.35);

  /* Supporting Gradients */
  --accent-cyan: #06B6D4;
  --accent-cyan-subtle: rgba(6, 182, 212, 0.12);
  --accent-violet: #8B5CF6;
  --accent-violet-subtle: rgba(139, 92, 246, 0.12);
  --accent-electric: #38BDF8;
  --accent-emerald: #10B981;
}
```

---

## 4. Visual Language & Elevation System

- **Whitespace:** Generous section padding (`clamp(4rem, 8vw, 8rem)`) preventing visual overcrowding.
- **Border Treatments:** Ultra-thin 1px borders (`#202936`) separating dark surface planes.
- **Corner Radii:**
  - Small elements / Badges: `10px` (`--radius-sm`)
  - Standard Cards / Inputs: `18px` (`--radius-md`)
  - Elevated Cards / Modals: `24px` (`--radius-lg`)
  - Feature Sections / Drawers: `28px` (`--radius-xl`)
  - Action Buttons / Pills: `9999px` (`--radius-full`)
- **Shadows & Glows:**
  - Standard: `0 8px 24px rgba(0, 0, 0, 0.5)`
  - Active Button / Card Glow: `0 0 35px rgba(37, 99, 235, 0.25)`

---

## 5. Reusable Background System

Six dedicated background modules implemented in [`/src/components/backgrounds/Backgrounds.tsx`](file:///c:/infabio/BTM-NEW-WEBSITE/src/components/backgrounds/Backgrounds.tsx):

```
1. HeroTechnologyBackground  ──► Dark canvas + 40px subtle grid mask + primary electric radial glow
2. GridGlowBackground        ──► Fine 24px matrix grid + centered ambient color orb (Blue/Cyan/Violet)
3. AuroraBackground          ──► Smooth multi-layer drifting gradient layers (GPU CSS keyframe driven)
4. TechnologyMeshBackground   ──► Radial micro-dots with 135deg dark gradient scrim
5. CleanSurfaceBackground     ──► High-clarity solid dark container with refined border
6. ImageOverlayBackground     ──► Controlled image contrast scrim with gradient fade to #070A0F
```

---

## 6. Three.js Lightweight 3D Canvas

Located in [`/src/components/three/ThreeHeroCanvas.tsx`](file:///c:/infabio/BTM-NEW-WEBSITE/src/components/three/ThreeHeroCanvas.tsx):
- Renders an interactive 75-node particle network with dynamic distance-based line segment linking.
- Parallax mouse-tracking with spring damping (`targetX += (mouseX * 10 - targetX) * 0.05`).
- Disposes all geometries, materials, and listeners on unmount for 0% memory leakage.
- Automatic fallback gracefully handling lower-end devices or WebGL-disabled browsers.

---

## 7. Reusable UI Component Library

Implemented in [`/src/components/ui/index.tsx`](file:///c:/infabio/BTM-NEW-WEBSITE/src/components/ui/index.tsx):

| Component Name | Key Capabilities |
|---|---|
| **`Button`** | Primary electric blue with glow, Outlined glass secondary, Ghost, size variations (`sm`, `md`, `lg`), icon slots, loading spinner. |
| **`Badge`** | Status tags with optional live pulsating dot indicator (`primary`, `cyan`, `violet`, `neutral`). |
| **`Pill`** | Interactive selectable goal chips for the *"What are you building next?"* selector. |
| **`Card`** | Base surface, elevated surface, interactive hover lift state (`-4px` Y transform + glow border). |
| **`ExpandableCard`** | Progressive disclosure drawer with smooth animated chevron and collapsible body via Framer Motion. |
| **`SectionHeader`** | Standardized category eyebrow tag, responsive H2 heading with gradient text, and max-width subtitle. |
| **`Modal`** | Accessible dialog overlay with backdrop blur (`16px`), ESC key listening, scroll-lock, and spring animations. |
| **`Drawer`** | Right-sliding panel (max 520px) optimized for the 3-step Solution Finder and career application forms. |
| **`Tabs`** | Pill-style tab switcher with active background transition. |
| **`Input`** | Form inputs with focus glow, error state feedback, and WCAG-accessible labels. |
| **`ProgressBar`** | Animated percentage progress bar for multi-step consultation wizards. |
| **`TechnologyChip`** | Individual tech badge with category tag and Lucide icon. |
| **`LogoCloud`** | Clean framework credibility strip with subtle borders. |
| **`CaseStudyCard`** | Proof-of-work showcase card with impact metrics, tag pills, and drill-down trigger. |
| **`GradientText`** | Shimmering electric blue to cyan gradient typography. |
| **`CTA`** | Full-width high-conversion callout card with primary `"Find My Solution"` and voice consultation links. |

---

## 8. Motion & Animation Principles

1. **Spring Transitions:** Use `cubic-bezier(0.16, 1, 0.3, 1)` for organic, snappy UI movement.
2. **Standard Duration:** Fast UI micro-interactions ($\le 250\text{ms}$), modal reveals ($300\text{ms}$), background drifts ($18\text{s} - 25\text{s}$).
3. **Accessibility First:** Strict `@media (prefers-reduced-motion: reduce)` rules disable all intensive translations and animations automatically.

---

## 9. Responsive Breakpoints

- **Mobile:** `360px` – `767px` (Single column, touch-friendly 48px targets, bottom drawers)
- **Tablet:** `768px` – `1023px` (2-column grids, compact navigation)
- **Desktop:** `1024px` – `1439px` (Multi-column interactive matrices, floating header)
- **Large Desktop:** $\ge 1440px$ (Constrained content container `max-width: 1280px` for optimal readability)
