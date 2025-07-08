'use client'
import { openingHours, socials } from '../constants/index.js'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';
import gsap from 'gsap';
import Image from 'next/image';

const Footer = () => {
 useGSAP(() => {
  // --- Contact section text animation  ---
  const titleSplit = SplitText.create('#contact h2', { type: 'words' });
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#contact',
      start: 'top center',
    },
    ease: 'power1.inOut',
  })
  timeline
    .from(titleSplit.words, {
      opacity: 0, yPercent: 100, stagger: 0.02
    })
    .from('#contact h3, #contact p', {
      opacity: 0, yPercent: 100, stagger: 0.02
    });

  // --- Ice cream images falling animation  ---
  const iceCreamImages = gsap.utils.toArray('.tubs img');
  const footer = document.getElementById('contact');
  
  // Get the full width and height of the footer for positioning
  const footerWidth = footer?.offsetWidth || 1000;
  const footerHeight = footer?.offsetHeight || 1000;

  iceCreamImages.forEach((img: any) => {
    const duration = 15 + Math.random() * 10;
    const delay = Math.random() * 15;
    const rotation = (Math.random() * 360) - 180;
    
    // Calculate xPos based on the footer's width
    const xPos = Math.random() > 0.5 ?
      (Math.random() * (footerWidth * 0.25)) : // Position in the left 25%
      (footerWidth * 0.75) + (Math.random() * (footerWidth * 0.25)) - 150; // Position in the right 25%

    gsap.set(img, {
      y: -200,
      x: xPos,
      opacity: 0,
      rotation: 0
    });
    
    const tl = gsap.timeline({
      repeat: -1,
      delay: delay
    });
    
    tl.to(img, {
      y: footerHeight + 200,
      opacity: 1,
      rotation: rotation,
      duration: duration,
      ease: 'none',
    })
    .to(img, {
      opacity: 0,
      duration: 1,
    }, `-=0.4`);
  });
});

  return (
    <footer id="contact" className='rubik-dirt text-black flex flex-col justify-center items-center text-center  pt-15 relative overflow-hidden'>
      {/* Ice cream images container */}
      <div className="tubs absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <Image id='a' src='/tubs/berrybliss.png' alt='ice cream' width={80} height={80} className='absolute' />
        <Image id='b' src='/tubs/mochamagic.png' alt='ice cream' width={70} height={70} className='absolute' />
        <Image id='c' src="/tubs/Pistachiohice.png" alt='ice cream' width={140} height={140} className='absolute' />
        <Image id='d' src="/tubs/vanillavibe.png" alt='ice cream' width={140} height={140} className='absolute' />
        <Image id='e' src="/tubs/unicornswirl.png" alt='ice cream' width={150} height={150} className='absolute' />
        <Image id='f' src='/tubs/cosmiccocoa.png' alt='ice cream' width={120} height={120} className='absolute' />
        <Image id='g' src='/tubs/berrybliss.png' alt='ice cream' width={100} height={100} className='absolute' />
        <Image id='h' src="/tubs/Pistachiohice.png" alt='ice cream' width={120} height={120} className='absolute' />
        <Image id='i' src='/tubs/unicornswirl.png' alt='ice cream' width={90} height={90} className='absolute' />
        <Image id='j' src='/tubs/mochamagic.png' alt='ice cream' width={100} height={100} className='absolute'/>
      </div>

      
      {/* Content */}
      <div className="mb-8 relative z-10">
        <h2 className='text-4xl mb-15'>Where to Find Us</h2>
        
         <div className='mb-8'>
          <h3 className='mb-5 text-2xl'>Visit Our Ice Cream Shop</h3>
          <p>L12 B89, London, 79 Buckley Street</p>
        </div>
        
        <div className='mb-8'>
          <h3 className='mb-5 text-2xl'>Contact Us</h3>
          <p>(+44) 987-65678</p>
          <p>hello@lovelife.co.uk</p>
        </div>
        
        
        <div className='mb-8'>
          <h3 className='mb-5 text-2xl'>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </div>
        
        <div className='mb-8'>
          <h3 className='mb-5 text-2xl'>Follow Us</h3>
          <div className="flex flex-row justify-center items-center gap-8">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <Image alt={social.name} width={44} height={44} className='hover:scale-110 transition-all duration-300' src={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer