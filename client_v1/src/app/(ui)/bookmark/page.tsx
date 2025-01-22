'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getAllBookmarkedMovies } from '@/action/get-all-bookmark';
import { useQuery } from '@tanstack/react-query';

import { formatRevenue } from '@/lib/format-revenue';

import { Card, CardContent } from '@/components/ui/card';

const BookMarkedMoviePage = () => {
  const { data: bookMarkedMovies, isLoading } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => getAllBookmarkedMovies(),
    staleTime: 0,
  });

  return (
    <>
      <h1 className="my-6 text-center text-6xl font-bold">Bookmarked Movies</h1>
      <div className="flex flex-wrap justify-center">
        {bookMarkedMovies?.data?.movies.map((movie, index) => (
          <Card key={index} className="w-[250px] shrink-0 border-none">
            <CardContent className="p-4">
              <div className="max-h-[300px] max-w-[300px] overflow-hidden rounded-xl">
                <Link href={`/movie/${movie.original_title}`}>
                  <Image
                    alt="Movie Poster"
                    className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                    height="825"
                    width="550"
                    src={'/placeholder.svg'}
                  />
                </Link>
              </div>
              <h3 className="line-clamp-1 text-lg font-semibold">
                {movie?.original_title}
              </h3>
              <p className="mb-1 text-sm text-muted-foreground">
                Dir. {movie?.director}
              </p>
              <p className="text-sm font-medium">
                {formatRevenue(movie?.revenue!)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default BookMarkedMoviePage;
