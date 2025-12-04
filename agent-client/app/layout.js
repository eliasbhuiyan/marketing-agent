import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "MarkgenAI — AI Marketing Assistant for Posters, Captions, Scripts & More",
  description:
    "MarkgenAI is your all-in-one AI marketing assistant for creating intelligent posters, captions, scripts, product descriptions, hashtags, blogs, thumbnails, and social media schedules. Boost productivity and creativity instantly.",
  keywords: [
    "AI marketing tool",
    "AI poster generator",
    "intelligent poster studio",
    "AI caption generator",
    "AI blog writer",
    "product description generator",
    "thumbnail generator",
    "virtual try-on AI",
    "social media scheduler",
    "AI marketing assistant",
    "content generator",
    "marketing automation",
    "digital marketing AI",
    "AI content creation",
  ],
  metadataBase: new URL("https://markgenai.com"),
  openGraph: {
    title: "MarkgenAI — Your AI-Powered Marketing Assistant",
    description:
      "Generate posters, captions, product descriptions, video scripts, blogs, and schedule content — all with AI. Perfect for businesses, creators, and marketing teams.",
    url: "https://markgenai.com",
    type: "website",
    images: [
      {
        url: "/markgenailogo.jpeg",
        width: 1200,
        height: 630,
        alt: "MarkgenAI preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MarkgenAI — AI Marketing Assistant for Modern Creators",
    description:
      "Create stunning content fast with intelligent AI tools: posters, captions, blogs, product descriptions, scripts, keywords, and more.",
    images: ["/markgenailogo.jpeg"],
  },
  alternates: {
    canonical: "https://markgenai.com",
  },
  icons: {
    icon: "/fav.jpeg",
  },
  applicationName: "MarkgenAI",
  author: "MarkgenAI",
  creator: "Elias Bhuiyan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script type="application/ld+json" id="schema-markup">
          {`
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MarkgenAI",
  "operatingSystem": "Web-based",
  "applicationCategory": "Marketing, AI, Content Creation",
  "description": "MarkgenAI is an AI-powered marketing assistant for generating image, posters, captions, scripts, blogs, product descriptions and scheduling content effortlessly.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://markgenai.com"
  `}
        </Script>
      </head>
      <body
      
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="G-DJ1TEC3B2C" />
      </body>
    </html>
  );
}
