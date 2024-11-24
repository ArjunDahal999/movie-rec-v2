import React, { Suspense } from 'react';

import Image from 'next/image';

import getTopRatedMovieSection from '@/action/get-top-rated-movie-section';

import { TopRatedMoviePoster } from '../../../public/images';
import { DialogBasicTwo } from '../animation/animated-movie-list';
import MovieContainer from '../movie-container';

const TopRatedMovieSection = async () => {
  const response = await getTopRatedMovieSection();
  const data = response.data;

  return (
    <section className="container mx-auto">
      <h2 className="py-12 text-center text-5xl font-bold">
        Top Rated <span className="text-primary">Movies </span>
      </h2>
      <MovieContainer data={data!} />
    </section>
  );
};

export default TopRatedMovieSection;
