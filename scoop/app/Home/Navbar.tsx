'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import navLinks from '../constants';
import Link from 'next/link';
import { CartButton } from '../components/Buttons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => {
  // State to track if the Hero animation is complete
  const [heroAnimationDone, setHeroAnimationDone] = useState(false);

  // Effect to listen for the custom event dispatched by Hero.tsx
  useEffect(() => {
    const handleHeroAnimationComplete = () => {
      setHeroAnimationDone(true);
    };

    window.addEventListener('heroAnimationComplete', handleHeroAnimationComplete);

    return () => {
      window.removeEventListener('heroAnimationComplete', handleHeroAnimationComplete);
    };
  }, []); // Empty dependency array ensures this listener is set up once

  useGSAP(() => {
    // Only run Navbar animation if heroAnimationDone is true
    if (heroAnimationDone) {
      // Initial state for Navbar elements: hidden and positioned for animation
      gsap.set(".nav-logo", { opacity: 0 });
      gsap.set(".nav-link-item", { opacity: 0, x: 50 }); // Nav links start slightly to the right
      gsap.set(".cart-button-nav", { opacity: 0 }); // Cart button starts hidden

      // Create a GSAP timeline for sequencing the Navbar animation
      const tl = gsap.timeline();

      // Animate the entire navbar to fade in
      tl.to("nav", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      })
      // Animate the navbar logo to fade in
      .to(".nav-logo", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "<0.2") // Start 0.2 seconds after the navbar fade in
      // Animate nav links to slide in from right to left with a stagger
      .to(".nav-link-item", {
        x: 0, // Move to their natural horizontal position
        opacity: 1,
        stagger: 0.1, // Stagger the animation for each link
        duration: 0.5,
        ease: "power2.out"
      }, "<0.2") // Start 0.2 seconds after the logo fades in
      // Animate the cart button to fade in
      .to(".cart-button-nav", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "<0.2"); // Start 0.2 seconds after the nav links start
    }
  }, [heroAnimationDone]); // Rerun this effect when heroAnimationDone changes

  return (
    // Navbar with fixed position and initially hidden (opacity-0)
    <nav className="bg-[#ffb300]/90 fixed top-0 w-full z-30 opacity-0 backdrop-blur-sm">
          <div className='flex flex-row items-center justify-between px-4 max-w-screen-xl mx-auto py-3'>
            <Link href="#home" className="flex items-center gap-2">
            {/* Navbar logo with a class for targeting */}
            <Image src="/logo.png" alt="logo" width={200} height={200} className='nav-logo' />
            </Link>
            <ul className='flex items-center gap-12 text-lg font-semibold text-black rubik-dirt'>
              {navLinks.map((link) => (
                // Each nav link item with a class for targeting
                <li key={link.id} className='nav-link-item'>
                  <Link href={`#${link.id}`}
                    className=' rubik-dirt transition-all duration-300 ease-in-out hover:scale-110 hover:text-shadow-sprinkles inline-block'>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Wrapper div for CartButton to target with GSAP */}
            <div className="cart-button-nav">
              <CartButton/>
            </div>
        </div>
       
    </nav>
    
  );
};

export default Navbar;
