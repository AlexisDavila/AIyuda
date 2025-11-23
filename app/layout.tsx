import type { Metadata } from "next";
import { Roboto_Flex, Inter } from "next/font/google";
import "./globals.css";
import Menu from "@/components/ui/menu/Menu";
//import { materialIcons } from './fonts';

const robotoFlex = Roboto_Flex({
  variable: "--font-robot-flex",
  weight: ["100", "500", "700"],
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scanner Cancer Detector - ML",
  description: "by Adavilam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.className} antialiased text-[#334155] dark:text-[#F4F7F9]`}
      >
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
          <Menu className={robotoFlex.variable }/>
          {children}
        </div>
      </body>
    </html>
  );
}
