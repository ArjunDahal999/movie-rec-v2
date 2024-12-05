import { Stack } from 'expo-router';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieFlixHero from '~/components/landing/hero-section';
import TopGrossingMovies from '~/components/landing/top-grossing-movie';
import TopPopularMovies from '~/components/landing/top-popular-movies';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <SafeAreaProvider className=" bg-black">
        <SafeAreaView className=" flex-1 items-center   bg-black p-0" edges={['top']}>
          <ScrollView className=" flex-1 ">
            <View className=" flex items-center gap-y-2">
              <Image
                source={require('../../assets/MainLogo.png')}
                style={{ width: 150, height: 150 }}
              />
              {/* <MovieFlixHero /> */}
            </View>
            {/* <FeaturedMovie /> */}
            {/* <TopGrossingMovies />
            <TopPopularMovies /> */}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
