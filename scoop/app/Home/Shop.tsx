'use client';
import { sliderLists } from '../constants/index.js';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ScoopShopButton } from '@/app/components/Buttons';
import { useCart } from '../context/CartContext';
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { addToCart } = useCart();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    const newIndex = (index + sliderLists.length) % sliderLists.length;
    setCurrentIndex(newIndex);
  };

  const handleAddToCart = () => {
    const currentIceCream: IceCreamItem = sliderLists[currentIndex];
    addToCart(currentIceCream);
  };

  // Swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      goToSlide(currentIndex + 1);
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      goToSlide(currentIndex - 1);
    }
  }, [currentIndex]);

  // Add swipe event listeners
  useEffect(() => {
    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      imageElement.addEventListener('touchmove', handleTouchMove, { passive: true });
      imageElement.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        imageElement.removeEventListener('touchstart', handleTouchStart);
        imageElement.removeEventListener('touchmove', handleTouchMove);
        imageElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [currentIndex, handleTouchEnd]);

  const currentIceCream = sliderLists[currentIndex];

  return (
    <section 
      id="shop" 
      aria-labelledby="shop-heading" 
      className="flex flex-col items-center justify-center min-h-[100vh] w-full p-4 overflow-hidden noisy pb-20"
    >
      {/* Title */}
      <h2 
        id="shop-heading" 
        className="rubik-dirt text-2xl md:text-4xl text-center mb-6 md:mb-8"
      >
        Scoop Shop
      </h2>
     
      {/* Flavor Tabs */}
      <nav 
        className="icecream-tabs flex flex-row justify-center gap-2 md:gap-8 w-full overflow-x-auto py-2 mb-4 md:mb-1"
        aria-label="Scoop Shop Navigation"
      >
        {sliderLists.map((iceCream, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={iceCream.id}
              onClick={() => goToSlide(index)}
              className={`pb-1 px-2 cursor-pointer rubik-dirt text-sm md:text-base transition-colors duration-300 whitespace-nowrap
                ${isActive ? 'text-[#90ccc7] border-b-2 border-[#90ccc7]' : 'text-black'}`}
            >
              {iceCream.name}
            </button>
          );
        })}
      </nav>

      {/* Mobile Layout */}
      <div className="md:hidden w-full flex flex-col items-center">
        {/* Swipeable Image Container */}
        <div 
          ref={imageRef}
          className="relative mb-6 touch-pan-y" 
          style={{ minHeight: '250px', touchAction: 'pan-y' }}
        >
          <Image 
            src={currentIceCream.image} 
            alt={currentIceCream.name} 
            width={300}
            height={300}
            className="object-contain w-[220px] h-[220px] mx-auto touch-none select-none" 
            draggable="false"
          />
          {/* Swipe indicator animation */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {sliderLists.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-[#90ccc7]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="text-center px-4 mb-6">
          <h3 className="rubik-dirt text-xl font-bold mb-2">{currentIceCream.title}</h3>
          <p className="rubik-dirt text-sm text-black">{currentIceCream.description}</p>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-6 mb-8">
          <ScoopShopButton onClick={handleAddToCart} />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid w-full max-w-7xl min-h-[60vh] items-center justify-items-center gap-4"
        style={{ 
          gridTemplateColumns: '2fr 2.5fr 2fr',
          gridTemplateAreas: `
            ".    title    ."
            ".    tabs     ."
            "left image right"
          `,
          marginTop: '-1rem'
        }}
      >
        {/* Left Arrow and Description */}
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
          <div className="rubik-dirt text-black text-left pl-10">
            <h2 className="text-2xl mb-2">{currentIceCream.title}</h2>
            <p className="rubik-dirt text-md">{currentIceCream.description}</p>
          </div>
        </div>

        {/* Ice Cream Image */}
        <div className="icecream-image [grid-area:image] flex flex-col items-center" style={{ minHeight: '400px' }}>
          <Image 
            src={currentIceCream.image} 
            alt={currentIceCream.name} 
            width={450}
            height={450}
            className="object-contain w-full max-w-[450px] h-auto" 
          />
        </div>

        {/* Right Arrow */}
        <div className="right-arrow flex flex-col items-center [grid-area:right] justify-self-start cursor-pointer mt-9 gap-33">
          <button onClick={() => goToSlide(currentIndex + 1)} className="p-1">
            <Image 
              src="/Shop/arrow-right.png" 
              alt="Next ice cream" 
              width={50}
              height={50}
              className="w-[50px] transition-transform duration-200 ease-in-out cursor-pointer hover:scale-110"
            />
          </button>
          <div className="mt-8 pr-8">
            <ScoopShopButton onClick={handleAddToCart} /> 
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;