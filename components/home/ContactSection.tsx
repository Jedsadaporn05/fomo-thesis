export default function ContactSection() {
  return (
    <div className="w-full min-h-dvh py-12 bg-[#2258D0]">
      <div className="container mx-auto flex flex-col gap-24">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-white tracking-normal text-center pt-10">
          หน่วยให้คำปรึกษาและช่วยเหลือ
        </h2>
        {/* Content */}
        <div className="w-full h-full grid grid-cols-3 gap-10">
          <div className="w-full h-[450px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#ffffff] cursor-pointer" />
          <div className="w-full h-[450px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#ffffff] cursor-pointer" />
          <div className="w-full h-[450px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#ffffff] cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
