import React from 'react'
import Image from 'next/image'
import navLinks from '../constants'


const Navbar = () => {
  return (
    <nav>
         <div>
            <a href="#home" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" />
            
            </a>
<ul>
   {navLinks.map((link) => (
<li key={link.id}>
<a href='#${link.id}'>{link.title}</a>
</li>
   ))}
</ul>


        </div>
    </nav>
  )
}

export default Navbar