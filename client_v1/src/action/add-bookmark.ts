import { MovieType } from '@/types';

import { nodeApiClientWithHeader } from '@/lib/axios-config';

export const addBookMark = async (movie: MovieType) => {
  try {
    const { data } = await nodeApiClientWithHeader.post('/add-bookmark', movie);
    return data.data.message;
  } catch (error) {
    return error;
  }
};
