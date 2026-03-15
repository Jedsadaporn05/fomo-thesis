"use client";

import { Smartphone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStoryStore } from "../store/useStoryStore";

export default function OrientationGuard() {
  const pathname = usePathname();
  const isStoryPage = pathname === "/story";
  const isStoryStarted = useStoryStore((state) => state.isStoryStarted);

  if (isStoryPage && isStoryStarted) return null;

  return (
    <div className="fixed inset-0 z-9999 hidden max-[896px]:landscape:flex flex-col items-center justify-center bg-[#0a1738] text-white px-6 text-center">
      <div className="relative mb-8">
        <Smartphone
          strokeWidth={1.25}
          className="size-14 sm:size-16 text-[#FF2D77] animate-[spin_3s_ease-in-out_infinite] -rotate-90"
        />
        <div className="absolute inset-0 bg-[#FF2D77] blur-2xl opacity-20 rounded-full" />
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className="text-[#FF2D77] text-sm sm:text-base font-bold">
          กรุณาหมุนหน้าจอกลับเพื่อรับชมเนื้อหา
        </h2>
        <p className="text-white text-sm sm:text-base font-medium">
          หน้าหลักของเว็บไซต์นี้ถูกออกแบบมา
        </p>
        <p className="text-white text-sm sm:text-base font-medium">
          เพื่อการแสดงผลในแนวตั้ง (Portrait)
        </p>
      </div>
    </div>
  );
}
