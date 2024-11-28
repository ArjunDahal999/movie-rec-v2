
import Nav from '@/components/navbar'

import FeaturedMovie from '@/components/section/featured-section'
import MovieFlixHero from '@/components/section/hero-section'
import TopGrossingMovies from '@/components/section/highest-earning-section'
import TopPopularMovie from '@/components/section/top-popular'
import React from 'react'

const LandingPage = () => {
  return (
    <div>  
      <Nav/>
      <MovieFlixHero/>
      <TopGrossingMovies/>
      <FeaturedMovie/>
      <TopPopularMovie/>
    </div>
  )
}

export default LandingPage
