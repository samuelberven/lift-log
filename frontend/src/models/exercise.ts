export interface Exercise {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// New type for creating an exercise
// Note: This type is used when creating a new exercise, so it does not include 'id', 'created_at', or 'updated_at'.
// Todo: This is a bit of a workaround, possibly. Ideally, we should have a separate DTO (Data Transfer Object) for creating exercises.
// This is a common practice in backend development to separate the data structure used for creating resources from the one used for retrieving them.
// This way, we can enforce different validation rules and avoid exposing unnecessary fields.
// However, for simplicity, we are using the same type here.

export type CreateExerciseDto = Pick<Exercise, 'name' | 'description'>;