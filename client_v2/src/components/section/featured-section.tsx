import React from 'react'
import MovieCard from '../MovieCard'


export type  MovieDataType = {
  revenue: number,
  title:string,
  director:string,
  release_date:string,
  popularity:number,
  overview:string
}

const FeaturedMovie = async() => {
  
  const data  = await fetch('http://13.49.18.64/random-movie') //fetch the data from fasytapi that is deployed in aws
  const jsonData = await data.json() // it get the json data
  const movieData : MovieDataType[] = jsonData.data
  return (
    <>
    <h1 className=' text-center text-4xl font-bold my-4'>Featured Movie</h1>
    <div className=' max-w-7xl mx-auto  flex flex-nowrap overflow-x-scroll gap-x-4   '>
      {movieData?.map((v,i)=>{
       return(
        <>
        <MovieCard key={i} data={v}/>
        </>
       )
      })}
    </div>
    </>
  )
}

export default FeaturedMovie
