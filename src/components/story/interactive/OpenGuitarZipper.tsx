"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

interface ZipperInteractionProps {
  onComplete: () => void;
}

export default function OpenGuitarZipper({
  onComplete,
}: ZipperInteractionProps) {
  const [isDone, setIsDone] = useState(false);

  const x = useMotionValue(0);

  const trackWidth = 200;

  const opacity = useTransform(x, [0, trackWidth], [0.5, 1]);

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (latest >= trackWidth - 10 && !isDone) {
        setIsDone(true);
        setTimeout(onComplete, 500);
      }
    });
    return () => unsubscribe();
  }, [x, isDone, onComplete]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-white text-sm font-medium animate-pulse">
        รูดซิปเพื่อเปิดกระเป๋า
      </div>
      <div
        className="relative h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 p-1"
        style={{ width: trackWidth + 48 }}
      >
        <div className="absolute inset-y-0 left-6 right-6 flex items-center">
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              style={{ width: x }}
              className="h-full bg-white shadow-[0_0_10px_white]"
            />
          </div>
        </div>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: trackWidth }}
          dragElastic={0.1}
          dragMomentum={false}
          style={{ x, opacity }}
          className="relative z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg border-2 border-[#FF1D6D]"
        >
          <div className="w-4 h-6 bg-[#FF1D6D] rounded-sm relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-3 bg-[#FF1D6D] rounded-full border border-white/50" />
          </div>
        </motion.div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center text-[10px] text-white/50">
          GO
        </div>
      </div>
    </div>
  );
}
