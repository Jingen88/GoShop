'use client'; // Add 'use client' to use hooks

import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIceCream } from 'react-icons/io5';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // Import useCart

// --- CartButton ---
const CartButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { getCartTotalItems } = useCart();
  const totalItems = getCartTotalItems();

  return (
    <Link href="/checkout" passHref>
      <button
        className={`group relative z-20 cursor-pointer flex  items-center justify-center gap-2 px-3 py-2 text-base font-bold transition-all duration-300
          ${isHovered ? "animate-wobble" : ""}
          before:absolute before:inset-0 before:bg-[#90ccc7] before:opacity-90 before:rounded-[12px]  // Add rounded to before
          after:absolute after:inset-0 after:opacity-20 after:rounded-[12px]  // Add rounded to after
          hover:shadow-xl hover:shadow-black/20
          focus:outline-none focus:ring-4 focus:ring-to-[#ffb300]
          active:scale-95 active:shadow-inner
          disabled:cursor-not-allowed disabled:opacity-50
          sm:px-4 sm:py-3 md:text-lg
          transform skew-x-1 rotate-1
          rounded-[12px] overflow-hidden`}  // Ensure overflow is hidden
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="View your cart"
        role="link"
      >
        <FaShoppingCart
          className={`text-base text-black transform transition-transform duration-300 ${isHovered ? "rotate-12" : ""}`}
          aria-hidden="true"
        />
        <span className="relative text-black rubik-dirt uppercase tracking-wider text-shadow-lg transform transition-transform duration-300 group-hover:scale-105">
          Cart
        </span>
        {totalItems > 0 && (
          <span className="flex z-22 items-center justify-center min-w-6 h-6 px-1 ml-1 bg-[#F17475] text-white text-xs font-bold rounded-full">
            {totalItems}
          </span>
        )}
      </button>
    </Link>
  );
};

export { CartButton };


// --- ShopButton --- (For scrolling)
const ShopButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // This button now correctly uses a Link for smooth scrolling
    <Link href="#shop" passHref>
        <button
          className={`group relative z-20 cursor-pointer flex items-center justify-center gap-2 px-2 py-2 text-base font-bold transition-all duration-300 overflow-hidden
            ${isHovered ? "animate-wobble" : ""}
            before:absolute before:inset-0 before:bg-[#90ccc7] before:opacity-90
            after:absolute after:inset-0  after:opacity-20
            hover:shadow-xl hover:shadow-black/20
            sm:px-4 sm:py-3 md:text-lg
            transform skew-x-1 rotate-1
            rounded-[12px] bg-gradient-to-r from-[#ff7500] to-[#ffb300]`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Go to shop"
          role="link"
        >
          <IoIceCream
            className={`text-base text-black transform transition-transform duration-300 ${isHovered ? "rotate-12" : ""}`}
            aria-hidden="true"
          />
          <span className="relative text-black rubik-dirt uppercase tracking-wider text-shadow-lg transform transition-transform duration-300 group-hover:scale-105">
            Scoop Shop
          </span>
        </button>
    </Link>
  );
};

export { ShopButton };


// --- ScoopShopButton --- (For adding to cart)
const ScoopShopButton = ({ onClick }: { onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`group relative z-20 cursor-pointer flex items-center justify-center gap-2 px-2 py-2 text-base font-bold transition-all duration-300 overflow-hidden
        ${isHovered ? "animate-wobble" : ""}
        before:absolute before:inset-0 before:bg-[#90ccc7] before:opacity-90
        after:absolute after:inset-0  after:opacity-20
        hover:shadow-xl hover:shadow-black/20
        sm:px-4 sm:py-3 md:text-lg
        transform skew-x-1 rotate-1
        rounded-[12px] bg-gradient-to-r from-[#ff7500] to-[#ffb300]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Add to cart"
      role="button"
    >
      <IoIceCream
        className={`text-base text-black transform transition-transform duration-300 ${isHovered ? "rotate-12" : ""}`}
        aria-hidden="true"
      />
      <span className="relative text-black rubik-dirt uppercase tracking-wider text-shadow-lg transform transition-transform duration-300 group-hover:scale-105">
        Add To Cart
      </span>
    </button>
  );
};

export { ScoopShopButton };