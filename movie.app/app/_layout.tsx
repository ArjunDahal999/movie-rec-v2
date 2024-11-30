import '../global.css';

import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';

import { Stack } from 'expo-router';
import { AppStateStatus, Platform } from 'react-native';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
