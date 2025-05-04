// components/ExerciseTable.tsx
import React from 'react';
import { Exercise } from '../types/exercise';
import ExerciseItem from './ExerciseItem';

interface ExerciseTableProps {
  exercises: Exercise[];
  onDelete: (id: number) => void;
  onEdit: (exercise: Exercise) => void;
  onViewDetail: (id: number) => void;
}

const ExerciseTable: React.FC<ExerciseTableProps> = ({ exercises, onDelete, onEdit, onViewDetail }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="p-2">Edit</th>
          <th className="p-2">Name</th>
          <th className="p-2">Description</th>
          <th className="p-2">Created</th>
          <th className="p-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            onDelete={onDelete}
            onEdit={onEdit}
            onViewDetail={onViewDetail}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExerciseTable;
