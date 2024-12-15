import React, { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { MoviesType } from '@/types';

import { formatRevenue } from '@/lib/format-revenue';

import GetLazyImage from '@/components/lazy-image';
import { Card, CardContent } from '@/components/ui/card';

const RecommendedMovieSection = ({
  recommendedData,
}: {
  recommendedData: MoviesType[];
}) => {
  console.log(recommendedData);
  return (
    <section>
      <h2 className="text-center text-5xl font-bold">
        Recommended
        <span className="text-primary"> Movies </span>
      </h2>
      <div className="grid grid-cols-5 space-x-4 p-4">
        {recommendedData?.map((movie, index) => (
          <Link key={index} href={`/movie/${movie.title}`}>
            <Card className="w-[250px] shrink-0 border-none">
              <CardContent className="p-4">
                <div className="max-h-[300px] max-w-[300px] overflow-hidden rounded-xl">
                  <Suspense
                    fallback={
                      <Image
                        alt="Movie Poster"
                        className="objecy-contain cursor-pointer overflow-hidden rounded-xl transition duration-500 hover:scale-110"
                        height={400}
                        src={'/placeholder.svg'}
                        width={400}
                      />
                    }
                  >
                    <GetLazyImage title={movie?.title!} />
                  </Suspense>
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
                <p className="mb-1 text-sm text-muted-foreground">
                  Distace. {movie?.similarity_score}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedMovieSection;
