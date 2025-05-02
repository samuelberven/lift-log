// // Placeholder code-- this code works (no CORS issues) but is not the final version (which can be found below).
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Exercise } from '../models/exercise';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/exercises', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setExercises(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = (exercise: Exercise) => {
    navigate(`/edit/${exercise.id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/exercises/${id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete exercise');
        }

        setExercises(exercises.filter(exercise => exercise.id !== id));
      } catch (error) {
        console.error('Error deleting exercise:', error);
        setError('Failed to delete exercise');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-800"> {/* Removed w-full as it's unnecessary */}
      <Header />
      <main className="w-full px-4 py-8"> {/* Changed from container to w-full */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Exercise Log</h2>
        {loading ? (
          <p className="text-gray-300 text-center">Loading exercises...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : exercises.length === 0 ? (
          <p className="text-gray-300 text-center">No exercises logged yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16"> {/* Adjusted padding */}
            {exercises.map(exercise => (
              <div 
                key={exercise.id} 
                className="bg-gray-700 rounded-lg shadow-lg p-6 hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {exercise.name}
                </h3>
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



// import React, { useEffect, useState } from 'react';
// import { Exercise } from '../models/exercise';
// import Header from '../components/Header';

// const HomePage: React.FC = () => {
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/exercises', {
//       method: 'GET',
//       credentials: 'include',  // Now this should work with the updated CORS config
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
//         console.error('Error fetching exercises:', error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-800"> {/* Dark background */}
//       <Header />
//       <main className="container mx-auto px-4 py-8">
//         <h2 className="text-3xl font-bold text-white mb-6">Your Exercise Log</h2>
//         {loading ? (
//           <p className="text-gray-300">Loading exercises...</p>
//         ) : error ? (
//           <p className="text-red-400">{error}</p>
//         ) : exercises.length === 0 ? (
//           <p className="text-gray-300">No exercises logged yet.</p>
//         ) : (
//           <div className="grid gap-4">
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
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default HomePage;








// Real code (currently not working due to CORS issues):
// // pages/HomePage.tsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getExercises, deleteExercise } from '../services/exerciseService';
// import { Exercise } from '../models/exercise';
// import Header from '../components/Header';
// import ExerciseTable from '../components/ExerciseTable';

// const HomePage: React.FC = () => {
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getExercises()
//       .then((data) => {
//         setExercises(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching exercises:', err);
//         setError('Error loading exercises');
//         setLoading(false);
//       });
//   }, []);

//   // Handle delete with an optimistic update (locally update state)
//   const handleDelete = async (id: number) => {
//     // Store current state before making any changes
//     const previousExercises = [...exercises];  // Create a deep copy of the current state, in case rollback is needed
  
//     try {
//       // Optimistically update UI
//       setExercises((prev) => prev.filter((ex) => ex.id !== +id));
  
//       // The id.toString() is a workaround suggested by copilot; TODO: Find a more robust solution if possible
//       // Attempt server operation
//       await deleteExercise(id.toString());
//     } catch (error) {
//       console.error("An error occurred in handleDelete():", error);
//       // TODO: Implement more robust error handling later (if needed); maybe create a util function for it
      
//       // Rollback to previous state if server operation failed;
//       setExercises(previousExercises);
//       setError('Error deleting exercise');
//     }
//   };

//   // Redirect to edit page
//   const handleEdit = (exercise: Exercise) => {
//     navigate(`/edit/${exercise.id}`);
//   };

//   // Redirect to detailed view page if a row is clicked
//   const handleViewDetail = (id: number) => {
//     navigate(`/exercise/${id}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <main className="container mx-auto px-4 py-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Exercise Log</h2>
//         {loading ? (
//           <p className="text-gray-600">Loading exercises...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : exercises.length === 0 ? (
//           <p className="text-gray-600">No exercises logged yet. Start lifting!</p>
//         ) : (
//           <ExerciseTable
//             exercises={exercises}
//             onDelete={handleDelete}
//             onEdit={handleEdit}
//             onViewDetail={handleViewDetail}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// export default HomePage;
