import type { Metadata } from "next";
import Providers from "./Provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#111827]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
