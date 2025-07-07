'use client'
import React from 'react'
import Image from 'next/image'
import navLinks from '../constants'
import Link from 'next/link'
import { CartButton } from '../components/Buttons'




const Navbar = () => {
  return (
    <nav>
         <div className='dripping flex flex-row items-center justify-between px-3'>
            <Link href="#home" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={200} height={200} />
            </Link>
<ul className='flex items-center gap-12 text-lg font-semibold text-black rubik-dirt'>
   {navLinks.map((link) => (
<li key={link.id}>
<Link href='#${link.id}'
className=' rubik-dirt transition-all duration-300 ease-in-out hover:scale-110 hover:text-shadow-sprinkles inline-block'>
{link.title}
</Link>
</li>
   ))}
</ul>

<CartButton/>


        </div>
    </nav>
  )
}

export default Navbar