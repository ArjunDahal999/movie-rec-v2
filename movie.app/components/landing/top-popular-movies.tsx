import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import GetLazyImage from '../ui/Get-Image';
import { useQuery } from '@tanstack/react-query';
import { MovieCard } from '../ui/Movie-card';
import { FlashList } from '@shopify/flash-list';

export type MovieDataType = {
  revenue: number;
  title: string;
  director: string;
  release_date: string;
  popularity: number;
  overview: string;
};

const fetchPopular = async (): Promise<MovieDataType[] | undefined> => {
  const response = await fetch('http://13.49.18.64/top-popular-movies');
  const jsonData = await response.json();
  return jsonData.data;
};

const TopPopularMovies = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => fetchPopular(),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });

  return (
    <View className="h-[400px]">
      <View className="flex-row items-center justify-center">
        <Text className="my-4 text-center text-3xl font-bold text-white">Top Popular</Text>
        <Text className="mx-2 my-4 text-center text-3xl font-bold text-red-500">Movie</Text>
      </View>

      <ScrollView horizontal className=" ">
        <FlashList
          data={data || []}
          renderItem={({ item }) => <MovieCard data={item} />}
          estimatedItemSize={200}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

export default TopPopularMovies;
