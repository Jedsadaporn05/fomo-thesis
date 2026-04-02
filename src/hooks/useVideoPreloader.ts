"use client";

import { useEffect, useRef } from "react";

// Singleton state to persist across scene changes
const globalLoadedUrls = new Set<string>();
const globalActivePreloads = new Map<string, HTMLVideoElement>();
const MAX_PRELOAD_CACHE = 3;

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
 * High-Performance Sequential Video Preloader
 * Optimized for mobile devices and memory management.
 */
export function useVideoPreloader(
  urls: (string | undefined)[],
  delayMs: number = 2000,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPreloadingRef = useRef(false);

  useEffect(() => {
    // Filter out invalid or already loaded/loading URLs
    const validUrls = urls.filter(
      (url): url is string =>
        !!url && !globalLoadedUrls.has(url) && !globalActivePreloads.has(url),
    );

    if (validUrls.length === 0) return;

    timeoutRef.current = setTimeout(() => {
      if (isPreloadingRef.current) return;

      const preloadQueue = async () => {
        isPreloadingRef.current = true;

        for (const url of validUrls) {
          // Check again inside loop as state might have changed during await
          if (globalLoadedUrls.has(url) || globalActivePreloads.has(url))
            continue;

          const video = document.createElement("video");
          video.preload = "auto";
          video.muted = true;
          video.playsInline = true;

          const loadPromise = new Promise<void>((resolve) => {
            let hasResolved = false;

            const onCanPlay = () => {
              if (hasResolved) return;
              hasResolved = true;
              globalLoadedUrls.add(url);
              cleanup();
              resolve();
            };
            const onError = () => {
              if (hasResolved) return;
              hasResolved = true;
              cleanup();
              resolve(); // Resolve anyway to continue queue
            };
            const cleanup = () => {
              video.removeEventListener("canplaythrough", onCanPlay);
              video.removeEventListener("error", onError);
            };

            // Set a timeout for individual video load to not hang the queue
            setTimeout(() => {
              if (!hasResolved) {
                hasResolved = true;
                cleanup();
                resolve();
              }
            }, 10000);

            video.addEventListener("canplaythrough", onCanPlay);
            video.addEventListener("error", onError);
          });

          video.src = url;
          globalActivePreloads.set(url, video);
          video.load();

          await loadPromise;
          // Give a small breath between loads to prioritize main video
          await new Promise((r) => setTimeout(r, 500));
        }

        isPreloadingRef.current = false;
      };

      preloadQueue();
    }, delayMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Smart pruning only prune if we exceed limit AND video is not in current path
      if (globalActivePreloads.size > MAX_PRELOAD_CACHE) {
        const cachedKeys = Array.from(globalActivePreloads.keys());
        for (const key of cachedKeys) {
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
