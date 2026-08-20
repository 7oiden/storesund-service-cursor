import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Admin · Varmepumpe",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
