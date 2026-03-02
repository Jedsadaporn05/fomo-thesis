"use client";

import FOMO from "@/public/home/knowledge-section/Title-FOMO.png";
import QuestionMark from "@/public/home/knowledge-section/Title-QuestionMark.png";
import KnowledgeBlock from "./KnowledgeBlock";
import KnowledgeLine from "./KnowledgeLine";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import React, { useRef, useState, useEffect } from "react";

interface KnowledgeProps {
  startAnimation: boolean;
}

const contents = [
  {
    id: 1,
    title: {
      imageFOMO: FOMO,
      text: "คืออะไร",
      imageQuestionMark: QuestionMark,
    },
    contentDialog: [
      {
        id: 1,
        spans: [
          { text: "“FOMO (FEAR OF MISSING OUT)”", isColor: true },
          { text: " คือความรู้สึก", isColor: false },
          { text: " กลัวว่าจะพลาดสิ่งสำคัญ", isColor: true },
          { text: "\nหรือ", isColor: false },
          { text: " ตกกระแส", isColor: true },
          {
            text: " มักเกิดขึ้นเมื่อเราเห็นคนอื่นในโลกออนไลน์ดูมีความสุขกว่า\nทันสมัยกว่า หรือกำลัง “อินเทรนด์” ในสิ่งที่เรายังไม่มีหรือยังไม่ได้ทำเช่น เห็นเพื่อน\nโพสต์ไปเที่ยวต่างประเทศ เห็นอินฟลูเอนเซอร์รีวิวรองเท้ารุ่นใหม่ที่ทุกคนใส่กันหมด\nแล้ว จนเกิดความคิดในใจว่า....",
            isColor: false,
          },
        ],
      },
      {
        id: 2,
        spans: [
          {
            text: "“เราควรอยู่ตรงนั้นด้วยสิ”\n“ถ้าไม่รีบซื้อตอนนี้ เราอาจจะตกเทรนด์ก็ได้…”",
            isColor: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: {
      imageFOMO: FOMO,
      text: "ส่งผลอะไร",
    },
    contentDialog: [
      {
        id: 1,
        spans: [
          {
            text: "FOMO อาจดูเหมือนไม่ร้ายแรง แต่จริง ๆ แล้วส่งผลต่อชีวิตประจำวันมากกว่าที่คิด\nมันทำให้เรารู้สึกเครียด วิตกกังวลและเปรียบเทียบตัวเองกับคนอื่นตลอดเวลา",
            isColor: false,
          },
        ],
      },
      {
        id: 2,
        spans: [
          {
            text: "ตัวอย่างผลกระทบที่มักเกิดขึ้น\n",
            isColor: false,
            isBold: true,
          },
          { text: "นอนไม่พอ", isColor: true },
          {
            text: " เพราะเลื่อนฟีดหรือดูสตอรี่จนดึกเพื่อไม่ให้พลาดสิ่งที่กำลัง\nเป็นกระแส\n",
            isColor: false,
          },
          { text: "หมกมุ่นกับโทรศัพท์", isColor: true },
          {
            text: " จนไม่โฟกัสกับสิ่งสำคัญในชีวิตจริง เช่น การเรียน งาน\nหรือความสัมพันธ์\n",
            isColor: false,
          },
          { text: "ใช้จ่ายเกินตัว", isColor: true },
          {
            text: " เพียงเพื่อให้ “ดูไม่ตกเทรนด์” หรือให้คนอื่นมองว่าเราทันสมัย\n",
            isColor: false,
          },
        ],
      },
      {
        id: 3,
        spans: [
          {
            text: "ในระยะยาว อาจนำไปสู่",
            isColor: false,
          },
          {
            text: " ความเครียด ความวิตกกังวล",
            isColor: true,
          },
          {
            text: " หรือแม้แต่",
            isColor: false,
          },
          {
            text: " ภาวะซึมเศร้า",
            isColor: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: {
      imageFOMO: FOMO,
      text: "วิธีจัดการกับ",
    },
    contentDialog: [
      {
        id: 1,
        spans: [
          {
            text: "เราทุกคนสามารถ “อยู่กับโลกออนไลน์อย่างมีสติ” ได้ แค่เริ่มจากการรู้ตัวว่า… ความกลัวที่เรารู้สึกนั้น\nไม่จำเป็นต้องเชื่อเสมอไป การรับมือกับ FOMO เริ่มจาก...",
            isColor: false,
          },
        ],
      },
    ],
    gridItems: [
      {
        title: "ลดเวลาบนโซเชียล",
        description: "ตั้งเวลาใช้งาน หรือลอง\n“งดเช็คโซเชียล” ช่วงหนึ่ง",
      },
      {
        title: "สะท้อนความคิดของตัวเอง",
        description:
          "เขียนสิ่งที่เรากลัวจะพลาด\nแล้วถามว่า “สิ่งนี้สำคัญจริงไหม?”",
      },
      {
        title: "กลับมาอยู่กับปัจจุบัน",
        description:
          "ทำสิ่งที่ชอบในโลกจริง เช่น\nออกไปเดินเล่น อ่านหนังสือ\nหรือเจอเพื่อนจริง ๆ",
      },
    ],
  },
];

const Content = React.memo(
  ({
    data,
  }: {
    data: {
      id: number;
      spans: { text: string; isColor: boolean; isBold?: boolean }[];
    }[];
  }) => (
    <>
      {data.map((block) => (
        <p
          key={block.id}
          className={`text-xs min-[450px]:text-sm sm:text-md md:text-lg lg:text-xl 2xl:text-[22px] 3xl:text-3xl text-white 
            ${block.id === 1 ? "lg:whitespace-pre-line xl:whitespace-normal 3xl:whitespace-pre-line" : "lg:whitespace-pre-line"}`}
        >
          {block.spans.map((span, index) => (
            <span
              key={index}
              className={`${span.isColor ? "text-[#FF3079] font-bold" : "text-white"} ${span.isBold ? "font-bold" : ""}`}
            >
              {span.text}
            </span>
          ))}
        </p>
      ))}
    </>
  ),
);
Content.displayName = "Content";

export default function KnowledgeSection({ startAnimation }: KnowledgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const refreshRef = useRef<number | null>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [lineCoords, setLineCoords] = useState({
    b1: 75,
    b2: 25,
    b3: 50,
    h1: 150,
    h2: 150,
  });

  // IntersectionObserver
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
        }
      },
      {
        root: null,
        rootMargin: "1000px 0px", // preload 1000px
        threshold: 0,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Warm preload videos
  useEffect(() => {
    if (!isNearViewport) return;

    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.load();
    });
  }, [isNearViewport]);

  // Play video after startAnimation ready
  useEffect(() => {
    if (!startAnimation || !isNearViewport) return;

    videoRefs.current.forEach((video) => {
      video?.play().catch(() => {});
    });
  }, [startAnimation, isNearViewport]);

  // Line Coords
  useEffect(() => {
    let rafId: number | null = null;

    const updateCoords = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        if (
          !measureContainerRef.current ||
          !block1Ref.current ||
          !block2Ref.current ||
          !block3Ref.current
        )
          return;

        const containerRect =
          measureContainerRef.current.getBoundingClientRect();

        const r1 = block1Ref.current.getBoundingClientRect();
        const r2 = block2Ref.current.getBoundingClientRect();
        const r3 = block3Ref.current.getBoundingClientRect();

        const centerPercent = (rect: DOMRect) =>
          ((rect.left + rect.width / 2 - containerRect.left) /
            containerRect.width) *
          100;

        const next = {
          b1: centerPercent(r1),
          b2: centerPercent(r2),
          b3: centerPercent(r3),
          h1: Math.max(120, r2.top - r1.bottom),
          h2: Math.max(120, r3.top - r2.bottom),
        };

        setLineCoords((prev) =>
          prev.b1 === next.b1 &&
          prev.b2 === next.b2 &&
          prev.b3 === next.b3 &&
          prev.h1 === next.h1 &&
          prev.h2 === next.h2
            ? prev
            : next,
        );
      });
    };

    const observer = new ResizeObserver(updateCoords);

    if (measureContainerRef.current) {
      observer.observe(measureContainerRef.current);
    }
    if (block1Ref.current) {
      observer.observe(block1Ref.current);
    }
    if (block2Ref.current) {
      observer.observe(block2Ref.current);
    }
    if (block3Ref.current) {
      observer.observe(block3Ref.current);
    }

    updateCoords();

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ScrollTrigger Refresh
  useEffect(() => {
    if (!isNearViewport) return;

    if (refreshRef.current) {
      cancelAnimationFrame(refreshRef.current);
    }

    refreshRef.current = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      if (refreshRef.current) {
        cancelAnimationFrame(refreshRef.current);
      }
    };
  }, [lineCoords.h1, lineCoords.h2, isNearViewport]);

  // GSAP and Media Queries
  useGSAP(
    () => {
      if (!containerRef.current || isNearViewport) return;

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const blocks = gsap.utils.toArray<HTMLElement>(
            ".knowledge-block-container",
          );
          const bgs = gsap.utils.toArray<HTMLElement>(
            containerRef.current!.querySelectorAll(".knowledge-bg"),
          );

          // Background parallax
          bgs.forEach((bg) => {
            gsap.to(bg, {
              y: 80,
              ease: "none",
              scrollTrigger: {
                trigger: bg.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          });

          // Blocks fade in
          blocks.forEach((block) => {
            gsap.fromTo(
              block,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: block,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        },

        "(max-width: 767px)": () => {
          const blocks = gsap.utils.toArray<HTMLElement>(
            ".knowledge-block-container",
          );
          const bgs = gsap.utils.toArray<HTMLElement>(".knowledge-bg");

          // Mobile parallax
          bgs.forEach((bg) => {
            gsap.to(bg, {
              y: 40,
              ease: "none",
              scrollTrigger: {
                trigger: bg.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          });

          blocks.forEach((block) => {
            gsap.fromTo(
              block,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: block,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full h-full flex justify-center">
      <div className="max-w-960 min-[3841px]:aspect-9/16 w-full h-full relative flex flex-col items-center overflow-hidden">
        {/* Block 1 */}
        <div
          id="Knowledge-1"
          className="w-full h-dvh max-h-dvh lg:max-h-[95dvh] xl:max-h-dvh relative flex justify-center items-start lg:items-center pt-18 sm:pt-25 lg:pt-0"
        >
          {/* Block 1 Gradient Top */}
          <div className="absolute top-0 w-full h-[7dvh] lg:h-[15dvh] pointer-events-none bg-linear-to-b from-[#0a1738] to-transparent z-5" />
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            <div className="knowledge-bg relative w-full h-full -top-10 aspect-auto">
              {/* Desktop */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current[0] = el;
                }}
                src="https://fomo-thesis.jedsadapornnew05.workers.dev/video/knowledge/knowledge-video-1.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                className="hidden lg:block w-full h-full object-cover object-center pointer-events-none"
              />
              {/* Mobile */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current[1] = el;
                }}
                src="/home/knowledge-section/knowledge-video-1-mobile.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                className="block lg:hidden w-full h-full object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="container mx-auto max-w-full lg:max-w-[90%] lg:p-0 z-10 relative">
            <div
              ref={measureContainerRef}
              className="knowledge-block-container flex flex-col md:flex-row justify-center lg:justify-end relative"
            >
              <div
                className="relative max-w-full lg:max-w-[52dvw] xl:max-w-[49dvw] 3xl:max-w-full"
                ref={block1Ref}
              >
                <KnowledgeBlock
                  title={contents[0].title}
                  triggerStart="top 75%"
                  triggerEnd="bottom 75%"
                  isFirstSection={true}
                >
                  <Content data={contents[0].contentDialog} />
                </KnowledgeBlock>
              </div>
              <div
                className="hidden lg:block absolute top-full left-0 w-full z-10 pointer-events-none pt-12 pb-22"
                style={{ height: lineCoords.h1 }}
              >
                <KnowledgeLine x1={lineCoords.b1} x2={lineCoords.b2} />
              </div>
            </div>
          </div>
          {/* Block 1 Gradient Bottom */}
          <div className="absolute bottom-0 w-full h-[7dvh] lg:h-[15dvh] pointer-events-none bg-linear-to-t from-[#0a1738] to-transparent z-5" />
        </div>

        {/* Block 2 */}
        <div
          id="Knowledge-2"
          className="w-full h-dvh max-h-dvh lg:max-h-[95dvh] xl:max-h-dvh relative flex justify-center items-start lg:items-center pt-18 sm:pt-25 lg:pt-0"
        >
          {/* Block 2 Gradient Top */}
          <div className="absolute top-0 w-full h-[7dvh] lg:h-[15dvh] pointer-events-none bg-linear-to-b from-[#0a1738] to-transparent z-5" />
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            <div className="knowledge-bg relative w-full h-full -top-10 aspect-auto">
              {/* Desktop */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current[2] = el;
                }}
                src="https://fomo-thesis.jedsadapornnew05.workers.dev/video/knowledge/knowledge-video-2.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                className="hidden lg:block w-full h-full object-cover object-center pointer-events-none"
              />
              {/* Mobile */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current[3] = el;
                }}
                src="/home/knowledge-section/knowledge-video-2-mobile.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                className="block lg:hidden w-full h-full object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="container mx-auto max-w-full lg:max-w-[90%] lg:p-0 z-10 relative">
            <div className="knowledge-block-container flex flex-col md:flex-row justify-center lg:justify-start relative">
              <div
                className="relative max-w-full lg:max-w-[51dvw] xl:max-w-[49dvw] 3xl:max-w-full"
                ref={block2Ref}
              >
                <KnowledgeBlock
                  title={contents[1].title}
                  triggerStart="top 75%"
                  triggerEnd="bottom 82%"
                  isSecondSection={true}
                >
                  <Content data={contents[1].contentDialog} />
                </KnowledgeBlock>
              </div>
              <div
                className="hidden lg:block absolute top-full left-0 w-full z-10 pointer-events-none pt-12 pb-22"
                style={{ height: lineCoords.h2 }}
              >
                <KnowledgeLine x1={lineCoords.b2} x2={lineCoords.b3} />
              </div>
            </div>
          </div>
          {/* Block 2 Gradient Bottom */}
          <div className="absolute bottom-0 w-full h-[7dvh] lg:h-[15dvh] pointer-events-none bg-linear-to-t from-[#0a1738] to-transparent z-5" />
        </div>

        {/* Block 3 */}
        <div
          id="Knowledge-3"
          className="w-full h-dvh max-h-dvh lg:max-h-[95dvh] xl:max-h-dvh relative flex justify-center items-start lg:items-center pt-18 sm:pt-25 lg:pt-0"
        >
          {/* Block 3 Gradient Top */}
          <div className="absolute top-0 w-full h-[7dvh] lg:h-[15dvh] pointer-events-none bg-linear-to-b from-[#0a1738] to-transparent z-5" />
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            <div className="knowledge-bg relative w-full h-full -top-10 aspect-auto">
              {/* Desktop */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current[4] = el;
                }}
                src="https://fomo-thesis.jedsadapornnew05.workers.dev/video/knowledge/knowledge-video-3.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                className="hidden lg:block w-full h-full object-cover object-center pointer-events-none"
              />
              {/* Mobile */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current[5] = el;
                }}
                src="/home/knowledge-section/knowledge-video-3-mobile.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                className="block lg:hidden w-full h-full object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="container mx-auto max-w-full lg:max-w-[90%] lg:p-0 z-10 relative">
            <div className="knowledge-block-container flex flex-col md:flex-row justify-center lg:justify-end relative">
              <div
                className="relative max-w-full lg:max-w-[57dvw] xl:max-w-[52dvw] 3xl:max-w-full"
                ref={block3Ref}
              >
                <KnowledgeBlock
                  title={contents[2].title}
                  triggerStart="top 75%"
                  triggerEnd="bottom 77%"
                  isLastSection={true}
                >
                  <Content data={contents[2].contentDialog} />
                  <div
                    className={`flex flex-col lg:flex-row justify-between items-start gap-3 md:gap-4 lg:gap-8 xl:gap-12 2xl:gap-6 3xl:gap-18`}
                  >
                    {contents[2].gridItems?.map((item, index) => (
                      <div
                        key={index}
                        className="w-auto lg:w-full xl:w-auto 2xl:w-full 3xl:w-auto flex flex-col justify-start items-start gap-2"
                      >
                        <h3 className="text-xs min-[450px]:text-sm sm:text-md md:text-lg lg:text-xl 2xl:text-[22px] 3xl:text-3xl text-[#FF3079] font-bold">
                          {item.title}
                        </h3>
                        <p className="text-xs min-[450px]:text-sm sm:text-md md:text-lg lg:text-xl 2xl:text-[22px] 3xl:text-3xl text-white xl:whitespace-pre-line lg:leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </KnowledgeBlock>
              </div>
            </div>
          </div>
          {/* Block 3 Gradient Bottom */}
          <div className="absolute bottom-0 w-full h-[7dvh] lg:h-[15dvh] pointer-events-none bg-linear-to-t from-[#0a1738] to-transparent z-5" />
        </div>
      </div>
    </section>
  );
}
