import React from 'react';
import { MdOutlineDeleteForever, MdOutlineModeEditOutline } from 'react-icons/md';
import { Exercise } from '../models/exercise';

interface ExerciseItemProps {
  exercise: Exercise;
  onDelete: (id: string) => void;
  onEdit: (exercise: Exercise) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, onDelete, onEdit }) => {
  return (
    <tr>
      <td>
        <MdOutlineModeEditOutline onClick={() => onEdit(exercise)} 
        style={{ cursor: 'pointer' }} />
      </td>
      <td>{exercise.name}</td>
      <td>{exercise.sets} sets x {exercise.reps} reps</td>
      <td>{exercise.weight} {exercise.units}</td>
      <td>{exercise.date}</td>
      <td>
        <MdOutlineDeleteForever onClick={() => onDelete(exercise.id)} 
        style={{ cursor: 'pointer' }} />
      </td>
    </tr>
  );
};

export default ExerciseItem;
