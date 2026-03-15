"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useIsDesktop from "@/src/hooks/useIsDesktop";

export default function CustomCursor() {
  const isDesktop = useIsDesktop();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isDesktop || !window.matchMedia("(pointer: fine)").matches) return;

      const dot = dotRef.current;
      const ring = ringRef.current;
      const outerRing = outerRingRef.current;
      const ripple = rippleRef.current;
      const trailContainer = trailContainerRef.current;
      if (!dot || !ring || !outerRing || !ripple || !trailContainer) return;

      let trailThrottle = 0;
      let mouseX = 0;
      let mouseY = 0;
      let isOnClickable = false;

      // Trail
      const spawnTrail = (x: number, y: number) => {
        const now = Date.now();
        if (now - trailThrottle < 35) return;
        trailThrottle = now;

        if (trailContainer.children.length >= 40) {
          trailContainer.firstChild?.remove();
        }

        const particle = document.createElement("div");
        const size = Math.random() * 5 + 2;
        const dx = (Math.random() - 0.5) * 10;
        const dy = (Math.random() - 0.5) * 10;

        Object.assign(particle.style, {
          position: "fixed",
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          backgroundColor: isOnClickable ? "#E51E5A" : "rgba(229,30,90,0.3)",
          pointerEvents: "none",
          left: `${x - size / 2 + dx}px`,
          top: `${y - size / 2 + dy}px`,
          willChange: "transform, opacity",
        });

        trailContainer.appendChild(particle);
        gsap.fromTo(
          particle,
          { opacity: 0.8, scale: 1 },
          {
            opacity: 0,
            scale: 0,
            y: -(Math.random() * 8 + 4),
            duration: 0.45 + Math.random() * 0.25,
            ease: "power1.out",
            onComplete: () => particle.remove(),
          },
        );
      };

      // Mouse move
      const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.to(dot, {
          x: mouseX,
          y: mouseY,
          duration: 0.05,
          ease: "none",
          overwrite: "auto",
        });
        gsap.to(ring, {
          x: mouseX,
          y: mouseY,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(outerRing, {
          x: mouseX,
          y: mouseY,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        });

        spawnTrail(mouseX, mouseY);
      };

      // Hover
      const onMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const clickable =
          target.closest("button") ||
          target.closest("a") ||
          target.closest(".cursor-pointer") ||
          target.closest("[data-cursor-expand]");

        if (clickable) {
          isOnClickable = true;
          gsap.killTweensOf([dot, ring, outerRing]);

          gsap.to(dot, { scale: 0.6, duration: 0.2, ease: "power1.out" });

          // Ring expands
          gsap.to(ring, {
            scale: 2.5,
            opacity: 0.75,
            backgroundColor: "#E51E5A",
            borderColor: "transparent",
            duration: 0.3,
            ease: "power1.out",
          });

          gsap.to(outerRing, {
            scale: 2.5,
            opacity: 0.55,
            duration: 0.4,
            ease: "power1.out",
          });
        } else {
          isOnClickable = false;
          gsap.killTweensOf([dot, ring, outerRing]);

          gsap.to(dot, { scale: 1, duration: 0.3, ease: "power1.out" });
          gsap.to(ring, {
            scale: 1,
            opacity: 1,
            backgroundColor: "transparent",
            duration: 0.3,
            ease: "power1.out",
          });
          gsap.to(outerRing, {
            scale: 1,
            opacity: 0,
            duration: 0.25,
            ease: "power1.out",
          });
        }
      };

      // Click
      const onMouseDown = () => {
        gsap.killTweensOf(ripple);
        gsap.set(ripple, { x: mouseX, y: mouseY, scale: 0.5, opacity: 0.7 });
        gsap.to(ripple, {
          scale: 5,
          opacity: 0,
          duration: 0.55,
          ease: "power1.out",
        });

        gsap.to(dot, { scale: 0.3, duration: 0.08, ease: "power1.inOut" });
        gsap.to(ring, {
          scale: isOnClickable ? 2.0 : 0.7,
          duration: 0.08,
          ease: "power1.inOut",
        });
      };

      const onMouseUp = () => {
        gsap.to(dot, {
          scale: isOnClickable ? 0.6 : 1,
          duration: 0.25,
          ease: "power1.out",
        });
        gsap.to(ring, {
          scale: isOnClickable ? 2.8 : 1,
          duration: 0.3,
          ease: "power1.out",
        });
      };

      // Visibility
      const onMouseLeave = () =>
        gsap.to([dot, ring, outerRing], { opacity: 0, duration: 0.3 });
      const onMouseEnter = () =>
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });

      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseover", onMouseOver);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mouseenter", onMouseEnter);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseover", onMouseOver);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mouseenter", onMouseEnter);
      };
    },
    { dependencies: [isDesktop] },
  );

  if (!isDesktop) return null;

  return (
    <>
      <style>{`
        @keyframes fomo-glow {
          0%, 100% { box-shadow: 0 0 6px 2px #E51E5A; }
          50% { box-shadow: 0 0 14px 5px #E51E5A; }
        }
      `}</style>

      <div
        ref={trailContainerRef}
        className="pointer-events-none fixed inset-0 z-9996"
      />
      {/* Ripple */}
      <div
        ref={rippleRef}
        className="pointer-events-none fixed top-0 left-0 z-9997 will-change-transform"
        style={{
          width: 24,
          height: 24,
          marginLeft: -12,
          marginTop: -12,
          borderRadius: "50%",
          border: "1.5px solid rgba(229,30,90,0.6)",
          opacity: 0,
        }}
      />
      {/* Outer Ring */}
      <div
        ref={outerRingRef}
        className="pointer-events-none fixed top-0 left-0 z-9997 will-change-transform"
        style={{
          width: 69,
          height: 69,
          marginLeft: -34,
          marginTop: -34,
          borderRadius: "50%",
          border: "1px solid #000000",
          opacity: 0,
        }}
      />
      {/*
        Ring 
      */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-9998 will-change-transform"
        style={{
          width: 68,
          height: 68,
          marginLeft: -34,
          marginTop: -34,
          borderRadius: "50%",
          border: "1.5px solid #E51E5A",
          backgroundColor: "transparent",
          mixBlendMode: "saturation",
          // multiply, saturation, soft-light
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-9999 will-change-transform"
        style={{
          width: 10,
          height: 10,
          marginLeft: -5,
          marginTop: -5,
          borderRadius: "50%",
          backgroundColor: "#E51E5A",
          animation: "fomo-glow 1.8s ease-in-out infinite",
        }}
      />
    </>
  );
}
