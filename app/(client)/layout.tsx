import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import {ClerkProvider} from '@clerk/nextjs'
import localFont from 'next/font/local'
import {Toaster} from 'react-hot-toast'
import { Suspense } from "react";
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
      <Suspense>
      <div
        className={` ${raleway.variable} antialiased`}
        >
    <Header/>
        {children}
        <Footer/>
        <Toaster position="bottom-right" toastOptions={{
          style:{
            background:'#000000',
            color:"#ffffff"
          }
        }}/>
        </div>
        </Suspense>
        </ClerkProvider>
  );
}
