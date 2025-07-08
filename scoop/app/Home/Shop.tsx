'use client';

import { sliderLists } from '../constants/index.js';
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScoopShopButton } from '@/app/components/Buttons';
import { useCart } from '../context/CartContext'; // Import useCart
import Image from 'next/image';

interface IceCreamItem {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  price: number;
  measurements: string;
  tub: string;
}


const Menu = () => {
  const [currentIndex, setCurrentIndex] =useState<number>(0);
  const { addToCart } = useCart(); // Get the addToCart function

  // GSAP animations remain the same
  useGSAP(() => {
    
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    const newIndex = (index + sliderLists.length) % sliderLists.length;
    setCurrentIndex(newIndex);
  };

  const handleAddToCart = () => {
  const currentIceCream: IceCreamItem = sliderLists[currentIndex];
  addToCart(currentIceCream);
};

  const currentIceCream = sliderLists[currentIndex];

  return (
    <section 
      id="shop" 
      aria-labelledby="shop-heading" 
      className="flex flex-col items-center justify-center min-h-screen w-full p-2 overflow-hidden noisy" // Added noisy for style consistency
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
       
        {/* Your navigation and image JSX here (no changes needed) */}
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
                <Image 
                  src="/Shop/arrow-left.png" 
                  alt="Previous ice cream" 
                  width={50}
                  height={50}
                  className="w-[50px] transition-transform duration-200 cursor-pointer ease-in-out hover:scale-110"
                />
            </button> 
            <div className="rubik-dirt text-black text-left mt-2 pl-10">
                <h2 className="text-2xl mb-2">{currentIceCream.title}</h2>
                <p className="text-md ">{currentIceCream.description}</p>
            </div>
        </div>

        
        <div className="icecream-image [grid-area:image] flex flex-col items-center">
            <Image 
                src={currentIceCream.image} 
                alt={currentIceCream.name} 
                width={300}
                height={300}
                className="object-contain max-w-sm h-auto" 
            />
        </div>

        <div className="right-arrow flex flex-col items-center [grid-area:right] justify-self-start cursor-pointer gap-2">
            <button onClick={() => goToSlide(currentIndex + 1)} className="p-4">
                <Image 
                  src="/Shop/arrow-right.png" 
                  alt="Next ice cream" 
                  width={50}
                  height={50}
                  className="w-[50px] transition-transform duration-200 ease-in-out cursor-pointer hover:scale-110"
                />
            </button>
            {/* ... existing code ... */}
      
            <div className="mt-35 pr-8">
                {/* Pass the onClick handler to the button */}
                <ScoopShopButton onClick={handleAddToCart} /> 
            </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;