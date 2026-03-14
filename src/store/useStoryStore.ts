import { create } from "zustand";
import { SceneId } from "../components/story/SceneConfig";

type StoryState = {
  currentSceneId: SceneId;
  isStoryStarted: boolean;
  isPaused: boolean;
  score: number;
  history: SceneId[];

  setStoryStarted: (started: boolean) => void;
  setPaused: (paused: boolean) => void;
  goToScene: (id: SceneId) => void;
  addScore: (amount: number) => void;
  resetStory: () => void;
};

export const useStoryStore = create<StoryState>((set) => ({
  currentSceneId: "scene-1",
  isStoryStarted: false,
  isPaused: false,
  score: 0,
  history: [],

  setStoryStarted: (started) => set({ isStoryStarted: started }),

  setPaused: (paused) => set({ isPaused: paused }),

  goToScene: (id) =>
    set((state) => ({
      currentSceneId: id,
      history: [...state.history, id],
    })),

  addScore: (amount) =>
    set((state) => ({
      score: state.score + amount,
    })),

  resetStory: () =>
    set({
      currentSceneId: "scene-1",
      isStoryStarted: false,
      isPaused: false,
      score: 0,
      history: [],
    }),
}));
