// components/ExerciseItem.tsx
import React from 'react';
import { MdOutlineDeleteForever, MdOutlineModeEditOutline } from 'react-icons/md';
import { Exercise } from '../models/exercise';

interface ExerciseItemProps {
  exercise: Exercise;
  onDelete: (id: number) => void;
  onEdit: (exercise: Exercise) => void;
  onViewDetail: (id: number) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, onDelete, onEdit, onViewDetail }) => {
  return (
    <tr 
      className="border-b hover:bg-gray-50 cursor-pointer" 
      onClick={() => onViewDetail(exercise.id)}
    >
      <td className="text-center" onClick={(e) => { e.stopPropagation(); onEdit(exercise); }}>
        <MdOutlineModeEditOutline className="inline-block text-xl text-blue-500 hover:text-blue-700" />
      </td>
      <td className="p-2">{exercise.name}</td>
      <td className="p-2">{exercise.description}</td>
      <td className="p-2">{new Date(exercise.created_at).toLocaleDateString()}</td>
      <td className="text-center" onClick={(e) => { e.stopPropagation(); onDelete(exercise.id); }}>
        <MdOutlineDeleteForever className="inline-block text-xl text-red-500 hover:text-red-700" />
      </td>
    </tr>
  );
};

export default ExerciseItem;
