# Architectural Decisions

## Routing

React Router

Reason:
Explicitly required by the assignment and aligns with the production stack mentioned in the README.

---

## Component Library

shadcn/ui

Reason:
Provides accessible primitives while allowing complete visual control using Tailwind.

---

## State Management

Local React state + URL search params

Reason:
Application complexity does not justify a global store.

---

## Performance

Runs page will use virtualization.
Workflows page will initially render normally and be evaluated against dataset size before introducing virtualization.

Reason:
Optimize based on actual scale requirements rather than prematurely.

## Design Tokens

Visual styling is centralized through shared design tokens to maintain consistency across all routes.

## Layout Strategy

A shared AppShell owns navigation and page layout.

Reason:
All assignment routes belong to the same dashboard experience.
