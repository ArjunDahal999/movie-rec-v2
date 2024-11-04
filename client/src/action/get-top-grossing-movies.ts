import { ApiResponse, MoviesType } from '@/types';
import axios from 'axios';

import { apiClientWithoutHeader } from '@/lib/axios-config';

export const getTopGrossingMovie = async (): Promise<
  ApiResponse<MoviesType[] | undefined>
> => {
  try {
    const response = await apiClientWithoutHeader.get(
      '/highest-grossing-movie'
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
