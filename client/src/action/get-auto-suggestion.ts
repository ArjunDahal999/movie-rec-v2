import { ApiResponse, MoviesType } from '@/types';

import { apiClientWithoutHeader } from '@/lib/axios-config';

export const getAutoSuggestion = async (
  text: string
): Promise<ApiResponse<String[] | undefined>> => {
  try {
    const response = await apiClientWithoutHeader.get(`/autocomplete/${text}`);
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
