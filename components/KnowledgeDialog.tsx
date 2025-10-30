"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

interface CardData {
  id: number;
  title: string;
  btnText?: string;
  newDialog?: {
    id: number;
    spans: {
      text: string;
      isColor: boolean;
    }[];
  }[];
  contentDialog?: {
    id: number;
    spans: {
      text: string;
      isColor: boolean;
    }[];
  }[];
}

export default function KnowledgeDialog({
  card,
}: Readonly<{ card: CardData }>) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isConsultOpen, setConsultOpen] = useState(false);

  const handleOpenConsult = () => {
    setDialogOpen(false);
    setConsultOpen(true);
  };

  return (
    <div>
      {/* Border Card */}
      <Dialog key={card.id} open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div className="group w-full 2xl:min-w-[300px] h-full min-h-[250px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px] 2xl:min-h-[600px] grid col-span-1 rounded-3xl sm:rounded-4xl bg-gradient-to-b from-[#ff0059] via-[#d00148]/80 to-[#470019] cursor-pointer hover:scale-105 hover:[&>div]:border-white transition-all duration-500 ease-in-out">
            <div className="border-3 sm:border-4 border-gray-400/80 m-2 sm:m-3 rounded-2xl sm:rounded-3xl">
              {/* Title */}
              <div className="w-full h-full flex flex-col justify-center items-center">
                <h2 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-bold text-center tracking-normal leading-normal text-gray-300 group-hover:text-white whitespace-pre-line">
                  {card.title}
                </h2>
              </div>
            </div>
          </div>
        </DialogTrigger>
        {/* Content Dialog 1 */}
        <DialogContent
<<<<<<< HEAD
          className="w-full min-w-[70dvw] sm:min-w-[85dvw] lg:min-w-[75dvw] h-auto border-black rounded-3xl sm:rounded-4xl bg-gradient-to-b from-[#000000] to-[#071A44]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Border */}
          <div className="absolute -top-1 sm:-top-2 md:-top-3 lg:-top-4 left-1/2 -translate-x-1/2 rounded-full border-t border-white/50 py-2 sm:py-3 md:py-4 lg:py-5 px-6 sm:px-8 md:px-10 lg:px-12 bg-gradient-to-r from-[#FF0059] to-[#D6004B]">
            {/* Title */}
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white whitespace-nowrap">
=======
          className="w-full min-w-[85dvw] 2xl:min-w-[70dvw] h-auto border-black rounded-4xl bg-gradient-to-b from-[#000000] to-[#071A44]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Title */}
          <div className="absolute top-0 md:-top-3 lg:-top-5 left-1/2 -translate-x-1/2 rounded-full border-t border-white/50 py-3 md:py-5 xl:py-6 px-8 md:px-10 lg:px-12 xl:px-15 bg-gradient-to-r from-[#FF0059] to-[#D6004B]">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white whitespace-nowrap">
>>>>>>> 37f5f2663788403d2226c40f228fbd496c56af6b
              {card.title}
            </h2>
          </div>
          {/* Content Details */}
<<<<<<< HEAD
          <DialogTitle className="flex justify-center border-2 sm:border-3 md:border-4 2xl:border-5 border-white rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 py-6 sm:py-10 md:py-14 lg:py-18 xl:py-20 pt-10 sm:pt-14 md:pt-20 lg:pt-24 xl:pt-26">
            <DialogDescription asChild>
              <div className="flex flex-col gap-3 sm:gap-5 md:gap-7 lg:gap-9 xl:gap-10 2xl:gap-12">
=======
          <DialogTitle className="border-6 border-white rounded-3xl px-6 md:px-8 xl:px-12 py-8 md:py-12 2xl:py-24 pt-15 md:pt-20 xl:pt-24 2xl:pt-28">
            <DialogDescription asChild>
              <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 xl:gap-12">
>>>>>>> 37f5f2663788403d2226c40f228fbd496c56af6b
                {card.contentDialog ? (
                  card.contentDialog?.map((block) => (
                    <p key={block.id}>
                      {block.spans?.map((text) => (
                        <span
                          key={text.text}
<<<<<<< HEAD
                          className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl tracking-normal leading-normal ${
=======
                          className={`text-sm md:text-base lg:text-lg xl:text-2xl 2xl:text-3xl ${
>>>>>>> 37f5f2663788403d2226c40f228fbd496c56af6b
                            text.isColor
                              ? "text-[#FF5D96] font-bold"
                              : "text-white font-medium"
                          } md:whitespace-pre-line`}
                        >
                          {text.text}
                        </span>
                      ))}
                    </p>
                  ))
                ) : (
                  <p className="text-3xl font-bold text-white text-center py-50">
                    เนื้อหาเร็ว ๆ นี้...
                  </p>
                )}
                {/* Button */}
                <button
                  onClick={handleOpenConsult}
<<<<<<< HEAD
                  className={`w-fit py-2 md:py-3 lg:py-4 px-3 md:px-4 lg:px-5 rounded-full border-2 sm:border-3 md:border-4 border-[#588CFF] cursor-pointer hover:bg-[#588CFF]/70 hover:scale-105 transition-all duration-300 ease-in-out
                        ${card.btnText ? "block" : "hidden"}
=======
                  className={`w-fit py-3 md:py-4 px-4 md:px-6 rounded-full border-4 md:border-5 border-[#588CFF] cursor-pointer hover:bg-[#588CFF]/70 hover:scale-105 transition-all duration-300 ease-in-out
                        ${card.btnText ? "block" : "hidden"}
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white whitespace-nowrap
>>>>>>> 37f5f2663788403d2226c40f228fbd496c56af6b
                      `}
                >
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold text-white whitespace-nowrap">
                    {card.btnText}
                  </p>
                </button>
              </div>
            </DialogDescription>
          </DialogTitle>
        </DialogContent>
      </Dialog>
      {/* Content Dialog 2 */}
      <Dialog open={isConsultOpen} onOpenChange={setConsultOpen}>
        <DialogContent className="w-full min-w-[70dvw] sm:min-w-[85dvw] lg:min-w-[75dvw] h-auto border-black rounded-3xl sm:rounded-4xl bg-gradient-to-b from-[#000000] to-[#390316]">
          {/* Title */}
<<<<<<< HEAD
          <div className="absolute -top-1 sm:-top-2 md:-top-3 lg:-top-4 left-1/2 -translate-x-1/2 rounded-full border-t border-white/50 py-2 sm:py-3 md:py-4 lg:py-5 px-6 sm:px-8 md:px-10 lg:px-12 bg-[#214BA9]">
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white whitespace-nowrap">
=======
          <div className="absolute top-0 md:-top-3 lg:-top-5 left-1/2 -translate-x-1/2 rounded-full border-t border-white/50 py-3 md:py-5 xl:py-6 px-8 md:px-10 lg:px-12 xl:px-15 bg-[#214BA9]">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white whitespace-nowrap">
>>>>>>> 37f5f2663788403d2226c40f228fbd496c56af6b
              {card.btnText}
            </h2>
          </div>
          {/* Content Details */}
<<<<<<< HEAD
          <DialogTitle className="flex justify-center border-2 sm:border-3 md:border-4 2xl:border-5 border-white rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 py-6 sm:py-10 md:py-14 lg:py-18 xl:py-20 pt-10 sm:pt-14 md:pt-20 lg:pt-24 xl:pt-26">
            <DialogDescription asChild>
              <div className="flex flex-col gap-3 sm:gap-5 md:gap-7 lg:gap-9 xl:gap-10 2xl:gap-12">
=======
          <DialogTitle className="border-6 borderwhite rounded-3xl px-6 md:px-8 xl:px-12 py-8 md:py-12 2xl:py-24 pt-15 md:pt-20 xl:pt-24 2xl:pt-28">
            <DialogDescription asChild>
              <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 xl:gap-12">
>>>>>>> 37f5f2663788403d2226c40f228fbd496c56af6b
                {card.newDialog ? (
                  card.newDialog?.map((block) => (
                    <p key={block.id}>
                      {block.spans?.map((text) => (
                        <span
                          key={text.text}
<<<<<<< HEAD
                          className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl tracking-normal leading-normal ${
=======
                          className={`text-sm md:text-base lg:text-lg xl:text-2xl 2xl:text-3xl ${
>>>>>>> 37f5f2663788403d2226c40f228fbd496c56af6b
                            text.isColor
                              ? "text-[#8DB0FF] font-bold"
                              : "text-white font-medium"
                          } whitespace-pre-line`}
                        >
                          {text.text}
                        </span>
                      ))}
                    </p>
                  ))
                ) : (
                  <p className="text-3xl font-bold text-white text-center py-50">
                    เนื้อหาเร็ว ๆ นี้...
                  </p>
                )}
              </div>
            </DialogDescription>
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
}
