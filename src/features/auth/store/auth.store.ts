import { create } from 'zustand';

import type { LoginResponse } from '@/features/auth/types/auth.types.ts';

interface AuthState {
  accessToken: string | null;
  user: LoginResponse['user'] | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';

  setSession: (session: LoginResponse) => void;
  clearSession: () => void;
  setStatus: (status: AuthState['status']) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  status: 'loading',

  setSession: ({ accessToken, user }) => {
    set({ accessToken, user, status: 'authenticated' });
  },

  clearSession: () => {
    set({ accessToken: null, user: null, status: 'unauthenticated' });
  },

  setStatus: (status: AuthState['status']) => {
    set({ status });
  },
}));
