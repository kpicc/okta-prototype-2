# Design System

A minimal, reusable design system with React + TypeScript components, CSS custom-property tokens, and a matching Figma library.

## Quick start

```bash
npm install
npm run dev      # docs app
npm run build    # library + types
npm run typecheck
```

## What's included

- **Tokens**: colors, spacing, radius, typography, shadows
  - TypeScript objects in `src/tokens/`
  - CSS custom properties in `src/tokens/tokens.css`
- **Components**: `Button`, `Input`, `Card`, `Stack`
  - Plain CSS files, `ds-` prefixed class names
  - TypeScript props exported
- **Docs**: Vite app at `docs/App.tsx`
- **Figma**: https://www.figma.com/design/avYpU9u2Kku7R0hOzNAeWZ

## Usage

```tsx
import { Button, Card, Stack } from 'design-system';
import 'design-system/styles.css';

function App() {
  return (
    <Card variant="elevated">
      <Stack gap="4">
        <Button>Click me</Button>
        <Button variant="outline">Cancel</Button>
      </Stack>
    </Card>
  );
}
```

## Adding a component

1. Create `src/components/<Name>/<Name>.tsx` and `<Name>.css`.
2. Export from `src/components/<Name>/index.ts`.
3. Re-export from `src/components/index.ts`.
4. Add an example to `docs/App.tsx`.
5. Update the matching Figma frame.

## Tokens

Token values must be kept in sync between TypeScript and CSS. When adding or changing a token, update both `src/tokens/*.ts` and `src/tokens/tokens.css`.
