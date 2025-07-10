import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Zsideo - Premium Video Content Studio",
  description: "Transform raw clips into viral content with AI-driven editing. Create stunning reels, shorts, and videos effortlessly.",
  keywords: "video editing, AI content creation, viral videos, reels, shorts, content studio",
  authors: [{ name: "Zsideo Team" }],
  openGraph: {
    title: "Zsideo - Premium Video Content Studio",
    description: "Transform raw clips into viral content with AI-driven editing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}