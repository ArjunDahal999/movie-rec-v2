import { MovieType } from '@/types';

import { nodeApiClientWithHeader } from '@/lib/axios-config';

export const getAllBookmarkedMovies = async () => {
  try {
    const { data } = await nodeApiClientWithHeader.get('/get-all-bookmark');
    return {
      success: true,
      data: {
        movies: data.data.movies as MovieType[],
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || error,
    };
  }
};
