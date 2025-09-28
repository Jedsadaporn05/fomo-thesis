// components/Interactive/Dream.tsx
"use client";

import { useStoryStore } from "@/store/storyStore";

export default function Dream() {
  const { setInteractionCompleted } = useStoryStore();

  const handleDreamComplete = () => {
    setInteractionCompleted(true);
  };

  return (
    <div className="p-4 bg-purple-700 rounded-lg flex flex-col items-start gap-3">
      <p>💤 คุณฝันเห็นวิญญาณโบราณเตือน: อย่าไว้ใจความมืด</p>
      <button
        onClick={handleDreamComplete}
        className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600"
      >
        ตื่นขึ้นและไปต่อ
      </button>
    </div>
  );
}
