export type WorkoutExercise = {
  id: number;
  exercise_id: number;
  weight: number;
  reps: number;
  sets: number;
  exercise?: {
    name: string;
  };
};
