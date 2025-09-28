"use client";

import { useState } from "react";
import { useStoryStore } from "@/store/storyStore";

export default function ClickBox() {
  const [clicked, setClicked] = useState(false);
  const { setInteractionCompleted } = useStoryStore();

  const handle = () => {
    if (clicked) return;
    setClicked(true);
    setInteractionCompleted(true);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handle}
        className={`w-35 h-30 rounded-lg flex items-center justify-center cursor-pointer select-none ${
          clicked ? "bg-green-500" : "bg-slate-600"
        }`}
      >
        {clicked ? "✅ เปิดแล้ว" : "📦 คลิกเพื่อเปิด"}
      </button>
      <div className="text-slate-300">คลิกที่กล่องเพื่อค้นหา</div>
    </div>
  );
}
