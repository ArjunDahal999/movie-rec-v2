'use client';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDebouncedState } from '@mantine/hooks';
import AutoSuggestionBox from '../ui/Auto-Suggsetion';

export default function MovieFlixHero() {
  const [value, setValue] = useState(''); // Immediate value
  const [searchText, setSearchText] = useDebouncedState('', 500);

  // Update both the immediate and debounced states
  const handleChange = (text: string) => {
    setValue(text);
    setSearchText(text);
  };

  return (
    <View className=" relative">
      <Text className=" pb-4 text-center text-3xl font-bold text-white">
        Stream thousands of movies and TV shows instantly
      </Text>
      <View className="">
        <TextInput
          className="  w-[350px] rounded-lg bg-white  py-4 pl-4  text-black"
          value={value}
          onChangeText={handleChange}
          autoComplete="off"
          placeholder="Search movies & TV shows"
        />
      </View>
      {value && searchText && <AutoSuggestionBox movieName={searchText} />}
    </View>
  );
}
