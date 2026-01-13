import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoTrack",
  description: "Экологический трекер",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" translate="no">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
