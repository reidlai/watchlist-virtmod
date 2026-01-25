# Quickstart: Watchlist Home Page

## Prerequisites
- Node.js v20+
- Go 1.22+ (for backend services)
- `pnpm` enabled

## Usage
1. **Start the backend (mock or real)**:
   ```bash
   moon run watchlist-go:serve
   ```

2. **Start the frontend**:
   ```bash
   moon run sveltekit-appshell:dev
   ```

3. **Visit the page**:
   Open http://localhost:5173/

## Development
- **Run Unit Tests**: `moon run sveltekit-appshell:test`
- **Run Storybook**: `moon run sveltekit-appshell:storybook`
- **Check Linting**: `moon run sveltekit-appshell:lint`
