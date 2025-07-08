'use client'
import Image from 'next/image';
import { ShopButton } from '@/app/components/Buttons';
import  RotatingText  from '@/app/components/RotatingText';

const About = () => {
    
    return (
        <section  id='about' className='relative  overflow-hidden '>
            
            {/* The image container */}
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
                <Image id='j' src='/mochamagic.png' alt='ice cream' width={100} height={100} className='absolute' />
            </div>

{/* <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none "></div> */}
            {/* Your About Section Content */}
<div className="relative z-20 flex flex-col items-center justify-center h-full w-full mt-20 p-8">

<h1 className="text-6xl font-bold text-black mb-6 rubik-dirt flex flex-row">
  <span className='pt-2'>Live the</span>{" "} <RotatingText
    texts={['sweet', 'happy', 'joyious', 'delicious', 'lovelife']}
    mainClassName="px-2 sm:px-2 md:px-3 bg-[#F17475] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
    staggerFrom={"last"}
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "-120%" }} 
    staggerDuration={0.025}
    splitLevelClassName="overflow-hidden pb-4 sm:pb-1 md:pb-1"
    transition={{ type: "spring", damping: 30, stiffness: 400 }}
    rotationInterval={2000}
  /> {" "} <span className='pt-2.5'>life</span>
</h1>

                <p className="text-xl text-black max-w-2xl rubik-dirt mb-8 text-left">
                    Welcome to a world of flavor! We are passionate about creating the most delicious and unique ice cream experiences. Our journey started in a small kitchen and has grown into a beloved brand, but our commitment to quality and creativity has never changed.
                </p>
                <ShopButton/>
            </div>
            
        </section>
    );
};

export default About;