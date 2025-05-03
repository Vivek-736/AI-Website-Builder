import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/providers/Provider";
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lovella",
  description: "A website building tool for everyone",
};

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-[#191b1e] text-white md:overflow-y-hidden`}>
        <ConvexClientProvider>
          <Provider>
            {children}
          </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
