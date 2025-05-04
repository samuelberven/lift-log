// services/workout-exercise-api.ts
import { 
  WorkoutExercise, 
  CreateWorkoutExerciseDto, 
  UpdateWorkoutExerciseDto 
} from '../types/workout-exercise';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const WorkoutExerciseApi = {
  async getByWorkout(workoutId: number): Promise<WorkoutExercise[]> {
    const response = await fetch(`${BASE_URL}/workout_exercises?workout_id=${workoutId}`);
    if (!response.ok) throw new Error('Failed to fetch workout exercises');
    return response.json();
  },

  async create(data: CreateWorkoutExerciseDto): Promise<WorkoutExercise> {
    const response = await fetch(`${BASE_URL}/workout_exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workout_exercise: data })  // matches your wrapPayload pattern
    });
    if (!response.ok) throw new Error('Failed to create workout exercise');
    return response.json();
  },

  async update(id: number, data: UpdateWorkoutExerciseDto): Promise<WorkoutExercise> {
    const response = await fetch(`${BASE_URL}/workout_exercises/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workout_exercise: data })
    });
    if (!response.ok) throw new Error(`Failed to update workout exercise ${id}`);
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/workout_exercises/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Failed to delete workout exercise ${id}`);
  }
};
