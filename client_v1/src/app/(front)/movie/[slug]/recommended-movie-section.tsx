import React, { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { MoviesType, RecommendedMovieType } from '@/types';

import { formatRevenue } from '@/lib/format-revenue';

import GetLazyImage from '@/components/lazy-image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const RecommendedMovieSection = ({
  recommendedData,
}: {
  recommendedData: RecommendedMovieType[];
}) => {
  return (
    <section>
      <h2 className="text-center text-5xl font-bold">
        Recommended
        <span className="text-primary"> Movies </span>
      </h2>
      <div className="grid grid-cols-5 place-content-center place-items-center space-x-4 p-4">
        {recommendedData?.map((movie, index) => (
          <Card
            key={index}
            className="w-[250px] shrink-0 grid-cols-2 border-none"
          >
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
              <MovieDialog movieDetails={movie} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecommendedMovieSection;

const MovieDialog = ({
  movieDetails,
}: {
  movieDetails: RecommendedMovieType;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[50vh] sm:max-w-[800px]">
        <ScrollArea className="h-96">
          <div className="flex w-full space-x-4">
            {/* table 1 */}
            <table className="w-1/2 border-collapse">
              <h2 className="text-center">Selected Movie </h2>
              <thead>
                <tr>
                  <th className="border p-2">Word</th>
                  <th className="border p-2">TF-IDF Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(movieDetails['tfidf_vector1']).map(
                  ([word, score]) => (
                    <tr
                      key={word}
                      className={
                        movieDetails.common_words.includes(word)
                          ? 'bg-primary/10'
                          : ''
                      }
                    >
                      <td className="border p-2">{word}</td>
                      <td className="border p-2">
                        {(score as number).toFixed(4)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {/* table 2 */}
            <table className="w-1/2 border-collapse">
              <h2 className="text-center">Recommended Movie</h2>
              <thead>
                <tr>
                  <th className="border p-2">Word</th>
                  <th className="border p-2">TF-IDF Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(movieDetails['tfidf_vector2']).map(
                  ([word, score]) => (
                    <tr
                      key={word}
                      className={
                        movieDetails.common_words.includes(word)
                          ? 'bg-primary/10'
                          : ''
                      }
                    >
                      <td className="border p-2">{word}</td>
                      <td className="border p-2">
                        {(score as number).toFixed(4)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <Card className="my-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Euclidean Distance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-lg">
                The Euclidean distance between the two TF-IDF vectors is:{' '}
                <strong>{movieDetails.similarity_score.toFixed(4)}</strong>
              </p>
              <h3 className="mb-2 text-xl font-semibold">Formula</h3>
              <p className="mb-4">{'d = √(Σ(v1ᵢ - v2ᵢ)²)'}</p>
              <p>
                Where v1 and v2 are the two TF-IDF vectors, and n is the number
                of dimensions (words) in the vectors.
              </p>
            </CardContent>
          </Card>
          <div className="mt-4">
            <h3 className="mb-2 text-xl font-semibold">Common Words</h3>
            <div className="flex flex-wrap gap-2">
              {movieDetails.common_words.map((word, index) => (
                <Badge key={index} variant="secondary">
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button>
            <Link href={`/movie/${movieDetails.title}`}>
              Go to Movie Details Page
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
