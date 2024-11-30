import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import GetLazyImage from '../ui/Get-Image';
import { MovieCard } from '../ui/Movie-card';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export type MovieDataType = {
  revenue: number;
  title: string;
  director: string;
  release_date: string;
  popularity: number;
  overview: string;
};

const fetchFeaturedMovie = async (): Promise<MovieDataType[]> => {
  const response = await fetch('http://13.49.18.64/random-movie');
  const jsonData = await response.json();
  return jsonData.data;
};

const FeaturedMovie = () => {
  const [data, setData] = useState<MovieDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const movies = await fetchFeaturedMovie();
        setData(movies);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  isLoading && <Text>Loading...</Text>;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="flex-row items-center justify-center">
          <Text className="my-4 text-center text-3xl font-bold text-white">Featured</Text>
          <Text className="mx-2 my-4 text-center text-3xl font-bold text-red-500">Movie</Text>
        </View>
        <FlatList
          horizontal
          data={data}
          renderItem={({ item }) => <MovieCard data={item} />}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default FeaturedMovie;
