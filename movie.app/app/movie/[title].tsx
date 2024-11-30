import React, { Suspense } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { MovieDataType } from '~/components/landing/feature-movie';
import MovieDetailContainer from './MovieDetailContainer';
import RecommendedMovieContainer from './RecommendedMovieContainer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export type MovieDetailsType = {
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

const fetchMovieDetails = async (title: string): Promise<MovieDetailsType> => {
  const response = await fetch(`http://13.49.18.64/${title}`);
  const { data } = await response.json();
  return data;
};

const fetchMovieRecommendations = async (title: string): Promise<MovieDataType[]> => {
  const response = await fetch(`http://13.49.18.64/predict/${title}`);
  const { data } = await response.json();
  return data;
};

export default function MovieScreen() {
  const { title } = useLocalSearchParams();

  const { data: movieDetails } = useQuery({
    queryKey: ['movie-details', title],
    queryFn: () => fetchMovieDetails(title as string),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });

  const { data: recommendations } = useQuery({
    queryKey: ['movie-recommendations', title],
    queryFn: () => fetchMovieRecommendations(title as string),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaProvider>
        <SafeAreaView className=" bg-black">
          <ScrollView>
            {movieDetails && <MovieDetailContainer data={movieDetails!} />}
            {recommendations && <RecommendedMovieContainer data={recommendations!} />}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
