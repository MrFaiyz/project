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
  title: "Zsideo - AI Video Editing Platform | Create Viral Content Effortlessly",
  description: "Transform raw footage into viral TikToks, Instagram Reels & YouTube Shorts with AI-powered editing. 10x faster video creation for content creators, marketers & brands.",
  keywords: "AI video editing, viral video creator, TikTok editor, Instagram Reels, YouTube Shorts, content creation, video marketing, social media videos, automated editing, viral content",
  authors: [{ name: "Zsideo Team" }],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
  openGraph: {
    title: "Zsideo - AI Video Editing Platform | Create Viral Content Effortlessly",
    description: "Transform raw footage into viral TikToks, Instagram Reels & YouTube Shorts with AI-powered editing. 10x faster video creation.",
    type: "website",
    url: "https://zsideo.com",
    siteName: "Zsideo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zsideo - AI Video Editing Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Zsideo - AI Video Editing Platform",
    description: "Transform raw footage into viral content with AI-powered editing. 10x faster video creation.",
    images: ["/og-image.jpg"]
  },
  alternates: {
    canonical: "https://zsideo.com"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Zsideo",
              "description": "AI-powered video editing platform for creating viral content",
              "url": "https://zsideo.com",
              "applicationCategory": "VideoEditingApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "500"
              }
            })
          }}
        />
      </body>
    </html>
  );
}