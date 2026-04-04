"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import rotatePhoneAnimation from "@/src/animations/rotate-phone.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function OrientationGuard() {
  const pathname = usePathname();
  const isStoryPage = pathname === "/story";

  if (isStoryPage) return null;

  return (
    <div className="fixed inset-0 z-9998 hidden landscape:[@media(max-height:500px)]:flex flex-col justify-center items-center bg-[#0a1738] text-white px-6 text-center">
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <h2 className="text-white text-sm sm:text-base md:text-lg font-normal">
          กรุณาหมุนหน้าจอเป็นแนวตั้ง
        </h2>
        <div className="relative flex justify-center items-center">
          <Lottie
            animationData={rotatePhoneAnimation}
            loop={true}
            className="size-40 sm:size-45 md:size-50 -rotate-90"
          />
        </div>
        <p className="text-white text-xs sm:text-sm md:text-base font-normal">
          เพื่อประสบการณ์ที่ดีขึ้น
        </p>
      </div>
    </div>
  );
}
