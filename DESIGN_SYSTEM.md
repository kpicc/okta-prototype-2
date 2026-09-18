# Freedom Mobile Design System

A comprehensive design system derived from `https://www.freedommobile.ca/en-CA` and the Freedom Design System (Beta) Figma library.

---

## 1. DESIGN TOKENS

### Color Palette

| Token | Hex | RGBA | Group | Usage |
|-------|-----|------|-------|-------|

| `--color-brand-primary` | `#DB5C05` | `rgb(219, 92, 5)` | Primary | CTAs, primary buttons, key accents |

| `--color-brand-primary-accessible` | `#ED6B1F` | `rgb(237, 107, 31)` | Primary-accessible | CTAs, primary buttons, text and key accents on dark surfaces |

| `--color-brand-secondary` | `#2F7DC1` | `rgb(47, 125, 193)` | Secondary | Link colour, some brand elements |

| `--color-neutral-0` | `#FFFFFF` | `rgb(255, 255, 255)` | Neutral | Page backgrounds, text on dark surfaces |

| `--color-neutral-100` | `#F5F5F5` | `rgb(245, 245, 245)` | Neutral | Subtle backgrounds, hover panels, footer panels |

| `--color-neutral-200` | `#E0E0E0` | `rgb(224, 224, 224)` | Neutral | Dividers, disabled text, subtle borders |

| `--color-neutral-300` | `#CECECE` | `rgb(206, 206, 206)` | Neutral | Borders, input underlines |

| `--color-neutral-400` | `#DEDEDE` | `rgb(222, 222, 222)` | Neutral | Alternative light border / divider |

| `--color-neutral-500` | `#8F8F8F` | `rgb(143, 143, 143)` | Neutral | Secondary text, placeholder text |

| `--color-neutral-700` | `#4E4E4E` | `rgb(78, 78, 78)` | Neutral | Body text, icons |

| `--color-neutral-900` | `#000000` | `rgb(0, 0, 0)` | Neutral | Headings, primary text |

| `--color-status-success` | `#22C55E` | `rgb(34, 197, 94)` | Semantic | Success states |

| `--color-status-warning` | `#F59E0B` | `rgb(245, 158, 11)` | Semantic | Warning states |

| `--color-status-danger` | `#EF4444` | `rgb(239, 68, 68)` | Semantic | Error states |

| `--color-status-info` | `#156BA3` | `rgb(21, 107, 163)` | Semantic | Info / help text |

#### Semantic Color Tokens

These alias the palette above into usage-specific names and are the preferred tokens for component building.

```css
/* Text */
--color-text-primary: var(--color-neutral-900);
--color-text-secondary: var(--color-neutral-700);
--color-text-muted: var(--color-neutral-500);
--color-text-inverse: var(--color-neutral-0);
--color-text-brand: var(--color-brand-primary);
--color-text-link: var(--color-brand-primary);
--color-text-link-hover: var(--color-brand-primary-dark);

/* Background */
--color-background-primary: var(--color-neutral-0);
--color-background-secondary: var(--color-neutral-100);
--color-background-brand: var(--color-brand-primary);
--color-background-brand-hover: var(--color-brand-primary-dark);
--color-background-inverse: var(--color-neutral-900);

/* Border */
--color-border-default: var(--color-neutral-300);
--color-border-subtle: var(--color-neutral-200);
--color-border-strong: var(--color-neutral-700);
--color-border-brand: var(--color-brand-primary);
--color-border-focus: var(--color-brand-primary);
```

### Typography

- **Font family:** `Ambra Sans Text, "Helvetica Neue", Helvetica, Arial, sans-serif`
- **Base rem:** `1rem = 16px`
- **Weights:** 300 (light), 400 (regular), 500 (medium), 700 (bold)

#### Type Scale

| Style | Desktop | Mobile | Line height | Weight | Letter spacing | Case |
|-------|---------|--------|-------------|--------|----------------|------|
| H1 | 64px / 4rem | 48px / 3rem | 52px / 42px | 500 | 0 | Sentence |
| H2 | 48px / 3rem | 32px / 2rem | 48px / 34px | 500 | 0 | Sentence |
| H3 | 32px / 2rem | 24px / 1.5rem | 34px / 28px | 500 | 0 | Sentence |
| H4 | 24px / 1.5rem | 18px / 1.125rem | 28px / 24px | 500 | 0 | Sentence |
| H5 | 16px / 1rem | 12px / 0.75rem | 22px / 20px | 400 | 1.6px / 1.2px | Uppercase |
| H6 | 14px / 0.875rem | 12px / 0.75rem | 20px / 16px | 400 | 0 | Sentence |
| Body | 16px / 1rem | 14px / 0.875rem | 24px / 20px | 400 | 0 | Sentence |
| Caption | 12px / 0.75rem | — | — | 400 | 0 | Sentence |

### Spacing & Layout

#### Spacing Scale

