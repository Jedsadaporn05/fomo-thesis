"use client";

import React, { useRef, useState, useEffect, useMemo, useId } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

function getOrthogonalPath(
  startX: number,
  endX: number,
  height: number,
  radius: number = 40,
): string {
  const horizontalDist = Math.abs(endX - startX);
  const midY = height / 2;

  if (horizontalDist < 10) {
    return `M ${startX} 0 L ${endX} ${height}`;
  }

  const direction = startX > endX ? -1 : 1;
  const r = Math.min(radius, horizontalDist / 2, height / 2);

  return `
    M ${startX} 0
    L ${startX} ${midY - r}
    Q ${startX} ${midY} ${startX + r * direction} ${midY}
    L ${endX - r * direction} ${midY}
    Q ${endX} ${midY} ${endX} ${midY + r}
    L ${endX} ${height}
  `;
}

interface KnowledgeLineProps {
  x1?: number;
  x2?: number;
  className?: string;
  hasDiamondStart?: boolean;
  hasDiamondEnd?: boolean;
}

export default function KnowledgeLine({
  x1 = 50,
  x2 = 50,
  className,
  hasDiamondStart = true,
  hasDiamondEnd = true,
}: KnowledgeLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const uniqueId = useId();

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { width, height } = dimensions;

  /* Scroll animation */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });

  const delayedProgress = useTransform(scrollYProgress, [0.15, 1], [0, 1]);
  const pathLength = useSpring(delayedProgress, {
    stiffness: 300,
    damping: 80,
  });

  const lineOpacity = useTransform(pathLength, [0, 0.05], [0, 1]);

  const startScale = useTransform(pathLength, [0, 0.1], [0, 1]);
  const startOpacity = useTransform(pathLength, [0, 0.05], [0, 1]);
  const endScale = useTransform(pathLength, [0.9, 1], [0, 1]);
  const endOpacity = useTransform(pathLength, [0.9, 1], [0, 1]);

  /* Path */
  const path = useMemo(() => {
    if (!width || !height) return "";
    return getOrthogonalPath(
      (x1 / 100) * width,
      (x2 / 100) * width,
      height,
      60,
    );
  }, [width, height, x1, x2]);

  if (!width || !height) {
    return <div ref={containerRef} className={`w-full h-full ${className}`} />;
  }

  const startX = (x1 / 100) * width;
  const endX = (x2 / 100) * width;

  const diamondSize = 14;
  const half = diamondSize;

  const diamondPath = (cx: number, cy: number) => `
    M ${cx} ${cy - half}
    L ${cx + half} ${cy}
    L ${cx} ${cy + half}
    L ${cx - half} ${cy}
    Z
  `;

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        shapeRendering="geometricPrecision"
        className="overflow-visible"
      >
        <defs>
          <linearGradient
            id={`knowledgeGradient-${uniqueId}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF699D" />
            <stop offset="100%" stopColor="#FF699D" />
          </linearGradient>
          <filter
            id={`glow-${uniqueId}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Line */}
        <motion.path
          d={path}
          fill="none"
          stroke={`url(#knowledgeGradient-${uniqueId})`}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength, opacity: lineOpacity }}
        />

        {/* Diamond Start */}
        {hasDiamondStart && (
          <motion.path
            d={diamondPath(startX, 0)}
            fill="#FF699D"
            style={{
              scale: startScale,
              opacity: startOpacity,
              transformOrigin: `${startX}px 0px`,
            }}
          />
        )}

        {/* Diamond End */}
        {hasDiamondEnd && (
          <motion.path
            d={diamondPath(endX, height)}
            fill="#FF699D"
            style={{
              scale: endScale,
              opacity: endOpacity,
              transformOrigin: `${endX}px ${height}px`,
            }}
          />
        )}
      </svg>
    </div>
  );
}
