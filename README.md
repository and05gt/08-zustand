# 📝 NoteHub App

A multi-page note-taking web application built with **Next.js (App Router)** and
**TypeScript**. It offers a seamless experience to browse, search, create,
filter, delete, and view detailed notes with an optimized hybrid rendering
approach.

- **Live Demo:**
  [https://08-zustand-sand-gamma.vercel.app/](https://08-zustand-sand-gamma.vercel.app/)
- **Repository:**
  [https://github.com/and05gt/08-zustand](https://github.com/and05gt/08-zustand)

---

## ✨ Features

- **CRUD Operations:** Create, view, filter, and delete notes effortlessly.
- **Search & Filter:** Instant search query matching and tag-based filtering via dynamic catch-all routes.
- **Intercepted Modal Routes:** Seamlessly open note details in a modal overlay when navigating from lists, while retaining direct URL access for full-page views.
- **Draft Persistence:** Local persistence for unsubmitted note creation drafts powered by Zustand.
- **Pagination:** Smooth client-side navigation using `react-paginate`.
- **Hybrid Data Flow:** SSR data prefetching combined with React Query hydration for instant initial loads and responsive client cache invalidation.

---

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Data Fetching & State:** [TanStack Query](https://tanstack.com/query) (React
  Query)
- **HTTP Client:** [Axios](https://axios-http.com)
- **Store:** [Zustand](https://github.com/pmndrs/zustand)
- **UI & Pagination:**
  [React Paginate](https://www.npmjs.com/package/react-paginate)
- **Styling:** CSS Modules

---

## ⚡ Data Flow & Architecture

1. **SSR Prefetching:** The server prefetches note data using Next.js Server Components and TanStack Query dehydrate utilities during request time.
2. **Hydration:** Query data is hydrated directly into the client cache on initial load, eliminating layout shifts and initial loaders.
3. **Client Mutations & Cache Invalidation:** All CRUD actions trigger automatic cache invalidation and UI synchronization via React Query hooks.
4. **Draft Management:** Zustand manages the local state for unsubmitted note creation drafts to prevent data loss.

---

## 🗺 Routes

| Route                              | Description                                                                   |
| :--------------------------------- | :---------------------------------------------------------------------------- |
| `/`                                | Home page with general overview and quick links.                              |
| `/notes/filter/all`                | Paginated list of all notes with search support _(SSR prefetch + Hydration)_. |
| `/notes/filter/[...slug]`          | Filtered notes by tag using catch-all routing _(SSR prefetch + Hydration)_.   |
| `/notes/[id]` _(direct access)_    | Full-page standalone view of a single note _(SSR prefetch + Hydration)_.      |
| `/notes/[id]` _(from filter list)_ | Intercepted route rendered inside a modal overlay over the current view.      |
| `/notes/action/create`             | Note creation page with draft auto-saving via Zustand.                        |
| `[...not_found]`                   | Custom 404 page for non-existent routes.                                      |

---

## 📁 Project Structure

```text
├── app/
│   ├── @modal/          # Intercepted modal routes ((.)notes/[id])
│   ├── notes/
│   │   ├── action/      # Create note page (/notes/action/create)
│   │   ├── filter/      # All and tagged notes (/notes/filter/[...slug])
│   │   └── [id]/        # Standalone note details page
│   ├── layout.tsx       # Root layout with provider (TanstackProvider)
│   ├── not-found.tsx    # Custom 404 handler
│   └── page.tsx         # Home page
├── components/          # Reusable UI components & corresponding CSS modules
├── lib/
│   ├── store/           # Zustand store for note creation drafts
|   └── api.ts           # Axios instance and API functions
└── types/               # TypeScript interfaces and global type declarations
```

---

## 🚀 Getting Started

1. Clone the repository:

```bash
  git clone https://github.com/and05gt/08-zustand
  cd 08-zustand
```

2. Install dependencies:

```bash
  npm install
```

3. Environment variables: Create a `.env` file in the root directory and set
   your NoteHub API token:

```env
  NEXT_PUBLIC_NOTEHUB_TOKEN=your_token_here
```

4. Run the development server:

```bash
  npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view
   the app.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
