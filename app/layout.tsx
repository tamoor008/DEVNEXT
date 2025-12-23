import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechniFuse - Premium Development Agency",
  description: "We provide app development, website design, UI/UX, software solutions and cutting-edge tech services",
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

