// import React from 'react';
// import ExerciseItem from './ExerciseItem';
// import { Exercise } from '../models/exercise';

// interface ExerciseTableProps {
//   exercises: Exercise[];  // Array of exercises
//   onDelete: (id: string) => void;
//   onEdit: (exercise: Exercise) => void;
// }

// const ExerciseTable: React.FC<ExerciseTableProps> = ({ exercises, onDelete, onEdit }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Edit</th>
//           <th>Name</th>
//           <th>Sets x Reps</th>
//           <th>Weight</th>
//           <th>Date</th>
//           <th>Delete</th>
//         </tr>
//       </thead>
//       <tbody>
//         {exercises.map(exercise => (
//           <ExerciseItem
//             key={exercise.id}
//             exercise={exercise}
//             onDelete={onDelete}
//             onEdit={onEdit}
//           />
//         ))}
//       </tbody>
//     </table>
//   );
// };a

// export default ExerciseTable;
