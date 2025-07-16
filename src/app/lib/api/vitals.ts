// src/app/lib/api/vitals.ts
import api from "./axios";
import {
  VitalsInput,
  VitalsAddResponse,
  VitalsLog,
  VitalsUpdateInput,
  VitalsUpdateResponse,
} from "@/app/lib/types/vitals";

// Add new vitals
export const addVitals = async (
  vitals: VitalsInput
): Promise<VitalsAddResponse> => {
  const response = await api.post<VitalsAddResponse>("/vitals", vitals);
  return response.data;
};

// Get vitals
export const getVitals = async (): Promise<VitalsLog[]> => {
  const response = await api.get<VitalsLog[]>("/vitals");
  return response.data;
};

// Update vitals
export const updateVitals = async (
  id: string,
  data: VitalsUpdateInput
): Promise<VitalsUpdateResponse> => {
  const response = await api.put<VitalsUpdateResponse>(`/vitals/${id}`, data);
  return response.data;
};
