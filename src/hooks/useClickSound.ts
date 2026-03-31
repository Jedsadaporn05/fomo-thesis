"use client";

import { useCallback } from "react";
import { useAudioStore } from "@/src/store/useAudioStore";

export const useClickSound = () => {
  const playSFX = useAudioStore((state) => state.playSFX);

  const playClickSound = useCallback(() => {
    playSFX(
      "click",
      "https://cdn.fomo-gracie.com/audio/interactive/taptap.mp3",
    );
  }, [playSFX]);

  return playClickSound;
};
