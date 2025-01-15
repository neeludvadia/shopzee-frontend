import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import {ClerkProvider} from '@clerk/nextjs'
import localFont from 'next/font/local'
const raleway = localFont({
  src:'../fonts/raleway_font.woff2',
  variable: '--font-raleway',
  weight:"100 900"
})
export const metadata: Metadata = {
  title: "Shopzee",
  description: "E-Commerce App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={` ${raleway.variable} antialiased`}
        >
    <Header/>
        {children}
        <Footer/>
      </body>
    </html>
        </ClerkProvider>
  );
}
