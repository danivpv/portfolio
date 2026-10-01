<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio Agent & Architecture Rules

Before starting execution of any scope or writing any code in this repository:
1. **Mandatory Next.js Review**: Read the relevant guide in `node_modules/next/dist/docs/` for any Next.js API before implementing changes.
2. **Review Internal Architecture & React 19 Patterns**: Consult `docs/ARCHITECTURE.md` to ensure your implementation adheres strictly to our consolidated React 19 App Router primitives, server/client component boundaries, semantic color tokens, and single source of truth in `lib/data.ts`.
3. **Zero Duplication**: Do not re-introduce boilerplate memoization (`useMemo`/`useCallback`), manual form loading states, or hardcoded style values that violate the architecture guide.

