import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Jatin",
  description: "Jatin's Portfolio",
  icons: {
    icon: "/iconn.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-zinc-800 border border-zinc-700 text-zinc-100 shadow-lg rounded-lg",
            style: {
              background: "#1a1a1a",
              border: "1px solid #333",
              color: "#e0e0e0",
            },
          }} />
      </body>
    </html>
  );
}