| Token | Value |
|-------|-------|
| `--space-1` | 4px / 0.25rem |
| `--space-2` | 8px / 0.5rem |
| `--space-3` | 12px / 0.75rem |
| `--space-4` | 16px / 1rem |
| `--space-5` | 20px / 1.25rem |
| `--space-6` | 24px / 1.5rem |
| `--space-8` | 32px / 2rem |
| `--space-10` | 40px / 2.5rem |
| `--space-12` | 48px / 3rem |
| `--space-16` | 64px / 4rem |

#### Layout

| Token | Value |
|-------|-------|
| `--container-max-width` | 1104px |
| `--breakpoint-tablet` | 992px |
| `--breakpoint-desktop` | 1200px |

### Surface & Depth

#### Border Radius

| Token | Value |
|-------|-------|
| `--radius-none` | 0 |
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 10px |
| `--radius-xl` | 20px |
| `--radius-pill` | 30px |
| `--radius-full` | 100px |

#### Shadows

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0px 2px 4px rgba(0,0,0,0.1)` |
| `--shadow-md` | `0px 2px 10px rgba(0,0,0,0.25)` |
| `--shadow-lg` | `2px 2px 10px rgba(0,0,0,0.25)` |
| `--shadow-inner-left` | `-25px 0px 20px -20px #ddd` |

#### Border Widths

| Token | Value |
|-------|-------|
| `--border-width-sm` | 1px |
| `--border-width-md` | 2px |
| `--border-width-lg` | 0.125em (2px at 16px base) |

---

## 2. COMPONENT SPECIFICATIONS

### Button

Buttons trigger actions or navigate users. The Freedom system uses a rounded pill shape with the brand orange as the primary fill.

#### Anatomy

- Pill-shaped container (`border-radius: 30px`)
- Text label, optional leading icon
- Minimum touch target: 44px

#### Variants

| Variant | Background | Text | Border | Radius |
|---------|------------|------|--------|--------|
| Primary | `#DB5C05` | `#FFFFFF` | none | 30px |
| Secondary / Outline | `#FFFFFF` or transparent | `#DB5C05` | `1px solid #DB5C05` | 30px |
| Ghost | transparent | `#DB5C05` | none | — |
| Inverse Outline | transparent | `#FFFFFF` | `0.125em solid #FFFFFF` | 30px |
| Text Link | #2F7DC1 | bottom arrow affordance | — |

#### Sizes

| Size | Padding | Font size | Font weight |
|------|---------|-----------|-------------|
| Small | `0.5rem 1rem` | 0.875rem | 500 |
| Medium | `1.025em 0.5em` / `1.25em 1.5em` | 1rem | 500 |
| Large | `1.25em 1.5em` | 1.125rem | 500 |

#### States

- **Default:** as above
- **Hover:** background shifts to `#C35500` (primary); link arrow translates right
- **Focus:** `outline: 2px solid #DB5C05; outline-offset: 2px`
- **Active:** scale 0.98 or background darkens
- **Disabled:** `opacity: 0.5`, `cursor: not-allowed`

#### Token Mapping

- Background primary: `--color-brand-primary`
- Background primary hover: `--color-brand-primary-dark`
- Text on primary: `--color-neutral-0`
- Outline border: `--color-brand-primary`
- Radius: `--radius-pill`

---

### Input Field

Input fields capture user text. The Freedom site uses an underline-style input with no visible background.

#### Anatomy

- Text input or select
- Underline-style bottom border (`1px solid #CECECE`)
- No visible background (transparent)
- Optional label above

#### Variants

| Variant | Border | Background | Notes |
|---------|--------|------------|-------|
| Default | `1px solid #CECECE` bottom | transparent | Standard text input |
| Filled | `#F5F5F5` | `#F5F5F5` | Search/select panels |
| Disabled | `#DEDEDE` | transparent | `opacity: 0.5` |

#### States

- **Default:** underline `#CECECE`
- **Hover:** border darkens to `#8F8F8F`
- **Focus:** border shifts to `#DB5C05`, subtle outline
- **Error:** border `#EF4444`
- **Disabled:** `opacity: 0.5`

#### Token Mapping

- Border default: `--color-neutral-300`
- Border hover: `--color-neutral-500`
- Border focus: `--color-brand-primary`
- Border error: `--color-status-danger`
- Background filled: `--color-neutral-100`
- Text: `--color-neutral-900`
- Placeholder: `--color-neutral-500`

---

### Card

Cards group related content and actions. They can be flat, bordered, elevated, or filled.

#### Anatomy

- Rounded rectangle (`border-radius: 20px` or `10px`)
- Optional shadow
- Image / icon area, heading, body text, CTA

#### Variants

| Variant | Background | Border | Shadow |
|---------|------------|--------|--------|
| Default | `#FFFFFF` | none | none |
| Elevated | `#FFFFFF` | none | `--shadow-md` |
| Bordered | `#FFFFFF` | `1px solid #CECECE` | none |
| Filled | `#F5F5F5` | none | none |

#### Token Mapping

- Background: `--color-neutral-0`
- Filled background: `--color-neutral-100`
- Border: `--color-neutral-300`
- Shadow: `--shadow-md`
- Radius large: `--radius-xl`
- Radius medium: `--radius-lg`

