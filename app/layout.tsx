import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const code = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  weight: "500"
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "900"]
});

export const metadata: Metadata = {
  title: "Frontend Learning Platform",
  description: "Interactive engineering school"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${code.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
