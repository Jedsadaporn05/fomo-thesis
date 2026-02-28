"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Image, { StaticImageData } from "next/image";

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
}

export default function KnowledgeBlock({
  children,
  title,
  triggerStart,
  triggerEnd,
  isFirstSection,
  isSecondSection,
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

      ScrollTrigger.matchMedia({
        "(max-width: 639px)": () => {
          gsap.set([left, right], { strokeWidth: 5 });
        },
        "(min-width: 640px)": () => {
          gsap.set([left, right], { strokeWidth: 6 });
        },
      });

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
    <div ref={containerRef} className="w-full h-full relative">
      {/* Animation Border */}
      <div className="absolute inset-0 pointer-events-none z-10">
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
              strokeWidth="5"
              strokeLinecap="round"
              className="opacity-0"
            />
            <path
              ref={rightPathRef}
              d={rightPath}
              fill="none"
              stroke="url(#neonText)"
              strokeWidth="5"
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
          className={`h-fit absolute top-1 2xl:top-1.25 3xl:top-1 -translate-y-[60%] z-10 left-1/2 -translate-x-1/2 flex justify-center items-center gap-1 sm:gap-2 md:gap-3 xl:gap-3
            ${isFirstSection ? "w-[150px] min-[355px]:w-[180px] min-[395px]:w-[200px] min-[450px]:w-[240px] min-[590px]:w-[290px] sm:w-[370px] md:w-[400px] xl:w-[450px] 2xl:w-[470px] 3xl:w-[620px] ps-1 sm:ps-2" : ""}
            ${isSecondSection ? "w-[150px] min-[355px]:w-[180px] min-[395px]:w-[200px] min-[450px]:w-[240px] min-[590px]:w-[290px] sm:w-[370px] md:w-[400px] xl:w-[440px] 2xl:w-[470px] 3xl:w-[650px]" : ""}
            ${isLastSection ? "w-[165px] min-[355px]:w-[200px] min-[395px]:w-[215px] min-[450px]:w-[260px] min-[590px]:w-[320px] sm:w-[400px] md:w-[440px] xl:w-[480px] 2xl:w-[510px] 3xl:w-[700px] flex-row-reverse" : "flex-row"}`}
        >
          <Image
            src={title.imageFOMO}
            alt="FOMO"
            width={400}
            height={400}
            priority
            className="w-auto h-[27px] min-[355px]:h-[30px] min-[395px]:h-[35px] min-[450px]:h-[40px] min-[590px]:h-[50px] sm:h-[65px] 3xl:h-[100px] object-contain shrink-0"
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
              priority
              className="w-auto h-[23px] min-[355px]:h-[25px] min-[395px]:h-[30px] min-[450px]:h-[35px] min-[590px]:h-[45px] sm:h-[60px] md:h-[65px] xl:h-[80px] 3xl:h-[90px] object-contain shrink-0"
            />
          )}
        </div>
      )}
      {/* Content */}
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 2xl:gap-12 px-5 min-[450px]:px-6 sm:px-8 3xl:px-12 pb-5 min-[450px]:pb-6 sm:pb-8 lg:pb-10 xl:pb-12 pt-8 min-[450px]:pt-10 sm:pt-12 md:pt-14 lg:pt-16 xl:pt-22">
        {children}
      </div>
    </div>
  );
}
