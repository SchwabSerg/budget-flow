# BudgetFlow Design System

## Goal

This document is the canonical reference for BudgetFlow's visual language. All frontend implementation must follow it. When building a screen or component, this doc and `tokens.css` are the source of truth — not personal preference, not LLM defaults, not whatever a similar app does.

## Visual Direction

Friendly and approachable, inspired by Monzo and Revolut. The app should feel personal, warm, and confidence-building — not corporate, not aggressive, not clinical.

Key qualities:

- generous whitespace;
- rounded corners everywhere (12px minimum);
- one bold accent color used sparingly for primary actions and hero elements;
- conversational copy where appropriate;
- emoji as category iconography;
- soft off-white backgrounds rather than pure white;
- restrained motion (functional, not decorative);
- mobile-first sizing (16px base font on mobile, comfortable touch targets).

The app should not feel like:

- a SaaS dashboard;
- a banking corporate website;
- a tutorial or demo project;
- a generic AI-generated UI with purple gradients.

---

## Color System

### Primary — Coral

Coral is the brand color. Used for primary actions, the dashboard hero balance card, focus rings, and brand moments. It must be used sparingly. If every element on a screen is coral, nothing is coral.

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-primary-50` | `#FAECE7` | Lightest tint, category pill backgrounds |
| `--color-primary-100` | `#F5C4B3` | Hover states on tints |
| `--color-primary-200` | `#F0997B` | Disabled primary, decorative |
| `--color-primary-500` | `#D85A30` | **Main brand color**, primary buttons, hero card |
| `--color-primary-600` | `#B84820` | Hover on primary buttons |
| `--color-primary-700` | `#993C1D` | Active state, primary text on tints |
| `--color-primary-900` | `#4A1B0C` | Darkest, rare use |

### Neutral — Warm Gray

The full neutral ramp is intentionally warm (slightly yellow undertone) rather than cool gray. This is the single biggest contributor to the "friendly" feel.

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-bg-app` | `#FAFAF7` | App background (off-white, not pure white) |
| `--color-bg-surface` | `#FFFFFF` | Cards, modals, raised elements |
| `--color-bg-muted` | `#F1EFE8` | Inset surfaces, secondary backgrounds |
| `--color-border` | `#E5E3DC` | Default borders, dividers |
| `--color-border-strong` | `#D3D1C7` | Input borders, emphasized borders |
| `--color-text-primary` | `#2C2C2A` | Body text, headings |
| `--color-text-secondary` | `#5F5E5A` | Supporting text, labels |
| `--color-text-tertiary` | `#888780` | Hints, timestamps, captions |
| `--color-text-disabled` | `#B4B2A9` | Disabled text |

### Semantic Colors

Used for status, validation, and informational meaning. Each has a fill (background) and an "on" color for text drawn on top.

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-success` | `#1D9E75` | Income, positive deltas, success messages |
| `--color-success-bg` | `#E1F5EE` | Success message backgrounds |
| `--color-success-text` | `#085041` | Text on success backgrounds |
| `--color-warning` | `#EF9F27` | Approaching budget limit, warnings |
| `--color-warning-bg` | `#FAEEDA` | Warning backgrounds |
| `--color-warning-text` | `#633806` | Text on warning backgrounds |
| `--color-danger` | `#E24B4A` | Over budget, errors, destructive actions |
| `--color-danger-bg` | `#FCEBEB` | Error message backgrounds |
| `--color-danger-text` | `#791F1F` | Text on danger backgrounds |
| `--color-info` | `#378ADD` | Informational hints |
| `--color-info-bg` | `#E6F1FB` | Info backgrounds |
| `--color-info-text` | `#0C447C` | Text on info backgrounds |

### Category Color Pool

Categories pick from a rotation pool. Each category stores both an emoji and a color name in the database. The pool gives consistent variety without random hues.

Pool: `coral`, `teal`, `purple`, `pink`, `amber`, `blue`, `green`.

The semantic colors above (`success`, `warning`, `danger`, `info`) are reserved and must not be assigned to user-created categories — assignment confusion would break the visual language.

Category fills always use the `-bg` variant of their color, with text in the matching `-text` variant. Example: a `purple` category renders as `#EEEDFE` background with `#3C3489` text.

### Color Usage Rules

