import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LanguageProvider from "@/components/language/LanguageProvider";
import { Fragment } from "react";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import LayoutFooter from "@/components/Layout/LayoutFooter";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const OrbitRegular = localFont({
  src: "./fonts/Orbit-Regular.ttf",
  variable: "--font-orbit-regular",
});

export const metadata: Metadata = {
  title: "Instagram Followback Scanner",
  description: "Instagram Followback Scanner's scan report.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1836657352810397"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${OrbitRegular.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen items-center flex flex-col justify-between font-[family-name:var(--font-geist-sans)]`}
      >
        <LanguageProvider>
          <Fragment>
            <LayoutHeader />
            <main className="flex flex-col h-full grow my-12 px-8 w-full">
              {children}
            </main>
            <LayoutFooter />
          </Fragment>
        </LanguageProvider>
      </body>
    </html>
  );
}
