import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  return (
    // Section as a flex container to center its content
    <section id='testimonials' className='w-full flex flex-col justify-center items-center pt-10'>
     <h1 className='rubik-dirt text-4xl text-black mb-0'>Testimonials</h1>
      <div className='relative w-full min-h-screen flex items-center justify-center'>
        {/* Testimonial GIF 1 */}
        <Image
          src='/testimonials/test.gif'
          alt='testimonial gif'
          width={350}
          height={350}
          // Absolute positioning to scatter it
          // Increased top and decreased left percentage to increase gap
          className='absolute top-20 left-[15%] transform -translate-x-1/2 z-10'
          // For smaller screens, adjust position
          // md:top-20 md:left-1/4
        />
        {/* Testimonial GIF 2 */}
        <Image
          src='/testimonials/test2.gif'
          alt='testimonial gif'
          width={450}
          height={450}
          // Absolute positioning to scatter it
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'
          // For smaller screens, adjust position
          // md:top-1/2 md:left-1/2
        />
        {/* Testimonial GIF 3 */}
        <Image
          src='/testimonials/test3.gif'
          alt='testimonial gif'
          width={400}
          height={400}
          // Absolute positioning to scatter it
          // Increased bottom and decreased right percentage to increase gap
          className='absolute bottom-20 right-[15%] transform translate-x-1/2 z-10'
          // For smaller screens, adjust position
          // md:bottom-20 md:right-1/4
        />
      </div>
    </section>
  );
};

export default Testimonials;
