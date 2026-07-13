import {create} from "zustand/react";

import type {User} from "@/features/auth/types/auth.types.ts";

interface AuthState {
    accessToken: string | null;
    user: User | null;

    setAccessToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    clearSession: () => void;
}

export const useAuthState = create<AuthState>((set) => ({
    accessToken: null,
    user: null,

    setAccessToken: (token: string | null) => set({accessToken: token}),
    setUser: (user: User | null) => set({user}),

    clearSession: () => {
        set({accessToken: null, user: null});
    }
}))