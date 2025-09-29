export default function KnowledgeSection() {
  return (
    <div className="w-full min-h-full py-12 bg-[#ff1655]">
      <div className="container mx-auto flex flex-col gap-24">
        {/* Title */}
        <h2 className="text-5xl font-bold text-white tracking-normal text-center pt-24">
          FEAR OF MISSING OUT
        </h2>
        {/* Content */}
        <div className="w-full h-full grid grid-cols-3 gap-10">
          <div className="w-full h-[500px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#ffffff] cursor-pointer" />
          <div className="w-full h-[500px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#ffffff] cursor-pointer" />
          <div className="w-full h-[500px] grid col-span-1 rounded-2xl bg-[#CACACA] hover:bg-[#ffffff] cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
