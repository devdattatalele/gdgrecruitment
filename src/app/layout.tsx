import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "../../components/navigation";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GDG VIT Mumbai - Recruitment Portal",
  description: "Join Google Developer Groups on Campus VIT Mumbai - Apply for technical and non-technical positions for the 2025-26 academic year",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} font-sans antialiased bg-[#121212] min-h-screen`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
