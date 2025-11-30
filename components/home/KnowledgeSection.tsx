"use client";

import KnowledgeDialog from "../KnowledgeDialog";
import Image from "next/image";
import BgImg1 from "@/public/home/knowledge-section/KnowledgeBg-1.png";
import { easeOut } from "framer-motion";
import { motion } from "framer-motion";

export default function KnowledgeSection() {
  const cards = [
    {
      id: 1,
      title: "FOMO\n คืออะไร?",
      contentDialog: [
        {
          id: 1,
          spans: [
            {
              text: "“FOMO (FEAR OF MISSING OUT)”",
              isColor: true,
            },
            {
              text: " คือความรู้สึก",
              isColor: false,
            },
            {
              text: " กลัวว่าจะพลาดสิ่งสำคัญ",
              isColor: true,
            },
            {
              text: " หรือ",
              isColor: false,
            },
            {
              text: " ตกกระแส\n",
              isColor: true,
            },
            {
              text: "มักเกิดขึ้นเมื่อเราเห็นคนอื่นในโลกออนไลน์ดูมีความสุขกว่า ทันสมัยกว่า หรือกำลัง “อินเทรนด์” ในสิ่งที่เรา\nยังไม่มีหรือยังไม่ได้ทำ เช่น เห็นเพื่อนโพสต์ไปเที่ยวต่างประเทศเห็นอินฟลูเอนเซอร์รีวิวรองเท้ารุ่นใหม่\nที่ทุกคนใส่กันหมดแล้ว จนเกิดความคิดในใจว่า",
              isColor: false,
            },
          ],
        },
        {
          id: 2,
          spans: [
            {
              text: "“เราควรอยู่ตรงนั้นด้วยสิ”\n “ถ้าไม่รีบซื้อตอนนี้ เราอาจจะตกเทรนด์ก็ได้…”",
              isColor: true,
            },
          ],
        },
        {
          id: 3,
          spans: [
            {
              text: "OMO ไม่ใช่แค่ความอิจฉาเล็กน้อย แต่เป็น แรงกดดันทางจิตใจที่ค่อย ๆ สะสมโดยเฉพาะในยุคที่โซเชียลมีเดีย\nอย่าง Instagram, TikTok หรือ X (Twitter)ทำให้เรารับรู้ชีวิตของคนอื่นตลอดเวลากลายเป็นสิ่ง\nกระตุ้นให้เราเปรียบเทียบกับตัวเองแบบไม่รู้ตัวจนบางครั้ง “เราอาจใช้ชีวิตเพื่อให้ทันคนอื่น” \nมากกว่า “เพื่อความสุขของเราเอง”",
              isColor: false,
            },
          ],
        },
        {
          id: 4,
          spans: [
            {
              text: "FOMO จึงเป็นภาวะที่เกิดจากการ เปรียบเทียบทางสังคม (Social Comparison) และกระตุ้นให้เรา\nต้องการ “การยอมรับ” จากคนรอบตัวอย่างไม่รู้ตัว",
              isColor: true,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "FOMO\n ส่งผลอะไรต่อชีวิต?",
      contentDialog: [
        {
          id: 1,
          spans: [
            {
              text: "FOMO อาจดูเหมือนไม่ร้ายแรง แต่จริง ๆ แล้วส่งผลต่อชีวิตประจำวันมากกว่าที่คิดมันทำให้เรารู้สึกเครียด\n วิตกกังวล และเปรียบเทียบตัวเองกับคนอื่นตลอดเวลายิ่งใช้โซเชียลมากเท่าไหร่ ความรู้สึก “ไม่พอ” ยิ่งมากขึ้น\nเท่านั้น มันทำให้เราสับสนระหว่าง “อยากได้จริง ๆ” กับ “กลัวจะไม่มีเหมือนคนอื่น”และ\nเมื่อความเปรียบเทียบกลายเป็นนิสัย เราอาจพลาดสิ่งที่เคยมีค่าไปโดยไม่รู้ตัว",
              isColor: false,
            },
          ],
        },
        {
          id: 2,
          spans: [
            {
              text: "ตัวอย่างผลกระทบที่มักเกิดขึ้น เช่น",
              isColor: true,
            },
          ],
        },
        {
          id: 3,
          spans: [
            {
              text: "นอนไม่พอ",
              isColor: true,
            },
            {
              text: " เพราะเลื่อนฟีดหรือดูสตอรี่จนดึก เพื่อไม่ให้พลาดสิ่งที่กำลังเป็นกระแส\n",
              isColor: false,
            },
            {
              text: "หมกมุ่นกับโทรศัพท์",
              isColor: true,
            },
            {
              text: " จนไม่โฟกัสกับสิ่งสำคัญในชีวิตจริง เช่น การเรียน งาน หรือความสัมพันธ์\n",
              isColor: false,
            },
            {
              text: "รู้สึกว่าตัวเองไม่ดีพอ",
              isColor: true,
            },
            {
              text: " เมื่อเปรียบเทียบกับคนอื่นที่ดูประสบความสำเร็จหรือดูมีความสุขกว่า\n",
              isColor: false,
            },
            {
              text: "ใช้จ่ายเกินตัว",
              isColor: true,
            },
            {
              text: " เพียงเพื่อให้ “ดูไม่ตกเทรนด์” หรือให้คนอื่นมองว่าเราทันสมัย\n",
              isColor: false,
            },
            {
              text: "หลงลืมตัวตน",
              isColor: true,
            },
            {
              text: " เพราะพยายามทำทุกอย่างเพื่อให้คนอื่นยอมรับ\n",
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
      title: "เราจะจัดการ\n FOMO\n ได้อย่างไร?",
      btnText: "ขอคำปรึกษาออนไลน์",
      newDialog: [
        {
          id: 1,
          spans: [
            {
              text: "หากคุณรู้สึกว่า FOMO หรือความกดดันจากโลกออนไลน์เริ่มส่งผลต่ออารมณ์อย่าลังเลที่จะขอความช่วยเหลือ\n เพราะคุณไม่จำเป็นต้องผ่านมันไปคนเดียว",
              isColor: false,
            },
          ],
        },
        {
          id: 2,
          spans: [
            {
              text: "สายด่วนสุขภาพจิต 1323\n",
              isColor: true,
            },
            {
              text: "ให้คำปรึกษาตลอด 24 ชั่วโมง โดยนักจิตวิทยาและผู้เชี่ยวชาญจากกรมสุขภาพจิต",
              isColor: false,
            },
          ],
        },
      ],
      contentDialog: [
        {
          id: 1,
          spans: [
            {
              text: "เราทุกคนสามารถ “อยู่กับโลกออนไลน์อย่างมีสติ” ได้ แค่เริ่มจากการรู้ตัวว่า… ความกลัวที่เรารู้สึกนั้น\n ไม่จำเป็นต้องเชื่อเสมอไปการรับมือกับ FOMO เริ่มจาก “การรับรู้” ไม่ใช่ “การหลีกหนี” ลองตั้งคำถามง่าย ๆ \nกับตัวเองว่า สิ่งที่กำลังทำอยู่ตอนนี้ มันเติมเต็มเราจริง ๆ หรือแค่ทำให้เราอยากมีเหมือนคนอื่น",
              isColor: false,
            },
          ],
        },
        {
          id: 2,
          spans: [
            {
              text: "วิธีรับมือกับ FOMO อย่างง่าย",
              isColor: true,
            },
          ],
        },
        {
          id: 3,
          spans: [
            {
              text: "ลดเวลาบนโซเชียล",
              isColor: true,
            },
            {
              text: " ตั้งเวลาใช้งาน หรือลอง “งดเช็คโซเชียล” ช่วงหนึ่ง\n",
              isColor: false,
            },
            {
              text: "สะท้อนความคิดของตัวเอง",
              isColor: true,
            },
            {
              text: " เขียนสิ่งที่เรากลัวจะพลาด แล้วถามว่า “สิ่งนี้สำคัญจริงไหม?”\n",
              isColor: false,
            },
            {
              text: "กลับมาอยู่กับปัจจุบัน",
              isColor: true,
            },
            {
              text: " ทำสิ่งที่ชอบในโลกจริง เช่น ออกไปเดินเล่น อ่านหนังสือ หรือเจอเพื่อนจริง ๆ\n",
              isColor: false,
            },
            {
              text: "พูดคุยกับใครสักคน",
              isColor: true,
            },
            {
              text: " หากรู้สึกกดดันมากเกินไป การคุยกับคนที่ไว้ใจหรือผู้เชี่ยวชาญจะช่วยได้มาก\n",
              isColor: false,
            },
          ],
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section
      id="knowledge"
      className="w-full min-h-dvh py-12 pb-40 relative flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Blur Top */}
      <div className="absolute top-0 w-full h-[15vh] sm:h-[20vh] pointer-events-none bg-gradient-to-b from-[#0a1738] to-transparent z-30" />
      {/* Image Background */}
      <div className="hidden lg:block">
        <div className="absolute w-full h-full inset-0">
          <Image
            src={BgImg1}
            alt="Knowledge Background 1"
            fill
            className="w-full h-full object-cover object-center pointer-events-none"
            priority
          />
        </div>
      </div>
      <motion.div
        className="container mx-auto flex flex-col gap-12 lg:gap-24 lg:px-10 2xl:px-12 z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="w-full h-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold bg-gradient-to-r from-white from-[30%] to-[#FF2D77] to-[70%] bg-clip-text text-transparent leading-relaxed tracking-normal text-center pt-24">
            FEAR OF MISSING OUT
          </h2>
        </motion.div>
        {/* Content */}
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-12 2xl:gap-24">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={itemVariants}
              className="h-full"
            >
              <KnowledgeDialog key={card.id} card={card} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Blur Bottom */}
      <div className="absolute bottom-0 w-full h-[15vh] sm:h-[20vh] pointer-events-none bg-gradient-to-t from-[#0a1738] to-transparent z-20" />
    </section>
  );
}
