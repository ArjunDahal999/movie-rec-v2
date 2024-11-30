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
      <Text className=" text-center text-4xl font-bold text-white">
        Stream thousands of movies and TV shows instantly
      </Text>
      <View className=" my-2">
        <TextInput
          className="  w-full rounded-lg bg-white py-4 pl-4 indent-2 text-black"
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
