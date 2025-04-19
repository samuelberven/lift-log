import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Fetch all exercises
export const getExercises = async () => {
  const res = await axios.get(`${API_BASE}/exercises`);
  return res.data;
};

export default { getExercises };


// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// // Fetch all users
// export const getUsers = async () => {
//   const res = await axios.get(`${API_BASE}/users`);
//   return res.data;
// };

// // Fetch all exercises
// export const getExercises = async () => {
//   const res = await axios.get(`${API_BASE}/exercises`);
//   return res.data;
// };

// // Fetch all workouts
// export const getWorkouts = async () => {
//   const res = await axios.get(`${API_BASE}/workouts`);
//   return res.data;
// };

// // Fetch all workout exercises
// export const getWorkoutExercises = async () => {
//   const res = await axios.get(`${API_BASE}/workout_exercises`);
//   return res.data;
// };

// // Fetch all user exercises
// export const getUserExercises = async () => {
//   const res = await axios.get(`${API_BASE}/user_exercises`);
//   return res.data;
// };

// export default { getUsers, getExercises, getWorkouts, getWorkoutExercises, getUserExercises };
