export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

export interface RegisterResponse {
  accessToken: string;
  user: User;
}
