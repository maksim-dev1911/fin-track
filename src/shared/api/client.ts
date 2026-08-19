import axios from 'axios';

import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import { endpoints } from '@/shared/api/endpoints.ts';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { data } = await axios.post(endpoints.REFRESH, {
        refreshToken: useAuthStore.getState().accessToken,
      });

      useAuthStore.getState().setSession(data.accessToken);

      return apiClient(error.config);
    }

    return Promise.reject(error);
  },
);
