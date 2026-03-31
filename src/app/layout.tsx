import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import SmoothScrolling from "@/src/components/SmoothScrolling";
import OrientationGuard from "../components/OrientationGuard";
import CustomCursor from "../components/CustomCursor";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fomo-gracie.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Gracie - The Missing Out",
    template: "%s | Gracie - The Missing Out",
  },
  description:
    "เว็บไซต์เชิงปฏิสัมพันธ์เพื่อสะท้อนผลกระทบของภาวะ FOMO ผ่านตัวละคร Gracie ทุกการตัดสินใจของคุณจะกำหนดตอนจบของเรื่องราวนี้ หากพร้อมแล้ว... ไปเริ่มกันเลย!",
  keywords: [
    "FOMO",
    "Gracie",
    "Interactive Story",
    "2D Animation",
    "The Missing Out",
    "เว็บไซต์เชิงปฏิสัมพันธ์",
    "ผลกระทบของ FOMO",
    "การตัดสินใจ",
    "เกมเล่าเรื่อง",
  ],
  authors: [{ name: "ทีมผู้จัดทำ Gracie - The Missing Out" }],
  robots: "index, follow",
  openGraph: {
    title: {
      default: "Gracie - The Missing Out",
      template: "%s | Gracie - The Missing Out",
    },
    description:
      "เว็บไซต์เชิงปฏิสัมพันธ์เพื่อสะท้อนผลกระทบของภาวะ FOMO ผ่านตัวละคร Gracie ทุกการตัดสินใจของคุณจะกำหนดตอนจบของเรื่องราวนี้ หากพร้อมแล้ว... ไปเริ่มกันเลย!",
    url: "https://www.fomo-gracie.com",
    siteName: "Gracie - The Missing Out",
    images: [
      {
        url: "https://cdn.fomo-gracie.com/image/og-image.png",
        secureUrl: "https://cdn.fomo-gracie.com/image/og-image.png",
        alt: "Gracie - The Missing Out Open Graph Image",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Gracie - The Missing Out",
      template: "%s | Gracie - The Missing Out",
    },
    description:
      "เว็บไซต์เชิงปฏิสัมพันธ์เพื่อสะท้อนผลกระทบของภาวะ FOMO ผ่านตัวละคร Gracie ทุกการตัดสินใจของคุณจะกำหนดตอนจบของเรื่องราวนี้ หากพร้อมแล้ว... ไปเริ่มกันเลย!",
    images: [
      {
        url: "https://cdn.fomo-gracie.com/image/og-image.png",
        secureUrl: "https://cdn.fomo-gracie.com/image/og-image.png",
        alt: "Gracie - The Missing Out Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link
          rel="preload"
          as="video"
          href="/logo/LogoGracie.webm"
          type="video/webm"
        />
        <link
          rel="preload"
          as="video"
          href="https://cdn.fomo-gracie.com/video/hero/hero-video.mp4"
          type="video/mp4"
          media="(min-width: 1024px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="video"
          href="https://cdn.fomo-gracie.com/video/hero/hero-video-mobile.mp4"
          type="video/mp4"
          media="(max-width: 1023px)"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${ibmPlexSansThai.className} antialiased custom-scrollbar`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <OrientationGuard />
        <SmoothScrolling>
          <main>{children}</main>
        </SmoothScrolling>
      </body>
    </html>
  );
}
