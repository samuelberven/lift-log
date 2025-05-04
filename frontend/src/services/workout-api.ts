import { Workout, CreateWorkoutDto, UpdateWorkoutDto } from '../types/workout';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const WorkoutApi = {
  async getAll(userId: number): Promise<Workout[]> {
    const response = await fetch(`${BASE_URL}/workouts?user_id=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch workouts');
    return response.json();
  },

  async getById(id: number): Promise<Workout> {
    const response = await fetch(`${BASE_URL}/workouts/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch workout with id ${id}`);
    return response.json();
  },

  async create(workout: CreateWorkoutDto): Promise<Workout> {
    const response = await fetch(`${BASE_URL}/workouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workout })  // matches your wrapPayload pattern
    });
    if (!response.ok) throw new Error('Failed to create workout');
    return response.json();
  },

  async update(id: number, workout: UpdateWorkoutDto): Promise<Workout> {
    const response = await fetch(`${BASE_URL}/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workout })  // matches your wrapPayload pattern
    });
    if (!response.ok) throw new Error(`Failed to update workout ${id}`);
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/workouts/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Failed to delete workout ${id}`);
  }
};
