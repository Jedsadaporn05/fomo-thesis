"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { Howl } from "howler";

const SOUNDS = {
  bgm: "/sounds/Bgm-1.mp3",
  click: "/sounds/Click-1.mp3",
  hover: "/sounds/hover.mp3",
};

interface SoundContextType {
  isAudioEnabled: boolean;
  enableAudio: () => void;
  bgmVolume: number;
  sfxVolume: number;
  setBgmVolume: (val: number) => void;
  setSfxVolume: (val: number) => void;
  playSfx: (type: "click" | "hover") => void;
  toggleBgm: () => void;
  isBgmPlaying: boolean;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const bgmRef = useRef<Howl | null>(null);
  const sfxRef = useRef<Record<string, Howl>>({});

  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [bgmVolume, setBgmVolumeState] = useState(0.5);
  const [sfxVolume, setSfxVolumeState] = useState(0.5);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);

  useEffect(() => {
    // Preload BGM
    bgmRef.current = new Howl({
      src: [SOUNDS.bgm],
      loop: true,
      autoplay: false,
      html5: true,
      volume: bgmVolume,
      onplay: () => setIsBgmPlaying(true),
      onpause: () => setIsBgmPlaying(false),
    });

    // Preload SFX
    sfxRef.current = {
      click: new Howl({ src: [SOUNDS.click], volume: sfxVolume }),
      hover: new Howl({ src: [SOUNDS.hover], volume: sfxVolume }),
    };

    return () => {
      bgmRef.current?.unload();
      Object.values(sfxRef.current).forEach((s) => s.unload());
    };
  }, []);

  const enableAudio = () => {
    setIsAudioEnabled(true);

    if (bgmRef.current && !bgmRef.current.playing()) {
      bgmRef.current.fade(0, bgmVolume, 800);
      bgmRef.current.play();
    }
  };

  const setBgmVolume = (val: number) => {
    setBgmVolumeState(val);
    localStorage.setItem("bgm-volume", val.toString());
    bgmRef.current?.volume(val);
  };

  const setSfxVolume = (val: number) => {
    setSfxVolumeState(val);
    localStorage.setItem("sfx-volume", val.toString());
    Object.values(sfxRef.current).forEach((s) => s.volume(val));
  };

  const playSfx = (type: "click" | "hover") => {
    if (!isAudioEnabled) return;
    sfxRef.current[type]?.play();
  };

  const toggleBgm = () => {
    if (!bgmRef.current) return;
    bgmRef.current.playing() ? bgmRef.current.pause() : bgmRef.current.play();
  };

  return (
    <SoundContext.Provider
      value={{
        isAudioEnabled,
        enableAudio,
        bgmVolume,
        sfxVolume,
        setBgmVolume,
        setSfxVolume,
        playSfx,
        toggleBgm,
        isBgmPlaying,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
};
