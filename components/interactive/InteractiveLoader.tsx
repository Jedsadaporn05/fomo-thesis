"use client";

import ClickBox from "./ClickBox";
import DragDrop from "./DragDrop";
import Dream from "./Dream";

export default function InteractiveLoader({
  interactionType,
}: Readonly<{
  interactionType: string;
}>) {
  switch (interactionType) {
    case "clickBox":
    case "clickStart":
    case "clickRiver":
    case "clickCave":
      return <ClickBox />;
    case "dragKey":
      return <DragDrop />;
    case "dream":
      return <Dream />;
    default:
      return (
        <div className="text-sm text-slate-300">
          (ไม่มี interaction หรือต้องการ component เพิ่ม)
        </div>
      );
  }
}
