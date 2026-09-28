# CoffeePulse ☕

A coffee shop storefront built with React and TypeScript. Browse the menu, add products to a cart, apply discounts, and check out through a validated form. Order history is available for logged-in users.

## Features

- **Product catalog** fetched from a REST API, with loading and error states and a retry button
- **Shopping cart** with quantity controls, per-item discounts, and persistence across refreshes
- **Checkout form** with schema validation, separate shipping and billing addresses, and inline error messages
- **Order history** saved locally and shown newest first
- **Authentication flow** (mocked) with protected routes that return you to the page you wanted
- **Responsive layout** with a mobile navigation menu and smooth-scroll sections

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 19, TypeScript, Vite |
| Routing | React Router 7, react-scroll |
| Server state | TanStack Query |
| Client state | Zustand (with persist middleware), Context + useReducer for auth |
| Forms | React Hook Form, Zod |
| Styling | Tailwind CSS 4, shadcn/ui |
| HTTP | Axios |

## Engineering notes

- **Custom hooks:** `useProducts` shares one cached request between pages, and `useAuth` guards the auth context.
- **Performance:** cart rows are memoized with `React.memo`, and routes are code-split with `React.lazy` and `Suspense`.
- **Resilience:** an error boundary keyed to the route catches render failures, and failed requests show a retry option.
- **Type safety:** form types are derived from the Zod schemas with `z.infer`, so validation rules and types cannot drift apart.

## Getting started

```bash
git clone https://github.com/MetiPasha/coffee-react.git
cd coffee-react
npm install
npm run dev
```

Other scripts:

```bash
npm run build       # production build
npm run preview     # preview the production build
npm run type-check  # TypeScript check without emitting files
npm run lint        # ESLint
```

## Demo login

Authentication is mocked for demonstration. Use any valid email with the password `coffee123`.

## Project structure

```
src/
  components/   pages and page sections (checkout/ and cart/ hold sub-components)
  context/      auth reducer, context, and provider
  hooks/        useAuth, useProducts
  layouts/      reusable UI pieces (Button, cards, spinner, error boundary)
  store/        Zustand cart store
  utils/        axios instance, order storage
  validations/  Zod schemas
```

## Limitations

- Products come from a mock API (mockapi.io).
- Orders are stored in `localStorage`, so they are per-browser and not shared across devices.
- Login is simulated. A production version would use server-issued tokens in httpOnly cookies.
- No real payment processing.

## Author

Mehdi Pashaei, frontend developer. [GitHub](https://github.com/MetiPasha)