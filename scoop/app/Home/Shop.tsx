'use client';

import { sliderLists } from '../constants/index.js';
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScoopShopButton } from '@/app/components/Buttons';

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // GSAP animations remain the same
  useGSAP(() => {
    gsap.fromTo('#shop-heading', { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo('.icecream-image img', { opacity: 0, scale: 0.8 }, {
      scale: 1, opacity: 1, duration: 1, ease: 'power1.inOut'
    });
    gsap.fromTo('.details', { yPercent: 100, opacity: 0 }, {
      yPercent: 0, opacity: 1, ease: 'power1.inOut', delay: 0.5
    });
    gsap.fromTo('.icecream-tabs', { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, ease: 'power1.inOut', delay: 0.3
    });
    gsap.fromTo('.scoop-shop-button', { yPercent: 100, opacity: 0 }, {
      yPercent: 0, opacity: 1, ease: 'power1.inOut', delay: 0.5
    });
  }, [currentIndex]);

  const goToSlide = (index) => {
    const newIndex = (index + sliderLists.length) % sliderLists.length;
    setCurrentIndex(newIndex);
  };

  const currentIceCream = sliderLists[currentIndex];

  return (
    <section 
      id="shop" 
      aria-labelledby="shop-heading" 
      className="flex flex-col items-center justify-center min-h-screen w-full p-2 overflow-hidden"
    >
      <div 
        className="grid w-full max-w-7xl h-[100vh] items-center justify-items-center gap-4 grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_1fr_auto]"
        style={{ 
          gridTemplateColumns: '2fr 2.5fr 2fr',
          gridTemplateAreas: `
          ".    title    ."
          ".    tabs     ."
          "left image right"
        `}}
      >
        <h2 
          id="shop-heading" 
          className="shop-title rubik-dirt text-4xl text-center [grid-area:title]"
        >
          Scoop Shop
        </h2>

        <nav 
          className="icecream-tabs flex flex-row justify-center gap-8 mt-4 w-full [grid-area:tabs]"
          aria-label="Scoop Shop Navigation"
        >
          {sliderLists.map((iceCream, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={iceCream.id}
                onClick={() => goToSlide(index)}
                className={` pb-[5px] cursor-pointer rubik-dirt text-md transition-colors duration-300
                  ${isActive ? 'text-[#90ccc7]' : 'text-black'}`
                }
              >
                {iceCream.name}
              </button>
            );
          })}
        </nav>

       <div className="left-arrow flex flex-col items-center [grid-area:left] justify-self-end cursor-pointer gap-8">
  <button onClick={() => goToSlide(currentIndex - 1)} className="p-1">
    <img 
      src="/Shop/arrow-left.png" 
      alt="Previous ice cream" 
      className="w-[50px] transition-transform duration-200 ease-in-out hover:scale-110"
    />
  </button> 
  <div className="rubik-dirt text-black text-left mt-2 pl-10">
    <h2 className="text-2xl mb-2">{currentIceCream.title}</h2>
    <p className="text-md ">{currentIceCream.description}</p>
  </div>
</div>

<div className="icecream-image [grid-area:image] flex flex-col items-center">
  <img 
    src={currentIceCream.image} 
    alt={currentIceCream.name} 
    className="object-contain max-w-sm h-auto" 
  />
</div>

<div className="right-arrow flex flex-col items-center [grid-area:right] justify-self-start cursor-pointer gap-2">
  <button onClick={() => goToSlide(currentIndex + 1)} className="p-4">
    <img 
      src="/Shop/arrow-right.png" 
      alt="Next ice cream" 
      className="w-[50px] transition-transform duration-200 ease-in-out hover:scale-110"
    />
  </button>
  <div className="mt-35 pr-8">
    <ScoopShopButton /> 
  </div>
</div>
</div>

    </section>
  );
};

export default Menu;