'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import navLinks from '../constants';
import Link from 'next/link';
import { CartButton } from '../components/Buttons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => {
  const [heroAnimationDone, setHeroAnimationDone] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleHeroAnimationComplete = () => {
      setHeroAnimationDone(true);
    };

    window.addEventListener('heroAnimationComplete', handleHeroAnimationComplete);
    return () => window.removeEventListener('heroAnimationComplete', handleHeroAnimationComplete);
  }, []);

  useGSAP(() => {
    if (heroAnimationDone) {
      gsap.set(".nav-logo", { opacity: 0, y: -20 });
      gsap.set(".hamburger", { opacity: 0 });
      gsap.set(".cart-button-nav", { opacity: 0, y: 20 });

      const tl = gsap.timeline();
      tl.to("nav", { opacity: 1, duration: 0.5 })
        .to(".nav-logo", { opacity: 1, y: 0, duration: 0.5 }, "<0.2")
        .to(".hamburger", { opacity: 1, duration: 0.5 }, "<0.2")
        .to(".cart-button-nav", { 
          opacity: 1, 
          y: 0, 
          duration: 0.5 
        }, "<0.2");
    }
  }, [heroAnimationDone]);

  return (
    <nav className="bg-[#ffb300]/90 fixed top-0 w-full md:w-[98.7%] z-30 opacity-0 backdrop-blur-sm left-0 right-0">
      <div className="flex items-center justify-between px-4 mx-auto py-3 max-w-screen-xl">
        {/* Logo */}
        <Link href="#home" className="nav-logo">
          <Image 
            src="/logo.png" 
            alt="logo" 
            width={200} 
            height={200} 
            className="w-24 md:w-32 lg:w-40"
          />
        </Link>
        
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-semibold  text-black rubik-dirt">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link 
                href={`#${link.id}`}
                className="rubik-dirt transition-all duration-300 hover:scale-110 hover:text-shadow-sprinkles"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Mobile Hamburger Menu */}
        <button 
          className="hamburger md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Cart Button */}
        <div className="cart-button-nav">
          <CartButton  />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#ffb300]/90 w-full">
          <ul className="flex flex-col items-center gap-4 py-4 text-lg font-semibold text-black rubik-dirt">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link 
                  href={`#${link.id}`}
                  className="rubik-dirt transition-all duration-300 hover:scale-110 hover:text-shadow-sprinkles"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;