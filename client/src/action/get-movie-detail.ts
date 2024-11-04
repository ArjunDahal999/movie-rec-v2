import { ApiResponse, MovieType } from '@/types';
import axios from 'axios';

import { apiClientWithoutHeader } from '@/lib/axios-config';

export const getMovieDetails = async (
  title: string
): Promise<ApiResponse<MovieType | undefined>> => {
  try {
    const response = await apiClientWithoutHeader.get(`/${title}`);
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
