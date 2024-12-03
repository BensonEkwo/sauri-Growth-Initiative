
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "./components/navbar";
import {Appwrapper} from "@/app/context"
import {Roboto_Slab} from 'next/font/google'
import Footer from "./components/Footer";

const roboto_slab= Roboto_Slab({
  variable: '--font-Roboto_Slab',
  weight:'400',
  subsets: 'cyrillic, cyrillic-ext, greek, greek-ext, latin, latin-ext, vietnamese'
})


export const metadata: Metadata = {
  title: "Sauri Growth Initiative",
  description: "Sauri growth initiative Official Website",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${roboto_slab.variable} ${roboto_slab.className} font-rbt antialiased bg-white text-black flex flex-col min-h-screen`}
      >
        <Appwrapper>
        <header>
        <Navbar/>
        </header>
        <main className="flex-grow">
        {children}
        </main>
        </Appwrapper>
      <footer className="bottom-0">
      <Footer/>
      </footer>
       
        
      </body>
    </html>
  );
}
