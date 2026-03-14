import { useEffect } from "react";
import { useAudioStore } from "@/src/store/useAudioStore";
import { useStoryStore } from "@/src/store/useStoryStore";
import { waitForGestureAndPlay } from "@/lib/audio/audioUnlock";

export function useHomeAudio() {
  const _hasHydrated = useAudioStore((s) => s._hasHydrated);
  const permission = useAudioStore((s) => s.permission);
  const playBGM = useAudioStore((s) => s.playBGM);
  const isStoryStarted = useStoryStore((s) => s.isStoryStarted);
  const setCancelGestureLock = useAudioStore((s) => s.setCancelGestureLock);

  useEffect(() => {
    if (!_hasHydrated || isStoryStarted) return;

    if (permission === "granted") {
      playBGM("home", "/sounds/music/homepage-bgm.mp3", { fade: 1500 });

      const cancel = waitForGestureAndPlay(() => {
        const state = useAudioStore.getState();
        if (state.bgmKey !== "home" || !state.bgm?.playing()) {
          playBGM("home", "/sounds/music/homepage-bgm.mp3", { fade: 1500 });
        }
      });
      setCancelGestureLock(cancel);
    }

    return () => {
      const state = useAudioStore.getState();
      if (state.bgmKey === "home") {
        state.fadeOutBGM(1200);
      }
      state._cancelGestureLock?.();
      setCancelGestureLock(undefined);
    };
  }, [_hasHydrated, permission, isStoryStarted, playBGM, setCancelGestureLock]);
}
