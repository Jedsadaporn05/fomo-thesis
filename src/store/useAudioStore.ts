import { unlockAudio } from "@/lib/audio/audioUnlock";
import { Howl } from "howler";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Permission = "unknown" | "granted" | "denied";

interface AudioState {
  _hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  _cancelGestureLock?: () => void;
  setCancelGestureLock: (fn: (() => void) | undefined) => void;

  permission: Permission;
  grantPermission: () => void;
  denyPermission: () => void;
  bgmEnabled: boolean;
  sfxEnabled: boolean;
  bgm?: Howl;
  bgmKey?: string;
  defaultBgm?: { key: string; src: string };
  bgmVolume: number;
  videoVolume: number;

  // Actions
  playBGM: (key: string, src: string, options?: { fade?: number }) => void;
  stopBGM: () => void;
  fadeOutBGM: (duration?: number) => void;
  toggleBgmMute: () => void;
  setBgmVolume: (v: number) => void;
  setVideoVolume: (v: number) => void;
  sfxVolume: number;
  playSFX: (key: string, src: string) => void;
  toggleSfxMute: () => void;
  setSfxVolume: (v: number) => void;

  // Helpers
  syncVideoVolume: (videoElement: HTMLVideoElement | null) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => {
      const clearBgmState = () =>
        set({
          bgm: undefined,
          bgmKey: undefined,
          defaultBgm: undefined,
        });

      return {
        _hasHydrated: false,
        setHasHydrated: (v) => set({ _hasHydrated: v }),

        _cancelGestureLock: undefined,
        setCancelGestureLock: (fn) => set({ _cancelGestureLock: fn }),

        permission: "unknown",

        grantPermission: () => {
          unlockAudio();
          set({ permission: "granted", bgmEnabled: true, sfxEnabled: true });
          const { defaultBgm, playBGM } = get();
          if (defaultBgm) {
            playBGM(defaultBgm.key, defaultBgm.src, { fade: 1000 });
          }
        },

        denyPermission: () => {
          get().bgm?.stop();
          set({ permission: "denied", bgmEnabled: false, sfxEnabled: false });
        },

        bgmEnabled: false,
        sfxEnabled: false,
        bgm: undefined,
        bgmKey: undefined,
        defaultBgm: undefined,
        bgmVolume: 1,
        videoVolume: 1,

        playBGM: (key, src, options) => {
          const { permission, bgmEnabled, bgm, bgmKey, bgmVolume } = get();
          set({ defaultBgm: { key, src } });

          if (permission !== "granted" || !bgmEnabled) return;
          if (bgmKey === key && bgm?.playing()) return;

          if (bgm) {
            bgm.stop();
            bgm.unload();
          }

          const next = new Howl({
            src: [src],
            loop: true,
            volume: 0,
            html5: false,
            preload: true,
          });

          const handlePlay = () => {
            if (get().bgmKey !== key) return;
            next.play();
            if (options?.fade) {
              next.fade(0, bgmVolume, options.fade);
            } else {
              next.volume(bgmVolume);
            }
          };

          next.once("load", handlePlay);
          if (next.state() === "loaded") handlePlay();

          set({ bgm: next, bgmKey: key });
        },

        stopBGM: () => {
          const { bgm } = get();
          if (bgm) {
            bgm.stop();
            bgm.unload();
          }
          clearBgmState();
        },

        fadeOutBGM: (duration = 2000) => {
          const { bgm } = get();
          if (!bgm) {
            clearBgmState();
            return;
          }

          if (!bgm.playing()) {
            bgm.stop();
            bgm.unload();
            clearBgmState();
            return;
          }

          bgm.fade(bgm.volume(), 0, duration);
          bgm.once("fade", () => {
            if (bgm.volume() <= 0.05) {
              bgm.stop();
              bgm.unload();
              clearBgmState();
            }
          });
        },

        toggleBgmMute: () => {
          const {
            permission,
            bgmEnabled,
            bgm,
            defaultBgm,
            playBGM,
            bgmVolume,
            grantPermission,
          } = get();
          if (permission !== "granted") {
            grantPermission();
            return;
          }

          if (!bgmEnabled) {
            set({ bgmEnabled: true, videoVolume: bgmVolume });
            if (bgm) bgm.play();
            else if (defaultBgm)
              playBGM(defaultBgm.key, defaultBgm.src, { fade: 1000 });
            return;
          }
          bgm?.pause();
          set({ bgmEnabled: false, videoVolume: 0 });
        },

        setBgmVolume: (v) => {
          get().bgm?.volume(v);
          set({ bgmVolume: v, videoVolume: v });
        },

        setVideoVolume: (v) => set({ videoVolume: v }),

        sfxVolume: 1,
        playSFX: (_key, src) => {
          const { permission, sfxEnabled, sfxVolume } = get();
          if (permission !== "granted" || !sfxEnabled || sfxVolume <= 0) return;
          new Howl({ src: [src], volume: sfxVolume }).play();
        },
        toggleSfxMute: () => {
          const { permission, sfxEnabled, grantPermission } = get();
          if (permission !== "granted") {
            grantPermission();
            return;
          }
          set({ sfxEnabled: !sfxEnabled });
        },
        setSfxVolume: (v) => set({ sfxVolume: v }),

        syncVideoVolume: (video) => {
          if (!video) return;
          const { bgmEnabled, videoVolume } = get();
          video.volume = bgmEnabled ? videoVolume : 0;
        },
      };
    },
    {
      name: "audio-settings",
      partialize: (s) => ({
        permission: s.permission,
        bgmEnabled: s.bgmEnabled,
        sfxEnabled: s.sfxEnabled,
        bgmVolume: s.bgmVolume,
        videoVolume: s.videoVolume,
        sfxVolume: s.sfxVolume,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
