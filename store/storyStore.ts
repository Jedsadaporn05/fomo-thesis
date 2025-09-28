import { create } from "zustand";
import storyData from "@/data/story.json";

export type Choice = { text: string; nextSceneId: string };
export type Scene = {
  id: string;
  content: string;
  choices: Choice[];
  endingType?: "happy" | "bad";
  interactionType?: string;
};

export type StoryState = {
  currentSceneId: string;
  history: string[];
  interactionCompleted: boolean;
  endingType?: "happy" | "bad";
  setScene: (id: string) => void;
  setInteractionCompleted: (done: boolean) => void;
  restart: () => void;
  loadProgress: () => void;
};

export const useStoryStore = create<StoryState>((set, get) => ({
  currentSceneId: "start",
  history: [],
  interactionCompleted: false,
  endingType: undefined,

  setScene: (id: string) => {
    const scene = (storyData as Scene[]).find((s) => s.id === id);
    if (!scene) return;
    set((state) => ({
      currentSceneId: id,
      history: [...state.history, id],
      interactionCompleted: false,
      endingType: scene.endingType,
    }));
    try {
      localStorage.setItem("story-progress", id);
    } catch (e) {}
  },

  setInteractionCompleted: (done: boolean) =>
    set({ interactionCompleted: done }),

  restart: () => {
    set({
      currentSceneId: "start",
      history: [],
      interactionCompleted: false,
      endingType: undefined,
    });
    try {
      localStorage.removeItem("story-progress");
    } catch (e) {}
  },

  loadProgress: () => {
    try {
      const saved = localStorage.getItem("story-progress");
      if (saved) {
        const scene = (storyData as Scene[]).find((s) => s.id === saved);
        if (scene)
          set({
            currentSceneId: saved,
            history: [saved],
            interactionCompleted: false,
            endingType: scene.endingType,
          });
      }
    } catch (e) {}
  },
}));
