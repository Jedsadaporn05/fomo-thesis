import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Gracie",
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
        {/* <link
          rel="preload"
          href="/fonts/LINESeedSansTH/LINESeedSansTH_W_Rg.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/LINESeedSansEN/LINESeedSansEN_W_Rg.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        /> */}
      </head>
      <body className={`antialiased custom-scrollbar`} suppressHydrationWarning>
        <ViewTransitions>
          <Providers>{children}</Providers>
        </ViewTransitions>
      </body>
    </html>
  );
}
