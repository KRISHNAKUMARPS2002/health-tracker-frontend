// src/lib/types/vitals.d.ts

export interface VitalsInput {
  bloodPressure?: string;
  sugarLevel?: number;
  heartRate?: number;
  temperature?: number;
  spo2?: number;
  weight?: number;
  height?: number;
  notes?: string;
  measuredAt?: string; // ISO string or date
  source?: "manual" | "device" | string; // Default is "manual"
}

export interface VitalsLog extends VitalsInput {
  _id: string;
  userId: string;
  height?: number;
  bmi?: number;
  status?: string;
  reasons?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface VitalsUpdateInput extends Partial<VitalsInput> {
  bmi?: number;
  status?: string;
  reasons?: string[];
}

export interface VitalsAddResponse {
  message: string;
  status?: string;
  reasons?: string[];
  vitals: VitalsLog;
}

export interface VitalsUpdateResponse {
  message: string;
  status?: string;
  reasons?: string[];
  vitals: VitalsLog;
}
