import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SceneId } from "../components/story/SceneConfig";
import { clearVideoPreloadCache } from "../hooks/useVideoPreloader";

type StoryState = {
  currentSceneId: SceneId;
  isStoryStarted: boolean;
  isPaused: boolean;
  isInteractionPaused: boolean;
  score: number;
  history: SceneId[];
  completedInteractions: number[];

  _hasHydrated: boolean;

  setStoryStarted: (started: boolean) => void;
  setPaused: (paused: boolean) => void;
  setInteractionPaused: (paused: boolean) => void;
  goToScene: (id: SceneId) => void;
  addScore: (amount: number) => void;
  completeInteraction: (index: number) => void;
  resetStory: () => void;

  setHasHydrated: (state: boolean) => void;
};

export const useStoryStore = create<StoryState>()(
  persist(
    (set) => ({
      currentSceneId: "scene-1",
      isStoryStarted: false,
      isPaused: false,
      isInteractionPaused: false,
      score: 0,
      history: [],
      completedInteractions: [],

      _hasHydrated: false,

      setStoryStarted: (started) => set({ isStoryStarted: started }),

      setPaused: (paused) => set({ isPaused: paused }),

      setInteractionPaused: (paused) => set({ isInteractionPaused: paused }),

      goToScene: (id) =>
        set((state) => ({
          currentSceneId: id,
          history: [...state.history, id],
          completedInteractions: [],
        })),

      addScore: (amount) =>
        set((state) => ({
          score: state.score + amount,
        })),

      completeInteraction: (index) =>
        set((state) => ({
          completedInteractions: [...state.completedInteractions, index],
        })),

      resetStory: () => {
        clearVideoPreloadCache();
        set({
          currentSceneId: "scene-1",
          isStoryStarted: false,
          isPaused: false,
          score: 0,
          history: [],
          completedInteractions: [],
        });
      },

      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "scene-history",
      storage: createJSONStorage(() => sessionStorage),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
