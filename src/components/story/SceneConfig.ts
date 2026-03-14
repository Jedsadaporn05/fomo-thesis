export type SceneId = "scene-1" | "scene-2" | "scene-3";

export interface Scene {
  id: SceneId;
  video: string;
  next?: SceneId;
  isInteractive?: boolean;
}

export const SceneConfig: Record<SceneId, Scene> = {
  "scene-1": {
    id: "scene-1",
    video: "/videos/scene-1.mp4",
    next: "scene-2",
  },
  "scene-2": {
    id: "scene-2",
    video: "/videos/scene-2.mp4",
    next: "scene-3",
  },
  "scene-3": {
    id: "scene-3",
    video: "/videos/scene-3.mp4",
  },
};
