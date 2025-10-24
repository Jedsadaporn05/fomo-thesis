import FlavorSlider from "../FlavorSlider";
import FlavorTitle from "../FlavorTitle";

export default function FlavorSection() {
  return (
    <div className="flavor-section min-h-dvh ">
      <div className="relative h-full flex flex-col lg:flex-row items-center">
        {/* Title */}
        <div className="lg:w-[57%] max-w-[950px] h-80 lg:h-full flex-none md:mt-20 xl:mt-0">
          <FlavorTitle />
        </div>
        {/* Sliders */}
        <div className="h-full">
          <FlavorSlider />
        </div>
      </div>
    </div>
  );
}
