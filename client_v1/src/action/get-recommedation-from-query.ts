import { ApiResponse, MoviesType } from '@/types';

import { pythonApiClientWithoutHeader } from '@/lib/axios-config';

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
