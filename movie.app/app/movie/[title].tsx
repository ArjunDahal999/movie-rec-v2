import React, { Suspense } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import MovieDetailContainer from './MovieDetailContainer';
import RecommendedMovieContainer from './RecommendedMovieContainer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getMovieDetails } from '~/action/get-movie-detail';
import { getRecommendedMovie } from '~/action/get-recommended-movie';

export default function MovieScreen() {
  const { title } = useLocalSearchParams();

  const { data: movieDetails } = useQuery({
    queryKey: ['movie-details', title],
    queryFn: () => getMovieDetails(title as string),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });

  const { data: recommendations } = useQuery({
    queryKey: ['movie-recommendations', title],
    queryFn: () => getRecommendedMovie(title as string),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaProvider>
        <SafeAreaView className=" bg-black">
          <ScrollView>
            {movieDetails && <MovieDetailContainer data={movieDetails.data!} />}
            {recommendations && <RecommendedMovieContainer data={recommendations.data!} />}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
