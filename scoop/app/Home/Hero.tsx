'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
  useGSAP(() => {
    // Initial state: hide everything and position them for animation
    // Set zIndex for logo to be consistently higher than green ice cream and other ice creams
    gsap.set(".hero-logo", { opacity: 0, scale: 0.5, yPercent: 100, zIndex: 30 }); // Logo starts off-screen bottom, smaller, but always on top
    gsap.set(".green-ice-cream", { opacity: 0, yPercent: 100, zIndex: 10 }); // Green ice cream starts off-screen bottom, in front of other ice creams
    gsap.set(".other-ice-cream", { opacity: 0, scale: 0, zIndex: 5 }); // Other ice creams hidden and small, behind green ice cream and logo

    // Define fixed positions for each 'other-ice-cream' based on their order in the DOM
    // You can adjust these values to your liking for desired scattering.
    const fixedPositions = [
      { x: -250, y: -150, rotation: -20 }, // Choco ice cream (index 0)
      { x: 200, y: 100, rotation: 15 },   // Lemon ice cream (index 1)
      { x: -100, y: 200, rotation: 5 },   // Pink ice cream (index 2)
      { x: 150, y: -50, rotation: -10 }    // Vanilla ice cream (index 3)
    ];

    // Create a GSAP timeline for sequencing the hero animation
    const tl = gsap.timeline({
      onComplete: () => {
        // After the animation, allow vertical scrolling on the body
        document.body.style.overflowY = 'auto';
        // Dispatch a custom event to notify the Navbar that the Hero animation is complete
        window.dispatchEvent(new Event('heroAnimationComplete'));
      }
    });

    // 1. Animation for the green ice cream: moves up from bottom, 2/3 visible
    tl.to(".green-ice-cream", {
      opacity: 1,
      yPercent: -3, // Adjust this value to control how much of the image is visible (100% - 33% = 67% visible)
      duration: 1.2,
      ease: "power3.out",
    })
    // 2. Animation for the logo: start AFTER the green ice cream, and come from behind
    // The zIndex is already set high enough to ensure it's always on top.
    .to(".hero-logo", {
      opacity: 1,
      scale: 1,
      yPercent: -25, // Moves to its natural vertical position (center of its container)
      duration: 1.2,
      ease: "power3.out",
      // zIndex remains 30, ensuring it's always above other ice creams (which will be 15)
    }, '<0.15') // Start 0.5 seconds after the previous animation finishes
    // Animation for other ice creams: scatter and scale up to fixed positions
    .to(".other-ice-cream", {
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: {
        each: 0.2, // Stagger the start time for each ice cream
        from: "random" // Still use random for stagger order, but position is fixed
      },
      ease: "back.out(1.7)", // A bouncy ease for a playful effect
      // Use a function to apply fixed positions based on the staggered index (i)
      x: (i, target) => fixedPositions[i].x,
      y: (i, target) => fixedPositions[i].y,
      rotation: (i, target) => fixedPositions[i].rotation,
      zIndex: 15 // Bring other ice creams to front (but still below logo) after animation starts
    }, '<0.2'); // Start 0.3 seconds after the logo animation begins (still after green ice cream)
  }, []); // Empty dependency array ensures this runs once on mount

  // Effect to initially prevent scrolling and clean up on unmount
  useEffect(() => {
    document.body.style.overflowY = 'hidden'; // Prevent scrolling during initial animation
    return () => {
      document.body.style.overflowY = 'auto'; // Re-enable scrolling when component unmounts
    };
  }, []);

  return (
    // Hero section as a full-screen container, relative for absolute children
    <section id='hero' className='relative h-screen w-screen overflow-hidden flex items-center justify-center'>
      {/* Container for the logo and ice creams, centered */}
      <div className='relative w-full h-full flex flex-col items-center justify-center'>
        {/* Logo positioned absolutely in the center */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Image src='/logo.png' alt='logo' width={900} height={800} className='hero-logo' />
        </div>
        {/* Green ice cream positioned at the bottom center, initially hidden */}
        <Image src='/Icecreams/green.png' alt='ice cream' width={330} height={330} className='green-ice-cream absolute bottom-0 left-1/2 -translate-x-1/2' />
        {/* Other ice creams positioned absolutely for scattering, initially hidden */}
        {/* Ensure the order here matches the order in fixedPositions array if you're using index-based mapping */}
        <Image src='/Icecreams/choco.png' alt='ice cream' width={180} height={180} className='other-ice-cream absolute' style={{ top: '40%', left: '30%' }} />
        <Image src='/Icecreams/lemon.png' alt='ice cream' width={170} height={170} className='other-ice-cream absolute' style={{ top: '50%', right: '25%' }} />
        <Image src='/Icecreams/pink.png' alt='ice cream' width={240} height={240} className='other-ice-cream absolute' style={{ bottom: '30%', left: '20%' }} />
        <Image src='/Icecreams/vanilla.png' alt='ice cream' width={140} height={140} className='other-ice-cream absolute' style={{ top: '30%', right: '20%' }} />
      </div>
    </section>
  );
};

export default Hero;
