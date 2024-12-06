import { useQuery } from '@tanstack/react-query';

const fetchMovieImage = async (title: string) => {
  const response = await fetch(
    `https://www.myapifilms.com/imdb/idIMDB?title=${title}&token=e7a9efa9-2cd6-46e0-89f0-5026fd325f99`
  );
  const imageData = await response.json();
  return imageData?.data?.movies[0]?.urlPoster || '../assets/MainLogo.png';
};

export const useMovieImage = (title: string) => {
  const query = useQuery({
    queryKey: ['movieImage', title],
    queryFn: () => fetchMovieImage(title),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 1,
  });

  return {
    imageUrl: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
