```markdown
# Star Rating Block Web Component

A lightweight, customizable star rating web component.

## Development

```bash
nvm use
pnpm install
pnpm dev
```

## Build

```bash
# Build component library
pnpm build:lib

# Build demo site
pnpm build:demo

# Build both
pnpm build
```

## Usage

```javascript
import 'star-rating-block';
```

```html
<star-rating-block></star-rating-block>
```

## Demo

View the demo at: https://[your-username].github.io/star-rating-block/

Updates deploy automatically when pushing to main.

## Scripts

- `pnpm dev` - Development server
- `pnpm build:lib` - Build component
- `pnpm build:demo` - Build demo
- `pnpm build` - Build both
- `pnpm serve` - Preview build

Uses Vite, TypeScript, and SCSS. Component is built as an ES module with TypeScript definitions.
```