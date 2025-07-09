'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText);

const Filler = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageContainerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from(imageContainerRef.current, {
      x: 200,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, 0);

    tl.from(headingRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '<0.2');

    const split = new SplitText(paragraphRef.current, { type: "lines" });
    tl.from(split.lines, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out',
      duration: 0.6
    }, '<0.3');
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id='filler' 
      className='mt-20 overflow-hidden flex flex-col md:flex-row justify-between items-center px-4 md:px-9'
    >
      <div className='text-black w-full md:w-1/2 order-2 md:order-1'>
        <h2 ref={headingRef} className='rubik-dirt text-2xl md:text-4xl font-bold text-center pb-4 md:pb-8 px-4 md:px-8'>
          Who We Are ?
        </h2>
        <p ref={paragraphRef} className='rubik-dirt text-base md:text-2xl px-4 md:px-8 leading-6 md:leading-8 text-left'>
          Born in London in 2018, we set out to prove that organic, plant-based ice cream could be the best in the world.  
        </p>
      </div>
      <div ref={imageContainerRef} className='order-1 md:order-2 mb-8 md:mb-0'>
        <Image 
          src='/shop.png' 
          alt='scoop shop in london' 
          width={400} 
          height={600}
          className='w-[250px] md:w-[400px]'
        />
      </div>
    </section>
  )
}

export default Filler