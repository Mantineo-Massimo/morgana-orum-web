import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "Associazione Morgana & Orum",
  description: "Portale Ufficiale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
        inter.variable,
        merriweather.variable
      )}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
