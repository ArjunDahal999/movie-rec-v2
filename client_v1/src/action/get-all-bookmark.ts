import type { MovieType } from '@/types';

import { nodeApiClientWithHeader } from '@/lib/axios-config';

export const getAllBookmarkedMovies = async (filters: {
  pageno?: number;
  revenue?: string;
  sort?: 'revenueasc' | 'revenuedesc';
}) => {
  try {
    const { data } = await nodeApiClientWithHeader.get('/get-all-bookmark', {
      params: filters,
    });
    return {
      success: true,
      data: {
        movies: data.data.movies as MovieType[],
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred',
    };
  }
};
