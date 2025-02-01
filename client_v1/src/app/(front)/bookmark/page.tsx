'use client';

import type React from 'react';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getAllBookmarkedMovies } from '@/action/get-all-bookmark';
import { MovieType } from '@/types';
import { useQuery } from '@tanstack/react-query';

import { formatRevenue } from '@/lib/format-revenue';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const BookMarkedMoviePage = () => {
  const [filters, setFilters] = useState({
    revenue: '',
    sort: '',
  });

  const {
    data: bookMarkedMovies,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['bookmarks', filters],
    //@ts-ignore
    queryFn: () => getAllBookmarkedMovies(filters),
    staleTime: 0,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (value: string) => {
    setFilters({ ...filters, sort: value });
  };

  const handleApplyFilters = () => {
    refetch();
  };

  return (
    <>
      <h1 className="my-6 text-center text-6xl font-bold">Bookmarked Movies</h1>

      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <Input
          type="number"
          name="revenue"
          placeholder="Min Revenue"
          value={filters.revenue}
          onChange={handleFilterChange}
          className="w-48"
        />
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by Revenue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenueasc">Revenue (Low to High)</SelectItem>
            <SelectItem value="revenuedesc">Revenue (High to Low)</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </div>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="container mx-auto grid grid-cols-5 place-content-center place-items-center">
          {bookMarkedMovies?.data?.movies.map((movie, index) => (
            <Card
              key={index}
              className="col-span-1 w-[250px] shrink-0 border-none"
            >
              <CardContent className="p-4">
                <div className="max-h-[300px] max-w-[300px] overflow-hidden rounded-xl">
                  <Link href={`/movie/${movie.original_title}`}>
                    <Image
                      alt="Movie Poster"
                      className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                      height="825"
                      width="550"
                      src={movie.imageUrl ?? '/placeholder.svg'}
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
      )}
    </>
  );
};

export default BookMarkedMoviePage;
