'use client';

import type React from 'react';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface MovieData {
  data?: {
    movies?: Array<{
      urlPoster?: string;
    }>;
  };
}

const fetchMoviePoster = async (title: string): Promise<MovieData> => {
  const { data } = await axios.get(
    `https://www.myapifilms.com/imdb/idIMDB?title=${title}&token=e7a9efa9-2cd6-46e0-89f0-5026fd325f99`
  );
  return data;
};

const GetLazyImage: React.FC<{ title: string }> = ({ title }) => {
  const { data, isLoading, isError } = useQuery<MovieData, Error>({
    queryKey: ['moviePoster', title],
    queryFn: () => fetchMoviePoster(title),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <Image
        alt="Movie Poster"
        className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
        height={825}
        width={550}
        src={'/placeholder.svg'}
      />
    );
  }

  if (isError) {
    console.error('Error fetching movie poster');
  }

  const posterUrl = data?.data?.movies?.[0]?.urlPoster || '/placeholder.svg';

  return (
    <Image
      alt="Movie Poster"
      className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
      height={825}
      width={550}
      src={posterUrl || '/placeholder.svg'}
    />
  );
};

export default GetLazyImage;
