import { ApiResponse, MoviesType } from '@/types';

import { pythonApiClientWithoutHeader } from '@/lib/axios-config';

/**
 * Fetches recommended movies based on a query title.
 *
 * @param title - The movie title to use as a query for recommendations
 * @returns A promise that resolves to an ApiResponse containing either:
 *          - On success: Array of movie objects with the following properties:
 *            - revenue: Movie's revenue amount
 *            - title: Movie's title
 *            - director: Movie's director name
 *            - genres: Movie genres as string
 *            - cast: Movie's cast information
 *            - overview: Movie plot overview
 *            - similarity_score: Similarity score compared to query movie
 *          - On failure: undefined
 *
 * @remarks
 * Makes a GET request to https://localhost:8000/movie-from-query/{title}
 * Returns movies ranked by similarity to the provided title
 */
export const getRecommendedMovieFromQuery = async (
  title: string
): Promise<
  ApiResponse<
    {
      revenue: number;
      title: string;
      director: string;
      genres: string;
      cast: string;
      overview: string;
      similarity_score: number;
    }[]
  >
> => {
  try {
    const response = await pythonApiClientWithoutHeader.get(
      `/movie-from-query/${title}`
    );

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: undefined,
    };
  }
};
