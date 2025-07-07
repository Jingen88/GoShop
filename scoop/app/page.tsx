import React from 'react'
import Navbar from './Home/Navbar'
import Hero from './Home/Hero' 
import About from './Home/About'
import Filler from './Home/Filler'
import Testimonials from './Home/Testimonials'
import Shop from './Home/Shop' 
import Footer from './Home/Footer'


const page = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
    <Filler/>
    <Testimonials/>
    <Shop/>
    <Footer/>
    </>
  )
}

export default page