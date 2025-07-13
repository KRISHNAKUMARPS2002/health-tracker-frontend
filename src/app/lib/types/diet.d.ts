// src/lib/types/diet.d.ts

export interface Meal {
  name: string;
  time?: string; // e.g. "08:00 AM"
  calories?: number;
  description?: string;
}

export interface DietPlanInput {
  title: string;
  description?: string;
  meals: Meal[]; // Array of meals per day
}

export interface DietPlan extends DietPlanInput {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface DietPlanAddResponse {
  message: string;
  plan: DietPlan;
}

export interface DietPlanUpdateResponse {
  message: string;
  plan: DietPlan;
}
