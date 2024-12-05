import { View, Text, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      <Link href={'/(auth)/login'}>Login</Link>
    </SafeAreaView>
  );
};

export default ProfileScreen;
