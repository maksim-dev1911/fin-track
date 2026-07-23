import { create } from 'zustand';

import type { LoginResponse } from '@/features/auth/types/auth.types.ts';

interface AuthState {
  accessToken: string | null;
  user: LoginResponse['user'] | null;

  setSession: (session: LoginResponse) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setSession: ({ accessToken, user }) => {
    set({ accessToken, user });
  },

  clearSession: () => {
    set({ accessToken: null, user: null });
  },
}));
