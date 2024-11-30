import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GetLazyImage from '~/components/ui/Get-Image';
import { MovieType } from '~/types';

const MovieDetailContainer = ({ data }: { data: MovieType }) => {
  return (
    <View className=" bg-black">
      <View className="relative">
        <GetLazyImage height={500} width={400} title={data.original_title} />
        <View className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
      </View>
      <View className="px-4 pt-4">
        <Text className="text-3xl font-bold text-white">{data.original_title}</Text>
        <Text className="mt-1 text-lg italic text-gray-400">{data.tagline}</Text>

        <View className="mt-2 flex-row items-center">
          <Ionicons name="star" size={20} color="#FFC107" />
          <Text className="ml-1 text-white">{data.vote_average.toFixed(1)}</Text>
          <Text className="ml-2 text-gray-400">({data.vote_count} votes)</Text>
        </View>

        <View className="mt-3 flex-row flex-wrap">
          {data.genres.split(',').map((genre, index) => (
            <View key={index} className="mb-2 mr-2 rounded-full bg-gray-800 px-3 py-1">
              <Text className="text-sm text-white">{genre.trim()}</Text>
            </View>
          ))}
        </View>

        <View className="mt-4">
          <Text className="mb-2 text-xl font-semibold text-white">Overview</Text>
          <Text className="leading-6 text-gray-300">{data.overview}</Text>
        </View>

        <View className="mt-6 flex-row justify-between">
          <View>
            <Text className="text-gray-400">Release Date</Text>
            <Text className="text-white">{data.release_date}</Text>
          </View>
          <View>
            <Text className="text-gray-400">Runtime</Text>
            <Text className="text-white">{data.runtime} min</Text>
          </View>
          <View>
            <Text className="text-gray-400">Budget</Text>
            <Text className="text-white">${data.budget.toLocaleString()}</Text>
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-2 text-xl font-semibold text-white">Cast</Text>
          <Text className="text-gray-300">{data.cast}</Text>
        </View>

        <View className="mt-6">
          <Text className="mb-2 text-xl font-semibold text-white">Director</Text>
          <Text className="text-gray-300">{data.director}</Text>
        </View>
      </View>
    </View>
  );
};

export default MovieDetailContainer;
