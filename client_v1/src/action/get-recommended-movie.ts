import { ApiResponse, RecommendedMovieType } from '@/types';

import { pythonApiClientWithoutHeader } from '@/lib/axios-config';

/**
 * Fetches recommended movies based on a query movie title.
 *
 * @param title - The movie title to use for getting recommendations
 * @returns A promise that resolves to an ApiResponse containing either:
 *          - On success: Array of recommended movie objects with properties:
 *            - title: Movie's title
 *            - genres: Movie's genres as string
 *            - keywords: Movie's keywords
 *            - tagline: Movie's tagline
 *            - cast: Movie's cast information
 *            - director: Movie's director name
 *            - overview: Movie plot overview
 *            - revenue: Movie's revenue amount
 *            - similarity_score: Similarity score compared to query movie
 *            - tfidf_vector1: TF-IDF vector for query movie
 *            - tfidf_vector2: TF-IDF vector for recommended movie
 *            - common_words: Array of words common between movies
 *          - On failure: undefined
 *
 * @remarks
 * Makes a GET request to the Python backend API endpoint `https//localhost:8000/predict/{title}`
 * Returns similar movies ranked by similarity score to the provided title
 *
 * const data = await fetch(https//localhost:8000/predict/{title})
 * const res = data.json();
 */

export const getRecommendedMovie = async (
  title: string
): Promise<ApiResponse<RecommendedMovieType[] | undefined>> => {
  try {
    const response = await pythonApiClientWithoutHeader.get(
      `/predict/${title}`
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: undefined,
    };
  }
};
