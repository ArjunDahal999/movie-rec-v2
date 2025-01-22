import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id: string;
  username: string;
  email: string;
  emailActivated: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useUserStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearAuth: () => {
        const state = useUserStore.getState();
        set({ user: null, accessToken: null, refreshToken: null });
        fetch('http://localhost:5000/api/v1/logout', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }).catch(console.error);
      },
    }),
    {
      name: 'user-auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
