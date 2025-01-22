import { ApiResponse, MovieType } from '@/types';
import axios from 'axios';

import { pythonApiClientWithoutHeader } from '@/lib/axios-config';

/**
 * Fetches movie details from the server based on the movie title.
 *
 * @param title - The title of the movie to fetch details for
 * @returns A promise that resolves to an ApiResponse containing either:
 *          - On success: MovieType object with the following properties:
 *            - index: Movie's index number
 *            - budget: Movie's budget
 *            - genres: Movie genres as string
 *            - homepage: Movie's official homepage URL
 *            - id: Movie's unique identifier
 *            - keywords: Keywords associated with the movie
 *            - original_language: Movie's original language
 *            - original_title: Movie's original title
 *            - overview: Movie plot overview
 *            - popularity: Movie's popularity score
 *            - release_date: Movie's release date
 *            - revenue: Movie's revenue
 *            - runtime: Movie's runtime in minutes
 *            - status: Movie's release status
 *            - tagline: Movie's tagline
 *            - vote_average: Average vote rating
 *            - vote_count: Total number of votes
 *            - cast: Movie's cast information
 *            - director: Movie's director
 *          - On failure: undefined
 *
 * @remarks
 * Makes a GET request to https://localhost:8000/{title}
 */
export const getMovieDetails = async (
  title: string
): Promise<ApiResponse<MovieType | undefined>> => {
  try {
    const response = await pythonApiClientWithoutHeader.get(`/${title}`);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      data: undefined,
    };
  }
};
