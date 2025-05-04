export interface WorkoutExercise {  // changed from type to interface for consistency
  id: number;
  exercise_id: number;
  weight: number;
  reps: number;
  sets: number;
  exercise?: {
    name: string;
  };
}

export interface CreateWorkoutExerciseDto {
  workout_id: number;
  exercise_id: number;
  weight: number;
  reps: number;
  sets: number;
}

export interface UpdateWorkoutExerciseDto extends Partial<CreateWorkoutExerciseDto> {}
