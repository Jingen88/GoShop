'use client'
import { ShopButton } from '@/app/components/Buttons';
import RotatingText from '@/app/components/RotatingText';

const About = () => {
  return (
    <section id='about' className='relative overflow-hidden'>
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full mt-20 p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-6 rubik-dirt flex flex-col md:flex-row items-center">
          <span className='pt-2'>Live the</span>{" "}
          <RotatingText
            texts={['sweet', 'happy', 'joyious', 'delicious', 'lovelife']}
            mainClassName="px-2 bg-[#F17475] text-black overflow-hidden py-1 justify-center rounded-lg my-2 md:my-0 md:mx-2"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />{" "}
          <span className='pt-2'>life</span>
        </h1>

        <p className="text-base md:text-xl text-black max-w-2xl rubik-dirt mb-8 text-left px-4">
          Welcome to a world of flavor! We are passionate about creating the most delicious and unique ice cream experiences.
        </p>
        <ShopButton className="scale-90 md:scale-100" />
      </div>
    </section>
  );
};

export default About;