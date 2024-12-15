export type ApiResponse<T> = {
  success: boolean;
  data: T | undefined;
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
};
