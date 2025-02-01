import React, { Suspense } from 'react';

import { getMovieDetails } from '@/action/get-movie-detail';
import { getRecommendedMovie } from '@/action/get-recommended-movie';

import MainMovie from './movie-details-section';
import RecommendedMovieSection from './recommended-movie-section';

type Params = Promise<{ slug: string }>;
const MoviePage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  try {
    const [movieResponse, recommendationResponse] = await Promise.all([
      getMovieDetails(slug),
      getRecommendedMovie(slug),
    ]);

    const { data: movieDetails } = movieResponse;
    const { data: recommendationDetails } = recommendationResponse;

    if (!movieDetails || !recommendationDetails) {
      throw new Error('Failed to fetch movie data');
    }

    return (
      <div className="container mx-auto">
        <Suspense fallback={<div>Loading movie details...</div>}>
          <MainMovie movieData={movieDetails} />
        </Suspense>
        <Suspense fallback={<div>Loading recommendations...</div>}>
          <RecommendedMovieSection recommendedData={recommendationDetails} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return (
      <div className="container mx-auto">
        <div className="py-8 text-center">
          <h2 className="text-xl font-semibold">Error loading movie details</h2>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }
};

export default MoviePage;
