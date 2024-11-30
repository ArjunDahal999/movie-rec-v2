import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import GetLazyImage from '../ui/Get-Image';
import { MovieDataType } from '../landing/top-grossing-movie';
import { Link } from 'expo-router';

export const MovieCard = ({ data }: { data: MovieDataType }) => {
  return (
    <View className="h-[250px] rounded-lg  p-4 shadow-md">
      <Link
        href={{
          pathname: '/movie/[title]',
          params: { title: data.title },
        }}>
        <GetLazyImage title={data.title} />
      </Link>
      <View className="flex items-center justify-between">
        <Text className=" w-[150px] text-wrap  text-center text-xl font-bold text-white">
          {data.title}
        </Text>
        <Text className="text-sm text-white">{data.director}</Text>
      </View>
    </View>
  );
};
