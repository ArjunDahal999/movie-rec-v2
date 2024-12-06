import React, { Suspense, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getMovieDetails } from '~/action/get-movie-detail';
import { getRecommendedMovie } from '~/action/get-recommended-movie';
import { FlashList } from '@shopify/flash-list';
import { MovieCard } from '~/components/ui/Movie-card';
import { MoviesType } from '~/types';

import { Ionicons } from '@expo/vector-icons';
import GetLazyImage from '~/components/ui/Get-Image';
import { MovieType } from '~/types';
import { BookMarkedIcon, BookmarkIcon } from 'lucide-react-native';
import { bookMarkMovie, getMovieBookMarkState, removeBookMark } from '~/services/bookmark';
import { useMovieImage } from '~/hooks/fetch-image';
import Toast from 'react-native-toast-message';
import { BOOK_MARKED_MOVIES_QUERY_KEY } from '~/config/query-key';

export default function MovieScreen() {
  const { title } = useLocalSearchParams();

  const { data: movieDetails } = useQuery({
    queryKey: ['movie-details', title],
    queryFn: () => getMovieDetails(title as string),
  });

  const { data: recommendations } = useQuery({
    queryKey: ['movie-recommendations', title],
    queryFn: () => getRecommendedMovie(title as string),
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

const MovieDetailContainer = ({ data }: { data: MovieType }) => {
  const { imageUrl, isLoading: isImageLoading } = useMovieImage(data.original_title);

  const queryClient = useQueryClient();
  const bookMarkMutation = useMutation({
    mutationFn: () => bookMarkMovie({ ...data, imageUrl }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({});
      if (res.success) {
        Toast.show({
          type: 'success',
          text2: res.message,
        });
        setisMovieBookMarked(true);
      }
    },
  });

  const deleteBookMarkMutation = useMutation({
    mutationFn: () => removeBookMark(data.original_title),
    onSuccess: (res) => {
      queryClient.invalidateQueries({});
      if (res.success) {
        Toast.show({
          type: 'success',
          text2: res.message,
        });
        setisMovieBookMarked(false);
      }
    },
  });

  const currentMovieBookMarkState = useQuery({
    queryKey: ['movie-details'],
    queryFn: () => getMovieBookMarkState(data.original_title as string),
  });
  const [isMovieBookMarked, setisMovieBookMarked] = useState(
    currentMovieBookMarkState.data?.success
  );

  const handleBookMark = () => {
    if (isMovieBookMarked) {
      deleteBookMarkMutation.mutate();
    } else {
      bookMarkMutation.mutate();
    }
  };
  return (
    <View className=" bg-black">
      <View className="relative">
        {isImageLoading && (
          <View className=" items-center justify-center" style={{ height: 230, width: 150 }}>
            <ActivityIndicator size="large" color="red" />
          </View>
        )}
        <Image source={{ uri: imageUrl }} style={{ height: 500, width: 400 }} />
        <View className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
      </View>
      <View className="px-8 pt-4">
        <View className="flex flex-row items-center justify-between ">
          <Text className="  text-3xl font-bold text-white">{data.original_title}</Text>
          {/* bookmaark button */}
          <TouchableOpacity
            disabled={bookMarkMutation.isPending || deleteBookMarkMutation.isPending}
            onPress={handleBookMark}
            className=" rounded-xl border-2 border-slate-900 bg-black p-2">
            <BookmarkIcon fill={isMovieBookMarked ? 'red' : ''} size={30} color="red" />
          </TouchableOpacity>
        </View>

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
