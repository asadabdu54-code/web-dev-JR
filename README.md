# Momentum

A personal productivity dashboard — habit tracker, pomodoro timer, and kanban board — built entirely in **vanilla HTML, CSS, and JavaScript**. No frameworks, no build-time UI libraries, no state management packages.

**[Live demo →](#)** *(add your deployed link here)*

---

## Why this exists

Frameworks like React solve real problems — but it's easy to use `useState` and `useEffect` for months without ever understanding *what problem they're actually solving*. This project exists to build that understanding directly: a working pub/sub state store, a client-side router, and three full features, all from scratch, using nothing but the DOM APIs the browser already gives you.

Everything here — reactive re-rendering, component-like views, controlled state mutation — is a hand-built version of a pattern that libraries like React, Redux, and Zustand later abstract away. Building it manually once made those tools make sense immediately, rather than feeling like magic.

---

## Architecture

### The store (`store.js`)

A minimal pub/sub state container, in about 25 lines:

- `state` is a private module-level variable — nothing outside this file can read or mutate it directly.
- `getState()` is the only way to read it.
- `setState(changes)` is the only way to change it. It shallow-merges the update into the existing state, persists the result to `localStorage`, and then notifies every subscriber.
- `subscribe(listener)` lets any part of the app register a callback to run on every state change, and returns a cleanup function to unregister it.

This is the same core mechanism underneath `useState`, Redux, and Zustand — hidden state, a controlled mutation path, and automatic notification of interested parties.

### The router (`router.js`)

A hash-based router (`#/habits`, `#/timer`, `#/board`) that dynamically imports and renders the matching view into a single `#app` container — no page reloads, no separate HTML files per view.

### The views (`views/*.js`)

Each view is a plain function: `render(container)`. On every call, it reads the current state, builds a fresh HTML string from it, and re-wires all event listeners. There's no diffing — every re-render tears down and rebuilds the entire view's DOM from scratch. This is the deliberately "expensive" approach that libraries like React optimize away with a virtual DOM and reconciliation; building it the naive way first made that optimization concrete rather than abstract.

### Wiring it together (`main.js`)

`main.js` subscribes once to the store, calling the router's `renderRoute()` on every state change — so the app doesn't hardcode "always re-render the habits view," it always re-renders whatever view is currently active, regardless of which piece of state changed or why.

---

## Features

**Habits**
- Add, toggle complete, and delete habits
- Filter by All / Remaining / Completed
- Clear completed habits in one action
- Persists across page reloads via `localStorage`

**Timer**
- Pomodoro-style countdown, built on `setInterval`
- Start / Pause / Reset, with a guard against double-starting a duplicate interval
- Manual Work / Break mode switching, each with its own duration

**Board**
- Kanban-style board with To Do / Doing / Done columns (CSS Grid layout)
- Add and delete cards per column
- **Drag-and-drop** cards between columns using the native HTML5 Drag and Drop API — no libraries
- Persists across page reloads

**Throughout**
- Fully responsive, mobile-first CSS
- No dependencies beyond Vite as a dev server

---

## What I'd do differently with a framework

Building this by hand made a few of React's design decisions click in a way tutorials hadn't:

- **Reconciliation isn't an optimization detail, it's the whole point.** Every state change here rebuilds the entire active view's DOM from scratch — cheap at this scale, but the cost is obvious even with a handful of habits or cards. A virtual DOM diffing algorithm exists specifically to avoid this.
- **Component-local state would remove a lot of manual wiring.** Every view currently re-queries the DOM and re-attaches every event listener on every single render. `useState` scoped to a component, plus a framework's own re-render scheduling, removes almost all of that boilerplate.
- **Derived state (like the filtered habit list, or per-column card lists) wants to be declarative.** Here it's recomputed imperatively at the top of every `render()` call. Something like a computed/derived value (or React's own re-render-on-every-change model) expresses the same idea more directly.
- **The store itself is a simplified, single-file version of Redux/Zustand.** Building it made the *purpose* of those libraries obvious: this store has no middleware, no devtools integration, no selectors, no way to scope subscriptions to just the slice of state a component cares about — all real problems that show up quickly once an app grows past three views.

---

## Tech

- Vanilla JavaScript (ES modules), no framework
- Vite — dev server and build tooling only
- HTML5 Drag and Drop API
- CSS Grid + Flex box, mobile-first
- `localStorage` for persistence

## Running locally

```bash
npm install
npm run dev
```