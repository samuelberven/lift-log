// workoutsService.ts
import { apiRequest } from '../utils/apiClient'; // Assuming you use this helper
const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const WORKOUTS_URL = `${BASE_API_URL}/workouts`;

export const getWorkouts = async (user_id: number) => {
  const response = await fetch(`${WORKOUTS_URL}?user_id=${user_id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error fetching workouts');
  }
  return response.json();
};

export const postWorkout = async (workout: {
  name: string;
  date: string;
  user_id: number;
}) => {
  const response = await fetch(WORKOUTS_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ workout })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error creating workout');
  }
  return response.json();
};

// Add update and delete functions as needed...
