import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import GetLazyImage from '~/components/ui/Get-Image';
import { MovieCard } from '~/components/ui/Movie-card';
import { MoviesType } from '~/types';

const RecommendedMovieContainer = ({ data }: { data: MoviesType[] }) => {
  return (
    <View className=" h-[450px] bg-black py-4">
      <View className="flex-row items-center justify-center">
        <Text className="my-4 text-center text-3xl font-bold text-white">Recommended</Text>
        <Text className="mx-2 my-4 text-center text-3xl font-bold text-red-500">Movies</Text>
      </View>
      <FlashList
        className="h-[400px]"
        data={data}
        renderItem={({ item }) => <MovieCard data={item} />}
        keyExtractor={(item) => item.title}
        showsHorizontalScrollIndicator={false}
        horizontal
        estimatedItemSize={200}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
};

export default RecommendedMovieContainer;
