import api from "@/app/lib/api/axios";
import { User, UpdateProfileInput } from "@/app/lib/types/user";

// Get current user profile
export const fetchUserProfile = async (): Promise<User> => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

// Update user profile
export const updateUserProfile = async (
  data: UpdateProfileInput
): Promise<User> => {
  const res = await api.put<{ message: string; user: User }>("/users/me", data);
  return res.data.user;
};
