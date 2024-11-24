import { ApiResponse, MoviesType } from '@/types';

import { pythonApiClientWithoutHeader } from '@/lib/axios-config';

const getTopRatedMovieSection = async (): Promise<
  ApiResponse<MoviesType[] | undefined>
> => {
  try {
    const response = await pythonApiClientWithoutHeader.get(
      '/top-popular-movies'
    );
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

export default getTopRatedMovieSection;
