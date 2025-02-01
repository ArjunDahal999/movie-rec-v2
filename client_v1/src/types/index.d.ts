export type ApiResponse<T> = {
  success: boolean;
  data?: T | undefined;
  message?: string;
};

type MoviesType = {
  revenue: number;
  title: string;
  director: string;
  release_date: string;
  popularity: number;
  overview: string;
  similarity_score: number;
};

type RecommendedMovieType = {
  title: string;
  genres: string;
  keywords: string;
  tagline: string;
  cast: string;
  director: string;
  overview: string;
  revenue: number;
  similarity_score: number;
  tfidf_vector1: Record<string, number>;
  tfidf_vector2: Record<string, number>;
  common_words: string[];
};

type MovieType = {
  index: number;
  budget: number;
  genres: string;
  homepage: string;
  id: number;
  keywords: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  cast: string;
  director: string;
  imageUrl?: string;
};
