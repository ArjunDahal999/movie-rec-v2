import { ApiResponse, MoviesType } from '~/types';

import { pythonApiClientWithoutHeader } from '~/lib/axios-config';

export const getRecommendedMovie = async (
  title: string
): Promise<ApiResponse<MoviesType[] | undefined>> => {
  try {
    const response = await pythonApiClientWithoutHeader.get(`/predict/${title}`);
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
