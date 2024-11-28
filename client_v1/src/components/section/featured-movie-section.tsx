import { getFeaturedMovie } from '@/action/get-featured-movie';

import MovieContainer from '../movie-container';

const FeaturedMovieSection = async () => {
  const { data } = await getFeaturedMovie();

  return (
    <section className="container mx-auto">
      <h2 className="py-12 text-center text-5xl font-bold">
        Featured
        <span className="text-primary"> Movies</span>
      </h2>
      <MovieContainer data={data!} />
    </section>
  );
};

export default FeaturedMovieSection;
