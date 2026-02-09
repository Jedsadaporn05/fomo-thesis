"use client";

import { useStoryStore } from "@/src/store/useStoryStore";
import { useEffect } from "react";

export default function Evaluation() {
  const { score, goToScene } = useStoryStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (score >= 5) {
        goToScene("good-ending");
      } else {
        goToScene("bad-ending");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [score, goToScene]);

  return (
    <div className="text-white text-2xl animate-pulse">ผลการตัดสินใจของคุณ</div>
  );
}
