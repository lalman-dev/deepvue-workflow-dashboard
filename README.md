# Workflow Dashboard

A React + TypeScript dashboard implementing a simplified version of Workflows Library and Runs experience.

Built as part of the Frontend Intern take-home assignment.

## Quick Start

```bash
npm install && npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Tech Stack

- React 19
- TypeScript
- React Router
- Tailwind CSS v4
- shadcn/ui
- TanStack Virtual
- date-fns

---

## Why I Chose shadcn/ui Instead of MUI

I chose shadcn/ui because the assignment emphasized matching the existing Deepvue dashboard aesthetic.

shadcn/ui provides lightweight, composable primitives that integrate naturally with Tailwind CSS and allow full control over the visual design layer. This made it easier to recreate the dashboard styling shown in the reference screenshots.

MUI would have provided more built-in components but also introduces a stronger default design system, which would require additional customization to match the target aesthetic.

---

## Architecture

### Routing

The application uses React Router with three routes:

- `/workflows`
- `/runs`
- `/runs/:id`

### Data Layer

Mock JSON files are treated as API responses.

Custom hooks provide access to the data:

- `useWorkflows`
- `useRuns`
- `useRun`

A simulated network delay is applied to reproduce realistic loading states.

### State Management

No external state management library was used.

State is handled through:

- Local React state
- URL query parameters
- Derived state using `useMemo`

This keeps complexity low while remaining appropriate for the size of the application.

---

## URL State

The Workflows page persists:

- Search
- Status filter
- Sort order

through URL query parameters.

Examples:

```text
/workflows?search=kyc
/workflows?status=published
/workflows?sort=name
```

This allows:

- Browser refresh persistence
- Deep linking
- Shareable filtered views

---

## Performance Decisions

### Workflows

The workflow grid uses virtualization with TanStack Virtual to ensure rendering remains efficient as dataset size grows.

### Runs

The runs page was designed with larger datasets in mind and tested against the provided mock data. The implementation structure supports applying the same virtualization strategy used elsewhere if the dataset grows significantly.

---

## Hover & Active States

- **Workflow + Run cards** — `hover:border-violet-300 hover:shadow-md` on hover. Elevates the card subtly without layout shift, signals clickability without needing a cursor change alone.
- **Status filter pills** — inactive pills use `hover:border-slate-300 hover:bg-slate-50`. Active pill gets the primary navy fill. Keeps the interaction cost low for frequent filter switching.
- **Run modal** — Escape closes via Radix Dialog's built-in keyboard handling. Enter submits the form from the subject ID input.
- **Bulk action bar** — slides in from the bottom on first selection. Stays sticky so it's always reachable without scrolling back up.

--

## Status Badge Palette

### Positive States

- Published
- Completed
- Succeeded

Color: Emerald

### Neutral States

- Draft
- Not Started

Color: Slate

### Archived

Color: Stone

### Running

Color: Violet

### Waiting / Pending

Color: Amber

### Failed

Color: Rose

---

## Edge Cases Handled

### Long Workflow Names

Workflow names are truncated in cards to preserve layout integrity.

### Future Last Modified Dates

Future dates are surfaced rather than hidden, allowing potential data-quality issues to remain visible.

### Workflow With 0 Nodes

The node count is displayed as-is.

### Missing Subject ID

Runs without a subject ID display an em dash (`—`) instead of empty content.

### Empty Run Steps

Waiting runs with no steps render an empty state.

### Warning Messages

Runs containing warnings render a dedicated warning banner.

---

## Features Implemented

### Workflows

- Search
- Debounced filtering
- Status filter pills with counts
- Sorting
- URL synchronization
- Responsive grid
- Workflow cards
- Multi-select
- Bulk actions
- Run workflow dialog
- Loading state
- Error state
- Empty state

### Runs

- Status filter pills with counts
- Progress visualization
- Relative timestamps
- Duration display
- Cancel actions
- Navigation to run detail page
- Loading state
- Error state
- Empty state

### Run Detail

- Warning banner
- Execution timeline
- Step status indicators
- JSON output rendering
- Error rendering
- Run metadata sidebar
- Collapsible trigger input
- Empty state
- Not-found state

---

## What I Would Improve If i have more time

- More comprehensive runs virtualization for very large datasets
- Keyboard navigation improvements
- Animated expand/collapse interactions
- Additional accessibility auditing
- More detailed execution analytics
- Reusable loading skeleton system
