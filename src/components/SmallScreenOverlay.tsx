export default function SmallScreenOverlay() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      <div className="container mx-auto flex flex-col justify-center items-center gap-1">
        <h5 className="text-xs font-normal leading-relaxed text-center text-white/90">
          โปรดใช้หน้าจอขนาดใหญ่ขึ้นหรือหมุนอุปกรณ์ของคุณเพื่อประสบการณ์ที่ดีที่สุด
        </h5>
      </div>
    </div>
  );
}
