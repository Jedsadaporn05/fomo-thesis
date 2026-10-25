# Gracie - The Missing Out (`fomo-2d-animation-website`)

## fomo-gracie Website

**Gracie - The Missing Out** is a high-performance, interactive 2D animation storytelling website created as a thesis project exploring the psychological impact of **FOMO (Fear Of Missing Out)**. Users experience the story through the main character, **Gracie**, making interactive decisions that directly influence the narrative progression and determine the story's ending.

---

## Tech Stack

- **Framework :** [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Library & Language :** [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/)
- **Styling & UI :** [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Animation :** [GSAP](https://gsap.com/) (`ScrollTrigger`), [Framer Motion](https://motion.dev/), [Lottie React](https://lottiereact.com/)
- **Smooth Scrolling :** [Lenis](https://lenis.darkroom.engineering/)
- **State Management :** [Zustand](https://zustand.docs.pmnd.rs/)
- **Audio Engine :** [Howler.js](https://howlerjs.com/)

---

## Requirements

Before setting up the project locally, make sure you have the following installed :

- **bun (Recommended) :** `v1.2.0` or higher - This repository uses Bun's text-based lockfile (`bun.lock`).
- **Node.js :** `v20.0.0` or higher (LTS recommended) - Required by Next.js 15 and React 19, and needed if you prefer using `npm`.
- **npm (Optional alternative) :** `v10.0.0` or higher (comes bundled with Node.js v20+).
- **Internet Connection:** Required during local development to stream remote video, audio, and image assets from the project CDN.

> **Note :** No `.env` file is required to run this project locally.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jedsadaporn05/fomo-thesis.git
cd fomo-thesis
```

### 2. Install dependencies

You can install dependencies using either **bun** or **npm** :

#### Option A : Using bun (Recommended)

Using Bun is recommended because the repository tracks `bun.lock`, guaranteeing deterministic dependency versions across environments.

```bash
bun install
```

#### Option B : Using npm

Since the project relies on standard Next.js scripts and Node-compatible packages, `npm` is also fully supported.

```bash
npm install
```

> **Note for npm users :** Running `npm install` will generate a local `package-lock.json` file. To avoid lockfile conflicts with `bun.lock`, please do **not** commit `package-lock.json` to the repository.

### 3. Run the development server

Start the local development server (powered by **Turbopack**) :

```bash
# Using bun (Recommended)
bun dev

# Or using npm
npm run dev
```

### 4. Open in browser

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The page will automatically reload as you edit source files.

---

## Available Scripts

All scripts defined in `package.json` can be executed with either `bun` or `npm` :

| Script      | Bun Command     | npm Command     | Description                                                                          |
| :---------- | :-------------- | :-------------- | :----------------------------------------------------------------------------------- |
| **`dev`**   | `bun dev`       | `npm run dev`   | Starts the Next.js development server with **Turbopack** at `http://localhost:3000`. |
| **`build`** | `bun run build` | `npm run build` | Builds the application for production using **Turbopack**.                           |
| **`start`** | `bun run start` | `npm run start` | Starts the Next.js production server (requires running `build` first).               |
| **`lint`**  | `bun lint`      | `npm run lint`  | Runs ESLint to check for code quality and formatting issues.                         |

---

## Project Structure

```text
fomo-thesis/
├── lib/                        # Core utilities and helper modules
│   ├── audio/                  # Audio helper logic & unlocking utilities
│   └── utils.ts                # Tailwind class merging utility (cn)
├── public/                     # Static assets served from root
│   ├── home/                   # Landing page static assets
│   └── logo/                   # Brand and project logos
├── src/
│   ├── animations/             # Reusable animation configurations
│   ├── app/                    # Next.js App Router pages & metadata routes
│   │   ├── story/
│   │   │   └── page.tsx        # Interactive story route (/story)
│   │   ├── globals.css         # Global styles & Tailwind CSS v4 imports
│   │   ├── layout.tsx          # Root layout (Fonts, SmoothScrolling, CustomCursor)
│   │   ├── not-found.tsx       # Custom 404 Not Found page
│   │   ├── page.tsx            # Landing page route (/)
│   │   ├── robots.ts           # Dynamic robots.txt configuration
│   │   └── sitemap.ts          # Dynamic sitemap.xml configuration
│   ├── components/             # Modular React components
│   │   ├── home/               # Landing page sections (Hero, Knowledge, Member)
│   │   ├── layout/             # Navigation, header, and layout wrappers
│   │   ├── story/              # Story scenes, SceneManager, & interactive elements
│   │   └── ui/                 # Reusable UI primitives (Radix UI + Tailwind)
│   ├── hooks/                  # Custom React hooks (breakpoints, media queries)
│   ├── store/                  # Global state management (Zustand)
│   │   ├── useAudioStore.ts    # BGM/SFX playback, volume, & mute state
│   │   └── useStoryStore.ts    # Story scene transitions, choices, & scoring
│   └── types/                  # Shared TypeScript type definitions
├── bun.lock                    # Primary dependency lockfile (Bun v1.2+)
├── next.config.ts              # Next.js configuration (CDN domains, compiler options)
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

---

## Routes

| Route              | Source File              | Main Component | Description                                                                                                                            |
| :----------------- | :----------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **`/`**            | `src/app/page.tsx`       | `HomeWrapper`  | **Landing Page :** Introduces the concept of FOMO, project background, knowledge cards, and the creator team.                          |
| **`/story`**       | `src/app/story/page.tsx` | `SceneManager` | **Interactive Story :** The 2D animated interactive narrative where users guide _Gracie_ through choices that impact the final ending. |
| **`/robots.txt`**  | `src/app/robots.ts`      | -              | Generated SEO crawler rules.                                                                                                           |
| **`/sitemap.xml`** | `src/app/sitemap.ts`     | -              | Generated XML sitemap for search engines.                                                                                              |

---

## Building & Deployment

### Testing a Production Build Locally

To verify the production build on your machine before deploying, build the application first and then start the production server :

**Using bun :**

```bash
bun run build
bun run start
```

**Using npm :**

```bash
npm run build
npm run start
```

Once started, the production server will be available at [http://localhost:3000](http://localhost:3000).

### Production Configuration Highlights

- **Remote Media CDN :** `next.config.ts` whitelists the configured CDN domain under `images.remotePatterns` so `next/image` can optimize CDN images.
- **Hero Video Preload :** The root layout (`src/app/layout.tsx`) adds `<link rel="preload">` hints for the desktop and mobile hero videos.
- **Console Stripping :** In production builds (`NODE_ENV === "production"`), `console.log` statements are automatically removed via Next.js compiler options while retaining `console.error` and `console.warn`.

---

## Key Architecture & Development Notes

- **Audio Management (`useAudioStore`) :** Modern browsers block autoplay audio until the user interacts with the page. Audio unlocking is handled via `SoundConsentModal` before BGM and SFX are played through Howler.js.
- **Story Progression (`useStoryStore`) :** All scene transitions, branching choices, FOMO scores, and history tracking inside `/story` are managed centrally via Zustand.
- **Animations & Smooth Scrolling :**
  - **Lenis** provides smooth scrolling across the landing page.
  - **GSAP (`ScrollTrigger`)** drives complex scroll-linked animations (remember to call `ScrollTrigger.refresh()` after dynamic layout shifts).
  - **Framer Motion** handles scene transitions, modal animations, and interactive story choices.
