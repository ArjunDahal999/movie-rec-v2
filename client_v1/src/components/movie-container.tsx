import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { MoviesType } from '@/types';

import { formatRevenue } from '@/lib/format-revenue';

import { Card, CardContent } from '@/components/ui/card';

import GetLazyImage from './lazy-image';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

const MovieContainer = ({ data }: { data: MoviesType[] }) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {data?.map((movie, index) => (
          <Card key={index} className="w-[250px] shrink-0 border-none">
            <CardContent className="p-4">
              <div className="max-h-[300px] max-w-[300px] overflow-hidden rounded-xl">
                <Link href={`/movie/${movie.title}`}>
                  <GetLazyImage title={movie.title} />
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
  );
};

export default MovieContainer;
