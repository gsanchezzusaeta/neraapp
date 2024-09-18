import type { Metadata } from "next";
import localFont from "next/font/local";
import { MainProvider } from "@/redux/provider";

import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex-auto">
          <MainProvider>
            {children}
          </MainProvider>
        </div>
      </body>
    </html>
  );
}
