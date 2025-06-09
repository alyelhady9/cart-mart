import React from 'react'
import HeroCarousel from './HeroCarousel'
import TopRatedProducts from './TopRatedProducts'
import SpecialOffers from './SpecialOffers'

function Hero() {
  return (
    <div className='text-gray-900'>
        <HeroCarousel />
        
          <TopRatedProducts />
          <SpecialOffers />
      
    </div>
  )
}

export default Hero