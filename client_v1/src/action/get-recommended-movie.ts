import { ApiResponse, MoviesType } from '@/types';

import { pythonApiClientWithoutHeader } from '@/lib/axios-config';

export const getRecommendedMovie = async (
  title: string
): Promise<ApiResponse<MoviesType[] | undefined>> => {
  try {
    const response = await pythonApiClientWithoutHeader.get(
      `/predict/${title}`
    );

    console.log('response:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: undefined,
    };
  }
};
