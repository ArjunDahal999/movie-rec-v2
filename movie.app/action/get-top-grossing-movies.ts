import { ApiResponse, MoviesType } from '~/types';

import { pythonApiClientWithoutHeader } from '~/lib/axios-config';

export const getTopGrossingMovie = async (): Promise<ApiResponse<MoviesType[] | undefined>> => {
  try {
    const response = await pythonApiClientWithoutHeader.get('/highest-grossing-movie');
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
