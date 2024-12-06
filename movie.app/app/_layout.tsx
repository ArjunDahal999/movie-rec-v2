import '../global.css';

import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function Layout() {
  useEffect(() => {
    const setColor = async () => {
      const color = await SystemUI.getBackgroundColorAsync();
      await SystemUI.setBackgroundColorAsync('black');
    };
    setColor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar hidden style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              style={{
                backgroundColor: '#000',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'green',
              }}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              text1Style={{ color: 'green' }}
              text2Style={{ color: 'green' }}
            />
          ),
          error: (props) => (
            <BaseToast
              {...props}
              style={{
                backgroundColor: '#000',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'red',
              }}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              text1Style={{ color: 'red' }}
              text2Style={{ color: 'red' }}
            />
          ),
        }}
      />
    </QueryClientProvider>
  );
}
