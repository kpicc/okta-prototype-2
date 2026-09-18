---
name: design-system
description: |
  Context for the CascadeProjects design system. Invoke this skill when asked to build UI,
  add components, modify tokens, sync Figma, or consume the design system from another project.
---

# Design System

A minimal, reusable React + TypeScript design system with matching Figma library.

## Location

- Repository: `/Users/kpiccolo/CascadeProjects/design-system`
- Package name: `design-system`
- Figma file: https://www.figma.com/design/avYpU9u2Kku7R0hOzNAeWZ

## Stack

- React 18 + TypeScript
- Vite (library mode for builds, dev server for docs)
- CSS custom properties for tokens
- Plain CSS files per component (not CSS Modules)

## Quick start

```bash
cd /Users/kpiccolo/CascadeProjects/design-system
npm install
npm run dev      # open docs app
npm run build    # build library + types
npm run typecheck
```

Node is installed locally at `/Users/kpiccolo/.local/node/bin` if it is not on the system PATH.

## Tokens

Tokens are defined in two places that must stay in sync:

1. **TypeScript** — `src/tokens/` (`colors.ts`, `spacing.ts`, `radius.ts`, `typography.ts`, `shadows.ts`)
2. **CSS** — `src/tokens/tokens.css` (CSS custom properties consumed by components)

Token scales:

- Colors: `gray`, `primary`, `success`, `warning`, `danger` (50–950)
- Spacing: 0, 1 (4px), 2 (8px), 3, 4, 5, 6, 8, 10, 12 (48px)
- Radius: none, small (4px), medium (8px), large (12px), xlarge (16px), full
- Typography: system sans + mono; sizes xs–4xl; weights normal/bold
- Shadows: small, medium, large

When adding a token, update **both** the TS and CSS files, and add the corresponding Figma variable.

## Components

Components live in `src/components/<Name>/`:

- `Name.tsx` — React component with TypeScript props
- `Name.css` — styles using CSS custom properties
- `index.ts` — public exports

Current components: `Button`, `Input`, `Card`, `Stack`.

### Conventions

- Class prefix: `ds-` (e.g., `.ds-button`)
- Variants are class modifiers: `.ds-button--solid`, `.ds-button--large`
- Sizes: `small`, `medium`, `large`
- Avoid arbitrary values; use tokens
- Export props interfaces from `index.ts`

## Figma parity

The Figma file contains:

- `Tokens` page: color/spacing/radius/typography variables
- `Components` page: example frames for Button, Input, Card, Stack
- Effect styles: `shadow/small`, `shadow/medium`, `shadow/large`
- Text styles: `text/h1`–`text/button`

When a component changes in code, update the matching Figma frame. When Figma changes, update code tokens/CSS.

## Extending the system

1. Add tokens to `src/tokens/` and `src/tokens/tokens.css`
2. Create component folder under `src/components/`
3. Export from `src/components/index.ts` and `src/index.ts`
4. Add an example to the docs app (`docs/App.tsx`)
5. Add/update the matching Figma frame
6. Run `npm run build` and `npm run typecheck`

## Consumers

To use the library from another project:

```ts
import { Button, Card, Stack, colors } from 'design-system';
import 'design-system/styles.css';
```

If consuming project is local, add a workspace/file dependency or build + install the tarball.
