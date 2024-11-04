'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  CalendarIcon,
  DollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from 'lucide-react';

import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from '@/components/ui/animated-carousel';

const config = [
  {
    director: 'Kevin Reynolds',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYjQ3NWUxNDMtNGUyYS00M2E4LThmYjgtZmQ3YTU4ZWZlNTk0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    popularity: 26.595983,
    release_date: '2002-01-23',
    revenue: 75395048,
    title: 'The Count of Monte Cristo',
  },
  {
    title: 'The Secret Life of Walter Mitty',
    revenue: 188133322,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BODYwNDYxNDk1Nl5BMl5BanBnXkFtZTgwOTAwMTk2MDE@._V1_FMjpg_UX1000_.jpg',
    release_date: '2013-12-18',
    popularity: 43.348022,
    director: 'Ben Stiller',
  },
  {
    title: 'Red Riding: In the Year of Our Lord 1974',
    revenue: 0,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYWM3YmM1MTYtODUzZC00YWQ2LWI0NzQtNDNhYWIyMDEwYTkyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    release_date: '2009-02-28',
    popularity: 7.247022999999999,
    director: 'Julian Jarrold',
  },
  {
    title: 'Goodbye Bafana',
    revenue: 0,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTNmNWY0YTgtNzY4YS00ODQ0LWExODgtNzhiZDFiOTE2MmM1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    release_date: '2007-02-11',
    popularity: 12.257654,
    director: 'Bille August',
  },
  {
    title: 'Excessive Force',
    revenue: 1200000,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BM2ZkYzJiYzItNTI4YS00ZTU5LWI2NzctYTE0NGY0ZjVlNjY0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    release_date: '1993-05-14',
    popularity: 1.279106,
    director: 'Jon Hess',
  },
  {
    title: 'Antarctica: A Year on Ice',
    revenue: 0,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjI5MzI0Nzk3OV5BMl5BanBnXkFtZTgwNTAyODExMzE@._V1_FMjpg_UX1000_.jpg',
    release_date: '2013-09-05',
    popularity: 1.883947,
    director: 'Anthony Powell',
  },
  {
    title: 'Fear and Loathing in Las Vegas',
    revenue: 10680275,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BNjFkNjdiZjUtNzUzNy00NWM5LWFlNDUtNTRiYmJiZWNiYjkwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    release_date: '1998-05-22',
    popularity: 44.511363,
    director: 'Terry Gilliam',
  },
  {
    title: 'Wordplay',
    revenue: 2300013100,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTkzNDMwODg5MV5BMl5BanBnXkFtZTYwMzU5NTc3._V1_FMjpg_UX1000_.jpg',
    release_date: '2006-06-26',
    popularity: 0.906096,
    director: 'Patrick Creadon',
  },
  {
    title: 'Shutter',
    revenue: 12000000600,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BN2FjNWExYzEtY2YzOC00YjNlLTllMTQtNmIwM2Q1YzBhOWM1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    release_date: '2008-03-21',
    popularity: 8.864367999999997,
    director: 'Masayuki Ochiai',
  },
  {
    title: 'Shortbus',
    revenue: 5179037,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BOTcwMzFiYzktYTZmMi00ZjEzLWE0Y2ItNjBhMmQ1ZmI3NzZhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    release_date: '2006-05-20',
    popularity: 14.846001,
    director: 'John Cameron Mitchell',
  },
];
const FeaturedMovieSection = () => {
  return (
    <section className="container mx-auto min-h-screen">
      <h2 className="py-12 text-center text-5xl font-bold">
        Featured
        <span className="text-primary"> Movies</span>
      </h2>
      <Carousel
        orientation="horizontal"
        className="flex flex-col items-center justify-center gap-2"
      >
        <CarouselThumbsContainer className="h-fit basis-1/4">
          {config.map((movie, index) => (
            <SliderThumbItem
              key={index}
              index={index}
              className="rounded-md bg-transparent"
            >
              <Image
                src={movie.imageUrl}
                className="object-cover"
                alt="data-image"
                fill
              />
            </SliderThumbItem>
          ))}
        </CarouselThumbsContainer>
        <div className="relative w-[90%]">
          <CarouselMainContainer className="h-full">
            {config.map((movie, index) => (
              <SliderMainItem
                key={index}
                className="relative flex items-center justify-evenly rounded-md"
              >
                <div className="group relative">
                  <Link href={`/movie/${movie.title}`}>
                    <div className="absolute bottom-0 z-[10] hidden h-[450px] w-[300px] items-center justify-center bg-background/40 transition duration-700 ease-in-out group-hover:flex">
                      <PlayCircleIcon size={60} className="text-primary" />
                    </div>
                    <Image
                      src={movie.imageUrl}
                      alt="data-image"
                      className="object-contain"
                      height={400}
                      width={300}
                    />
                  </Link>
                </div>

                <div className="w-96">
                  <h3 className="mb-4 text-2xl font-semibold text-primary">
                    {movie.title}
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-primary" />
                      <span className="font-medium">Director:</span>{' '}
                      {movie.director}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      <span className="font-medium">Release Date:</span>{' '}
                      {movie.release_date}
                    </p>
                    <p className="flex items-center gap-2">
                      <StarIcon className="h-5 w-5 text-primary" />
                      <span className="font-medium">Popularity:</span>{' '}
                      {movie.popularity.toFixed(2)}
                    </p>
                    <p className="flex items-center gap-2">
                      <DollarSignIcon className="h-5 w-5 text-primary" />
                      <span className="font-medium">Revenue:</span> $
                      {movie.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </SliderMainItem>
            ))}
          </CarouselMainContainer>
        </div>
      </Carousel>
    </section>
  );
};

export default FeaturedMovieSection;
