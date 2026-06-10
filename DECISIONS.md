# Architectural Decisions

## shadcn/ui over MUI

MUI ships Material Design on top of your styles — overriding it to match Deepvue's violet/slate aesthetic requires fighting the library. shadcn/ui gives unstyled Radix primitives composed with Tailwind, so the visual layer is entirely ours.

## No global state (no Zustand/Redux)

Data is static mock JSON. Nothing needs to cross page boundaries. Local `useState` + `useMemo` + URL params covers every requirement without added complexity.

## URL state over local state for filters

The brief explicitly required direct-linkable filtered views and refresh persistence. `useSearchParams` from React Router serializes filter/search/sort into the URL with `replace: true` so history doesn't fill up on every keystroke.

## TanStack Virtual for both Workflows and Runs

150 workflows rendered at once is manageable, but the brief asked me to defend the performance choice. 1500 runs is not manageable without virtualization — layout thrash and frame budget violations are measurable. `useVirtualizer` with `measureElement` handles variable-height cards correctly without a fixed `estimateSize` assumption.

## Module-scope JSON import + simulated delay

JSON is imported once at module load and held in memory. Individual hooks do an async lookup into that store with a 300–800ms `setTimeout`. This gives realistic loading states without re-parsing on every navigation.

## `measureElement` on virtualizer rows

Fixed `estimateSize` causes row overlap when cards have variable heights (long titles, 2-line descriptions). `measureElement` reads actual `getBoundingClientRect().height` after each row renders and recalculates all subsequent `top` positions.
