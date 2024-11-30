import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { FilmIcon } from 'lucide-react-native';

export const getAutoSuggestion = async (movieName: string) => {
  try {
    const response = await fetch(`http://13.49.18.64/autocomplete/${movieName}`);
    const { data } = await response.json();
    if (data) {
      return { success: true, data };
    }
    return { success: false, data: [] };
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return { success: false, data: [] };
  }
};

const AutoSuggestionBox = ({ movieName }: { movieName: string }) => {
  const [autoSuggestionData, setAutoSuggestionData] = useState<String[] | any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAutoSuggestionData = async () => {
      if (!movieName.trim()) {
        setAutoSuggestionData([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await getAutoSuggestion(movieName);
        if (response.success && response.data) {
          setAutoSuggestionData(response.data);
        } else {
          setAutoSuggestionData([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setAutoSuggestionData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAutoSuggestionData();
  }, [movieName]);

  return (
    <View className="">
      {isLoading && (
        <View className="absolute left-0 top-0 z-[9]  w-full  rounded-md bg-black  py-4 shadow-lg ">
          <ActivityIndicator size="small" color="red" />
        </View>
      )}

      {autoSuggestionData.length > 0 && (
        <View className="absolute left-0 top-0 z-[9]  w-full  rounded-md bg-black  py-4 shadow-lg ">
          <FlatList
            data={autoSuggestionData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Link
                  className="flex items-center justify-center"
                  href={{
                    pathname: '/movie/[title]',
                    params: { title: item.toString() },
                  }}>
                  <View className="flex flex-row items-center  justify-center gap-x-2 py-2">
                    <FilmIcon color={'white'} size={24} />
                    <Text className=" text-white ">{item}</Text>
                  </View>
                </Link>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default AutoSuggestionBox;
