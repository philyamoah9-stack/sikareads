import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sikareads — books that grow you",
  description: "Ghana's curated online bookstore. Christian, finance, children's and personal development books. Delivered across Ghana.",
  keywords: "books Ghana, buy books online Ghana, Christian books Ghana, personal finance books Ghana, children books Ghana, sikareads",
  openGraph: {
    title: "sikareads — books that grow you",
    description: "Ghana's curated online bookstore. Delivered across Ghana.",
    url: "https://sikareads.com",
    siteName: "sikareads",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}