---

### Badge

Badges display short labels, statuses, or tags. They are intentionally compact and non-interactive so they do not resemble buttons.

#### Anatomy

- Small rectangular container (`border-radius: 4px`)
- Short label text in uppercase with wide letter spacing
- No shadow, hover, or cursor affordances

#### Variants

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| Default | `#F5F5F5` | `#4E4E4E` | none |
| Outline | transparent | `#DB5C05` | `1px solid #DB5C05` |
| Outline Inverse | transparent | `#FFFFFF` | `1px solid #FFFFFF` |
| Filled | `#DB5C05` | `#FFFFFF` | none |

#### Token Mapping

- Background: `--color-neutral-100`
- Background filled: `--color-brand-primary`
- Text filled: `--color-neutral-0`
- Text default: `--color-text-secondary`
- Radius: `--radius-sm`
- Font size: `--font-size-xs`
- Letter spacing: `--letter-spacing-wide`
- Padding: `4px` on all sides

#### Usage Notes

- Badges should always hug their text and not stretch to fill a parent container.
- Place badges inside a flex or grid container with `align-items: flex-start` (or similar) so they retain their intrinsic width.
- Avoid placing badges inside a column `Stack` or flex container with default `align-items: stretch` without an alignment override.

---

### Navigation Bar

The top navigation is sticky, spans the full viewport, and contains the logo, primary nav links, and utility actions.

#### Anatomy

- Sticky top bar, full width
- Logo left, nav links center/right, utility actions right
- Mobile: hamburger menu + logo + actions

#### Visual Style

- Background: `#FFFFFF`
- Text / icons: `#4E4E4E`
- Shadow: `--shadow-md` (`0px 2px 10px rgba(0,0,0,0.25)`)
- Height: `2.5rem` mobile, `5rem` desktop
- Container max-width: `1104px`

#### Token Mapping

- Background: `--color-neutral-0`
- Text: `--color-neutral-700`
- Hover text: `--color-brand-primary`
- Shadow: `--shadow-md`

---

### Modal

Modals overlay the page to focus attention on a confirmation, form, or additional information.

#### Anatomy

- Centered panel over an overlay
- Close button top-right
- Header, body, footer actions

#### Visual Style

- Overlay: `rgba(0,0,0,0.25)`
- Panel background: `#FFFFFF` or `#F5F5F5`
- Shadow: `--shadow-lg`
- Border radius: `--radius-lg` or `--radius-xl`

#### Token Mapping

- Overlay: `rgba(0,0,0,0.25)`
- Panel background: `--color-neutral-0`
- Shadow: `--shadow-lg`
- Radius: `--radius-xl`

---

## 3. IMPLEMENTATION OUTPUT

### CSS Variables

See `src/tokens/tokens.css` for the unified `:root` variable file. Core color tokens:

```css
:root {
  /* Brand */
  --color-brand-primary: #DB5C05;
  --color-brand-primary-dark: #C35500;
  --color-brand-secondary: #012F4C;
  --color-brand-accent: #156BA3;

  /* Neutral */
  --color-neutral-0: #FFFFFF;
  --color-neutral-100: #F5F5F5;
  --color-neutral-200: #E0E0E0;
  --color-neutral-300: #CECECE;
  --color-neutral-400: #DEDEDE;
  --color-neutral-500: #8F8F8F;
  --color-neutral-700: #4E4E4E;
  --color-neutral-900: #000000;

  /* Status */
  --color-status-success: #22C55E;
  --color-status-warning: #F59E0B;
  --color-status-danger: #EF4444;
  --color-status-info: #156BA3;

  /* Semantic color tokens */
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-700);
  --color-text-muted: var(--color-neutral-500);
  --color-text-inverse: var(--color-neutral-0);
  --color-text-brand: var(--color-brand-primary);
  --color-text-link: var(--color-brand-primary);
  --color-text-link-hover: var(--color-brand-primary-dark);

  --color-background-primary: var(--color-neutral-0);
  --color-background-secondary: var(--color-neutral-100);
  --color-background-brand: var(--color-brand-primary);
  --color-background-brand-hover: var(--color-brand-primary-dark);

  --color-border-default: var(--color-neutral-300);
  --color-border-subtle: var(--color-neutral-200);
  --color-border-strong: var(--color-neutral-700);
  --color-border-brand: var(--color-brand-primary);
  --color-border-focus: var(--color-brand-primary);
}
```

### Tailwind Config

See `tailwind.config.js` for a Tailwind v3 configuration mapping these tokens to the theme.

### Figma

See Figma file: https://www.figma.com/design/avYpU9u2Kku7R0hOzNAeWZ

---

## 4. USAGE NOTES

- Always prefer design tokens over hard-coded values.
- Headings use **Medium (500)** for H1–H4; H5–H6 and body use **Regular (400)**.
- Primary CTAs are pill-shaped (`radius-pill`) with orange fill.
- Most secondary actions are text links or ghost buttons in `--color-brand-primary`.
- Cards and modals use `--radius-xl` (20px); badges and chips use `--radius-full` (100px).
