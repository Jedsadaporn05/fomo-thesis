"use client";

import { useStoryStore, SceneId } from "@/store/storyStore";
import { AnimatePresence, motion } from "framer-motion";

// Scene Components
import Intro from "@/components/story/scenes/Intro";
import Scene1 from "@/components/story/scenes/Scene-1";

// Interactive Components

// Decision Components
import Decision1 from "@/components/story/decision/Decision-1";

// Ending Components
import Evaluation from "@/components/story/ending/Evaluation";
import GoodEnding from "@/components/story/ending/GoodEnding";
import BadEnding from "@/components/story/ending/BadEnding";

// ToBeContinue Components
import ToBeContinue from "./ToBeContinue";

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
