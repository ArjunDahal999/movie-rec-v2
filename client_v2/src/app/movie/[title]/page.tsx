import MovieCard from '@/components/MovieCard';
import { MovieDataType } from '@/components/section/featured-section';
import { CalendarIcon, ClockIcon, FilmIcon, StarIcon } from 'lucide-react';
import Nav from '@/components/navbar';
import React from 'react'


interface MovieType {
  index: number;
  budget: number;
  genres: string;
  homepage: string;
  id: number;
  keywords: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  production_companies: string
  production_countries: string
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: string
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  cast: string;
  director: string;
}
const MoviePage = async({params}:{params:any}) => {
  console.log(params.title)
  const data  = await fetch('http://13.49.18.64/'+params.title)
  const movieJsonData = await data.json()
  const recData  = await fetch('http://13.49.18.64/predict/'+params.title)
  const recmovieData = await recData.json()
  const recMovieData: MovieDataType[] = recmovieData.data
  const movieData:MovieType = movieJsonData.data

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{movieData.original_title}</h1>      
      <p className="text-gray-700 mb-4">{movieData.overview}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
          <span>{movieData.release_date}</span>
        </div>
        <div className="flex items-center">
          <ClockIcon className="w-5 h-5 mr-2 text-gray-500" />
          <span>{movieData.runtime} minutes</span>
        </div>
        <div className="flex items-center">
          <FilmIcon className="w-5 h-5 mr-2 text-gray-500" />
          <span>{movieData.genres}</span>
        </div>
        <div className="flex items-center">
          <StarIcon className="w-5 h-5 mr-2 text-yellow-500" />
          <span>{movieData.vote_average} ({movieData.vote_count} votes)</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <span>Budget: ${movieData.budget}</span>
        </div>
        <div className="flex items-center">
         <span>Revenue: ${movieData.revenue}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Cast & Crew</h2>
        <p><strong>Director:</strong> {movieData.director}</p>
        <p><strong>Cast:</strong> {movieData.cast}</p>
      </div>
    
    </div>
{/* Recommended Section */}
    <h1 className='font-bold my-4 text-4xl text-center'> Recommendation</h1>
<div className=" grid place-content-center place-items-center gap-4 w-full  grid-cols-3">
{recMovieData.map((v,i)=>{
      return (
        <MovieCard data={v}/>
      )
    })} 
</div>
    
  </div>
  )
}

export default MoviePage
