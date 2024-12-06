import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import {
  getUserAuthStateFromAsyncStorage,
  removeUserAuthStateFromAsyncStorage,
} from '~/store/user-auth-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Calendar1Icon,
  CheckCircle2Icon,
  LogOutIcon,
  MailIcon,
  OctagonAlertIcon,
  UserCircleIcon,
  UserIcon,
} from 'lucide-react-native';

// User data interface
interface UserData {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  emailActivated: string;
}

// Background image
const backgroundImage = {
  uri: 'https://c4.wallpaperflare.com/wallpaper/720/974/576/avengers-logo-art-hero-wallpaper-preview.jpg',
};

// Profile Screen Component
const ProfileScreen = () => {
  const {
    data: userAuthState,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserAuthStateFromAsyncStorage,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="red" />
      </SafeAreaView>
    );
  }

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

  if (userAuthState?.data?.user) {
    return <UserCard user={userAuthState?.data?.user} />;
  }
};

const UserCard: React.FC<{ user: UserData }> = ({ user }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeUserAuthStateFromAsyncStorage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.replace({ pathname: '/(auth)/login' });
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.imageBackground}
        imageStyle={styles.image}>
        {/* main view parent */}
        <View>
          {/* profile box */}
          <View className=" flex flex-1 items-center justify-center">
            {/* userprofile box */}
            <View className=" items-center gap-y-6">
              <View className=" opacity-45">
                <UserCircleIcon height={150} width={150} color={'red'} />
              </View>
              <View className=" flex flex-row items-center gap-x-2">
                <Text className=" text-4xl font-bold text-white">{user.username}</Text>
              </View>
            </View>
            {/* userprofile info */}
            <View className="py-20">
              <View className=" flex flex-row items-center gap-x-2">
                <MailIcon size={20} color="red" />
                <Text className=" text-xl text-white">{user.email}</Text>
              </View>
              <View className=" flex flex-row items-center gap-x-2">
                <Calendar1Icon size={20} color="red" />
                <Text className=" text-xl text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <View className=" flex flex-row items-center gap-x-2">
                <CheckCircle2Icon size={20} color="red" />
                <Text className=" text-xl text-white">Account Activated</Text>
              </View>
            </View>
          </View>
          {/* logout button */}
          <TouchableOpacity onPress={handleLogout} className="mt-6 rounded-lg bg-red-600 p-4">
            <View className="flex-row items-center justify-center">
              <LogOutIcon size={20} color="white" />
              <Text className="text-center text-lg font-semibold text-white">Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    opacity: 0.2,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
