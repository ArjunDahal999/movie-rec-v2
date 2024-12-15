import React, { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getRecommendedMovieFromQuery } from '@/action/get-recommedation-from-query';
import { MoviesType } from '@/types';

import { formatRevenue } from '@/lib/format-revenue';

import GetLazyImage from '@/components/lazy-image';
import { Card, CardContent } from '@/components/ui/card';

type Params = Promise<{ slug: string }>;
const RecommendationBasedOnQuery = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const recommendedData = await getRecommendedMovieFromQuery(slug);

  return (
    <section>
      <h2 className="text-center text-5xl font-bold">
        Recommended
        <span className="text-primary"> Movies </span>
      </h2>
      <h3 className="py-8 text-center text-2xl">
        Based on your Query : {decodeURI(slug)}
      </h3>
      <div className="grid grid-cols-5 gap-x-4 p-4">
        {recommendedData.data?.map((movie, index) => (
          <Link key={index} href={`/movie/${movie.title}`}>
            <Card className="w-[250px] shrink-0 border-none">
              <CardContent className="p-4">
                <div className="max-h-[600px] max-w-[300px] overflow-hidden rounded-xl">
                  <Suspense
                    fallback={
                      <Image
                        alt="Movie Poster"
                        className="objecy-contain cursor-pointer overflow-hidden rounded-xl transition duration-500 hover:scale-110"
                        height={600}
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
                  Score. {movie?.similarity_score}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendationBasedOnQuery;
