"use client";

import { useState, useEffect, memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { FileText, XIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useClickSound } from "@/src/hooks/useClickSound";
import QRCode from "@/public/QRcode.png";

const EvaluationForm = memo(function EvaluationForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState<boolean>(false);

  const playClickSound = useClickSound();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasOpenedOnce(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="container mx-auto w-[85vw] sm:max-w-md rounded-3xl sm:rounded-4xl bg-[#0a1533]/80 backdrop-blur-sm border-2 border-white/10 text-white p-2 md:p-3 lg:p-4 overflow-hidden outline-none landscape:p-2 landscape:md:p-3 landscape:lg:p-4 landscape:xl:p-6 landscape:max-w-xs landscape:md:max-w-md landscape:rounded-2xl landscape:sm:rounded-3xl landscape:md:rounded-4xl">
          <div className="relative px-3 lg:px-2 xl:px-1 pt-1">
            <div className="flex flex-row justify-between items-center mb-0 lg:mb-1">
              <DialogHeader>
                <DialogTitle className="text-base sm:text-lg md:text-2xl xl:text-[26px] font-black tracking-tight text-white landscape:text-sm landscape:sm:text-base landscape:md:text-xl landscape:xl:text-[26px]">
                  แบบประเมินความพึงพอใจ
                </DialogTitle>
              </DialogHeader>
              <DialogClose
                onClick={() => {
                  setIsOpen(false);
                  playClickSound();
                }}
                className="py-1 transition-all group cursor-pointer"
              >
                <XIcon
                  strokeWidth={2.5}
                  className="text-white group-hover:text-[#FF2D77] group-hover:rotate-90 transition-all duration-300 size-4 md:size-5 lg:size-6 landscape:size-5 landscape:md:size-6"
                />
              </DialogClose>
            </div>
            <DialogDescription className="text-sm sm:text-base lg:text-lg font-medium text-white/90 leading-relaxed landscape:text-[10px] landscape:sm:text-xs landscape:md:text-base landscape:lg:text-lg pt-0.5 lg:pt-1">
              ขอบคุณที่รับชมจนจบ !{" "}
              &ldquo;รบกวนช่วยประเมินความพึงพอใจในการใช้งานเว็บไซต์ให้หน่อยนะ&rdquo;
            </DialogDescription>
          </div>
          <div className="w-full flex flex-col items-center gap-2 md:gap-4 lg:gap-6 pb-1 lg:pb-2">
            <div className="relative mx-auto w-full max-w-30 sm:max-w-40 md:max-w-50 lg:max-w-60 aspect-square rounded-2xl p-2 sm:p-3 landscape:max-w-25 landscape:sm:max-w-30 landscape:md:max-w-40 landscape:lg:max-w-50 landscape:xl:max-w-60">
              <Image
                src={QRCode}
                alt="QR Code แบบประเมินความพึงพอใจ"
                fill
                priority
                className="object-contain pointer-events-none"
              />
            </div>
            <Link
              href="https://forms.gle/U58BhcgmCe8qkE7V8"
              target="_blank"
              onClick={() => {
                setIsOpen(false);
                playClickSound();
              }}
              className="w-full h-fit flex items-center justify-center py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#E51E5A] hover:bg-[#cf1d56] text-white text-sm sm:text-base md:text-xl font-semibold shadow-[0_0_20px_rgba(255,45,119,0.3)] transition-all duration-300 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D77] relative overflow-hidden group landscape:text-xs landscape:sm:text-sm landscape:md:text-lg landscape:lg:text-xl landscape:py-2 landscape:sm:py-2.75 landscape:md:py-3 landscape:lg:py-4"
            >
              ไปที่ฟอร์มแบบประเมิน
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {!isOpen && hasOpenedOnce && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            aria-label="แบบประเมินความพึงพอใจ"
            onClick={() => {
              setIsOpen(true);
              playClickSound();
            }}
            className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 lg:right-5 xl:right-6 2xl:right-7 z-50 cursor-pointer pointer-events-auto group flex items-center justify-center w-6.25 h-6.25 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-13 2xl:w-12 3xl:w-14 lg:h-13 2xl:h-12 3xl:h-14 landscape:w-6 landscape:sm:w-8 landscape:md:w-10 landscape:lg:w-13 landscape:h-6 landscape:sm:h-8 landscape:md:h-10 landscape:lg:h-13 rounded-full bg-[#0a1635]/90 text-white shadow-lg backdrop-blur-sm transition-all duration-300 border border-white/20 outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D77]"
          >
            <FileText
              strokeWidth={2}
              className="size-3.25 sm:size-4 md:size-5 lg:size-6 3xl:size-7 text-white group-hover:text-[#E51E5A] transition-all duration-300"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
});

export default EvaluationForm;
