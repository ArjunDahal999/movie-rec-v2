import '../global.css';

import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';

import { Stack } from 'expo-router';
import { AppStateStatus, Platform } from 'react-native';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

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
      <Stack />
    </QueryClientProvider>
  );
}
