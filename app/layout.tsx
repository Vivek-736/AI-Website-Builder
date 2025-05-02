import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/providers/Provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "A beautifully themed Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
          <Provider>
            {children}
          </Provider>
      </body>
    </html>
  );
}
