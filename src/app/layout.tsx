import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import "./globals.css";

// Host Grotesk font configuration
const hostGrotesk = {
  fontFamily: "Host Grotesk, sans-serif",
  fontDisplay: "swap" as const,
};

export const metadata: Metadata = {
  title: "Lemma - AI Experimentation Platform",
  description:
    "A modern platform for AI experimentation, dataset management, and model evaluation",
  keywords: [
    "AI",
    "machine learning",
    "experimentation",
    "datasets",
    "model evaluation",
  ],
  authors: [{ name: "Lemma Team" }],
  creator: "Lemma",
  publisher: "Lemma",
  robots: "index, follow",
  openGraph: {
    title: "Lemma - AI Experimentation Platform",
    description:
      "A modern platform for AI experimentation, dataset management, and model evaluation",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemma - AI Experimentation Platform",
    description:
      "A modern platform for AI experimentation, dataset management, and model evaluation",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: hostGrotesk.fontFamily }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
