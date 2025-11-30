import { create } from "zustand";

export type SceneId =
  | "intro"
  | "scene-1"
  | "capture"
  | "evaluation"
  | "good-ending"
  | "bad-ending"
  | "to-be-continue";

type StoryState = {
  currentSceneId: SceneId;
  score: number;
  history: SceneId[];

  goToScene: (id: SceneId) => void;
  addScore: (amount: number) => void;
  resetStory: () => void;
};

export const useStoryStore = create<StoryState>((set) => ({
  currentSceneId: "intro",
  score: 0,
  history: [],

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
      currentSceneId: "intro",
      score: 0,
      history: [],
    }),
}));
