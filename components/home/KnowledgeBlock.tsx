"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface KnowledgeBlockProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function KnowledgeBlock({
  title,
  children,
}: KnowledgeBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [titleRect, setTitleRect] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }

      if (titleRef.current && containerRef.current) {
        const tParams = titleRef.current.getBoundingClientRect();
        const cParams = containerRef.current.getBoundingClientRect();

        setTitleRect({
          width: tParams.width,
          height: tParams.height,
          x: tParams.left - cParams.left,
          y: tParams.top - cParams.top,
        });
      }
    });

    observer.observe(containerRef.current);
    if (titleRef.current) observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, [title]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  const opacity = useTransform(pathLength, [0, 0.01, 0.05], [0, 0, 1]);

  const { width, height } = dimensions;
  const r = 48;

  const safeW = width > 0 ? width : 100;
  const safeH = height > 0 ? height : 100;
  const tStart = titleRect.x - 10;
  const tEnd = titleRect.x + titleRect.width + 10;

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

  return (
    <div ref={containerRef}>
      {/* Animation Border */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {width > 0 && height > 0 && (
          <svg width="100%" height="100%" className="overflow-visible">
            <defs>
              <linearGradient id="neonText" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0059" />
                <stop offset="100%" stopColor="#ff2d77" />
              </linearGradient>
            </defs>
            {/* Left Side Path */}
            <motion.path
              d={leftPath}
              fill="none"
              stroke="#FF2D77"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ pathLength, opacity }}
            />
            {/* Right Side Path */}
            <motion.path
              d={rightPath}
              fill="none"
              stroke="#FF2D77"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ pathLength, opacity }}
            />
          </svg>
        )}
      </div>
      {/* Title */}
      {title && (
        <div
          ref={titleRef}
          className={cn(
            "absolute top-0 -translate-y-[50%] z-10 left-1/2 -translate-x-1/2",
          )}
        >
          <div className="text-3xl md:text-5xl lg:text-7xl font-bold text-white whitespace-nowrap text-center">
            {title}
          </div>
        </div>
      )}
      {/* Content */}
      <div className="flex flex-col gap-4 px-8 md:px-10 py-12 pt-16">
        {children}
      </div>
    </div>
  );
}
