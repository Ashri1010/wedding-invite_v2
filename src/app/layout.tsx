import "./globals.css";

import type { Metadata, Viewport } from "next";

import { PretendardFont } from "@/style/fonts";
import { ToastProvider } from "@/components/toast/ToastProvider";

export const metadata: Metadata = {
  title: "강승현, 김은정 결혼합니다♡",
  description: "10월 10일 일요일 오후 빌라드지디 청담",

  openGraph: {
    type: "website",
    title: "강승현, 김은정 결혼합니다♡",
    locale: "ko_KR",
    description: "10월 10일 일요일 오후 빌라드지디 청담",
    images: [
      {
        url: "https://cdn.jsdelivr.net/gh/Hal-ang/wedding_CDN_repo@master/sns.png",
        width: 720,
        height: 720
      }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={
          PretendardFont.className + " text-black font-normal relative"
        }
      >
        <ToastProvider>{children}</ToastProvider>
        <div id="portal" className="relative"></div>
      </body>
    </html>
  );
}
