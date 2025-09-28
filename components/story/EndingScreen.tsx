"use client";

import { useStoryStore } from "@/store/storyStore";

export default function EndingScreen({
  endingType,
}: Readonly<{
  endingType: "happy" | "bad";
}>) {
  const { restart } = useStoryStore();
  return (
    <div className="flex flex-col items-start gap-4">
      <div
        className={`text-lg font-semibold ${
          endingType === "happy" ? "text-green-300" : "text-red-300"
        }`}
      >
        {endingType === "happy" ? "🎉 Happy Ending!" : "💀 Bad Ending"}
      </div>
      <div className="text-slate-300">
        คุณสามารถเริ่มเล่นใหม่หรือย้อนดูเส้นทางที่เลือก
      </div>
      <div className="flex gap-3">
        <button
          onClick={restart}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700"
        >
          เริ่มใหม่
        </button>
      </div>
    </div>
  );
}
