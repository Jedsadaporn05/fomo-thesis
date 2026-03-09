"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBreakpointValue } from "@/src/hooks/useBreakpointValue";

gsap.registerPlugin(ScrollTrigger);

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
  strokeWidths?: {
    lg?: number;
    xl?: number;
    "2xl"?: number;
    "3xl"?: number;
  };
  diamondSizes?: {
    lg?: number;
    xl?: number;
    "2xl"?: number;
    "3xl"?: number;
  };
}

export default function KnowledgeLine({
  x1 = 50,
  x2 = 50,
  className,
  hasDiamondStart = true,
  hasDiamondEnd = true,
  strokeWidths = { lg: 5, xl: 6, "3xl": 7 },
  diamondSizes = { lg: 12, xl: 14, "3xl": 16 },
}: KnowledgeLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const startDiamondRef = useRef<SVGPathElement>(null);
  const endDiamondRef = useRef<SVGPathElement>(null);
  const strokeWidth = useBreakpointValue(strokeWidths) ?? 6;
  const diamondSize = useBreakpointValue(diamondSizes) ?? 24;

  const [size, setSize] = useState({ width: 0, height: 0 });

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let refreshTimeout: number | NodeJS.Timeout;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setSize((prev) =>
          prev.width === width && prev.height === height
            ? prev
            : { width, height },
        );

        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => {
          ScrollTrigger.refresh(true);
        }, 150);
      });
    });

    ro.observe(el);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(refreshTimeout);
      ro.disconnect();
    };
  }, []);

  const { width, height } = size;

  // Calculate start and end X positions
  const startX = (x1 / 100) * width;
  const endX = (x2 / 100) * width;

  // Calculate path
  const path = useMemo(() => {
    if (!width || !height) return "";
    return getOrthogonalPath(startX, endX, height, 60);
  }, [width, height, startX, endX]);

  const half = diamondSize;

  const diamondPath = useCallback(
    (cx: number, cy: number) => `
    M ${cx} ${cy - half}
    L ${cx + half} ${cy}
    L ${cx} ${cy + half}
    L ${cx - half} ${cy}
    Z
  `,
    [half],
  );

  useGSAP(
    () => {
      if (!pathRef.current || !width || !height) return;

      const length = pathRef.current.getTotalLength();

      if (length === 0) return;

      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
        autoAlpha: 0,
      });

      gsap.set([startDiamondRef.current, endDiamondRef.current], {
        autoAlpha: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 80%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
        defaults: {
          immediateRender: false,
        },
      });

      if (hasDiamondStart && startDiamondRef.current) {
        tl.to(
          startDiamondRef.current,
          {
            autoAlpha: 1,
            duration: 0.05,
            ease: "power1.out",
          },
          0,
        );
      }

      // Draw line
      tl.to(
        pathRef.current,
        {
          autoAlpha: 1,
          strokeDashoffset: 0,
          duration: 1,
          ease: "none",
        },
        0,
      );

      if (hasDiamondEnd && endDiamondRef.current) {
        tl.to(
          endDiamondRef.current,
          {
            autoAlpha: 1,
            duration: 0.1,
            ease: "power1.out",
          },
          0.9,
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [path, width, height], scope: containerRef },
  );

  if (!width || !height) {
    return <div ref={containerRef} className={`w-full h-full ${className}`} />;
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible will-change-transform"
        shapeRendering="geometricPrecision"
      >
        {/* Line */}
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke="#FF699D"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Diamond Start */}
        {hasDiamondStart && (
          <path
            ref={startDiamondRef}
            d={diamondPath(startX, 0)}
            fill="#FF699D"
          />
        )}

        {/* Diamond End */}
        {hasDiamondEnd && (
          <path
            ref={endDiamondRef}
            d={diamondPath(endX, height)}
            fill="#FF699D"
          />
        )}
      </svg>
    </div>
  );
}
