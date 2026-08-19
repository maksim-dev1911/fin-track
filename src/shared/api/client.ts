import axios from 'axios';

import { routes } from '@/app/router/routes.ts';
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
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== endpoints.REFRESH
    ) {
      originalRequest._retry = true;

      try {
        const { data: refreshData } = await apiClient.post(endpoints.REFRESH, null, {
          withCredentials: true,
        });

        useAuthStore.setState({ accessToken: refreshData.accessToken });

        const { data: user } = await apiClient.get(endpoints.ME);

        useAuthStore.getState().setSession({
          accessToken: refreshData.accessToken,
          user,
        });

        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearSession();
        window.location.href = routes.login;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
