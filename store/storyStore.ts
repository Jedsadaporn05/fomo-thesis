import { create } from "zustand";
import storyData from "@/data/story.json";

export type Choice = {
  text: string;
  nextSceneId: string;
  scoreChange?: number;
};
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
  score: number;
  setScene: (id: string, choice?: Choice) => void;
  setInteractionCompleted: (done: boolean) => void;
  restart: () => void;
  loadProgress: () => void;
};

export const useStoryStore = create<StoryState>((set, get) => ({
  currentSceneId: "start",
  history: [],
  interactionCompleted: false,
  endingType: undefined,
  score: 0,

  setScene: (id: string, choice?: Choice) => {
    // Checkpoint Decision of Ending
    if (id === "decideEnding") {
      const score = get().score;
      if (score >= 1) {
        id = "goodRoute";
      } else {
        id = "badRoute";
      }
      console.log("Score at decision :", score);
    }
    console.log("Prev Scene:", get().currentSceneId);
    console.log("Choice Picked:", choice);

    const scene = (storyData as Scene[]).find((s) => s.id === id);
    if (!scene) return;

    set((state) => ({
      currentSceneId: id,
      history: [...state.history, id],
      interactionCompleted: false,
      endingType: scene.endingType,
      score: state.score + (choice?.scoreChange ?? 0), // Update Score
    }));
    try {
      localStorage.setItem("story-progress", id);
      localStorage.setItem("story-score", String(get().score));
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
      score: 0, // Reset Score
    });
    try {
      localStorage.removeItem("story-progress");
      localStorage.removeItem("story-score");
    } catch (e) {}
  },

  loadProgress: () => {
    try {
      const saved = localStorage.getItem("story-progress");
      const savedScore = localStorage.getItem("story-score");
      if (saved) {
        const scene = (storyData as Scene[]).find((s) => s.id === saved);
        if (scene)
          set({
            currentSceneId: saved,
            history: [saved],
            interactionCompleted: false,
            endingType: scene.endingType,
            score: savedScore ? parseInt(savedScore, 10) : 0, // Restore Score
          });
      }
    } catch (e) {}
  },
}));
