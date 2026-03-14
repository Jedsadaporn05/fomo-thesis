import { Howl, Howler } from "howler";

export function unlockAudio() {
  if (Howler.ctx && Howler.ctx.state === "suspended") {
    Howler.ctx
      .resume()
      .then(() => {
        console.log("AudioContext resumed successfully");
      })
      .catch((e) => console.error("Failed to resume context:", e));
  }

  const silent = new Howl({
    src: [
      "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
    ],
    volume: 0,
  });

  silent.play();
}

export function waitForGestureAndPlay(onUnlocked: () => void) {
  const events = [
    "mousedown",
    "mouseup",
    "pointerdown",
    "pointerup",
    "click",
    "keydown",
    "touchstart",
    "touchend",
    "wheel",
    "scroll",
  ];

  const handler = () => {
    unlockAudio();
    onUnlocked();

    events.forEach((e) =>
      window.removeEventListener(e, handler, { capture: true }),
    );
  };

  events.forEach((e) =>
    window.addEventListener(e, handler, {
      once: true,
      passive: true,
      capture: true,
    }),
  );

  return () => {
    events.forEach((e) =>
      window.removeEventListener(e, handler, { capture: true }),
    );
  };
}