- Coral is reserved for primary CTAs, focus rings, the dashboard hero card, and brand moments. Do not use coral for secondary buttons or general accents.
- Semantic colors must mean what they say. Green is income or positive deltas, never a generic accent.
- Category colors must come from the pool. Do not introduce new hues per category.
- Pure black (`#000`) and pure white (`#FFF`) are not in the palette. Use `--color-text-primary` and `--color-bg-surface`.
- Dark mode is deferred. The system is built light-mode-first. Tokens are structured so dark mode can be added later by overriding the variable values, not the rules.

---

## Typography

### Font Families

- **Body and UI:** Inter, system fallback. Variable font, weights 400 and 500 only.
- **Display (large numbers, hero):** Bricolage Grotesque, Inter fallback. Weight 500 only.
- **Mono (rare, debug only):** JetBrains Mono.

Why Inter: it has the best number rendering of any free web font, which matters for an app that displays money on every screen. Tabular numbers are essential and Inter handles them via `font-variant-numeric: tabular-nums`.

Why Bricolage Grotesque for display: gives the dashboard hero numbers a touch of character without being eccentric. Used only for amounts ≥ 24px.

### Font Loading

Inter and Bricolage Grotesque ship via Fontsource (npm packages), not Google Fonts CDN. This avoids a third-party DNS lookup and keeps the app shippable behind any reverse proxy without external dependencies.

```bash
npm install @fontsource-variable/inter @fontsource-variable/bricolage-grotesque
```

Imported once in `apps/web/src/main.ts`.

### Type Scale

Mobile-first. Sizes do not change at desktop breakpoints unless specifically called out per component.

| Token | Size | Line height | Usage |
| --- | --- | --- | --- |
| `--text-xs` | 11px | 1.4 | Microcopy, timestamps, badges |
| `--text-sm` | 13px | 1.4 | Secondary text, labels, captions |
| `--text-base` | 15px | 1.5 | Body text, list rows, inputs |
| `--text-md` | 17px | 1.4 | Emphasized body, section headings |
| `--text-lg` | 20px | 1.3 | Page titles |
| `--text-xl` | 24px | 1.2 | Card amounts, secondary hero |
| `--text-2xl` | 32px | 1.1 | Hero balance amount |
| `--text-3xl` | 40px | 1.0 | Reserved (probably unused) |

Weight is always 400 or 500. Never 600 or 700 — heavier weights look aggressive against the warm neutral palette and break the friendly tone.

Money displays must always use `font-variant-numeric: tabular-nums` so digits align across rows.

---

## Spacing

Mobile-first 4px scale.

| Token | Size | Usage |
| --- | --- | --- |
| `--space-1` | 4px | Tight gaps between related elements |
| `--space-2` | 8px | Standard small gap |
| `--space-3` | 12px | Standard medium gap, card internal padding |
| `--space-4` | 16px | Card padding, section spacing |
| `--space-5` | 20px | Hero card padding |
| `--space-6` | 24px | Page padding, major section gaps |
| `--space-8` | 32px | Large vertical rhythm |
| `--space-10` | 40px | Hero spacing |
| `--space-12` | 48px | Page top spacing on small screens |

### Layout Containers

- Mobile screen content: `padding: var(--space-4)` horizontal, `var(--space-6)` top.
- Cards: `padding: var(--space-4)` standard, `var(--space-5)` for hero.
- Bottom safe area: extra `var(--space-4)` to account for iOS home indicator.
- Maximum content width: 480px on tablet+, centered. The app stays mobile-shaped at all viewports — desktop is mobile-in-frame, not a redesigned wide layout.

---

## Border Radius

| Token | Size | Usage |
| --- | --- | --- |
| `--radius-sm` | 8px | Small badges, pills |
| `--radius-md` | 12px | Buttons, inputs, default |
| `--radius-lg` | 16px | Cards, list items |
| `--radius-xl` | 20px | Hero cards |
| `--radius-2xl` | 24px | Sheet modals, page-level surfaces |
| `--radius-full` | 9999px | Pills, avatars, category chips |

Rounded corners are the single biggest "friendly fintech" tell. Do not reduce these values to make components feel "more professional" — that's the wrong direction for this app.

---

## Shadows

Restrained. Soft, never harsh.

