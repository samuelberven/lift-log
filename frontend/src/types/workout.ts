import { WorkoutExercise } from "./workout_exercise";

export type Workout = {
  workoutID: number;
  name: string;
  date: string; // Format: "YYYY-MM-DD"
  user_id: number;
  workout_exercises: WorkoutExercise[];
};
