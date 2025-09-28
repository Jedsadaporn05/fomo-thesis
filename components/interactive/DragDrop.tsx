"use client";

import { useRef, useState, useEffect } from "react";
import { useStoryStore } from "@/store/storyStore";

export default function DragDrop() {
  const [dropped, setDropped] = useState(false);
  const keyRef = useRef<HTMLDivElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const { setInteractionCompleted } = useStoryStore();

  useEffect(() => {
    if (dropped) setInteractionCompleted(true);
  }, [dropped, setInteractionCompleted]);

  useEffect(() => {
    const keyEl = keyRef.current;
    const dropEl = dropRef.current;
    if (!keyEl || !dropEl) return;

    const handleDragStart = (e: DragEvent) => {
      try {
        e.dataTransfer?.setData("text/plain", "key");
      } catch (e) {}
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setDropped(true);
    };
    const handleDragOver = (e: DragEvent) => e.preventDefault();

    keyEl.addEventListener("dragstart", handleDragStart as EventListener);
    dropEl.addEventListener("drop", handleDrop as EventListener);
    dropEl.addEventListener("dragover", handleDragOver as EventListener);

    return () => {
      try {
        keyEl.removeEventListener(
          "dragstart",
          handleDragStart as EventListener
        );
      } catch {}
      try {
        dropEl.removeEventListener("drop", handleDrop as EventListener);
      } catch {}
      try {
        dropEl.removeEventListener("dragover", handleDragOver as EventListener);
      } catch {}
    };
  }, []);

  return (
    <div className="flex items-center gap-6">
      <div
        ref={keyRef}
        draggable={!dropped}
        className={`w-20 h-20 rounded-md flex items-center justify-center select-none ${
          dropped ? "opacity-40" : "bg-amber-400 cursor-grab"
        }`}
      >
        🔑
      </div>

      <div
        ref={dropRef}
        className={`w-32 h-20 rounded-md border-2 ${
          dropped
            ? "border-green-400 bg-green-900"
            : "border-slate-600 bg-slate-800"
        } flex items-center justify-center`}
      >
        {dropped ? "🔓 เปิดแล้ว" : "ลากกุญแจมาที่นี่"}
      </div>
    </div>
  );
}
