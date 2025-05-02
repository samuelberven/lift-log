import React, { useEffect, useState } from 'react';
import { getExercises } from '../api/api';
import { Exercise } from '../models/exercise';
import Header from '../components/Header.js';

const HomePage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExercises()
      .then((data) => {
        setExercises(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Your Exercise Log</h2>
        {loading ? (
          <p>Loading exercises...</p>
        ) : exercises.length === 0 ? (
          <p className="text-gray-600">No exercises logged yet. Start lifting!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-2">{exercise.name}</h3>
                <p className="text-gray-700">{exercise.description}</p>
                <p className="text-sm text-gray-500 mt-4">
                  Created: {new Date(exercise.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;


// import React, { useState, useEffect } from 'react';
// import Greeting from '../components/Greeting';
// import ExerciseTable from '../components/ExerciseTable';
// import { fetchExercises, deleteExercise } from '../services/exerciseService';
// import { Exercise } from '../models/Exercise';
// import { useNavigate } from 'react-router-dom';

// const HomePage: React.FC = () => {
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Fetch exercises from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const exercisesData = await fetchExercises();
//         setExercises(exercisesData);
//         setLoading(false);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (err) {
//         setError('Error loading exercises');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle delete exercise
//   const handleDelete = async (id: string) => {
//     try {
//       await deleteExercise(id);
//       setExercises(exercises.filter(exercise => exercise.id !== id)); // Update state after deletion
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError('Error deleting exercise');
//     }
//   };

//     // redirect to edit page
//     const handleEdit = (exercise: Exercise) => {
//       navigate(`/edit/${exercise.id}`);
//     };
  
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <Greeting />
//       <h2>Recent Exercises</h2>
//       <ExerciseTable
//         exercises={exercises}  // Pass entire exercises array
//         onDelete={handleDelete}
//         onEdit={handleEdit}
//       />
//     </div>
//   );
// };

// export default HomePage;
