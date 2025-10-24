"use client";

import storyData from "@/data/story.json";
import { useEffect } from "react";
import { useStoryStore, Scene } from "@/store/storyStore";
import SceneRenderer from "@/components/story/SceneRenderer";

export default function StoryContainer() {
  const { currentSceneId, loadProgress } = useStoryStore();

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const scene = (storyData as Scene[]).find((s: Scene) => s.id === currentSceneId);
  if (!scene) return <div className="p-6">Scene not found</div>;

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-6 bg-black">
      <SceneRenderer scene={scene} />
    </div>
  );
}
