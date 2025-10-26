// src/app/fonts/lineFont.ts
import localFont from "next/font/local";

export const lineFont = localFont({
  src: [
    { path: "/fonts/LINESeedSansTH/LINESeedSansTH_W_Th.woff2", weight: "300" },
    { path: "/fonts/LINESeedSansTH/LINESeedSansTH_W_Rg.woff2", weight: "400" },
    { path: "/fonts/LINESeedSansTH/LINESeedSansTH_W_He.woff2", weight: "600" },
    { path: "/fonts/LINESeedSansTH/LINESeedSansTH_W_Bd.woff2", weight: "700" },
    { path: "/fonts/LINESeedSansTH/LINESeedSansTH_W_XBd.woff2", weight: "800" },
    { path: "/fonts/LINESeedSansEN/LINESeedSansEN_W_Th.woff2", weight: "300" },
    { path: "/fonts/LINESeedSansEN/LINESeedSansEN_W_Rg.woff2", weight: "400" },
    { path: "/fonts/LINESeedSansEN/LINESeedSansEN_W_He.woff2", weight: "600" },
    { path: "/fonts/LINESeedSansEN/LINESeedSansEN_W_Bd.woff2", weight: "700" },
    { path: "/fonts/LINESeedSansEN/LINESeedSansEN_W_XBd.woff2", weight: "800" },
  ],
  variable: "--font-line",
  display: "swap",
  preload: true,
});
