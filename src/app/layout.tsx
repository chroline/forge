import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forge - AI Experimentation Platform",
  description:
    "A modern platform for AI experimentation, dataset management, and model evaluation",
  keywords: [
    "AI",
    "machine learning",
    "experimentation",
    "datasets",
    "model evaluation",
  ],
  authors: [{ name: "Forge Team" }],
  creator: "Forge",
  publisher: "Forge",
  robots: "index, follow",
  openGraph: {
    title: "Forge - AI Experimentation Platform",
    description:
      "A modern platform for AI experimentation, dataset management, and model evaluation",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge - AI Experimentation Platform",
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
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
