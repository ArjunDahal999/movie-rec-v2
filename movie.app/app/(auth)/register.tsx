import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className=" flex-1 bg-black px-8">
        <View className="items-center">
          <Image
            source={require('../../assets/MainLogo.png')}
            style={{ width: 150, height: 150 }}
          />
          <Text className="mb-6 mt-10 text-3xl font-bold  text-white">Create account</Text>
        </View>
        <View className="">
          <View className="mb-4 rounded-lg   border-2 border-slate-800 bg-black px-4">
            <TextInput
              placeholderTextColor="red"
              placeholder="Name"
              keyboardType="default"
              className="text-base"
            />
          </View>
          <View className="mb-4 rounded-lg   border-2 border-slate-800 bg-black px-4">
            <TextInput
              placeholderTextColor="red"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="text-base"
            />
          </View>
          <View className="mb-4 rounded-lg   border-2 border-slate-800 bg-black px-4">
            <TextInput
              placeholderTextColor={'red'}
              placeholder="Password"
              secureTextEntry
              className="text-base"
            />
          </View>

          <TouchableOpacity className="mt-6 rounded-lg bg-red-600 p-4">
            <Text className="text-center text-lg font-semibold text-white">Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-8 ">
            <Link href="/(auth)/login" className="text-center text-red-600 underline">
              Already have an Account ? Sign In
            </Link>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RegisterScreen;
