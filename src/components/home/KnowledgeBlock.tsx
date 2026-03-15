"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Image, { StaticImageData } from "next/image";
import { useBreakpointValue } from "@/src/hooks/useBreakpointValue";

interface KnowledgeBlockProps {
  children: React.ReactNode;
  title: {
    imageFOMO: StaticImageData | string;
    text: string;
    imageQuestionMark?: StaticImageData | string;
  };
  triggerStart: string;
  triggerEnd: string;
  isFirstSection?: boolean;
  isSecondSection?: boolean;
  isLastSection?: boolean;
  strokeWidths?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
    "3xl"?: number;
  };
}

export default function KnowledgeBlock({
  children,
  title,
  triggerStart,
  triggerEnd,
  isFirstSection,
  isSecondSection,
  isLastSection,
  strokeWidths = { base: 2, sm: 3, md: 4, lg: 5, xl: 6, "3xl": 7 },
}: KnowledgeBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftPathRef = useRef<SVGPathElement>(null);
  const rightPathRef = useRef<SVGPathElement>(null);
  const strokeWidth = useBreakpointValue(strokeWidths) ?? 5;

  // Combined state for all layout measurements
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
    titleW: 0,
    titleX: 0,
  });

  // Resize observer to track container and title dimensions
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

        setLayout((prev) => {
          const next = {
            width: c.width,
            height: c.height,
            titleW: t.width,
            titleX: t.left - c.left,
          };

          // Only update if values actually changed more than 1px
          const isChanged =
            Math.abs(prev.width - next.width) > 1 ||
            Math.abs(prev.height - next.height) > 1 ||
            Math.abs(prev.titleW - next.titleW) > 1 ||
            Math.abs(prev.titleX - next.titleX) > 1;

          return isChanged ? next : prev;
        });
      });
    };

    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(titleEl);

    update();

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const { width, height, titleW, titleX } = layout;

  // Calculate SVG properties
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const r = isMobile ? 24 : 48;
  const safeW = width > 0 ? width : 100;
  const safeH = height > 0 ? height : 100;

  // Title gap offsets
  const tStart = titleX - 10;
  const tEnd = titleX + titleW + 10;

  // Prepare SVG paths with useMemo to avoid recalculation on unrelated renders
  const { leftPath, rightPath } = React.useMemo(() => {
    const startLeft = Math.max(r, Math.min(safeW - r, tStart));
    const startRight = Math.max(r, Math.min(safeW - r, tEnd));

    const lp = `
        M ${startLeft} 0
        L ${r} 0
        Q 0 0 0 ${r}
        L 0 ${safeH - r}
        Q 0 ${safeH} ${r} ${safeH}
        L ${safeW / 2} ${safeH}
     `;

    const rp = `
        M ${startRight} 0
        L ${safeW - r} 0
        Q ${safeW} 0 ${safeW} ${r}
        L ${safeW} ${safeH - r}
        Q ${safeW} ${safeH} ${safeW - r} ${safeH}
        L ${safeW / 2} ${safeH}
     `;

    return { leftPath: lp, rightPath: rp };
  }, [r, safeW, safeH, tStart, tEnd]);

  useGSAP(
    () => {
      const left = leftPathRef.current;
      const right = rightPathRef.current;
      const container = containerRef.current;

      if (!left || !right || !container) return;

      const lLength = left.getTotalLength();
      const rLength = right.getTotalLength();

      if (lLength === 0 || rLength === 0) return;

      // Initial state
      gsap.set([left, right], {
        strokeWidth: strokeWidth,
        autoAlpha: 1,
        strokeDasharray: (i) => (i === 0 ? lLength : rLength),
        strokeDashoffset: (i) => (i === 0 ? lLength : rLength),
      });

      // Unified animation for both paths
      const paths = [left, right];

      paths.forEach((path) => {
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: triggerStart,
            end: triggerEnd,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    {
      scope: containerRef,
      dependencies: [
        leftPath,
        rightPath,
        strokeWidth,
        triggerStart,
        triggerEnd,
      ],
    },
  );

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {/* Animation Border */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {width > 0 && height > 0 && (
          <svg
            width="100%"
            height="100%"
            className="overflow-visible will-change-transform"
          >
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
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="opacity-0"
            />
            <path
              ref={rightPathRef}
              d={rightPath}
              fill="none"
              stroke="url(#neonText)"
              strokeWidth={strokeWidth}
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
          data-cursor-expand
          className={`h-fit absolute top-1 2xl:top-1.25 3xl:top-1 -translate-y-[60%] z-10 left-1/2 -translate-x-1/2 flex justify-center items-center gap-1 sm:gap-2 md:gap-3 xl:gap-3
            ${isFirstSection ? "w-[150px] min-[355px]:w-[170px] min-[395px]:w-[200px] min-[450px]:w-[240px] min-[590px]:w-[290px] sm:w-[370px] md:w-[380px] xl:w-[410px] 2xl:w-[460px] 3xl:w-[620px] ps-1 sm:ps-2" : ""}
            ${isSecondSection ? "w-[150px] min-[355px]:w-[170px] min-[395px]:w-[200px] min-[450px]:w-[240px] min-[590px]:w-[290px] sm:w-[370px] md:w-[380px] xl:w-[410px] 2xl:w-[460px] 3xl:w-[650px]" : ""}
            ${isLastSection ? "w-[165px] min-[355px]:w-[190px] min-[395px]:w-[215px] min-[450px]:w-[260px] min-[590px]:w-[320px] sm:w-[400px] md:w-[420px] xl:w-[440px] 2xl:w-[500px] 3xl:w-[700px] flex-row-reverse" : "flex-row"}`}
        >
          <Image
            src={title.imageFOMO}
            alt="FOMO"
            width={400}
            height={400}
            className="w-auto h-[27px] min-[355px]:h-[30px] min-[395px]:h-[35px] min-[450px]:h-[40px] min-[590px]:h-[50px] sm:h-[60px] lg:h-[65px] 2xl:h-[70px] 3xl:h-[100px] object-contain shrink-0 pointer-events-none"
          />
          <div className="text-base min-[355px]:text-lg min-[395px]:text-xl min-[450px]:text-2xl min-[590px]:text-3xl sm:text-4xl md:text-[42px] 2xl:text-[52px] 3xl:text-7xl font-bold text-white whitespace-nowrap text-center">
            {title.text}
          </div>
          {title.imageQuestionMark && (
            <Image
              src={title.imageQuestionMark}
              alt="Question Mark"
              width={400}
              height={400}
              className="w-auto h-[23px] min-[355px]:h-[25px] min-[395px]:h-[30px] min-[450px]:h-[35px] min-[590px]:h-[45px] sm:h-[60px] md:h-[65px] xl:h-[80px] 3xl:h-[90px] object-contain shrink-0 pointer-events-none"
            />
          )}
        </div>
      )}
      {/* Content */}
      <div className="flex flex-col gap-4 sm:gap-5 2xl:gap-10 3xl:gap-12 px-4 sm:px-6 xl:px-7 2xl:px-8 3xl:px-10 pb-4 sm:pb-6 xl:pb-7 2xl:pb-8 3xl:pb-10 pt-8 min-[450px]:pt-10 sm:pt-12 lg:pt-14 xl:pt-16 2xl:pt-18 3xl:pt-22">
        {children}
      </div>
    </div>
  );
}
