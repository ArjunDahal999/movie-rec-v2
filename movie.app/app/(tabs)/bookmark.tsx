import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { OctagonAlertIcon } from 'lucide-react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BOOK_MARKED_MOVIES_QUERY_KEY } from '~/config/query-key';
import { useUserAuthState } from '~/hooks/get-user-auth-state';
import { getBookmarkedMovies } from '~/services/bookmark';

export default function BookMarkScreen() {
  const { userAuthState } = useUserAuthState();
  const { data: bookMarkedMoviesList } = useQuery({
    queryKey: BOOK_MARKED_MOVIES_QUERY_KEY,
    queryFn: getBookmarkedMovies,
  });

  if (!userAuthState?.success) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <View className="items-center justify-center gap-y-10 p-4">
          <OctagonAlertIcon size={100} color="red" className="mb-4" />
          <Text className="mb-6 text-2xl font-bold text-white">Please Login First</Text>
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/login')}
            className="rounded-lg bg-red-600 px-8 py-4">
            <Text className="text-lg font-semibold text-white">Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className=" flex-1 bg-black">
      <View className=" flex flex-row items-center justify-center gap-x-2">
        <Text className=" text-3xl font-bold text-white">BookMarked</Text>
        <Text className=" text-3xl font-bold text-red-600">Movies</Text>
      </View>
      <View className=" h-full flex-1 items-center">
        <FlatList
          className=""
          numColumns={2}
          data={bookMarkedMoviesList?.data?.movies}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Link href={`/movie/${item.original_title}`} className="flex items-center ">
                <View className="flex items-center ">
                  <Image source={{ uri: item?.imageUrl }} style={{ width: 200, height: 300 }} />
                  <View className=" flex items-center justify-center gap-y-1">
                    <Text
                      className=" w-[180px] text-wrap break-words  text-center text-lg font-bold text-red-500"
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.original_title}
                    </Text>
                    <Text className=" text-sm text-white">{item.director}</Text>
                    <Text className=" text-sm  text-white">${item.revenue}</Text>
                  </View>
                </View>
              </Link>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
