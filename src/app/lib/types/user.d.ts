// src/lib/types/user.d.ts

export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  marital_status?: string;
  weight?: number;
  height?: number;
  created_at?: string;
  blood_group?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  marital_status?: string;
  weight?: number;
  height?: number;
  blood_group?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface UpdateProfileInput {
  password?: string;
  weight?: number;
  height?: number;
  marital_status?: string;
  age?: number;
}
