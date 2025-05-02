// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { postExercise } from '../services/exerciseService';
// import { Exercise } from '../models/exercise';

// const CreateExercisePage: React.FC = () => {
//   const [name, setName] = useState('');
//   const [sets, setSets] = useState(0);
//   const [reps, setReps] = useState(0);
//   const [weight, setWeight] = useState(0);
//   const [units, setUnits] = useState<'lbs' | 'kg'>('lbs');
//   const [date, setDate] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Todo: read about React's Omit
//     const newExercise: Omit<Exercise, 'id'> = { name, sets, reps, weight, units, date };

//     await postExercise(newExercise); // Backend will generate ID upon creation
//     navigate('/');  // Redirect to HomePage after adding exercise
//   };

//   return (
//     <div>
//       <h2>Create New Exercise</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Exercise Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Sets"
//           value={sets}
//           onChange={(e) => setSets(Number(e.target.value))}
//         />
//         <input
//           type="number"
//           placeholder="Reps"
//           value={reps}
//           onChange={(e) => setReps(Number(e.target.value))}
//         />
//         <input
//           type="number"
//           placeholder="Weight"
//           value={weight}
//           onChange={(e) => setWeight(Number(e.target.value))}
//         />
//         <select value={units} onChange={(e) => setUnits(e.target.value as 'lbs' | 'kg')}>
//           <option value="lbs">lbs</option>
//           <option value="kg">kg</option>
//         </select>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//         <button type="submit">Create Exercise</button>
//       </form>
//     </div>
//   );
// };

// export default CreateExercisePage;
