# Khmer Number Checker (KNChecker)

  
  Small React + TypeScript utility
  to check Cambodian phone-number
  prefixes and display a guessed
  operator.

  
  Key features
  
  - Detect operator by prefix using
  the data in [src/data/operators
  ts](src/data/operators.ts)
  
  - Accepts full local numbers and
  3-digit prefix-only input (e.g.
  `099` or `012`)
  
  - Displays local and
  international formatting
  
  - Tailwind CSS for styling

  
  Quick start

  
  1. Install dependencies

  
  ```bash
  npm install
  ```

  
  2. Start the dev server

  
  ```bash
  npm run dev
  ```

  
  Build & preview

  
  ```bash
  npm run build
  npm run preview
  ```

  
  Notes
  
  - The app uses `src/services
  phoneChecker.ts` for
  normalization, detection and
  formatting. Prefix data is kept
  in [src/data/operators.ts](src
  data/operators.ts).
  
  - Because of mobile number
  portability, prefix detection is
  not a guaranteed current-operator
  lookup — it only reflects the
  prefix's original allocation.

  
  Files of interest
  
  - [src/App.tsx](src/App.tsx) —
  main UI
  
  - [src/services/phoneChecker.ts
  (src/services/phoneChecker.ts) —
  logic for normalize/detect/format
  
  - [src/data/operators.ts](src
  data/operators.ts) — operator
  prefix dataset
  
  - [src/index.css](src/index.css)
  — Tailwind entry and small custom
  layers

  
  Tailwind troubleshooting
  
  - If you see PostCSS plugin
  errors, install `@tailwindcss
  postcss` (the project already
  depends on it) and restart the
  dev server:

  
  ```bash
  npm install -D @tailwindcss
  postcss
  ```
  ```bash
  npm run dev
  ```

  
  License
  
  - MIT


# NOT COMPLETED YET