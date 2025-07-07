import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { IoIceCream } from 'react-icons/io5';
import { useState } from 'react';

const CartButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`group relative z-20 cursor-pointer flex items-center justify-center gap-2 px-2 py-2 text-base font-bold transition-all duration-300 overflow-hidden
        ${isHovered ? "animate-wobble" : ""}
        before:absolute before:inset-0 before:bg-cyan-300 before:opacity-90
        after:absolute after:inset-0  after:opacity-20
        hover:shadow-xl hover:shadow-black/20
        focus:outline-none focus:ring-4 focus:ring-to-[#ffb300]
        active:scale-95 active:shadow-inner
        disabled:cursor-not-allowed disabled:opacity-50
        sm:px-4 sm:py-3 md:text-lg
        transform skew-x-1 rotate-1
        rounded-[12px] bg-gradient-to-r from-[#ff7500] to-[#ffb300]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="View your cart"
      role="button"
      tabIndex={0}
    >
      <FaShoppingCart
        className={`text-base text-black transform transition-transform duration-300 ${isHovered ? "rotate-12" : ""}`}
        aria-hidden="true"
      />
      <span className="relative text-black rubik-dirt uppercase tracking-wider text-shadow-lg transform transition-transform duration-300 group-hover:scale-105">
        Cart
      </span>
    </button>
  );
};

export { CartButton };

const ShopButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`group relative z-20 cursor-pointer flex items-center justify-center gap-2 px-2 py-2 text-base font-bold transition-all duration-300 overflow-hidden
        ${isHovered ? "animate-wobble" : ""}
        before:absolute before:inset-0 before:bg-cyan-300 before:opacity-90
        after:absolute after:inset-0  after:opacity-20
        hover:shadow-xl hover:shadow-black/20
        focus:outline-none focus:ring-4 focus:ring-to-[#ffb300]
        active:scale-95 active:shadow-inner
        disabled:cursor-not-allowed disabled:opacity-50
        sm:px-4 sm:py-3 md:text-lg
        transform skew-x-1 rotate-1
        rounded-[12px] bg-gradient-to-r from-[#ff7500] to-[#ffb300]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="View your cart"
      role="button"
      tabIndex={0}
    >
      <IoIceCream
        className={`text-base text-black transform transition-transform duration-300 ${isHovered ? "rotate-12" : ""}`}
        aria-hidden="true"
      />
      <span className="relative text-black rubik-dirt uppercase tracking-wider text-shadow-lg transform transition-transform duration-300 group-hover:scale-105">
        Scoop Shop
      </span>
    </button>
  );
};

export { ShopButton };