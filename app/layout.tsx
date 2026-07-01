import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "UA Engineering Pte Ltd | Control Center & Dashboard",
  description: "Management and operations dashboard for UA Engineering Pte Ltd, Singapore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
