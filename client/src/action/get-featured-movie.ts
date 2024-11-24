import { ApiResponse, MoviesType } from '@/types';
import axios from 'axios';

import { pythonApiClientWithoutHeader } from '@/lib/axios-config';

export const getFeaturedMovie = async (): Promise<
  ApiResponse<MoviesType[] | undefined>
> => {
  try {
    const response = await pythonApiClientWithoutHeader.get('/random-movie');
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
