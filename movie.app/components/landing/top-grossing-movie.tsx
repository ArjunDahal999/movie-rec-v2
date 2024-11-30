import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import GetLazyImage from '../ui/Get-Image';
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

const fetchTopGrossingMovies = async (): Promise<MovieDataType[] | undefined> => {
  const response = await fetch('http://13.49.18.64/highest-grossing-movie');
  const jsonData = await response.json();
  return jsonData.data;
};

const TopGrossingMovies = () => {
  const [data, setData] = useState<MovieDataType[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const movies = await fetchTopGrossingMovies();
        setData(movies);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <View className="h-[400px]">
      <View className="flex-row items-center justify-center">
        <Text className="my-4 text-center text-3xl font-bold text-white">Top Grossing</Text>
        <Text className="mx-2 my-4 text-center text-3xl font-bold text-red-500">Movie</Text>
      </View>
      <ScrollView horizontal className=" ">
        <FlashList
          data={data || []}
          renderItem={({ item }) => <MovieCard key={item.title} data={item} />}
          estimatedItemSize={10}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

export default TopGrossingMovies;