| Token | Value | Usage |
| --- | --- | --- |
| `--shadow-sm` | `0 1px 2px rgba(44, 44, 42, 0.04)` | Subtle card lift |
| `--shadow-md` | `0 4px 12px rgba(44, 44, 42, 0.06)` | Floating elements, dropdowns |
| `--shadow-lg` | `0 12px 32px rgba(44, 44, 42, 0.08)` | Modals, sheets |
| `--shadow-focus` | `0 0 0 3px rgba(216, 90, 48, 0.2)` | Focus ring (coral, 20% alpha) |

No drop shadows on buttons. No glow effects. No neon. Shadows exist to convey depth, not decoration.

---

## Component Primitives

These are the components every feature must reuse. Do not invent variants per feature.

### Button

Variants: `primary`, `secondary`, `ghost`, `destructive`.

Sizes: `sm` (32px), `md` (44px default), `lg` (52px hero).

Specs:
- Border radius: `--radius-md`.
- Font: `--text-base`, weight 500.
- Padding: `var(--space-3) var(--space-5)` for `md`.
- Touch target: 44px minimum height. Never go below.
- Primary: `--color-primary-500` background, white text. Hover: `--color-primary-600`. Active: `--color-primary-700`.
- Secondary: `--color-bg-surface` background, `--color-border-strong` border, `--color-text-primary` text.
- Ghost: transparent background, `--color-primary-700` text. No border.
- Destructive: `--color-danger-bg` background, `--color-danger-text` text. Used for delete confirmations only.
- Disabled: 50% opacity, `cursor: not-allowed`.
- Loading: shows spinner inline, disables interaction, label remains visible.

### Input

Specs:
- Height: 48px (touch-friendly, 4px taller than button to feel substantial).
- Border radius: `--radius-md`.
- Border: 1px solid `--color-border-strong`.
- Padding: `0 var(--space-4)`.
- Focus: border becomes `--color-primary-500`, plus `--shadow-focus` ring. No browser default outline.
- Error state: border becomes `--color-danger`, error message appears below in `--color-danger-text` at `--text-sm`.
- Label: above input, `--text-sm`, `--color-text-secondary`, weight 500.
- Helper text: below input, `--text-sm`, `--color-text-tertiary`.

### Card

The fundamental container.

Specs:
- Background: `--color-bg-surface`.
- Border: 1px solid `--color-border` (or borderless for emphasized cards on muted backgrounds).
- Border radius: `--radius-lg`.
- Padding: `--space-4`.
- Optional shadow: `--shadow-sm`.

### List Row

For transaction lists, expense lists, category lists.

Structure: leading icon/avatar, primary text + secondary text stacked, trailing amount or action.

Specs:
- Height: 56px minimum (touch-friendly).
- Padding: `var(--space-3) 0`.
- Bottom border: 1px solid `--color-border` (omitted on last row).
- Leading element: 36px circle with category emoji and category color background.
- Primary text: `--text-base`, weight 500, `--color-text-primary`.
- Secondary text: `--text-sm`, `--color-text-tertiary`.
- Trailing amount: `--text-base`, weight 500, tabular-nums.

### Category Pill

Specs:
- Padding: `var(--space-1) var(--space-3)`.
- Border radius: `--radius-full`.
- Font: `--text-sm`, weight 500.
- Background: category color `-bg` variant.
- Text: category color `-text` variant.
- Includes emoji prefix.

### Hero Card (Dashboard)

The main "spent this month" card on the dashboard.

Specs:
- Background: `--color-primary-500` (coral).
- Text: white.
- Padding: `--space-5`.
- Border radius: `--radius-xl`.
- Hero amount: `--text-2xl`, Bricolage Grotesque, weight 500, tabular-nums.
- Label above: `--text-sm`, 85% opacity.
- Progress bar below: 6px tall, `rgba(255,255,255,0.25)` track, white fill.

### Empty State

When a list has no items.

Specs:
- Centered content, `--space-12` vertical padding.
- Decorative element (large emoji or simple SVG) at top, 64px.
- Heading: `--text-md`, weight 500.
- Description: `--text-sm`, `--color-text-secondary`, max-width 280px, centered.
- Optional CTA button below.

### Bottom Tab Bar

Primary navigation on mobile.

Specs:
- Position: fixed bottom.
- Height: 64px + bottom safe area.
- Background: `--color-bg-surface` with 1px top border in `--color-border`.
- Items: icon (24px) + label (`--text-xs`).
- Active state: icon and label in `--color-primary-700`.
- Inactive: `--color-text-tertiary`.

