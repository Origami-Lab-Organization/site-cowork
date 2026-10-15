import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { CursorTrail } from "@/components/CursorTrail";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { graph, localBusiness, organization, website } from "@/lib/jsonld";
import { SITE_URL, site } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap", variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Origami Hub — Coworking e sala de reunião em Formiga (MG)",
    template: "%s | Origami Hub Coworking",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "coworking Formiga",
    "coworking Formiga MG",
    "sala de reunião Formiga",
    "aluguel de sala Formiga MG",
    "sala para treinamento Formiga",
    "espaço para workshop Formiga",
    "escritório compartilhado Formiga",
    "Origami Hub",
  ],
  authors: [{ name: site.parent.name, url: site.parent.url }],
  creator: site.parent.name,
  publisher: site.parent.name,
  category: "Coworking",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: "Origami Hub — Coworking e sala de reunião em Formiga (MG)",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
  // Preencha após verificar no Search Console / Bing Webmaster (ou use verificação por DNS).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#04070e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: o script de tema define data-theme antes do React hidratar.
    <html lang={site.lang} className={`${inter.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <JsonLd data={graph(organization(), localBusiness(), website())} />
        <a className="skip" href="#conteudo">Pular para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <CursorTrail />
      </body>
    </html>
  );
}
