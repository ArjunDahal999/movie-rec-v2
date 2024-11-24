import React from 'react';

import { getTopGrossingMovie } from '@/action/get-top-grossing-movies';

import MovieContainer from '../movie-container';

export default async function TopGrossingMovieSection() {
  const { data } = await getTopGrossingMovie();

  return (
    <div className="container mx-auto bg-background p-6">
      <h2 className="mb-4 text-center text-5xl font-bold">
        Top Grossing <span className="text-primary"> Movies</span>
      </h2>
      <MovieContainer data={data!} />
    </div>
  );
}
