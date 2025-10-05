import { Link } from "next-view-transitions";

export default function HeroSection() {
  return (
    <div className="w-full min-h-full h-[100dvh]">
      <div className="relative w-full h-full">
        {/* Text on Image */}
        <div className="absolute w-full h-full">
          <div className="container mx-atuo w-full h-full flex flex-col justify-center items-center">
            {/* Logo and Start Button */}
            <div className="w-full max-w-[450px] h-full flex flex-col justify-center items-center gap-6">
              {/* Title */}
              <h2 className="text-6xl font-medium text-white tracking-normal transition-all blink">
                Gracie
              </h2>
              {/* Button */}
              <Link
                href={"/story"}
                className="w-full flex flex-col justify-center items-center gap-3 cursor-pointer transition-all blink hover:[&>*]:text-primary"
              >
                <div className="w-full h-[3px] rounded-md bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <p className="text-[26px] font-medium text-white/90">
                  เข้าสู่เรื่องราว
                </p>
                <div className="w-full h-[3px] rounded-md bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              </Link>
            </div>
          </div>
        </div>
        {/* Video Background */}
        <video
          src="/home/hero-section/PreStart.mp4"
          muted
          autoPlay
          loop
          className="w-full h-full object-cover object-center pointer-events-none"
        />
        {/* Blur Bottom */}
        {/* <div className="absolute bottom-0 left-0 w-full h-[8rem] pointer-events-none bg-gradient-to-t from-[#ff1655] to-transparent" /> */}
      </div>
    </div>
  );
}
