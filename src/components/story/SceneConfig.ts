export type SceneId =
  | "scene-1"
  | "scene-2"
  | "scene-3"
  | "scene-3-choice"
  | "scene-3-choice-1"
  | "scene-3-choice-2"
  | "scene-4"
  | "scene-4-choice"
  | "scene-4-choice-1"
  | "scene-4-choice-2"
  | "scene-5"
  | "scene-5-interactive"
  | "scene-6"
  | "scene-6-choice"
  | "good-scene-1"
  | "good-ending"
  | "bad-scene-1"
  | "bad-ending";

export type InteractionType = "click" | "drag-drop" | "choice" | "ending";

export interface Interaction {
  type: InteractionType;
  atTime: number;
  pause?: boolean;
  resumeVideo?: boolean; // set false if want to use > 1 interaction/scene
  position?: { x: number; y: number }; // click position
  targetScene?: SceneId; // force change to target scene
  score?: number;
  question?: string; // question and option{} use with type choice
  options?: {
    label: string;
    targetScene?: SceneId;
    action?: "restart" | "home";
    score?: number;
  }[];
}

export interface Scene {
  id: SceneId;
  video: string;
  next?: SceneId;
  scoreBranch?: {
    threshold: number;
    pass: SceneId;
    fail: SceneId;
  };
  loop?: boolean;
  autoNext?: boolean;
  interactions?: Interaction[];
}

