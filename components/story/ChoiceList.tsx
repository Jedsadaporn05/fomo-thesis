"use client";

import { Choice, useStoryStore } from "@/store/storyStore";

export default function ChoiceList({
  choices,
  interactionRequired,
}: Readonly<{
  choices: Choice[];
  interactionRequired: boolean;
}>) {
  const { setScene, interactionCompleted } = useStoryStore();

  // ถ้ามี interactionRequired แล้วยังไม่ complete -> ซ่อนปุ่ม
  if (interactionRequired && !interactionCompleted) {
    return (
      <div className="text-sm text-slate-300">
        ทำภารกิจในฉากให้เสร็จก่อนจะมีตัวเลือกปรากฏ
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {choices.map((c) => (
        <button
          key={c.text}
          onClick={() => setScene(c.nextSceneId)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
        >
          {c.text}
        </button>
      ))}
    </div>
  );
}
