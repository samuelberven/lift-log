import { WorkoutExercise } from "./workout-exercise";  // renamed from workout_exercise

export interface Workout {
  id: number;         // changed from workoutID to match exercise pattern
  name: string;
  date: string;       // Format: "YYYY-MM-DD"
  user_id: number;
  workout_exercises: WorkoutExercise[];
}

export interface CreateWorkoutDto {
  name: string;
  date: string;
  user_id: number;
}

export interface UpdateWorkoutDto extends Partial<CreateWorkoutDto> {}
