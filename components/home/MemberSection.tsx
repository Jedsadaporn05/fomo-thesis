import Image from "next/image";
import BgImg1 from "@/public/home/member-section/MembersBg-1.png";

export default function MemberSection() {
  const cards = [
    {
      id: 1,
      title: "Member 1",
    },
    {
      id: 2,
      title: "Member 2",
    },
    {
      id: 3,
      title: "Member 3",
    },
    {
      id: 4,
      title: "Advisor",
    },
  ];

  return (
    <section
      id="members"
      className="w-full min-h-dvh py-12 pb-36 relative flex flex-col justify-center items-center"
    >
      {/* Blur Top */}
      <div className="absolute top-0 w-full h-[15vh] sm:h-[20vh] pointer-events-none bg-gradient-to-b from-[#0a1738] to-transparent z-30" />
      {/* Image Background */}
      <div className="hidden lg:block">
        <div className="absolute w-full h-full inset-0">
          <Image
            src={BgImg1}
            alt="Members Background 1"
            fill
            className="w-full h-full object-cover object-center pointer-events-none"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-8 lg:px-10 2xl:px-12 z-10">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-relaxed tracking-normal text-center py-6">
          ผู้จัดทำ
        </h2>
        {/* Content */}
        <div className="w-full flex flex-wrap justify-center gap-8 lg:gap-12 xl:gap-24 xl:gap-y-14 px-4 xl:px-34">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative group w-40 h-40 sm:w-48 sm:h-48 md:w-56 2xl:w-62 md:h-56 2xl:h-62 rounded-full cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#071A44] via-[#214BA9] to-[#9FBDFF] shadow-[0_10px_20px_rgba(0,0,0,0.4),inset_0_3px_4px_rgba(255,255,255,0.3)] transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>

              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-duration-500 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
