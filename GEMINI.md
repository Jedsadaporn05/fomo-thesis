# GEMINI.md

## Project Overview
**fomo-2d-animation-website** is a high-performance, interactive storytelling web application focused on 2D animations. It serves as a digital experience for a thesis project centered around the concept of FOMO (Fear Of Missing Out).

### Core Technologies
- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Animation:** [GSAP](https://gsap.com/) (with ScrollTrigger), [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Audio:** [Howler.js](https://howlerjs.com/)
- **Scrolling:** [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- **UI Components:** [Radix UI](https://www.radix-ui.com/)

---

## Architecture

### Directory Structure
- `src/app`: Contains the application routes.
    - `/`: The landing page (`HomeWrapper`).
    - `/story`: The interactive story experience (`SceneManager`).
- `src/components`: Modular React components.
    - `home/`: Components specific to the landing page (Hero, Knowledge, Member sections).
    - `story/`: Components for the interactive story, organized by scenes.
    - `ui/`: Reusable primitive components (Button, Dialog, etc.) powered by Radix UI.
- `src/store`: Zustand stores for global state.
    - `useStoryStore.ts`: Manages scene transitions, scoring, and story history.
    - `useAudioStore.ts`: Handles BGM/SFX playback, volume, and user permissions.
- `src/hooks`: Custom React hooks (e.g., `useIsDesktop`, `useBreakpointValue`).
- `lib/`: Utility functions and core logic (e.g., audio unlocking, tailwind merging).
- `public/`: Static assets including images, sounds (`.mp3`), and videos.

---

## Building and Running

### Development
```bash
bun dev
# or
npm run dev
```
Starts the development server with **Turbopack** enabled.

### Production
```bash
bun build
bun start
# or
npm run build
npm start
```
Builds the application for production and starts the server.

### Linting
```bash
bun lint
# or
npm run lint
```
Runs ESLint to ensure code quality.

---

## Development Conventions

### Animation & Performance
- **GSAP:** Used for complex, scroll-triggered animations. Always ensure `ScrollTrigger.refresh()` is called after dynamic content loads or layout changes.
- **Framer Motion:** Preferred for simple entrance/exit animations, scene transitions, and interactive UI elements.
- **Lenis:** Integrated for smooth scrolling; ensure it doesn't conflict with GSAP's ScrollTrigger.

### State Management
- Use `useStoryStore` to manage the progression of the interactive experience.
- Use `useAudioStore` for all sound-related logic. Audio must be "unlocked" via user interaction before playback (handled by `SoundConsentModal`).

### Components & Styling
- Adhere to the atomic component structure in `src/components`.
- Use `cn()` utility from `lib/utils.ts` for dynamic Tailwind class merging.
- Prefer Radix UI primitives for accessible interactive components.

### Assets
- All sound files should be placed in `public/sounds/`.
- Images and videos are organized by section in `public/`.
