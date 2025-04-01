# CLAUDE.md - Guidelines for Coedo-Ooedo 2025 Simulator

## Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm test` - Run all tests
- `pnpm test src/utils/__tests__/timeUtils.test.ts` - Run a specific test file
- `pnpm test -t "test name pattern"` - Run tests matching a specific pattern

## Code Style Guidelines
- **TypeScript**: Use strict mode with proper type annotations
- **Imports**: Group imports by: external libraries, then internal modules
- **Components**: React functional components with explicit return types
- **Error Handling**: Try/catch blocks with error logging and re-throwing
- **State Management**: Use Zustand for global state
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Comments**: JSDoc style for functions and complex logic
- **File Structure**: Group related functionality in dedicated folders
- **React Hooks**: Follow rules of hooks, use custom hooks for shared logic
- **Testing**: Use Vitest with describe/it pattern, mock data as needed