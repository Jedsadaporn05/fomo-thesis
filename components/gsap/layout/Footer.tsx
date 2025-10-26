export default function Footer() {
  return (
    <div className="footer-section 2xl:min-h-dvh overflow-hidden relative bg-gray-900">
      {/* Title */}
      <div className="2xl:h-[100dvh] relative pt-[10vh] md:pt-[20vh]">
        <div className="overflow-hidden z-10">
          <h1 className="general-title 2xl:text-9xl md:text-8xl text-5xl font-semibold uppercase leading-[9vw] tracking-[-.35vw] text-center text-milk py-5">
            INTERACTIVE
            <br />
            STORYTELLING WEBSITE
            <br />
            <p className="text-milk">
              <span className="text-amber-500">ABOUT </span>
              <span className="text-[#E51E5A]">FOMO</span>
            </p>
          </h1>
        </div>
      </div>
    </div>
  );
}
