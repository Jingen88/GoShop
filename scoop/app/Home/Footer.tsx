'use client'
import { openingHours, socials } from '../constants/index.js'
import { useGSAP } from '@gsap/react'
import { SplitText} from 'gsap/all';
import gsap from 'gsap';
import Image from 'next/image';



const Footer = () => {

useGSAP(() => {
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
   })
    .to('#f-right-leaf', {
     y: '-50', duration: 1, ease: 'power1.inOut'
   }).to('#f-left-leaf', {
     y: '-50', duration: 1, ease: 'power1.inOut'
   }, '<')
  })
 

  return (
  <footer id="contact" className='rubik-dirt text-black flex flex-col justify-center items-center text-center gap-10 pt-15 '>
   
   <div className="absolute top-0 left-0 w-1/2 h-full z-0 ">
                <Image id='a' src='/berrybliss.png' alt='ice cream' width={180} height={180} className='absolute' />
                <Image id='b' src='/mochamagic.png' alt='ice cream' width={170} height={170} className='absolute' />
                <Image id='c' src="/Pistachiohice.png" alt='ice cream' width={240} height={240} className='absolute' />
                <Image id='d' src="/vanillavibe.png" alt='ice cream' width={140} height={140} className='absolute' />
                <Image id='e' src="/unicornswirl.png" alt='ice cream' width={150} height={150} className='absolute' />
                <Image id='f' src='/cosmiccocoa.png' alt='ice cream' width={120} height={120} className='absolute' />
                <Image id='g' src='/berrybliss.png' alt='ice cream' width={200} height={200} className='absolute' />
                <Image id='h' src="/Pistachiohice.png" alt='ice cream' width={160} height={160} className='absolute' />
                <Image id='i' src='/unicornswirl.png' alt='ice cream' width={190} height={190} className='absolute' />
                <Image id='j' src='/mochamagic.png' alt='ice cream' width={100} height={100} className='absolute'/>
  </div>


   <div className=" mb-8">
    <h2 className='text-4xl mb-15'>Where to Find Us</h2>
    
    <div className='mb-8'>
     <h3 className='mb-5 text-2xl'>Visit Our Ice Cream Shop</h3>
     <p>4567, St.Patrick Blvd, Langley, CA</p>
    </div>
    
    <div className='mb-8'>
  
     <h3 className='mb-5 text-2xl'>Contact Us</h3>
     <p>(555) 987-65678</p>
     <p>hello@mocktail.com</p>
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
     
     <div className="flex flex-row justify-center items-center gap-8 ">
      {socials.map((social) => (
       <a
        key={social.name}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        
       >
        <Image alt={social.name} width={44} height={44} className='onhover:scale-110 transition-all duration-300' src={social.icon} />
       </a>
      ))}
     </div>
    </div>
   </div>
  </footer>
 )
}

export default Footer