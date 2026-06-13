import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FIFA World Cup 2026 | Live Scores, Schedule & News",
    template: "%s | WC2026",
  },
  description:
    "The ultimate FIFA World Cup 2026 fan platform. Follow live scores, watch streams, check standings, read news, and explore team & player profiles for all 48 teams across USA, Canada, and Mexico.",
  keywords: [
    "FIFA World Cup 2026", "WC2026", "World Cup live scores", "World Cup schedule",
    "World Cup standings", "World Cup teams", "World Cup players", "football",
  ],
  authors: [{ name: "WC2026 Fan Platform" }],
  creator: "WC2026",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wc2026.fan",
    siteName: "FIFA World Cup 2026",
    title: "FIFA World Cup 2026 | Live Scores, Schedule & News",
    description: "The ultimate FIFA World Cup 2026 fan platform. 48 teams. 104 matches. Live now.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIFA World Cup 2026",
    description: "Live scores, schedule, standings, and news from WC2026",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#060E1A] text-white">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
