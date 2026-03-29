"use client";

import { useEffect, useRef } from "react";

// Singleton state to persist across scene changes
const globalLoadedUrls = new Set<string>();
const globalActivePreloads = new Map<string, HTMLVideoElement>();
const MAX_PRELOAD_CACHE = 4;

/**
 * Force clear all video preloads from memory.
 */
export function clearVideoPreloadCache() {
  globalActivePreloads.forEach((video) => {
    try {
      video.pause();
      video.removeAttribute("src");
      video.load();
    } catch (e) {
      console.warn("[Preloader] Error during cleanup: ", e);
    }
  });

  globalActivePreloads.clear();
  globalLoadedUrls.clear();
  console.log("[Preloader] Global cache cleared and memory released");
}

/**
 * High-Performance Video Preloader
 * Optimized for mobile devices and memory management.
 */
export function useVideoPreloader(
  urls: (string | undefined)[],
  delayMs: number = 2000,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Filter out invalid or already loaded/loading URLs
    const validUrls = urls.filter(
      (url): url is string =>
        !!url && !globalLoadedUrls.has(url) && !globalActivePreloads.has(url),
    );

    if (validUrls.length === 0) return;

    timeoutRef.current = setTimeout(() => {
      const preloadQueue = async () => {
        for (const url of validUrls) {
          if (globalLoadedUrls.has(url) || globalActivePreloads.has(url))
            continue;

          const video = document.createElement("video");
          video.preload = "auto";
          video.muted = true;
          video.playsInline = true;

          const loadPromise = new Promise<void>((resolve) => {
            const onCanPlay = () => {
              globalLoadedUrls.add(url);
              cleanup();
              resolve();
            };
            const onError = () => {
              cleanup();
              resolve();
            };
            const cleanup = () => {
              video.removeEventListener("canplaythrough", onCanPlay);
              video.removeEventListener("error", onError);
            };
            video.addEventListener("canplaythrough", onCanPlay);
            video.addEventListener("error", onError);
          });

          video.src = url;
          globalActivePreloads.set(url, video);
          video.load();

          await loadPromise;
        }
      };

      preloadQueue();
    }, delayMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Smart pruning only prune if we exceed limit AND video is not in current path
      if (globalActivePreloads.size > MAX_PRELOAD_CACHE) {
        const cachedKeys = Array.from(globalActivePreloads.keys());
        for (const key of cachedKeys) {
          // If the cached video is NOT in the upcoming list AND we are over limit
          if (
            !urls.includes(key) &&
            globalActivePreloads.size > MAX_PRELOAD_CACHE
          ) {
            const video = globalActivePreloads.get(key);
            if (video) {
              try {
                video.pause();
                video.removeAttribute("src");
                video.load();
              } catch (err) {
                console.log("[Preloader] Error during pruning: ", err);
              }
              globalActivePreloads.delete(key);
              globalLoadedUrls.delete(key);
            }
          }
        }
      }
    };
  }, [urls, delayMs]);
}
