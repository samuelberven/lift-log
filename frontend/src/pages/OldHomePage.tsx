import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Exercise } from '../types/exercise';
import Header from '../components/Header';
import { getExercises, deleteExercise } from '../services/exerciseService';

const HomePage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (err: unknown) {
        console.error('Error fetching exercises:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred while loading exercises');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (exercise: Exercise) => {
    navigate(`/edit/${exercise.id}`);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this exercise?')) return;
    
    // Save current state in case we need to roll back
    const previousExercises = [...exercises];
    try {
      // Optimistically update UI
      setExercises(exercises.filter(ex => ex.id !== id));
      await deleteExercise(id.toString());
    } catch (err: unknown) {
      console.error("Error deleting exercise:", err);
      // Roll back to previous state
      setExercises(previousExercises);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to delete exercise');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <Header />
      <main className="w-full px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Exercise Log</h2>
        {loading ? (
          <p className="text-gray-300 text-center">Loading exercises...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : exercises.length === 0 ? (
          <p className="text-gray-300 text-center">No exercises logged yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-gray-700 rounded-lg shadow-lg p-6 hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">{exercise.name}</h3>
                <p className="text-gray-300">
                  {exercise.description || 'No description available'}
                </p>
                <div className="mt-4 text-sm text-gray-400">
                  Created: {new Date(exercise.created_at).toLocaleDateString()}
                </div>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={() => handleEdit(exercise)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exercise.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;


// // // Placeholder code-- this code works (no CORS issues) but is not the final version (which can be found below).
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Exercise } from '../models/exercise';
// import Header from '../components/Header';

// const HomePage: React.FC = () => {
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('http://localhost:3000/api/exercises', {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setExercises(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   const handleEdit = (exercise: Exercise) => {
//     navigate(`/edit/${exercise.id}`);
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this exercise?')) {
//       try {
//         const response = await fetch(`http://localhost:3000/api/exercises/${id}`, {
//           method: 'DELETE',
//           credentials: 'include',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to delete exercise');
//         }

//         setExercises(exercises.filter(exercise => exercise.id !== id));
//       } catch (error) {
//         console.error('Error deleting exercise:', error);
//         setError('Failed to delete exercise');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-800"> {/* Removed w-full as it's unnecessary */}
//       <Header />
//       <main className="w-full px-4 py-8"> {/* Changed from container to w-full */}
//         <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Exercise Log</h2>
//         {loading ? (
//           <p className="text-gray-300 text-center">Loading exercises...</p>
//         ) : error ? (
//           <p className="text-red-400 text-center">{error}</p>
//         ) : exercises.length === 0 ? (
//           <p className="text-gray-300 text-center">No exercises logged yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16"> {/* Adjusted padding */}
//             {exercises.map(exercise => (
//               <div 
//                 key={exercise.id} 
//                 className="bg-gray-700 rounded-lg shadow-lg p-6 hover:bg-gray-600 transition-colors"
//               >
//                 <h3 className="text-xl font-bold text-white mb-2">
//                   {exercise.name}
//                 </h3>
//                 <p className="text-gray-300">
//                   {exercise.description || 'No description available'}
//                 </p>
//                 <div className="mt-4 text-sm text-gray-400">
//                   Created: {new Date(exercise.created_at).toLocaleDateString()}
//                 </div>
//                 <div className="mt-4 flex justify-end gap-4">
//                   <button
//                     onClick={() => handleEdit(exercise)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(exercise.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default HomePage;
