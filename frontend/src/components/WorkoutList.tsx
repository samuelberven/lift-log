import React, { useState } from 'react';
import { Workout } from '../types/workout';
// import { Exercise } from '../types/exercise';
import { WorkoutExerciseApi } from '../services/workout-exercise-api';
import Button from './Button';

interface WorkoutListProps {
  workouts: Workout[];
  onWorkoutChanged: () => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onWorkoutChanged }) => {
  const [expandedWorkout, setExpandedWorkout] = useState<number | null>(null);
  const [editingWeId, setEditingWeId] = useState<number | null>(null);
  const [editedWe, setEditedWe] = useState<{ weight: string; reps: string; sets: string }>({
    weight: '', reps: '', sets: ''
  });

  if (workouts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No workouts logged yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workouts.map((workout) => (
            <React.Fragment key={workout.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workout.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workout.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    label={expandedWorkout === workout.id ? 'Hide' : 'Show More'}
                    onClick={() => setExpandedWorkout(expandedWorkout === workout.id ? null : workout.id)}
                    variant="secondary"
                    size="small"
                  />
                </td>
              </tr>
              {expandedWorkout === workout.id && (
                <tr>
                  <td colSpan={3} className="px-6 py-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Exercise</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reps</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sets</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {workout.workout_exercises.map((we) => (
                            <tr key={we.id} className="hover:bg-white">
                              {editingWeId === we.id ? (
                                <>
                                  <td className="px-4 py-2">{we.exercise?.name}</td>
                                  {['weight', 'reps', 'sets'].map((field) => (
                                    <td key={field} className="px-4 py-2">
                                      <input
                                        type="number"
                                        value={editedWe[field as keyof typeof editedWe]}
                                        onChange={(e) => setEditedWe({ ...editedWe, [field]: e.target.value })}
                                        className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                                      />
                                    </td>
                                  ))}
                                  <td className="px-4 py-2 text-right space-x-2">
                                    <Button
                                      label="Save"
                                      onClick={async () => {
                                        await WorkoutExerciseApi.update(we.id, {
                                          weight: Number(editedWe.weight),
                                          reps: Number(editedWe.reps),
                                          sets: Number(editedWe.sets),
                                        });
                                        setEditingWeId(null);
                                        onWorkoutChanged();
                                      }}
                                      size="small"
                                    />
                                    <Button
                                      label="Cancel"
                                      onClick={() => setEditingWeId(null)}
                                      variant="secondary"
                                      size="small"
                                    />
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="px-4 py-2 text-sm">{we.exercise?.name}</td>
                                  <td className="px-4 py-2 text-sm">{we.weight}</td>
                                  <td className="px-4 py-2 text-sm">{we.reps}</td>
                                  <td className="px-4 py-2 text-sm">{we.sets}</td>
                                  <td className="px-4 py-2 text-right space-x-2">
                                    <Button
                                      label="Edit"
                                      onClick={() => {
                                        setEditingWeId(we.id);
                                        setEditedWe({
                                          weight: we.weight.toString(),
                                          reps: we.reps.toString(),
                                          sets: we.sets.toString(),
                                        });
                                      }}
                                      variant="secondary"
                                      size="small"
                                    />
                                    <Button
                                      label="Delete"
                                      onClick={async () => {
                                        if (window.confirm('Delete this exercise?')) {
                                          await WorkoutExerciseApi.delete(we.id);
                                          onWorkoutChanged();
                                        }
                                      }}
                                      variant="secondary"
                                      size="small"
                                    />
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutList;
