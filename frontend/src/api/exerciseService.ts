// import apiClient from './api';

// export interface Exercise {
//   id: number;
//   name: string;
//   reps: number;
//   sets: number;
//   weight: number;
//   unit: string;
//   date: string;
// }

// // Get all exercises
// export const getExercises = async (): Promise<Exercise[]> => {
//   const response = await apiClient.get('/');
//   return response.data;
// };

// // Create a new exercise
// export const createExercise = async (exercise: Exercise): Promise<Exercise> => {
//   const response = await apiClient.post('/', { exercise });
//   return response.data;
// };

// // Update an existing exercise
// export const updateExercise = async (id: number, exercise: Exercise): Promise<Exercise> => {
//   const response = await apiClient.patch(`/${id}`, { exercise });
//   return response.data;
// };

// // Delete an exercise
// export const deleteExercise = async (id: number): Promise<void> => {
//   await apiClient.delete(`/${id}`);
// };
