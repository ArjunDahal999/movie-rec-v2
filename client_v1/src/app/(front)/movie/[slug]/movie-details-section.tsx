//@ts-nocheck
'use client';

import React, { Suspense, useEffect, useState } from 'react';

import Image from 'next/image';

import { addBookMark } from '@/action/add-bookmark';
import { getBookmark } from '@/action/get-bookmark';
import { deleteBookmark } from '@/action/remove-bookmark';
import { useUserStore } from '@/store/store';
import { MovieType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { Bookmark, VideoIcon } from 'lucide-react';

import { formatRevenue } from '@/lib/format-revenue';

import GetLazyImage from '@/components/lazy-image';
import { Button } from '@/components/ui/button';

const MainMovie = ({ movieData }: { movieData: MovieType | null }) => {
  const authState = useUserStore();
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoviePoster = async (title: string): Promise<string> => {
    const { data: moviePosterUrl } = await axios.get(
      `https://www.myapifilms.com/imdb/idIMDB?title=${title}&token=e7a9efa9-2cd6-46e0-89f0-5026fd325f99`
    );
    return moviePosterUrl?.data?.movies?.[0]?.urlPoster || '/placeholder.svg';
  };

  const { data: movieImage, isLoading: posterLoading } = useQuery({
    queryKey: ['moviePoster', movieData?.original_title],
    queryFn: () => fetchMoviePoster(movieData?.original_title!),
    staleTime: Infinity,
  });

  //@ts-ignore
  console.log(movieImage?.data?.movies[0]?.urlPoster);
  // Check bookmark status on component mount
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (movieData?.original_title) {
        try {
          const status = await getBookmark(movieData.original_title);
          setIsBookMarked(status);
        } catch (error) {
          console.error('Error checking bookmark status:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    checkBookmarkStatus();
  }, [movieData?.original_title]);

  // Redirect if not authenticated
  if (!authState.user) {
    return (
      <div className="flex h-96 items-center justify-center text-lg font-semibold">
        Not Authenticated
      </div>
    );
  }

  const handleBookmark = async () => {
    try {
      if (isBookMarked) {
        await deleteBookmark(movieData?.original_title!);
        setIsBookMarked(false);
        toast.success('Removed bookmark successfully');
      } else {
        await addBookMark({
          ...movieData!,
          //@ts-ignore
          imageUrl: movieImage?.data?.movies[0]?.urlPoster,
        });
        setIsBookMarked(true);
        toast.success('Added bookmark successfully');
      }
    } catch (error) {
      console.error('Error handling bookmark:', error);
    }
  };

  if (!movieData) {
    return <div>No movie data available</div>;
  }

  return (
    <>
      <div className="container grid gap-6 px-4 py-16 md:px-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
        <Image
          alt="Movie Poster"
          className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          height={825}
          width={550}
          src={
            posterLoading
              ? '/placeholder.svg'
              : movieImage?.data?.movies[0]?.urlPoster || '/placeholder.svg'
          }
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              {movieData.original_title}
            </h1>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
              {movieData.overview}
            </p>
          </div>
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href={`https://www.youtube.com/results?search_query=${movieData.original_title}`}
              >
                Watch Trailer <VideoIcon className="ml-2" />
              </a>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                className="py-4"
                variant={isBookMarked ? 'ghost' : 'destructive'}
                onClick={handleBookmark}
                disabled={isLoading}
              >
                {isBookMarked ? 'Remove Bookmark' : 'Add Bookmark'}
                <Bookmark className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-500 dark:text-gray-400">
                Release Date
              </div>
              <div>{movieData.release_date}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Revenue</div>
              <div>{formatRevenue(movieData.revenue!)}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Runtime</div>
              <div>{movieData.runtime}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Tagline</div>
              <div>{movieData.tagline}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">
                Vote Average
              </div>
              <div>{movieData.vote_average}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Vote Count</div>
              <div>{movieData.vote_count}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Cast</div>
              <div>{movieData.cast}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Director</div>
              <div>{movieData.director}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Budget</div>
              <div>${movieData.budget}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Genres</div>
              <div>{movieData.genres}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Keywords</div>
              <div>{movieData.keywords}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMovie;
