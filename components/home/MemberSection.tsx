export default function MemberSection() {
  const cards = [
    {
      id: 1,
      title: "",
    },
    {
      id: 2,
      title: "",
    },
    {
      id: 3,
      title: "",
    },
  ];

  return (
    <div className="w-full min-h-full py-12 pb-36 relative">
      <div className="container mx-auto flex flex-col gap-12 lg:gap-24 lg:px-10 2xl:px-12">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-white from-[40%] to-[#FF2D77] to-[60%] bg-clip-text text-transparent leading-relaxed tracking-normal text-center pt-24">
          ผู้จัดทำ
        </h2>
        {/* Content */}
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-12 2xl:gap-24">
          {/* Border Card */}
          {cards.map((card) => (
            <div
              key={card.id}
              className="group min-w-full 2xl:min-w-[300px] h-full min-h-[300px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px] 2xl:min-h-[600px] grid col-span-1 rounded-4xl bg-gradient-to-b from-[#ff0059] via-[#d00148]/80 to-[#470019] cursor-pointer hover:scale-105 hover:[&>div]:border-white transition-all duration-500 ease-in-out"
            >
              <div className="border-4 border-gray-400/90 m-3 rounded-4xl">
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-white group-hover:text-white whitespace-pre-line text-center">
                    {card.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-full py-12 pt-30 px-12">
        <p className="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white tracking-normal text-center">
          ผลงานศิลปนิพนธ์ INTERACTIVE STORYTELLING WEBSITE
        </p>
      </div>
      {/* Blur Bottom */}
      <div className="absolute bottom-0 w-full h-[10rem] pointer-events-none bg-gradient-to-t from-[#0E2865] to-transparent" />
    </div>
  );
}
