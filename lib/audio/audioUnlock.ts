import { Howl } from "howler";

export function unlockAudio() {
  const silent = new Howl({
    src: ["/sounds/interactive/click-1.mp3"],
    volume: 0,
  });

  silent.play();
}
