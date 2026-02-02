import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import SmoothScrolling from "@/src/components/SmoothScrolling";
import SoundConsentModal from "@/src/components/SoundConsentModal";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gracie - The Missing Out",
  description: "Interactive 2D Animation Storytelling Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${ibmPlexSansThai.className} antialiased custom-scrollbar`}
        suppressHydrationWarning
      >
        <SmoothScrolling>
          <SoundConsentModal />
          <main>{children}</main>
        </SmoothScrolling>
      </body>
    </html>
  );
}
