export default function KnowledgeSection() {
  const cards = [
    {
      id: 1,
      title: "FOMO\n คืออะไร?",
    },
    {
      id: 2,
      title: "FOMO\n ส่งผลอะไรต่อชีวิต?",
    },
    {
      id: 3,
      title: "เราจะจัดการ\n FOMO\n ได้อย่างไร?",
    },
  ];

  return (
    <div className="w-full min-h-full py-12 pb-40 relative">
      <div className="flex flex-col gap-24 px-50">
        {/* Title */}
        <h2 className="text-7xl font-bold bg-gradient-to-r from-white from-[30%] to-[#FF2D77] to-[70%] bg-clip-text text-transparent leading-relaxed tracking-normal text-center pt-24">
          FEAR OF MISSING OUT
        </h2>
        {/* Content */}
        <div className="w-full h-full grid grid-cols-3 gap-24">
          {/* Border Card */}
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-full min-w-[300px] h-[600px] grid col-span-1 rounded-4xl bg-gradient-to-b from-[#ff0059] via-[#d00148]/80 to-[#470019] cursor-pointer"
            >
              <div className="border-4 border-gray-400/90 m-3 rounded-4xl">
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <h2 className="text-4xl font-bold text-white whitespace-pre-line text-center">
                    {card.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Blur Bottom */}
      <div className="absolute bottom-0 w-full h-[10rem] pointer-events-none bg-gradient-to-t from-[#0E2865] to-transparent" />
    </div>
  );
}
