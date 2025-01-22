import { nodeApiClientWithHeader } from '@/lib/axios-config';

export const deleteBookmark = async (title: string) => {
  try {
    const { data } = await nodeApiClientWithHeader.get(
      `/remove-bookmark?title=${title}`
    );
    return data.success.message;
  } catch (error) {
    return error;
  }
};
