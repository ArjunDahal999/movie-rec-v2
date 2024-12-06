import { useMutation } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { activateAccount } from '~/services/auth';

const OTPInput = () => {
  const { email, message } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const activateMutation = useMutation({
    mutationFn: (data: any) => activateAccount(data.email, data.token),
    onSuccess: (res) => {
      if (res.success) {
        Toast.show({
          type: 'success',
          text1: res.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res.message,
        });
      }
    },
  });

  const handleVerification = () => {
    const otpValue = otp.join('');
    if (otpValue.length < 4) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter valid OTP',
      });
      return;
    }
    console.log(otpValue);
    activateMutation.mutate({ email, token: otpValue });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center  bg-black p-6">
        <View className="items-center">
          <Image
            source={require('../../assets/MainLogo.png')}
            style={{ width: 150, height: 150 }}
          />
        </View>
        {message && (
          <Text className="text-primary mb-8 text-center  text-sm  text-red-600">{message}</Text>
        )}
        <Text className="text-primary mb-8 text-center  text-2xl font-bold text-white">
          Check you Email
        </Text>
        <Text className="text-primary mb-8 text-center  text-sm  text-white">
          We have sent an OTP to {email}
        </Text>
        <Text className="text-primary pt-8  text-2xl font-bold text-white">Enter OTP</Text>
        <View className="mt-20 w-full max-w-xs flex-row justify-between">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className="border-primary focus:border-secondary h-14 w-14 rounded-lg border-2 border-red-500 bg-black text-center text-2xl text-white"
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>
        <TouchableOpacity
          disabled={activateMutation.isPending}
          onPress={handleVerification}
          className="mt-12 w-full rounded-lg bg-red-600 p-4">
          <View className="flex-row items-center justify-center">
            {activateMutation.isPending ? (
              <>
                <ActivityIndicator color="white" className="mr-2" />
                <Text className="text-center text-lg font-semibold text-white">Verifying...</Text>
              </>
            ) : (
              <Text className="text-center text-lg font-semibold text-white"> Verify</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OTPInput;
