import React, { useState } from 'react';
import { Exercise } from '../types/exercise';
// import { CreateWorkoutDto } from '../types/workout';
// import { CreateWorkoutExerciseDto } from '../types/workout-exercise';
import { WorkoutApi } from '../services/workout-api';
import { WorkoutExerciseApi } from '../services/workout-exercise-api';
import Button from './Button';

interface NewWorkoutFormProps {
  userID: number;
  exercises: Exercise[];
  onWorkoutCreated: () => void;
}

const NewWorkoutForm: React.FC<NewWorkoutFormProps> = ({
  userID,
  exercises,
  onWorkoutCreated,
}) => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDate, setWorkoutDate] = useState('');
  const [exerciseRows, setExerciseRows] = useState<
    { exerciseID: string; weight: string; reps: string; sets: string }[]
  >([{ exerciseID: '', weight: '', reps: '', sets: '' }]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const workout = await WorkoutApi.create({
        name: workoutName || 'Workout',
        date: workoutDate,
        user_id: userID,
      });

      await Promise.all(exerciseRows.map(row => {
        if (!row.exerciseID) return;
        
        return WorkoutExerciseApi.create({
          workout_id: workout.id,
          exercise_id: Number(row.exerciseID),
          weight: Number(row.weight),
          reps: Number(row.reps),
          sets: Number(row.sets),
        });
      }));

      setWorkoutName('');
      setWorkoutDate('');
      setExerciseRows([{ exerciseID: '', weight: '', reps: '', sets: '' }]);
      onWorkoutCreated();
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Workout Name
          </label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="Workout"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={workoutDate}
            onChange={(e) => setWorkoutDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Exercises
        </label>
        {exerciseRows.map((row, index) => (
          <div key={index} className="grid grid-cols-5 gap-3 items-center">
            <select
              value={row.exerciseID}
              onChange={(e) => {
                const newRows = [...exerciseRows];
                newRows[index] = { ...row, exerciseID: e.target.value };
                setExerciseRows(newRows);
              }}
              required
              className="col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select Exercise</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
            {['weight', 'reps', 'sets'].map((field) => (
              <input
                key={field}
                type="number"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={row[field as keyof typeof row]}
                onChange={(e) => {
                  const newRows = [...exerciseRows];
                  newRows[index] = { ...row, [field]: e.target.value };
                  setExerciseRows(newRows);
                }}
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            ))}
            <Button
              label="Remove"
              onClick={() => {
                const newRows = exerciseRows.filter((_, i) => i !== index);
                setExerciseRows(newRows);
              }}
              variant="secondary"
              size="small"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          label="Add Exercise"
          onClick={() => setExerciseRows([...exerciseRows, { exerciseID: '', weight: '', reps: '', sets: '' }])}
          variant="secondary"
        />
        <Button
          label="Create Workout"
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
};

export default NewWorkoutForm;
