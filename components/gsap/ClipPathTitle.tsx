type ClipPathTitleProps = {
  title: string;
  color: string;
  bg: string;
  className: string;
  borderColor: string;
};

export default function ClipPathTitle({
  title,
  color,
  bg,
  className,
  borderColor,
}: Readonly<ClipPathTitleProps>) {
  return (
    <div className="general-title 2xl:text-[8.5rem] md:text-8xl text-5xl font-bold uppercase leading-[9vw] tracking-[-.35vw]">
      {/* clipPath */}
      <div
        style={{
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
          borderColor: borderColor,
        }}
        className={`${className} border-[.5vw] text-nowrap opacity-0`}
      >
        <div
          className="pb-5 px-3 md:px-14 pt-3 md:pt-0"
          style={{
            backgroundColor: bg,
          }}
        >
          {/* Text */}
          <h2
            style={{
              color: color,
            }}
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
