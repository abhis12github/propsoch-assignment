import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Propsoch – Visit Curated Homes, Negotiate Smarter",
  description:
    "Get end-to-end guidance from property wizards. Find your perfect home with curated selection of premium properties.",
  openGraph: {
    title: "Propsoch – Visit Curated Homes, Negotiate Smarter",
    description: "Curated homes, expert guidance.",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}