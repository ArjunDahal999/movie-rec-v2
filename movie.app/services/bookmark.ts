import { nodeApiClientWithHeader } from '~/lib/axios-config';
import { getErrorMessage } from '~/lib/utils/error';
import { ApiResponse, BookMarkType, MovieType } from '~/types';

export const bookMarkMovie = async (movieData: BookMarkType): Promise<ApiResponse<any>> => {
  try {
    const { data } = await nodeApiClientWithHeader.post('/add-bookmark', movieData);
    return {
      success: true,
      message: data.message,
      status: data.status,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || getErrorMessage(error),
    };
  }
};

export const getBookmarkedMovies = async (): Promise<
  ApiResponse<{ count: string; movies: BookMarkType[] }>
> => {
  try {
    const { data } = await nodeApiClientWithHeader.get('/get-all-bookmark');
    return {
      success: true,
      data: {
        count: data.data.count,
        movies: data.data.movies,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || getErrorMessage(error),
    };
  }
};

export const getMovieBookMarkState = async (movieTitle: string): Promise<ApiResponse<any>> => {
  try {
    const { data } = await nodeApiClientWithHeader.get(`/get-bookmark?movieTitle=${movieTitle}`);
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || getErrorMessage(error),
    };
  }
};

export const removeBookMark = async (movieTitle: string): Promise<ApiResponse<any>> => {
  try {
    const { data } = await nodeApiClientWithHeader.delete(
      `/delete-bookmark?movieTitle=${movieTitle}`
    );
    return {
      success: true,
      message: data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || getErrorMessage(error),
    };
  }
};
