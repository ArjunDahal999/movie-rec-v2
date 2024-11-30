import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';

const fetchMovieImage = async (title: string) => {
  const response = await fetch(
    `https://www.myapifilms.com/imdb/idIMDB?title=${title}&token=e7a9efa9-2cd6-46e0-89f0-5026fd325f99`
  );
  const imageData = await response.json();
  return imageData?.data?.movies[0]?.urlPoster || '../assets/MainLogo.png';
};

const GetLazyImage = ({
  title,
  height,
  width,
}: {
  title: string;
  height?: number;
  width?: number;
}) => {
  const { data: imageUrl, isLoading } = useQuery({
    queryKey: ['movieImage', title],
    queryFn: () => fetchMovieImage(title),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });

  if (isLoading) {
    return (
      <View className=" items-center justify-center" style={{ height: 230, width: 150 }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: imageUrl }}
        height={height ?? 225}
        width={width ?? 150}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 10,
  },
});

export default GetLazyImage;
