"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

// Global Cache & State Management
type PreloadStatus = "pending" | "loading" | "loaded" | "error";

interface CacheEntry {
  blobUrl: string | null;
  status: PreloadStatus;
  controller: AbortController | null;
  errorCount: number;
}

const globalCache = new Map<string, CacheEntry>();
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((l) => l());
}

const MAX_RETRIES = 2;
const MAX_PRELOAD_CACHE = 5;
const DELAY_BETWEEN_LOADS_MS = 800;

/**
 * Get the current preloaded URL (blob URL or original URL)
 */
export function getPreloadedUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const entry = globalCache.get(url);
  return entry?.status === "loaded" && entry.blobUrl ? entry.blobUrl : url;
}

/**
 * Clear all preloaded videos from memory
 */
export function clearVideoPreloadCache() {
  globalCache.forEach((entry) => {
    if (entry.controller) entry.controller.abort();
    if (entry.blobUrl) URL.revokeObjectURL(entry.blobUrl);
  });
  globalCache.clear();
  notify();
}

/**
 * Hook to get the best available URL for a video (blob if ready, else original)
 */
export function useVideoUrl(
  originalUrl: string | undefined,
): string | undefined {
  return useSyncExternalStore(
    subscribe,
    () => getPreloadedUrl(originalUrl),
    () => originalUrl,
  );
}

/**
 * High-Performance Video Preloader using Fetch + Blob
 * Optimized for mobile and slow networks with AbortController and Retry logic.
 */
export function useVideoPreloader(
  urls: (string | undefined)[],
  delayMs: number = 2000,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortedRef = useRef(false);
  const urlsRef = useRef(urls);

  urlsRef.current = urls;

  const urlKey = urls.filter(Boolean).join(",");

  useEffect(() => {
    const validUrls = urlsRef.current.filter((url): url is string => !!url);
    if (validUrls.length === 0) return;

    abortedRef.current = false;

    timeoutRef.current = setTimeout(() => {
      const preloadQueue = async () => {
        for (const url of validUrls) {
          if (abortedRef.current) break;

          let entry = globalCache.get(url);

          if (entry?.status === "loaded" || entry?.status === "loading")
            continue;
          if (entry && entry.errorCount > MAX_RETRIES) continue;

          if (!entry) {
            entry = {
              blobUrl: null,
              status: "pending",
              controller: null,
              errorCount: 0,
            };
            globalCache.set(url, entry);
          }

          const controller = new AbortController();

          entry.status = "loading";
          entry.controller = controller;
          notify();

          try {
            const response = await fetch(url, {
              signal: controller.signal,
              cache: "force-cache",
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const blob = await response.blob();

            if (abortedRef.current) {
              entry.status = "pending";
              entry.controller = null;
              notify();
              break;
            }

            entry.blobUrl = URL.createObjectURL(blob);
            entry.status = "loaded";
            entry.controller = null;
          } catch (err: unknown) {
            if (err instanceof Error && err.name === "AbortError") {
              entry.status = "pending";
            } else {
              entry.status = "error";
              entry.errorCount++;
            }
            entry.controller = null;
          } finally {
            notify();
          }

          if (!abortedRef.current) {
            await new Promise((r) => setTimeout(r, DELAY_BETWEEN_LOADS_MS));
          }
        }
      };

      preloadQueue();
    }, delayMs);

    return () => {
      abortedRef.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Smart Pruning
      if (globalCache.size > MAX_PRELOAD_CACHE) {
        const currentUrls = new Set(urlsRef.current.filter(Boolean));
        let prunedCount = 0;

        for (const [url, entry] of globalCache) {
          if (globalCache.size - prunedCount <= MAX_PRELOAD_CACHE) break;
          if (!currentUrls.has(url)) {
            entry.controller?.abort();
            if (entry.blobUrl) URL.revokeObjectURL(entry.blobUrl);
            globalCache.delete(url);
            prunedCount++;
          }
        }
        if (prunedCount > 0) notify();
      }
    };
  }, [urlKey, delayMs]);
}
