// services/exerciseApi.ts
import { Exercise, CreateExerciseDto, UpdateExerciseDto } from '../types/exercise';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ExerciseApi = {
  async getAll(): Promise<Exercise[]> {
    const response = await fetch(`${BASE_URL}/exercises`);
    if (!response.ok) throw new Error('Failed to fetch exercises');
    return response.json();
  },

  async getById(id: number): Promise<Exercise> {
    const response = await fetch(`${BASE_URL}/exercises/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch exercise with id ${id}`);
    return response.json();
  },

  async create(exercise: CreateExerciseDto): Promise<Exercise> {
    const response = await fetch(`${BASE_URL}/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise)
    });
    if (!response.ok) throw new Error('Failed to create exercise');
    return response.json();
  },

  async update(id: number, exercise: UpdateExerciseDto): Promise<Exercise> {
    const response = await fetch(`${BASE_URL}/exercises/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise)
    });
    if (!response.ok) throw new Error(`Failed to update exercise ${id}`);
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/exercises/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Failed to delete exercise ${id}`);
  }
};
