import { Exercise, CreateExerciseDto } from '../types/exercise';

// Use VITE_API_URL from the environment to allow easy reconfiguration,
// and include the /api prefix, either via your env variable or fallback.
const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const EXERCISES_URL = `${BASE_API_URL}/exercises`;

/**
 * Helper function to check the response status and extract JSON.
 * Throws an error if the response isn’t OK.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'An error occurred while processing the request.');
  }
  return response.json() as Promise<T>;
}

/**
 * Get all exercises.
 */
export const getExercises = async (): Promise<Exercise[]> => {
  const response = await fetch(EXERCISES_URL, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  console.log('Fetching exercises from:', EXERCISES_URL);
  return handleResponse<Exercise[]>(response);
};

/**
 * Get an exercise by its ID.
 */
export const fetchExerciseById = async (id: string): Promise<Exercise> => {
  const url = `${EXERCISES_URL}/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  return handleResponse<Exercise>(response);
};

/**
 * Create a new exercise.
 * The payload is wrapped inside an "exercise" key to match Rails' expectations.
 */
export const postExercise = async (exercise: CreateExerciseDto): Promise<Exercise> => {
  const response = await fetch(EXERCISES_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ exercise })  // Payload wrapped as { exercise: { ... } }
  });
  return handleResponse<Exercise>(response);
};

/**
 * Update an existing exercise by its ID.
 * The payload is wrapped in an "exercise" key.
 */
export const updateExercise = async (id: string, exercise: Exercise): Promise<Exercise> => {
  const url = `${EXERCISES_URL}/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ exercise })  // Same wrapping as POST
  });
  return handleResponse<Exercise>(response);
};

/**
 * Delete an exercise by its ID.
 */
export const deleteExercise = async (id: string): Promise<void> => {
  const url = `${EXERCISES_URL}/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete exercise: ${errorText}`);
  }
};



// import { Exercise, CreateExerciseDto } from '../models/exercise';

// // Base API configuration: use the env variable if available.
// const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// const EXERCISES_URL = `${BASE_API_URL}/exercises`;

// /**
//  * Helper function that checks response status and extracts JSON data.
//  */
// async function handleResponse<T>(response: Response): Promise<T> {
//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(errorText || 'An error occurred while processing the request.');
//   }
//   return response.json() as Promise<T>;
// }

// // Get all exercises
// export const getExercises = async (): Promise<Exercise[]> => {
//   const response = await fetch(EXERCISES_URL, {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   });
//   console.log('Fetching exercises from:', EXERCISES_URL);
//   return handleResponse<Exercise[]>(response);
// };

// // Post a new exercise
// export const postExercise = async (exercise: CreateExerciseDto): Promise<Exercise> => {
//   const response = await fetch(EXERCISES_URL, {
//     method: 'POST',
//     headers: { 
//       'Content-Type': 'application/json', 
//       'Accept': 'application/json'},
//     body: JSON.stringify(exercise),
//     credentials: 'include',
//   });
//   return handleResponse<Exercise>(response);
// };

// // Get an exercise by ID
// export const fetchExerciseById = async (id: string): Promise<Exercise> => {
//   const url = `${EXERCISES_URL}/${id}`;
//   const response = await fetch(url, {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   });
//   return handleResponse<Exercise>(response);
// };

// // Update an exercise by ID
// export const updateExercise = async (id: string, exercise: Exercise): Promise<Exercise> => {
//   const url = `${EXERCISES_URL}/${id}`;
//   const response = await fetch(url, {
//     method: 'PUT',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(exercise),
//     credentials: 'include',
//   });
//   return handleResponse<Exercise>(response);
// };

// // Delete an exercise by ID
// export const deleteExercise = async (id: string): Promise<void> => {
//   const url = `${EXERCISES_URL}/${id}`;
//   const response = await fetch(url, {
//     method: 'DELETE',
//     credentials: 'include',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   });
//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Failed to delete exercise: ${errorText}`);
//   }
// };
