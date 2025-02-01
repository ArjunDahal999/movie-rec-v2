import { nodeApiClientWithHeader } from '@/lib/axios-config';

export const getBookmark = async (title: string) => {
  try {
    const { data } = await nodeApiClientWithHeader.get(
      '/get-bookmark?movieTitle=' + title
    );
    return data.success as boolean;
  } catch (error) {
    return false;
  }
};
