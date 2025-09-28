export default function MemberSection() {
  return (
    <div className="w-full min-h-full py-12 pb-24 bg-[#878787]">
      <div className="container mx-auto flex flex-col gap-24">
        {/* Title */}
        <h2 className="text-5xl font-bold text-white tracking-normal text-center">
          ผู้จัดทำ
        </h2>
        {/* Content */}
        <div className="w-full h-full grid grid-cols-3 gap-10">
          <div className="w-full h-[500px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#2b2b2b] cursor-pointer" />
          <div className="w-full h-[500px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#2b2b2b] cursor-pointer" />
          <div className="w-full h-[500px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#2b2b2b] cursor-pointer" />
        </div>
        <p className="text-4xl font-bold text-white tracking-normal text-center">
          ผลงานศิลปนิพนธ์ INTERACTIVE STORYTELLING WEBSITE
        </p>
      </div>
    </div>
  );
}
