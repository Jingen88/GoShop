import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  return (
    <section id='testimonials' className='w-full flex flex-col justify-center items-center pt-10 pb-20'>
      <h1 className='rubik-dirt text-2xl md:text-4xl text-black mb-8 md:mb-0'>Testimonials</h1>
      
      {/* Mobile: Column layout */}
      <div className='md:hidden w-full flex flex-col items-center gap-8'>
        <Image
          src='/testimonials/test.gif'
          alt='Happy customer testimonial'
          width={250}
          height={250}
          className='w-[200px] h-auto'
        />
        <Image
          src='/testimonials/test2.gif'
          alt='Family enjoying ice cream'
          width={300}
          height={300}
          className='w-[250px] h-auto'
        />
        <Image
          src='/testimonials/test3.gif'
          alt='Couple sharing ice cream'
          width={280}
          height={280}
          className='w-[220px] h-auto'
        />
      </div>
      
      {/* Desktop: Original scattered layout */}
      <div className='hidden md:block relative w-full min-h-[50vh] md:min-h-screen flex items-center justify-center'>
        <Image
          src='/testimonials/test.gif'
          alt='Happy customer testimonial'
          width={350}
          height={350}
          className='absolute top-20 left-[15%] transform -translate-x-1/2 z-10 w-[200px] lg:w-[350px]'
        />
        <Image
          src='/testimonials/test2.gif'
          alt='Family enjoying ice cream'
          width={450}
          height={450}
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[250px] lg:w-[450px]'
        />
        <Image
          src='/testimonials/test3.gif'
          alt='Couple sharing ice cream'
          width={400}
          height={400}
          className='absolute bottom-20 right-[15%] transform translate-x-1/2 z-10 w-[220px] lg:w-[400px]'
        />
      </div>
    </section>
  );
};

export default Testimonials;