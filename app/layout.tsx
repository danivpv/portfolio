import type { Metadata } from "next";
import { Libre_Baskerville, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import FilmGrain from "@/components/FilmGrain";
/* import BackgroundOrbs from "@/components/BackgroundOrbs"; */
import "./globals.css";

const primaryFont = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const secondaryFont = Inter({
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danivpv.com"),
  title: "Daniel Iván Parra Verde - GenAI & ML Solutions Architect & AWS Certified 2x (AIP-C01, SAA-C03)",
  description:
    "Production ML platforms, AI agents, and cloud infrastructure. AWS Certified Generative AI Developer - Professional & Solutions Architect - Associate.",
  openGraph: {
    title: "Daniel Iván Parra Verde - GenAI & ML Solutions Architect & AWS Certified 2x (AIP-C01, SAA-C03)",
    description:
      "Production ML platforms, AI agents, and cloud infrastructure. AWS Certified 2x (AIP-C01, SAA-C03).",
    url: "https://danivpv.com",
    siteName: "Daniel Iván Parra Verde",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://danivpv.com/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Daniel Iván Parra Verde - GenAI & ML Solutions Architect & AWS Certified 2x (AIP-C01, SAA-C03)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Iván Parra Verde - GenAI & ML Solutions Architect & AWS Certified 2x (AIP-C01, SAA-C03)",
    description:
      "Production ML platforms, AI agents, and cloud infrastructure. AWS Certified 2x (AIP-C01, SAA-C03).",
    images: ["https://danivpv.com/opengraph-image.jpg"],
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
      className={`scroll-smooth ${primaryFont.variable} ${secondaryFont.variable} ${monoFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="bg-bg-primary text-text-secondary font-secondary relative antialiased selection:bg-accent/30 min-h-screen overflow-visible"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Main App Content container with overflow-visible to allow 3D image pop-out */}
          <main className="relative z-10 overflow-visible">{children}</main>

          {/* CRITICAL FIX 1: The Film Grain Overlay mounted last so it covers all routes and stacking contexts */}
          <FilmGrain />
          {/* <BackgroundOrbs /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
