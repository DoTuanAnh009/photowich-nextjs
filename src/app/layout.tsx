export const dynamic = "force-dynamic";
import { FloatingButtons, FooterWrapper, HeaderWrapper } from "@/components/layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Default metadata - will be overridden by page-specific metadata
export const metadata: Metadata = {
  title: {
    template: "%s | PhotoWitch",
    default: "PhotoWitch - Professional Photo Editing Services",
  },
  description: "High-quality photo editing solutions for real estate agents, photographers, and property marketing teams worldwide.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PhotoWitch",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Material Symbols for icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <HeaderWrapper />
        {children}
        <FooterWrapper />
        <FloatingButtons />
      </body>
    </html>
  );
}
