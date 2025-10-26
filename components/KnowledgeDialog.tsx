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
          <div className="group min-w-full 2xl:min-w-[300px] h-full min-h-[300px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px] 2xl:min-h-[600px] grid col-span-1 rounded-4xl bg-gradient-to-b from-[#ff0059] via-[#d00148]/80 to-[#470019] cursor-pointer hover:scale-105 hover:[&>div]:border-white transition-all duration-500 ease-in-out">
            <div className="border-4 border-gray-400/80 m-3 rounded-4xl">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-300 group-hover:text-white whitespace-pre-line text-center">
                  {card.title}
                </h2>
              </div>
            </div>
          </div>
        </DialogTrigger>
        {/* Content Dialog */}
        <DialogContent
          className="w-full min-w-[70dvw] h-auto border-black rounded-4xl bg-gradient-to-b from-[#000000] to-[#071A44]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Title */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full border-t border-white/50 py-6 px-15 bg-gradient-to-r from-[#FF0059] to-[#D6004B]">
            <h2 className="text-5xl font-bold text-white whitespace-nowrap">
              {card.title}
            </h2>
          </div>
          {/* Content Details */}
          <DialogTitle className="border-6 border-white rounded-3xl p-12 py-24 pt-28">
            <DialogDescription asChild>
              <div className="flex flex-col gap-12">
                {card.contentDialog ? (
                  card.contentDialog?.map((block) => (
                    <p key={block.id}>
                      {block.spans?.map((text) => (
                        <span
                          key={text.text}
                          className={`text-3xl ${
                            text.isColor
                              ? "text-[#FF5D96] font-bold"
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
                {/* Button */}
                <button
                  onClick={handleOpenConsult}
                  className={`w-fit py-4 px-6 rounded-full border-5 border-[#588CFF] cursor-pointer hover:bg-[#588CFF]/70 hover:scale-105 transition-all duration-300 ease-in-out
                        ${card.btnText ? "block" : "hidden"}
                        text-2xl font-bold text-white whitespace-nowrap
                      `}
                >
                  {card.btnText}
                </button>
              </div>
            </DialogDescription>
          </DialogTitle>
        </DialogContent>
      </Dialog>
      {/* Dialog 2 */}
      <Dialog open={isConsultOpen} onOpenChange={setConsultOpen}>
        <DialogContent className="w-full min-w-[70dvw] h-auto border-black rounded-4xl bg-gradient-to-b from-[#000000] to-[#390316]">
          {/* Title */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full border-t border-white/50 py-6 px-15 bg-[#214BA9]">
            <h2 className="text-5xl font-bold text-white whitespace-nowrap">
              {card.btnText}
            </h2>
          </div>
          {/* Content Details */}
          <DialogTitle className="border-6 borderwhite rounded-3xl p-12 py-24 pt-28">
            <DialogDescription asChild>
              <div className="flex flex-col gap-12">
                {card.newDialog ? (
                  card.newDialog?.map((block) => (
                    <p key={block.id}>
                      {block.spans?.map((text) => (
                        <span
                          key={text.text}
                          className={`text-3xl ${
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
