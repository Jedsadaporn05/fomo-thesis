import { unlockAudio } from "@/lib/audio/audioUnlock";
import { Howl } from "howler";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Permission = "unknown" | "granted" | "denied";

interface AudioState {
  // Permission
  permission: Permission;
  grantPermission: () => void;
  denyPermission: () => void;

  bgmEnabled: boolean;
  sfxEnabled: boolean;

  // BGM
  bgm?: Howl;
  bgmKey?: string;
  defaultBgm?: { key: string; src: string };
  bgmVolume: number;

  playBGM: (key: string, src: string) => void;
  stopBGM: () => void;
  toggleBgmMute: () => void;
  setBgmVolume: (v: number) => void;

  // SFX
  sfxVolume: number;

  playSFX: (key: string, src: string) => void;
  toggleSfxMute: () => void;
  setSfxVolume: (v: number) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      permission: "unknown",

      grantPermission: () => {
        unlockAudio();

        const { defaultBgm, playBGM } = get();

        set({
          permission: "granted",
          bgmEnabled: true,
          sfxEnabled: true,
        });

        if (defaultBgm) {
          playBGM(defaultBgm.key, defaultBgm.src);
        }
      },

      denyPermission: () => {
        get().bgm?.stop();
        set({
          permission: "denied",
          bgmEnabled: false,
          sfxEnabled: false,
        });
      },

      bgmEnabled: false,
      sfxEnabled: false,

      // BGM
      bgm: undefined,
      bgmKey: undefined,
      defaultBgm: undefined,
      bgmVolume: 1,

      playBGM: (key, src) => {
        const { permission, bgmEnabled, bgm, bgmKey, bgmVolume } = get();
        if (permission !== "granted" || !bgmEnabled) return;
        if (bgmKey === key && bgm) return;

        bgm?.stop();

        const next = new Howl({
          src: [src],
          loop: true,
          volume: bgmVolume,
        });

        next.play();

        set({
          bgm: next,
          bgmKey: key,
          defaultBgm: { key, src },
        });
      },

      stopBGM: () => {
        const { bgm } = get();
        bgm?.stop();

        set({
          bgm: undefined,
          bgmKey: undefined,
        });
      },

      toggleBgmMute: () => {
        const {
          permission,
          bgmEnabled,
          bgm,
          defaultBgm,
          playBGM,
          grantPermission,
        } = get();

        if (permission !== "granted") {
          grantPermission();
          return;
        }

        if (!bgmEnabled) {
          set({ bgmEnabled: true });

          if (bgm) {
            bgm.play();
          } else if (defaultBgm) {
            playBGM(defaultBgm.key, defaultBgm.src);
          }
          return;
        }

        bgm?.pause();
        set({ bgmEnabled: false });
      },

      setBgmVolume: (v) => {
        const { bgm } = get();
        bgm?.volume(v);
        set({ bgmVolume: v });
      },

      // SFX
      sfxVolume: 1,

      playSFX: (_key, src) => {
        const { permission, sfxEnabled, sfxVolume } = get();
        if (permission !== "granted" || !sfxEnabled) return;
        if (sfxVolume <= 0) return;

        new Howl({
          src: [src],
          volume: sfxVolume,
        }).play();
      },

      toggleSfxMute: () => {
        const { permission, sfxEnabled, grantPermission } = get();
        if (permission !== "granted") {
          grantPermission();
          return;
        }
        set({ sfxEnabled: !sfxEnabled });
      },

      setSfxVolume: (v) => {
        set({ sfxVolume: v });
      },
    }),
    {
      name: "audio-settings",
      partialize: (s) => ({
        permission: s.permission,
        bgmEnabled: s.bgmEnabled,
        sfxEnabled: s.sfxEnabled,
        bgmVolume: s.bgmVolume,
        sfxVolume: s.sfxVolume,
      }),
    },
  ),
);
