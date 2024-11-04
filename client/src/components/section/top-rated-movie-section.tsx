import React, { Suspense } from 'react';

import Image from 'next/image';

import getTopRatedMovieSection from '@/action/get-top-rated-movie-section';

import { TopRatedMoviePoster } from '../../../public/images';
import { DialogBasicTwo } from '../animation/animated-movie-list';

const TopRatedMovieSection = async () => {
  const response = await getTopRatedMovieSection();
  const topRatedMovieData = response.data;

  return (
    <section>
      <h2 className="py-12 text-center text-5xl font-bold">
        Top Rated <span className="text-primary">Movies </span>
      </h2>
      <div className="container mx-auto grid grid-cols-7">
        {/* left side */}
        <div className="col-span-3 grid place-content-center">
          <div className="rounded-2xl bg-slate-300/40 p-4">
            <Image
              className="rounded-xl object-cover"
              height={700}
              width={400}
              src={TopRatedMoviePoster}
              alt="poster"
            />
          </div>
        </div>
        {/* righr side */}

        <div className="gird col-span-4 place-content-center space-y-2">
          <Suspense
            fallback={
              <>
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="my-4 h-[4rem] w-full animate-pulse bg-slate-400/10"
                  ></div>
                ))}
              </>
            }
          >
            {topRatedMovieData?.map((movie, index) => (
              <DialogBasicTwo movieData={movie!} key={index} />
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default TopRatedMovieSection;
