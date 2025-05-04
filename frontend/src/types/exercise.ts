export interface Exercise {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CreateExerciseDto {
  name: string;
  description: string;
}

export interface UpdateExerciseDto extends Partial<CreateExerciseDto> {}