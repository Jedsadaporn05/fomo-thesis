"use client";

import { Scene } from "@/store/storyStore";
import ChoiceList from "@/components/story/ChoiceList";
import EndingScreen from "@/components/story/EndingScreen";
import { motion } from "motion/react";
import InteractiveLoader from "@/components/interactive/InteractiveLoader";

export default function SceneRenderer({ scene }: Readonly<{ scene: Scene }>) {
  return (
    <div className="max-w-2xl w-full bg-slate-800 rounded-2xl shadow-lg p-6">
      <motion.div
        key={scene.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">
          {scene.content}
        </h2>

        {/* Interaction */}
        {scene.interactionType && (
          <div className="mb-4">
            <InteractiveLoader interactionType={scene.interactionType} />
          </div>
        )}

        {/* Ending or Choices */}
        {scene.endingType ? (
          <EndingScreen endingType={scene.endingType} />
        ) : (
          <ChoiceList
            choices={scene.choices}
            interactionRequired={!!scene.interactionType}
          />
        )}
      </motion.div>
    </div>
  );
}
