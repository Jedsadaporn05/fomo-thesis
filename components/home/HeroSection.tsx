import Image from "next/image";
import Banner from "@/public/home/hero-section/GracieDemo.jpg";
import { Link } from "next-view-transitions";

export default function HeroSection() {
  return (
    <div className="w-full min-h-full">
      <div className="relative w-full h-full">
        {/* Text on Image */}
        <div className="absolute w-full h-full">
          <div className="container mx-atuo w-full h-full flex flex-col justify-center items-end">
            <div className="w-[450px] h-full flex flex-col justify-center items-center">
              {/* Title */}
              <h2 className="text-[130px] font-medium text-white tracking-normal">
                <span className="">G</span>racie
              </h2>
              {/* Button */}
              <Link
                href={"/story"}
                className="w-full flex flex-col justify-center items-center gap-6 cursor-pointer transition-all duration-300 hover:[&>*]:text-black"
              >
                <div className="w-full py-[2px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent" />
                <p className="text-3xl font-medium text-white">
                  คลิกเพื่อเข้าสู่เรื่องราว
                </p>
                <div className="w-full py-[2px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent" />
              </Link>
            </div>
          </div>
        </div>
        {/* Image Background */}
        <Image
          src={Banner}
          alt="Banner"
          width={1920}
          height={1080}
          className="w-full h-[900px] object-cover object-center"
        />
        {/* Blur Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[8rem] pointer-events-none bg-gradient-to-t from-[#ff1655] to-transparent" />
      </div>
    </div>
  );
}
