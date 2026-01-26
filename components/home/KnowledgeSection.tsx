"use client";

import Image from "next/image";
import BgImg1 from "@/public/home/knowledge-section/KnowledgeBg-1.png";
import KnowledgeBlock from "./KnowledgeBlock";
import KnowledgeLine from "./KnowledgeLine";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const contents = [
  {
    id: 1,
    title: "FOMO คืออะไร?",
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
            text: " มักเกิดขึ้นเมื่อเราเห็นคนอื่นในโลกออนไลน์ดูมีความสุขกว่า\nทันสมัยกว่า หรือกำลัง “อินเทรนด์” ในสิ่งที่เรายังไม่มีหรือยังไม่ได้ทำเช่นเห็นเพื่อน\nโพสต์ไปเที่ยวต่างประเทศเห็นอินฟลูเอนเซอร์รีวิวรองเท้ารุ่นใหม่ที่ทุกคนใส่กันหมด\nแล้ว จนเกิดความคิดในใจว่า....",
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
    title: "FOMO ส่งผลอะไรต่อชีวิต",
    contentDialog: [
      {
        id: 1,
        spans: [
          {
            text: "FOMO อาจดูเหมือนไม่ร้ายแรง แต่จริง ๆ\nแล้วส่งผลต่อชีวิตประจำวันมากกว่าที่คิดมันทำให้เรา\nรู้สึกเครียด วิตกกังวล และเปรียบเทียบตัวเองกับคนอื่นตลอดเวลายิ่งใช้โซเชียลมากเท่าไหร่\nความรู้สึก “ไม่พอ” ยิ่งมากขึ้นเท่านั้น",
            isColor: false,
          },
        ],
      },
      {
        id: 2,
        spans: [
          {
            text: "ตัวอย่างผลกระทบที่มักเกิดขึ้น",
            isColor: true,
          },
        ],
      },
      {
        id: 3,
        spans: [
          { text: "นอนไม่พอ", isColor: true },
          {
            text: " เพราะเลื่อนฟีดหรือดูสตอรี่จนดึก เพื่อไม่ให้พลาดสิ่งที่กำลังเป็นกระแส\n",
            isColor: false,
          },
          { text: "หมกมุ่นกับโทรศัพท์", isColor: true },
          {
            text: " จนไม่โฟกัสกับสิ่งสำคัญในชีวิตจริง เช่น การเรียน งาน หรือความสัมพันธ์\n",
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
        id: 4,
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
    title: "วิธีจัดการกับ FOMO",
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

const content = (
  content: { id: number; spans: { text: string; isColor: boolean }[] }[],
) => (
  <>
    {content.map((block) => (
      <p
        key={block.id}
        className="text-xl md:text-2xl lg:text-3xl text-white whitespace-pre-line"
      >
        {block.spans.map((span, index) => (
          <span
            key={index}
            className={`${span.isColor ? "text-[#FF3079] font-bold" : "text-white"}`}
          >
            {span.text}
          </span>
        ))}
      </p>
    ))}
  </>
);

export default function KnowledgeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 0.4], [-20, 50]);
  const bgY2 = useTransform(scrollYProgress, [0.2, 0.7], [-50, 50]);
  const bgY3 = useTransform(scrollYProgress, [0.6, 1], [-50, 50]);

  return (
    <section
      ref={containerRef}
      id="knowledge"
      className="w-full relative flex flex-col items-center overflow-hidden bg-black"
    >
      {/* Block 1 */}
      <div className="w-full min-h-screen relative z-30 flex items-center justify-center py-20">
        <motion.div
          style={{ y: bgY1 }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <Image
            src={BgImg1}
            alt="Knowledge Background 1"
            fill
            className="object-cover pointer-events-none scale-110"
          />
        </motion.div>
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-end relative"
          >
            <div className="relative">
              <KnowledgeBlock title={contents[0].title}>
                {content(contents[0].contentDialog)}
              </KnowledgeBlock>
            </div>
            {/* Tablet */}
            <div className="hidden md:block lg:hidden absolute top-[95%] left-0 w-full h-[400px] z-0 opacity-80 pointer-events-none">
              <KnowledgeLine x1={60} x2={40} />
            </div>
            {/* Desktop */}
            <div className="hidden lg:block absolute top-[95%] left-0 w-full h-[800px] z-0 opacity-80 pointer-events-none">
              <KnowledgeLine x1={72} x2={28} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Block 2 */}
      <div className="w-full min-h-screen relative z-20 flex items-center justify-center py-20">
        <motion.div
          style={{ y: bgY2 }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <Image
            src={BgImg1}
            alt="Knowledge Background 2"
            fill
            className="object-cover pointer-events-none scale-110"
          />
        </motion.div>
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-start relative"
          >
            <div className="relative">
              <KnowledgeBlock title={contents[1].title}>
                {content(contents[1].contentDialog)}
              </KnowledgeBlock>
            </div>
            {/* Tablet */}
            <div className="hidden md:block lg:hidden absolute top-[95%] left-0 w-full h-[400px] z-0 opacity-80 pointer-events-none">
              <KnowledgeLine x1={40} x2={60} />
            </div>
            {/* Desktop */}
            <div className="hidden lg:block absolute top-[95%] left-0 w-full h-[800px] z-0 opacity-80 pointer-events-none">
              <KnowledgeLine x1={28} x2={50} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Block 3 */}
      <div className="w-full min-h-screen relative z-10 flex items-center justify-center py-20">
        <motion.div
          style={{ y: bgY3 }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <Image
            src={BgImg1}
            alt="Knowledge Background 3"
            fill
            className="object-cover pointer-events-none scale-110"
          />
        </motion.div>
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-center relative"
          >
            <div className="relative mt-36">
              <KnowledgeBlock title={contents[2].title}>
                {content(contents[2].contentDialog)}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {contents[2].gridItems?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-start items-start gap-2"
                    >
                      <h4 className="text-xl md:text-2xl lg:text-3xl text-white font-bold">
                        {item.title}
                      </h4>
                      <p className="text-xl md:text-2xl lg:text-3xl text-white whitespace-pre-line leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </KnowledgeBlock>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
