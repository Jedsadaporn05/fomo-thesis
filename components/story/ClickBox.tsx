"use client";

import { useStoryStore } from "@/store/storyStore";
import { useState } from "react";

export function ClickBox() {
  const { setInteractionCompleted } = useStoryStore();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setInteractionCompleted(true);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <button
        onClick={handleClick}
        className={`w-32 h-32 rounded-xl cursor-pointer flex items-center justify-center ${
          clicked ? "bg-green-500" : "bg-gray-500"
        }`}
      >
        {clicked ? "✅ เปิดแล้ว" : "📦 คลิกเพื่อเปิด"}
      </button>
    </div>
  );
}
