import React, { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getTopGrossingMovie } from '@/action/get-top-grossing-movies';

import { formatRevenue } from '@/lib/format-revenue';

import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import GetLazyImage from '../lazy-image';

// Dummy data for top-grossing movies
const dummyMovies = [
  {
    title: 'Galactic Adventures',
    director: 'Sarah Johnson',
    revenue: 2500000000,
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'The Last Frontier',
    director: 'Michael Chang',
    revenue: 1800000000,
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Echoes of Tomorrow',
    director: 'Elena Rodriguez',
    revenue: 1500000000,
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Whispers in the Wind',
    director: 'James Anderson',
    revenue: 1200000000,
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Neon Nights',
    director: 'Yuki Tanaka',
    revenue: 1000000000,
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Quantum Leap',
    director: 'Alex Novak',
    revenue: 950000000,
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Sands of Time',
    director: 'Olivia West',
    revenue: 920000000,
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
  {
    title: 'Cybernetic Dreams',
    director: 'Raj Patel',
    revenue: 880000000,
    imageUrl: '/placeholder.svg?height=300&width=200',
  },
];

export default async function TopGrossingMovieSection() {
  // Function to format revenue as currency

  const { data } = await getTopGrossingMovie();

  return (
    <div className="container mx-auto bg-background p-6">
      <h2 className="mb-4 text-center text-5xl font-bold">
        Top Grossing <span className="text-primary"> Movies</span>
      </h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 p-4">
          {data?.map((movie, index) => (
            <Card key={index} className="w-[250px] shrink-0 border-none">
              <CardContent className="p-4">
                <div className="max-h-[300px] max-w-[300px] overflow-hidden rounded-xl">
                  <Link href={`/movie/${movie.title}`}>
                    <Image
                      alt="Movie Poster"
                      className="objecy-contain cursor-pointer overflow-hidden rounded-xl transition duration-500 hover:scale-110"
                      height={400}
                      src={'/placeholder.svg'}
                      width={400}
                    />
                  </Link>
                </div>
                <h3 className="line-clamp-1 text-lg font-semibold">
                  {movie?.title}
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
