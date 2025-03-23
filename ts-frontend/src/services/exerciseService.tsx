import { Exercise } from '../models/exercise';

const API_URL = 'http://127.0.0.1:3000/exercises'; // Todo: once deployed, replace this with deployed URL

// Get all exercises
export const fetchExercises = async (): Promise<Exercise[]> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch exercises');
  }
  return await response.json();  // Infers return type as Exercise array
};

// Post new exercise
export const postExercise = async (exercise: Omit<Exercise, 'id'>): Promise<void> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exercise),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to post exercise');
  }
};

// Get exercise by ID
export const fetchExerciseById = async (id: string): Promise<Exercise> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch exercise by ID');
  }
  return await response.json();  // infers return type as Exercise
};

// Update exercise by ID
export const updateExercise = async (id: string, exercise: Exercise): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exercise),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to update exercise');
  }
};

// Delete exercise by ID
export const deleteExercise = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to delete exercise');
  }
};
