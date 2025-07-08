'use client'
import { Geist, Geist_Mono, Rubik_Dirt } from "next/font/google";
import "./globals.css";
import { gsap } from "gsap"; // Import gsap
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import { useLayoutEffect } from "react"; // Import useLayoutEffect for client-side GSAP registration
import { CartProvider } from "./context/CartContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const rubikdirt = Rubik_Dirt({
  variable: "--font-rubik-dirt",
  subsets: ["latin"],
  weight: "400",
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use useLayoutEffect to register GSAP plugins globally once the component mounts
  // This ensures GSAP and its plugins are ready before any animations attempt to use them.
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubikdirt.variable} font-rubik-dirt antialiased`}
      ><CartProvider>
        {children}
        </CartProvider>
      </body>
    </html>
  );
}
