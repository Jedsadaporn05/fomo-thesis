export type SceneId = "scene-1" | "scene-2" | "scene-3" | "scene-4";

export type InteractionType = "click" | "drag-drop" | "choice";

export interface Interaction {
  type: InteractionType;
  atTime: number;
  pause?: boolean;
  position?: { x: number; y: number }; // click position
  targetScene?: SceneId; // force change to target scene
  score?: number;
  // options for type choice
  options?: {
    label: string;
    targetScene: SceneId;
    score?: number;
  }[];
}

export interface Scene {
  id: SceneId;
  video: string;
  next?: SceneId;
  loop?: boolean;
  autoNext?: boolean;
  interactions?: Interaction[];
}

export const SceneConfig: Record<SceneId, Scene> = {
  "scene-1": {
    id: "scene-1",
    video: "/videos/scene-1.mp4",
    next: "scene-2",
    interactions: [
      {
        type: "click",
        atTime: 17,
        pause: true,
        targetScene: "scene-2",
        position: { x: 41.28, y: 71.75 },
      },
    ],
  },
  "scene-2": {
    id: "scene-2",
    video: "/videos/scene-2.mp4",
    next: "scene-3",
    autoNext: true,
  },
  "scene-3": {
    id: "scene-3",
    video: "/videos/scene-3.mp4",
    next: "scene-4",
    loop: true,
    interactions: [
      {
        type: "choice",
        atTime: 1,
        pause: false,
        options: [
          { label: "ลองทักไปดูหน่อย", targetScene: "scene-4", score: 0 },
          { label: "รอดูก่อนดีกว่า", targetScene: "scene-4", score: 10 },
        ],
      },
    ],
  },
  "scene-4": {
    id: "scene-4",
    video: "/videos/scene-1.mp4",
    next: "scene-1",
  },
};
