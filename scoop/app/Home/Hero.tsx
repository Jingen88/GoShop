'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
  useGSAP(() => {
    gsap.set(".hero-logo", { opacity: 0, scale: 0.5, yPercent: 100, zIndex: 30 });
    gsap.set(".green-ice-cream", { opacity: 0, yPercent: 100, zIndex: 10 });
    gsap.set(".other-ice-cream", { opacity: 0, scale: 0, zIndex: 5 });

    // Adjusted positions for mobile while maintaining proportions
    const fixedPositions = [
      { x: '-25vw', y: '-15vh', rotation: -20 },  // choco
      { x: '20vw', y: '10vh', rotation: 15 },     // lemon
      { x: '-10vw', y: '20vh', rotation: 5 },     // pink
      { x: '15vw', y: '-5vh', rotation: -10 }     // vanilla
    ];

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflowY = 'auto';
        window.dispatchEvent(new Event('heroAnimationComplete'));
      }
    });

    tl.to(".green-ice-cream", {
      opacity: 1,
      yPercent: -3,
      duration: 1.2,
      ease: "power3.out",
    })
    .to(".hero-logo", {
      opacity: 1,
      scale: 1,
      yPercent: -25,
      duration: 1.2,
      ease: "power3.out",
    }, '<0.15')
    .to(".other-ice-cream", {
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.7)",
      x: (i) => fixedPositions[i].x,
      y: (i) => fixedPositions[i].y,
      rotation: (i) => fixedPositions[i].rotation,
      zIndex: 15
    }, '<0.2');
  }, []);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => { document.body.style.overflowY = 'auto'; };
  }, []);

  return (
    <section id='hero' className='relative h-screen w-screen overflow-hidden flex items-center justify-center'>
      <div className='relative w-full h-full flex flex-col items-center justify-center'>
        {/* Logo */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Image 
            src='/logo.png' 
            alt='logo' 
            width={900} 
            height={800} 
            className='hero-logo w-[200px] md:w-[400px] lg:w-[900px]'
          />
        </div>
        
        {/* Green Ice Cream */}
        <Image 
          src='/Icecreams/green.png' 
          alt='ice cream' 
          width={330} 
          height={330} 
          className='green-ice-cream absolute bottom-0 left-1/2 -translate-x-1/2 w-[150px] md:w-[250px] lg:w-[330px]'
        />
        
        {/* Other Ice Creams with viewport-based positioning */}
        <Image 
          src='/Icecreams/choco.png' 
          alt='ice cream' 
          width={180} 
          height={180} 
          className='other-ice-cream absolute w-[80px] md:w-[120px] lg:w-[180px]'
          style={{ top: '40%', left: '30%' }}
        />
        <Image 
          src='/Icecreams/lemon.png' 
          alt='ice cream' 
          width={170} 
          height={170} 
          className='other-ice-cream absolute w-[70px] md:w-[120px] lg:w-[170px]'
          style={{ top: '50%', right: '25%' }}
        />
        <Image 
          src='/Icecreams/pink.png' 
          alt='ice cream' 
          width={240} 
          height={240} 
          className='other-ice-cream absolute w-[100px] md:w-[180px] lg:w-[240px]'
          style={{ bottom: '30%', left: '20%' }}
        />
        <Image 
          src='/Icecreams/vanilla.png' 
          alt='ice cream' 
          width={140} 
          height={140} 
          className='other-ice-cream absolute w-[60px] md:w-[100px] lg:w-[140px]'
          style={{ top: '30%', right: '20%' }}
        />
      </div>
    </section>
  );
};

export default Hero;