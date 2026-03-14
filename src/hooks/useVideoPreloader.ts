import { useEffect } from "react";

export function useVideoPreloader(
  url: string | undefined,
  delayMs: number = 3000,
) {
  useEffect(() => {
    if (!url) return;

    let video: HTMLVideoElement | null = null;

    const timer = setTimeout(() => {
      video = document.createElement("video");
      video.src = url;
      video.preload = "auto";
      video.muted = true;
      video.style.display = "none";
      document.body.appendChild(video);
      video.load();
    }, delayMs);

    return () => {
      clearTimeout(timer);
      if (video) {
        video.src = "";
        video.load();
        if (document.body.contains(video)) {
          document.body.removeChild(video);
        }
        video = null;
      }
    };
  }, [url, delayMs]);
}