### Modal Sheet

Used for create/edit forms on mobile.

Specs:
- Slides up from bottom.
- Border radius: `--radius-2xl` top corners only.
- Drag handle: 4px tall, 36px wide, `--color-border-strong`, top center.
- Backdrop: `rgba(44, 44, 42, 0.4)`.
- Max height: 90vh.

---

## Money Formatting

Every amount in the UI must go through the shared formatter. No `toFixed`, no inline formatting, no string concatenation of currency symbols.

```ts
// apps/web/src/shared/utils/money.ts
import { formatMoney } from '@/shared/utils/money'

formatMoney(124750)            // "1 247,50 ₴"
formatMoney(124750, { sign: 'always' })   // "+1 247,50 ₴"
formatMoney(0)                 // "0,00 ₴"
formatMoney(124750, { compact: true })    // "1 248 ₴"  (for tight spaces)
```

Rules:

- Amounts are stored as integer minor units in `amount_cents`. The formatter divides by 100.
- Default locale is `uk-UA`. Formatting follows Ukrainian conventions: space thousands separator, comma decimal, currency symbol after with non-breaking space.
- Negative amounts get a leading minus. Positive amounts get no sign by default. Pass `sign: 'always'` for deltas where the sign matters.
- Zero is `0,00 ₴`, never `—` or empty.

---

## Iconography

- Categories use emoji. Stored as a string field on the category model. The category record owns its emoji; the UI does not pick.
- Navigation and action icons use `lucide-vue-next`. One icon library, no mixing.
- Icon sizing: 16px inline with text, 20px in buttons, 24px in tab bar, 64px in empty states.
- Icon color: inherits from text color unless explicitly overridden.

---

## Motion

Restrained. Functional, not decorative.

| Use | Duration | Easing |
| --- | --- | --- |
| Hover state changes | 150ms | `ease-out` |
| Page transitions | 250ms | `ease-out` |
| Modal sheet open/close | 300ms | `cubic-bezier(0.32, 0.72, 0, 1)` (iOS) |
| Skeleton pulse | 1500ms | `ease-in-out` infinite |

No bouncing, no spring physics, no parallax. Reduced motion preferences must be respected — wrap all transitions in `@media (prefers-reduced-motion: no-preference)`.

---

## Accessibility

Non-negotiable baselines:

- Touch targets minimum 44x44px.
- Color contrast: text on backgrounds passes WCAG AA (4.5:1 for body, 3:1 for large text). Verified for: text-primary on bg-surface, text-secondary on bg-surface, white on primary-500, all -text on -bg semantic pairs.
- Every interactive element has a visible focus state using `--shadow-focus`.
- Form inputs have associated labels (not placeholder-as-label).
- Screen reader: every icon-only button has an `aria-label`.
- Keyboard: every flow that works with touch must work with keyboard.
- Errors use both color and text — never color alone.

---

## What's Out of Scope

This system intentionally does not include:

- Dark mode (deferred, tokens structured to allow it later).
- Animations beyond functional state changes.
- A full icon system beyond Lucide + emoji.
- Multiple typographic scales for desktop (mobile scale used everywhere).
- Theming or per-user customization.

If a feature needs something this system doesn't define, that's a signal to either reuse an existing primitive or update this doc — not invent ad-hoc.

---

## Implementation Checklist

When Codex builds a new component or screen, it must:

- [ ] Use only tokens from `tokens.css`. No hardcoded colors, sizes, or radii.
- [ ] Use one of the component primitives above for buttons, inputs, cards, etc.
- [ ] Run all amounts through `formatMoney`.
- [ ] Provide loading, empty, and error states for any data-driven view.
- [ ] Use Lucide icons or category emoji — nothing else.
- [ ] Respect 44px minimum touch targets.
- [ ] Include focus states on all interactive elements.
- [ ] Test at 375px viewport (iPhone SE) as the minimum supported width.

---

## Updating This Doc

This file is the source of truth for visual decisions. If a screen needs a new pattern, the change must be:

1. Discussed and approved (CTO review).
2. Added to this doc and `tokens.css` first.
3. Then implemented in the component using the new token.

Do not let new patterns leak into feature code without making it back to this doc. That's how design systems rot.
