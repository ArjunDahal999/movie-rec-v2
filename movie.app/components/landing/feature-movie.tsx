import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import GetLazyImage from '../ui/Get-Image';
import { MovieCard } from '../ui/Movie-card';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getFeaturedMovie } from '~/action/get-featured-movie';
import { MoviesType, MovieType } from '~/types';

const FeaturedMovie = () => {
  const [data, setData] = useState<MoviesType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const movies = await getFeaturedMovie();
        setData(movies.data!);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  isLoading && <Text>Loading...</Text>;

  return (
    <View className=" h-[450px]">
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
    </View>
  );
};

export default FeaturedMovie;
