import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import SmoothScrolling from "@/src/components/SmoothScrolling";
import OrientationGuard from "../components/OrientationGuard";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gracie - The Missing Out",
  description: "Interactive 2D Animation Storytelling Website",
  openGraph: {
    title: "Gracie - The Missing Out",
    description: "Interactive 2D Animation Storytelling Website",
    type: "website",
    locale: "th_TH",
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="preload"
          as="video"
          href="/logo/LogoGracie.webm"
          type="video/webm"
        />
        <link
          rel="preload"
          as="video"
          href="https://pub-7c229057268a442f826c5224d51faddb.r2.dev/video/hero/hero-video.mp4"
          type="video/mp4"
          media="(min-width: 1024px)"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="video"
          href="https://pub-7c229057268a442f826c5224d51faddb.r2.dev/video/hero/hero-video-mobile.mp4"
          type="video/mp4"
          media="(max-width: 1023px)"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${ibmPlexSansThai.className} antialiased custom-scrollbar`}
        suppressHydrationWarning
      >
        <OrientationGuard />
        <SmoothScrolling>
          <main>{children}</main>
        </SmoothScrolling>
      </body>
    </html>
  );
}
