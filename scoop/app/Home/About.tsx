'use client'

import { ShopButton } from '@/app/components/Buttons';
import  RotatingText  from '@/app/components/RotatingText';

const About = () => {
    
    return (
        <section  id='about' className='relative  overflow-hidden '>

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