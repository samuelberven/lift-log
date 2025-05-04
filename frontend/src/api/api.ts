import { Exercise } from '../types/exercise';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

console.log("VITE_API_URL:", import.meta.env.VITE_API_URL); // Debugging

export const getExercises = async (): Promise<Exercise[]> => {
  const response = await fetch(`${API_BASE}/api/exercises`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercises');
  }
  return response.json();
};
