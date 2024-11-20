import React, { Suspense } from 'react';

import Image from 'next/image';

import { MovieType } from '@/types';

import { Bookmark, VideoIcon } from 'lucide-react';

import { formatRevenue } from '@/lib/format-revenue';

import GetLazyImage from '@/components/lazy-image';
import { Button } from '@/components/ui/button';

const MainMovie = ({ movieData }: { movieData: MovieType | null }) => {
  return (
    <>
      <div className="container grid gap-6 px-4 py-16 md:px-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
        <Suspense
          fallback={
            <Image
              alt="Featured Movie"
              className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              height="825"
              src={'/placeholder.svg'}
              width="550"
            />
          }
        >
          <GetLazyImage title={movieData?.original_title!} />
        </Suspense>

        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              {movieData?.original_title}
            </h1>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
              {movieData?.overview}
            </p>
          </div>
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href={`https://www.youtube.com/results?search_query=${movieData?.original_title}`}
              >
                Watch Trailer <VideoIcon className="ml-2" />
              </a>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                BookMark <Bookmark className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-500 dark:text-gray-400">
                Release Date
              </div>
              <div>{movieData?.release_date}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Revenue</div>
              <div>{formatRevenue(movieData?.revenue!)}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Runtime</div>
              <div>{movieData?.runtime}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Tagline</div>
              <div>{movieData?.tagline}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">
                Vote Average
              </div>
              <div>{movieData?.vote_average}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Vote Count</div>
              <div>{movieData?.vote_count}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Cast</div>
              <div>{movieData?.cast}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Director</div>
              <div>{movieData?.director}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Budget</div>
              <div>${movieData?.budget}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Genres</div>
              <div>{movieData?.genres}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Keywords</div>
              <div>{movieData?.keywords}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainMovie;
