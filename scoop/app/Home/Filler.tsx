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

    // Animate the image sliding in from the right
    tl.from(imageContainerRef.current, {
      x: 200,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, 0);

    // Animate the heading sliding in from the left
    tl.from(headingRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '<0.2'); // Start slightly after the image animation begins

    // Animate the paragraph sliding in line by line
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
    <section ref={sectionRef} id='filler' className='mt-20 overflow-hidden flex flex-row justify-between items-center px-9'>
        <div className='text-black w-1/2'>
            <h2 ref={headingRef} className='rubik-dirt text-4xl font-bold text-center pb-8 px-8'>Who We Are ?</h2>
            <p ref={paragraphRef} className='rubik-dirt text-2xl px-8 leading-8 text-left'>
Born in London in 2018, we set out to prove that organic, plant-based ice cream could be the best in the world. Our community fell in love with our creamy scoops, and thanks to their support, you can now find that same passion and flavour in major supermarkets across the country.
 </p>
        </div>
        <div ref={imageContainerRef}>
          <Image src='/shop.png' alt='scoop shop in london' width={400} height={600}/>
        </div>
    </section>
  )
}

export default Filler