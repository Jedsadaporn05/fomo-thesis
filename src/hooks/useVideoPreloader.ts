import { useEffect, useRef } from "react";

/**
 * Intelligent Video Preloader
 * Consolidates preloading logic to handle multiple possible paths in a branching story.
 * @param urls Array of video URLs to preload, ordered by priority (most likely first)
 * @param delayMs Delay before starting the preload to avoid competing with the current scene's initial load
 */
export function useVideoPreloader(
  urls: (string | undefined)[],
  delayMs: number = 2000,
) {
  const loadedUrls = useRef<Set<string>>(new Set());
  const activeVideos = useRef<Map<string, HTMLVideoElement>>(new Map());

  useEffect(() => {
    const currentActiveVideos = activeVideos.current;

    const validUrls = urls.filter(
      (url): url is string => !!url && !loadedUrls.current.has(url),
    );

    if (validUrls.length === 0) return;

    const timer = setTimeout(() => {
      validUrls.forEach((url) => {
        if (currentActiveVideos.has(url)) return;

        const video = document.createElement("video");
        video.src = url;
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        video.style.display = "none";

        const handleCanPlayThrough = () => {
          loadedUrls.current.add(url);
        };

        video.addEventListener("canplaythrough", handleCanPlayThrough, {
          once: true,
        });

        document.body.appendChild(video);
        video.load();
        currentActiveVideos.set(url, video);
      });
    }, delayMs);

    return () => {
      clearTimeout(timer);

      currentActiveVideos.forEach((video, url) => {
        if (!urls.includes(url)) {
          video.removeAttribute("src");
          video.load();

          if (document.body.contains(video)) {
            document.body.removeChild(video);
          }
          currentActiveVideos.delete(url);
        }
      });
    };
  }, [urls, delayMs]);
}
