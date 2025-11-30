import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { ViewTransitions } from "next-view-transitions";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import SmoothScrolling from "@/components/SmoothScrolling";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gracie The Missing Out",
  description: "interactive 2d animation storytelling website",
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
        className={`${ibmPlexSansThai.className} antialiased`}
        suppressHydrationWarning
      >
        <ViewTransitions>
          <SmoothScrolling>
            <Providers>{children}</Providers>
          </SmoothScrolling>
        </ViewTransitions>
      </body>
    </html>
  );
}
