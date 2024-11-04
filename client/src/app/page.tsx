import FeaturedMovieSection from '@/components/section/featured-movie-section';
import HeroFormCenterAlignedSearchWithTags from '@/components/section/hero-section';
import TopGrossingMovieSection from '@/components/section/top-grossing-movie-section';
import TopRatedMovieSection from '@/components/section/top-rated-movie-section';

export default function Home() {
  return (
    <>
      <HeroFormCenterAlignedSearchWithTags />
      <TopRatedMovieSection />
      <FeaturedMovieSection />
      <TopGrossingMovieSection />
    </>
  );
}
