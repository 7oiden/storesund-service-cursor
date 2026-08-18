import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Storesund Service | Varmepumpe i Bergensområdet",
    template: "%s | Storesund Service",
  },
  description:
    "Montering, service og reparasjon av varmepumper og klimaanlegg i Bergen og omegn. Fastpris, f-gass sertifisert og 20 års erfaring.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nb"
      className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
