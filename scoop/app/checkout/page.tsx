'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

const CheckoutPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <>
      {/* Minimal Navbar */}
      <nav className="bg-[#ffb300]/90 w-full z-50 p-4 flex justify-center">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="logo" 
            width={150} 
            height={150} 
            className="w-24 md:w-32"
          />
        </Link>
      </nav>
      
      <main className="noisy min-h-screen p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Improved back button positioning */}
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <Link 
              href="/#shop" 
              className="text-black rubik-dirt text-base md:text-lg hover:text-[#F17475] transition-colors duration-300 flex items-center gap-1 md:gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to Shop</span>
              <span className="sm:hidden">Back</span>
            </Link>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black rubik-dirt">
              Checkout
            </h1>
            
            {/* Empty div for balance */}
            <div className="w-5 h-5 md:w-36 md:h-16"></div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center rubik-dirt mt-12">
              <p className="text-lg md:text-xl text-black mb-4">Your cart is empty!</p>
              <Link 
                href="/#shop" 
                className="inline-block px-6 py-2 bg-[#F17475] text-white rounded-lg hover:bg-[#ff7500] transition-colors"
              >
                Browse Flavors
              </Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
              {/* --- Cart Items Section --- */}
              <div className="bg-white/50 p-4 md:p-6 rounded-lg shadow-lg flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-black mb-4 rubik-dirt">
                  Your Order ({cartItems.length})
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 relative pb-4 border-b border-gray-200 last:border-0">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                        <Image 
                          src={item.tub} 
                          alt={item.name} 
                          fill
                          className="object-contain rounded-md"
                          sizes="(max-width: 768px) 80px, 96px"
                        />
                      </div>
                      <div className='flex flex-col gap-1 flex-grow'>
                        <h3 className="font-semibold text-black rubik-dirt">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-700">
                          {item.measurements} ml
                        </p>
                        <p className="text-base font-medium text-[#F17475]">
                          {item.price}£
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="absolute top-0 right-0 text-[#F17475] hover:text-[#ff7500] cursor-pointer transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- Delivery & Payment --- */}
              <div className="bg-white/50 p-4 md:p-6 rounded-lg shadow-lg flex-1 md:max-w-md">
                {/* Delivery Information */}
                <h2 className="text-xl md:text-2xl font-bold text-black mb-4 rubik-dirt">
                  Delivery Information
                </h2>
                <form className="space-y-4 rubik-dirt">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Address</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Postcode</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded text-base"
                      required
                    />
                  </div>
                </form>

                {/* Payment Method */}
                <h2 className="text-xl md:text-2xl font-bold text-black mt-8 mb-4 rubik-dirt">
                  Payment Method
                </h2>
                <div className="space-y-3 rubik-dirt">
                  <label className="flex items-center gap-3 p-3 border rounded-lg has-[:checked]:bg-[#90ccc7]/30">
                    <input 
                      type="radio" 
                      name="payment" 
                      className="form-radio cursor-pointer text-[#F17475] h-5 w-5"
                      defaultChecked
                    />
                    <span>Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg has-[:checked]:bg-[#90ccc7]/30">
                    <input 
                      type="radio" 
                      name="payment" 
                      className="form-radio cursor-pointer text-[#F17475] h-5 w-5"
                    />
                    <span>PayPal</span>
                  </label>
                </div>

                {/* Order Summary */}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between rubik-dirt mb-2">
                    <span>Subtotal:</span>
                    <span className="font-medium">
                      {cartItems.reduce((sum, item) => sum + item.price, 0)}£
                    </span>
                  </div>
                  <div className="flex justify-between rubik-dirt mb-2">
                    <span>Delivery:</span>
                    <span className="font-medium">5.99£</span>
                  </div>
                  <div className="flex justify-between rubik-dirt text-lg font-bold mt-4 pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-[#F17475]">
                      {(cartItems.reduce((sum, item) => sum + item.price, 0) + 5.99).toFixed(2)}£
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button 
                  className="w-full mt-6 bg-gradient-to-r from-[#ff7500] to-[#ffb300] text-black font-bold py-3 rounded-lg rubik-dirt text-lg hover:scale-105 transition-transform active:scale-95"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default CheckoutPage;