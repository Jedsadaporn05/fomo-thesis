"use client";

import { useStoryStore, SceneId } from "@/src/store/useStoryStore";
import { AnimatePresence, motion } from "framer-motion";

// Scene Components
import Intro from "@/src/components/story/scenes/intro/Scene-Intro";
import Scene1 from "@/src/components/story/scenes/scene-1/Scene-1";

// Interactive Components

// Decision Components
import Decision1 from "@/src/components/story/scenes/decision/Decision-1";

// Ending Components
import Evaluation from "@/src/components/story/scenes/ending/Evaluation";
import GoodEnding from "@/src/components/story/scenes/ending/GoodEnding";
import BadEnding from "@/src/components/story/scenes/ending/BadEnding";

// ToBeContinue Components
import ToBeContinue from "./scenes/ToBeContinue";

const SCENE_COMPONENTS: Record<SceneId, React.ComponentType> = {
  intro: Intro,
  "scene-1": Scene1,
  capture: Decision1,

  evaluation: Evaluation,
  "good-ending": GoodEnding,
  "bad-ending": BadEnding,

  "to-be-continue": ToBeContinue,
};

export default function SceneManager() {
  const currentSceneId = useStoryStore((state) => state.currentSceneId);
  const CurrentSceneComponent = SCENE_COMPONENTS[currentSceneId];

  if (!CurrentSceneComponent) {
    return (
      <div className="text-red-500 flex items-center justify-center h-screen">
        Error: Scene {currentSceneId}
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSceneId}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full flex justify-center items-center"
        >
          <CurrentSceneComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
