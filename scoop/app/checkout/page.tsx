'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';


const CheckoutPage = () => {
  const { cartItems, removeFromCart } = useCart(); // Add removeFromCart

  return (
    <>
      {/* Minimal Navbar for checkout page */}
      <nav className="bg-[#ffb300]/90 w-full z-50 p-4 flex justify-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </Link>
      </nav>
      <main className="noisy min-h-screen p-4 sm:p-8 md:p-12">
        <div className="max-w-4xl mx-auto relative">
          <Link 
            href="/#shop" 
            className="absolute top-0 left-0 text-black rubik-dirt text-lg hover:text-[#F17475] transition-colors duration-300 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-black mb-8 rubik-dirt text-center">Checkout</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center rubik-dirt">
              <p className="text-xl text-black">Your cart is empty!</p>
              <Link href="/#shop" className="text-lg text-[#F17475] hover:underline mt-4 inline-block">
                Go back to the Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* --- Cart Items Section --- */}
              <div className="bg-white/50 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-black mb-4 rubik-dirt">Your Cart</h2>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 relative">
                      <Image src={item.tub} alt={item.name} width={80} height={80} className="rounded-md" />
                      <div className='flex flex-col gap-2 flex-grow'>
                        <h3 className="font-semibold text-black rubik-dirt">{item.name}</h3>
                        <p className="text-sm text-gray-700">{item.measurements} ml</p>
                        <p className="text-sm text-gray-700">{item.price}£</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="absolute top-0 right-0 text-[#F17475] hover:text-[#ff7500] cursor-pointer transition-colors"
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
              <div className="bg-white/50 p-6 rounded-lg shadow-lg">
                {/* Delivery Information */}
                <h2 className="text-2xl font-bold text-black mb-4 rubik-dirt">Delivery Information</h2>
                <form className="space-y-4 rubik-dirt">
                  <input type="text" placeholder="Full Name" className="w-full p-2 border rounded"/>
                  <input type="text" placeholder="Address" className="w-full p-2 border rounded"/>
                  <input type="text" placeholder="Postcode" className="w-full p-2 border rounded"/>
                </form>

                {/* Payment Method */}
                <h2 className="text-2xl font-bold text-black mt-8 mb-4 rubik-dirt">Payment Method</h2>
                <div className="space-y-2 rubik-dirt">
                  <label className="flex items-center gap-2 p-3 border rounded-lg has-[:checked]:bg-[#90ccc7]">
                    <input type="radio" name="payment" className="form-radio cursor:pointer text-[#F17475]"/>
                    <span>Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg has-[:checked]:bg-[#90ccc7]">
                    <input type="radio" name="payment" className="form-radio cursor-pointer text-[#F17475]"/>
                    <span>PayPal</span>
                  </label>
                </div>
                <button className="w-full mt-8 bg-gradient-to-r cursor-pointer from-[#ff7500] to-[#ffb300] text-black font-bold py-3 rounded-lg rubik-dirt text-lg hover:scale-105 transition-transform">
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