export const SceneConfig: Record<SceneId, Scene> = {
  "scene-1": {
    id: "scene-1",
    video: "https://cdn.fomo-gracie.com/video/story/scene-1-v3.mp4",
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
    video: "https://cdn.fomo-gracie.com/video/story/scene-2-v3.mp4",
    next: "scene-3",
    autoNext: true,
  },
  "scene-3": {
    id: "scene-3",
    video: "https://cdn.fomo-gracie.com/video/story/scene-3-v2.mp4",
    next: "scene-3-choice",
    autoNext: true,
  },
  "scene-3-choice": {
    id: "scene-3-choice",
    video: "https://cdn.fomo-gracie.com/video/story/scene-3-choice.mp4",
    loop: true,
    interactions: [
      {
        type: "choice",
        atTime: 1,
        pause: false,
        question: "ในตอนนี้ฉันควรทำอย่างไร?",
        options: [
          {
            label: "อ่านคอมเม้นต์ต่อสิ",
            targetScene: "scene-3-choice-1",
          },
          {
            label: "ปิดโทรศัพท์ลงก่อน",
            targetScene: "scene-3-choice-2",
          },
        ],
      },
    ],
  },
  "scene-3-choice-1": {
    id: "scene-3-choice-1",
    video: "https://cdn.fomo-gracie.com/video/story/scene-3-choice-1-v2.mp4",
    next: "scene-4",
    autoNext: true,
  },
  "scene-3-choice-2": {
    id: "scene-3-choice-2",
    video: "https://cdn.fomo-gracie.com/video/story/scene-3-choice-2-v2.mp4",
    next: "scene-4",
    autoNext: true,
  },
  "scene-4": {
    id: "scene-4",
    video: "https://cdn.fomo-gracie.com/video/story/scene-4-v3.mp4",
    next: "scene-4-choice",
    autoNext: true,
  },
  "scene-4-choice": {
    id: "scene-4-choice",
    video: "https://cdn.fomo-gracie.com/video/story/scene-4-choice-v2.mp4",
    loop: true,
    interactions: [
      {
        type: "choice",
        atTime: 1,
        pause: false,
        question: "ฉันควรซื้อดีไหม?",
        options: [
          {
            label: "ซื้อตอนนี้เลย",
            targetScene: "scene-4-choice-1",
          },
          {
            label: "อาจจะยัง",
            targetScene: "scene-4-choice-2",
          },
        ],
      },
    ],
  },
  "scene-4-choice-1": {
    id: "scene-4-choice-1",
    video: "https://cdn.fomo-gracie.com/video/story/scene-4-choice-1-v3.mp4",
    next: "scene-5-interactive",
    autoNext: true,
  },
  "scene-4-choice-2": {
    id: "scene-4-choice-2",
    video: "https://cdn.fomo-gracie.com/video/story/scene-4-choice-2-v3.mp4",
    next: "scene-5-interactive",
    autoNext: true,
  },
  "scene-5-interactive": {
    id: "scene-5-interactive",
    video: "https://cdn.fomo-gracie.com/video/story/scene-5-interactive-v2.mp4",
    next: "scene-5",
    loop: true,
    interactions: [
      {
        type: "click",
        atTime: 0.5,
        pause: false,
        resumeVideo: false,
        position: { x: 55, y: 57 },
      },
      {
        type: "drag-drop",
        atTime: 1,
        pause: true,
        targetScene: "scene-5",
      },
    ],
  },
  "scene-5": {
    id: "scene-5",
    video: "https://cdn.fomo-gracie.com/video/story/scene-5-v4.mp4",
    next: "scene-6",
    autoNext: true,
  },
  "scene-6": {
    id: "scene-6",
    video: "https://cdn.fomo-gracie.com/video/story/scene-6-v4.mp4",
    next: "scene-6-choice",
    autoNext: true,
  },
  "scene-6-choice": {
    id: "scene-6-choice",
    video: "https://cdn.fomo-gracie.com/video/story/scene-6-choice-v2.mp4",
    loop: true,
    autoNext: true,
    interactions: [
      {
        type: "choice",
        atTime: 1,
        pause: false,
        question:
          "“ฉันพลาดสอบที่สำคัญที่สุด… เพราะมัววิ่งตามสิ่งที่ไม่เคยพอ หรือมันแค่โชคร้ายกันแน่?”",
        options: [
          {
            label: "มันก็แค่โชคร้ายเท่านั้น",
            score: 0,
          },
          {
            label: "มันคือความผิดพลาดของฉันเอง",
            score: 10,
          },
        ],
      },
      {
        type: "choice",
        atTime: 3,
        pause: false,
        question: "“จะลองหาทางแก้ไขดีมั้ย…หรือแค่ปัดมันออกไป”",
        options: [
          {
            label: "ฉันต้องทำอะไรสักอย่าง",
            score: 10,
          },
          {
            label: "ช่างมันเถอะ…",
            score: 0,
          },
        ],
      },
      {
        type: "choice",
        atTime: 5,
        pause: false,
        question:
          "“อะไรคือสิ่งที่สำคัญที่สุดสำหรับฉันกันแน่…โลกจริงหรือภาพลวงตาที่คนอื่นกดไลก์ให้ฉัน?”",
        options: [
          {
            label: "ฉันยังไม่พร้อมจะหายไปจากสายตาคนอื่น",
            score: 0,
          },
          {
            label: "ฉันขอเลือกที่จะกลับไปหาความจริง",
            score: 10,
          },
        ],
      },
    ],
    scoreBranch: {
      threshold: 20,
      pass: "good-scene-1",
      fail: "bad-scene-1",
    },
  },

  // Good Way
  "good-scene-1": {
    id: "good-scene-1",
    video: "https://cdn.fomo-gracie.com/video/story/good-scene-1-v4.mp4",
    next: "good-ending",
    autoNext: true,
  },
  "good-ending": {
    id: "good-ending",
    video: "https://cdn.fomo-gracie.com/video/story/good-ending-v3.mp4",
    loop: true,
    interactions: [
      {
        type: "ending",
        atTime: 1,
        pause: false,
        options: [
          {
            label: "เล่นอีกครั้ง",
            action: "restart",
          },
          {
            label: "กลับสู่หน้าหลัก",
            action: "home",
          },
        ],
      },
    ],
  },

  // Bad Way
  "bad-scene-1": {
    id: "bad-scene-1",
    video: "https://cdn.fomo-gracie.com/video/story/bad-scene-1-v4.mp4",
    next: "bad-ending",
    autoNext: true,
  },
  "bad-ending": {
    id: "bad-ending",
    video: "https://cdn.fomo-gracie.com/video/story/bad-ending-v3.mp4",
    loop: true,
    interactions: [
      {
        type: "ending",
        atTime: 1,
        pause: false,
        options: [
          {
            label: "เล่นอีกครั้ง",
            action: "restart",
          },
          {
            label: "กลับสู่หน้าหลัก",
            action: "home",
          },
        ],
      },
    ],
  },
};
