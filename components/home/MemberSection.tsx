export default function MemberSection() {
  return (
    <div className="w-full min-h-full py-12 pb-24 bg-[#2258D0]">
      <div className="container mx-auto flex flex-col gap-24">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-white tracking-normal text-center pt-10">
          ผู้จัดทำ
        </h2>
        {/* Content */}
        <div className="w-full h-full grid grid-cols-3 gap-10">
          <div className="w-full h-[450px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#ffffff] cursor-pointer" />
          <div className="w-full h-[450px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#ffffff] cursor-pointer" />
          <div className="w-full h-[450px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#ffffff] cursor-pointer" />
        </div>
        <p className="text-4xl font-extrabold text-white tracking-normal text-center pt-10">
          ผลงานศิลปนิพนธ์ INTERACTIVE STORYTELLING WEBSITE
        </p>
      </div>
    </div>
  );
}
