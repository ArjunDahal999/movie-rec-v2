import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link, Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from '@tanstack/react-query';
import { registerAccount } from '~/services/auth';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';

const FormSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

type FormData = z.infer<typeof FormSchema>;

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const registerMutation = useMutation({
    mutationFn: (data: FormData) => registerAccount(data.username, data.email, data.password),
    onSuccess: (res, data) => {
      if (res.success) {
        Toast.show({
          type: 'success',
          text1: res.message,
        });
        router.replace({ pathname: '/(auth)/activate-account', params: { email: data.email } });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res.message,
        });
      }
    },
  });

  const onSubmit = (data: FormData) => {
    registerMutation.mutate(data);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-black px-8">
        <View className="items-center">
          <Image
            source={require('../../assets/MainLogo.png')}
            style={{ width: 150, height: 150 }}
          />
          <Text className="mb-6 mt-10 text-3xl font-bold text-white">Create account</Text>
        </View>
        <View>
          <Controller
            control={control}
            rules={{ required: 'Name is required' }}
            name="username"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4 rounded-lg border-2 border-slate-800 bg-black px-4">
                <TextInput
                  placeholderTextColor="red"
                  placeholder="Name"
                  keyboardType="default"
                  className="text-base text-white"
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
          {errors.username && <Text className="mb-2 text-red-500">{errors.username.message}</Text>}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4 rounded-lg border-2 border-slate-800 bg-black px-4">
                <TextInput
                  placeholderTextColor="red"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="text-base text-white"
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
          {errors.email && <Text className="mb-2 text-red-500">{errors.email.message}</Text>}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4 rounded-lg border-2 border-slate-800 bg-black px-4">
                <TextInput
                  placeholderTextColor="red"
                  placeholder="Password"
                  secureTextEntry
                  className="text-base text-white"
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
          {errors.password && <Text className="mb-2 text-red-500">{errors.password.message}</Text>}

          <TouchableOpacity
            className={`mt-6 rounded-lg ${registerMutation.isPending ? 'bg-red-800' : 'bg-red-600'} p-4`}
            onPress={handleSubmit(onSubmit)}
            disabled={registerMutation.isPending}>
            <View className="flex-row items-center justify-center">
              {registerMutation.isPending ? (
                <>
                  <ActivityIndicator color="white" className="mr-2" />
                  <Text className="text-center text-lg font-semibold text-white">
                    Creating Account...
                  </Text>
                </>
              ) : (
                <Text className="text-center text-lg font-semibold text-white">Create Account</Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="mt-8" disabled={registerMutation.isPending}>
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
