import { useQuery } from '@tanstack/react-query';
import { getUserAuthStateFromAsyncStorage } from '~/store/user-auth-store';

export const useUserAuthState = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: getUserAuthStateFromAsyncStorage,
    retry: 1,
  });

  return {
    userAuthState: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
