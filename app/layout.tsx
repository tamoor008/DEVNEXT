import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechniFuse - Premium Development Agency",
  description: "We provide app development, website design, UI/UX, software solutions and cutting-edge tech services",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon-32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

