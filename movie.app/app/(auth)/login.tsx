import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Link, router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginToAccount } from '~/services/auth';
import Toast from 'react-native-toast-message';
import { storeUserAuthStateIntoAsyncStorage } from '~/store/user-auth-store';

// Form Validation Schema
const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

// Infer the TypeScript type from the Zod schema
type FormData = z.infer<typeof FormSchema>;

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMuatation = useMutation({
    mutationFn: (data: FormData) => loginToAccount(data.email, data.password),
    onSuccess: (res, data) => {
      if (res.success && res.data) {
        Toast.show({
          type: 'success',
          text1: res.message,
        });
        storeUserAuthStateIntoAsyncStorage(res.data);
        router.replace({ pathname: '/(tabs)/profile' });
      } else {
        console.log(res);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res.message,
        });
        if (res.status === 403) {
          router.replace({
            pathname: '/(auth)/activate-account',
            params: {
              email: data.email,
              message: 'You need to Verify you Account Before Login In',
            },
          });
        }
      }
    },
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    loginMuatation.mutate(data);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-black px-8">
        <View className="items-center">
          <Link href="/(tabs)">
            <Image
              source={require('../../assets/MainLogo.png')}
              style={{ width: 150, height: 150 }}
              resizeMode="contain"
            />
          </Link>
          <Text className="mb-6 mt-10 text-2xl font-bold text-white">Login to your account</Text>
        </View>

        <View>
          {/* Email Input */}
          <View className="mb-4 rounded-lg border-2 border-slate-800 bg-black px-4">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholderTextColor="#888"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="text-base text-white"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors.email && (
            <Text className="mb-2 text-sm text-red-500">{errors.email.message}</Text>
          )}

          {/* Password Input */}
          <View className="mb-4 rounded-lg border-2 border-slate-800 bg-black px-4">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholderTextColor="#888"
                  placeholder="Password"
                  secureTextEntry
                  className="text-base text-white"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors.password && (
            <Text className="mb-2 text-sm text-red-500">{errors.password.message}</Text>
          )}

          {/* Sign In Button */}
          <TouchableOpacity
            className="mt-6 rounded-lg bg-red-600 p-4"
            onPress={handleSubmit(onSubmit)}>
            <View className="flex-row items-center justify-center">
              {loginMuatation.isPending ? (
                <>
                  <ActivityIndicator color="white" className="mr-2" />
                  <Text className="text-center text-lg font-semibold text-white">
                    Loging in ...
                  </Text>
                </>
              ) : (
                <Text className="text-center text-lg font-semibold text-white"> Login</Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <TouchableOpacity className="mt-8">
            <Link href="/(auth)/register" className="text-center text-red-600 underline">
              Don't have an Account? Sign Up
            </Link>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
