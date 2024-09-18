import type { Metadata } from "next";
import localFont from "next/font/local";
import { MainProvider } from "@/redux/provider";

import "./globals.css";
import { Background } from "@/components/background/Background";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex-auto h-screen w-screen">
          <MainProvider>
            {children}
          </MainProvider>
          <Background />
        </div>
      </body>
    </html>
  );
}
