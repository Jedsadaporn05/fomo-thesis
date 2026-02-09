"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface KnowledgeBlockProps {
  children: React.ReactNode;
  title: {
    imageFOMO: StaticImageData | string;
    text: string;
    imageQuestionMark?: StaticImageData | string;
  };
  className: string;
  triggerStart: string;
  triggerEnd: string;
  isLastSection?: boolean;
}

export default function KnowledgeBlock({
  children,
  title,
  className,
  triggerStart,
  triggerEnd,
  isLastSection,
}: KnowledgeBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftPathRef = useRef<SVGPathElement>(null);
  const rightPathRef = useRef<SVGPathElement>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [titleRect, setTitleRect] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  // Resize observer
  useEffect(() => {
    const container = containerRef.current;
    const titleEl = titleRef.current;
    if (!container || !titleEl) return;

    let rafId: number | null = null;

    const update = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const c = container.getBoundingClientRect();
        const t = titleEl.getBoundingClientRect();

        setDimensions((prev) =>
          prev.width === c.width && prev.height === c.height
            ? prev
            : { width: c.width, height: c.height },
        );

        setTitleRect((prev) => {
          const next = {
            width: t.width,
            height: t.height,
            x: t.left - c.left,
            y: t.top - c.top,
          };

          return prev.width === next.width &&
            prev.height === next.height &&
            prev.x === next.x &&
            prev.y === next.y
            ? prev
            : next;
        });
      });
    };

    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(titleEl);

    update();
  }, [isLastSection]);

  const { width, height } = dimensions;
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const r = isMobile ? 24 : 48;
  const safeW = width > 0 ? width : 100;
  const safeH = height > 0 ? height : 100;
  const tStart = titleRect.x - 10;
  const tEnd = titleRect.x + titleRect.width + 10;

  // Prepare paths
  const leftPath = React.useMemo(() => {
    const startLeft = Math.max(r, Math.min(safeW - r, tStart));
    return `
        M ${startLeft} 0
        L ${r} 0
        Q 0 0 0 ${r}
        L 0 ${safeH - r}
        Q 0 ${safeH} ${r} ${safeH}
        L ${safeW / 2} ${safeH}
     `;
  }, [r, safeW, safeH, tStart]);

  const rightPath = React.useMemo(() => {
    const startRight = Math.max(r, Math.min(safeW - r, tEnd));
    return `
        M ${startRight} 0
        L ${safeW - r} 0
        Q ${safeW} 0 ${safeW} ${r}
        L ${safeW} ${safeH - r}
        Q ${safeW} ${safeH} ${safeW - r} ${safeH}
        L ${safeW / 2} ${safeH}
     `;
  }, [r, safeW, safeH, tEnd]);

  useGSAP(
    () => {
      if (
        !leftPathRef.current ||
        !rightPathRef.current ||
        !containerRef.current
      )
        return;

      const left = leftPathRef.current;
      const right = rightPathRef.current;

      const lLength = left.getTotalLength();
      const rLength = right.getTotalLength();

      gsap.set([left, right], { autoAlpha: 1 });

      gsap.fromTo(
        left,
        { strokeDasharray: lLength, strokeDashoffset: lLength },
        {
          strokeDashoffset: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
            end: triggerEnd,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        right,
        { strokeDasharray: rLength, strokeDashoffset: rLength },
        {
          strokeDashoffset: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
            end: triggerEnd,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    {
      scope: containerRef,
      dependencies: [leftPath, rightPath],
    },
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Animation Border */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {width > 0 && height > 0 && (
          <svg width="100%" height="100%" className="overflow-visible">
            <defs>
              <linearGradient id="neonText" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF0059" />
                <stop offset="100%" stopColor="#FF82AE" />
              </linearGradient>
            </defs>
            <path
              ref={leftPathRef}
              d={leftPath}
              fill="none"
              stroke="url(#neonText)"
              strokeWidth="6"
              strokeLinecap="round"
              className="opacity-0"
            />
            <path
              ref={rightPathRef}
              d={rightPath}
              fill="none"
              stroke="url(#neonText)"
              strokeWidth="6"
              strokeLinecap="round"
              className="opacity-0"
            />
          </svg>
        )}
      </div>
      {/* Title */}
      {title && (
        <div
          ref={titleRef}
          className={cn(
            "absolute top-0 -translate-y-[60%] z-10 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 lg:gap-3",
            className,
            isLastSection ? "flex-row-reverse" : "flex-row",
          )}
        >
          <Image
            src={title.imageFOMO}
            alt="FOMO"
            width={300}
            height={300}
            className="w-[77px] lg:w-[300px] h-full object-contain lg:object-cover"
          />
          <div className="text-lg sm:text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-bold text-white whitespace-nowrap text-center">
            {title.text}
          </div>
          {title.imageQuestionMark && (
            <Image
              src={title.imageQuestionMark}
              alt="Question Mark"
              width={300}
              height={300}
              className="w-[50px] lg:w-[80px] h-[50px] lg:h-[80px] object-contain lg:object-cover"
            />
          )}
        </div>
      )}
      {/* Content */}
      <div className="flex flex-col gap-1 lg:gap-4 px-6 lg:px-10 py-6 lg:py-12 pt-10 lg:pt-16">
        {children}
      </div>
    </div>
  );
}
