// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getExercises, postExercise } from '../services/exerciseService';

// Data type definitions
type WorkoutExercise = {
  id: number;
  exercise_id: number;
  weight: number;
  reps: number;
  sets: number;
  exercise?: {
    name: string;
  };
};

type Workout = {
  workoutID: number;
  name: string;
  date: string; // Format: "YYYY-MM-DD"
  user_id: number;
  workout_exercises: WorkoutExercise[];
};

type Exercise = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

const HomePage: React.FC = () => {
  // Hard-coded user details.
  const userID = 7;
  const userName = "Cheri Trantow";
  const navigate = useNavigate();

  // Component state.
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [globalExercises, setGlobalExercises] = useState<Exercise[]>([]);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [newWorkoutDate, setNewWorkoutDate] = useState('');
  const [newWorkoutExercises, setNewWorkoutExercises] = useState<
    { exerciseID: string; weight: string; reps: string; sets: string }[]
  >([{ exerciseID: '', weight: '', reps: '', sets: '' }]);

  // For toggling expanded workout details.
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<number | null>(null);
  // For inline editing of an exercise entry.
  const [editingExercise, setEditingExercise] = useState<{
    workoutExerciseId: number;
    exerciseID: string;
    weight: string;
    reps: string;
    sets: string;
  } | null>(null);

  // Fetch workouts for the current user.
  const fetchWorkouts = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/workouts?user_id=${userID}`);
      if (!res.ok) throw new Error('Failed to fetch workouts');
      const data: Workout[] = await res.json();
      // Filter only workouts for the current user
      const userWorkouts = data.filter((workout) => workout.user_id === userID);
      setWorkouts(userWorkouts);
    } catch (err) {
      console.error('Error fetching workouts:', err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [userID]);

  // Fetch global exercises.
  useEffect(() => {
    const fetchGlobalExercises = async () => {
      try {
        const data = await getExercises();
        setGlobalExercises(data);
      } catch (err) {
        console.error('Error fetching exercises:', err);
      }
    };
    fetchGlobalExercises();
  }, []);

  // Add a new exercise row to the workout form.
  const handleAddWorkoutExerciseRow = () => {
    setNewWorkoutExercises([
      ...newWorkoutExercises,
      { exerciseID: '', weight: '', reps: '', sets: '' },
    ]);
  };

  // Sort global exercises alphabetically.
  const sortedExercises = [...globalExercises].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Handler for changes in the workout exercise rows.
  const handleWorkoutExerciseChange = (index: number, field: string, value: string) => {
    if (field === 'exerciseID' && value === 'new') {
      handleNewExercise(index);
      return;
    }
    const updated = [...newWorkoutExercises];
    updated[index] = { ...updated[index], [field]: value };
    setNewWorkoutExercises(updated);
  };

  // If user selects "+ Add New Exercise", prompt to create one.
  const handleNewExercise = async (rowIndex: number) => {
    const name = window.prompt("Enter the new exercise name:");
    if (!name) return;
    const description = window.prompt("Enter a description for the new exercise:") || "";
    try {
      const newEx = await postExercise({ name, description });
      setGlobalExercises([...globalExercises, newEx]);
      const updated = [...newWorkoutExercises];
      updated[rowIndex] = { ...updated[rowIndex], exerciseID: newEx.id.toString() };
      setNewWorkoutExercises(updated);
    } catch (err) {
      console.error("Error creating new exercise:", err);
    }
  };

  // Remove a workout exercise row from the form.
  const handleRemoveWorkoutExerciseRow = (index: number) => {
    if (window.confirm('Are you sure you want to remove this exercise?')) {
      const updated = [...newWorkoutExercises];
      updated.splice(index, 1);
      setNewWorkoutExercises(updated);
    }
  };

  // Submit new workout.
  const handleNewWorkoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If names are left blank, use default "Workout".
    const finalWorkoutName = newWorkoutName.trim() === "" ? "Workout" : newWorkoutName;
    const workoutPayload = {
      name: finalWorkoutName,
      date: newWorkoutDate,
      user_id: userID,
    };
    try {
      const res = await fetch(`http://localhost:3000/api/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutPayload),
      });
      if (!res.ok) throw new Error('Failed to create workout');
      const createdWorkout = await res.json();
      const workoutID = createdWorkout.workoutID;
      // When default name is used, display it as "Workout [id]" later.
      if (finalWorkoutName === "Workout") {
        createdWorkout.name = `Workout ${workoutID}`;
      }
      // Create associated workout_exercise records.
      for (const exerciseItem of newWorkoutExercises) {
        const wePayload = {
          workout_id: workoutID,
          exercise_id: Number(exerciseItem.exerciseID),
          weight: Number(exerciseItem.weight),
          reps: Number(exerciseItem.reps),
          sets: Number(exerciseItem.sets),
        };
        const weRes = await fetch(`http://localhost:3000/api/workout_exercises`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(wePayload),
        });
        if (!weRes.ok) {
          console.error('Failed to create workout exercise:', wePayload);
        }
      }
      alert("Workout created successfully!");
      await fetchWorkouts();
      // Reset the form.
      setNewWorkoutName('');
      setNewWorkoutDate('');
      setNewWorkoutExercises([{ exerciseID: '', weight: '', reps: '', sets: '' }]);
    } catch (err) {
      console.error('Error creating workout:', err);
      alert("Error creating workout.");
    }
  };

  // Toggle showing the expanded details.
  const toggleExpandedWorkout = (workoutID: number) => {
    setExpandedWorkoutId(expandedWorkoutId === workoutID ? null : workoutID);
    setEditingExercise(null);
  };

  // Delete a workout exercise entry.
  const handleDeleteWorkoutExercise = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this exercise entry?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/workout_exercises/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error("Failed to delete workout exercise.");
      alert("Exercise entry deleted successfully!");
      await fetchWorkouts();
    } catch (err) {
      console.error(err);
      alert("Error deleting exercise entry.");
    }
  };

  // Begin inline editing for an exercise entry.
  const handleEditClick = (we: WorkoutExercise) => {
    setEditingExercise({
      workoutExerciseId: we.id,
      exerciseID: we.exercise_id.toString(),
      weight: we.weight.toString(),
      reps: we.reps.toString(),
      sets: we.sets.toString(),
    });
  };

  const handleEditingChange = (field: string, value: string) => {
    if (editingExercise) {
      setEditingExercise({ ...editingExercise, [field]: value });
    }
  };

  const handleEditingCancel = () => {
    setEditingExercise(null);
  };

  // Save inline editing changes for a workout exercise entry.
  const handleEditingSave = async () => {
    if (!editingExercise) return;
    const updatedData = {
      exercise_id: Number(editingExercise.exerciseID),
      weight: Number(editingExercise.weight),
      reps: Number(editingExercise.reps),
      sets: Number(editingExercise.sets),
    };
    if (!window.confirm("Save changes for this exercise entry?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/workout_exercises/${editingExercise.workoutExerciseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workout_exercise: updatedData }),
      });
      if (!res.ok) throw new Error("Failed to update workout exercise.");
      alert("Exercise entry updated successfully!");
      await fetchWorkouts();
      setEditingExercise(null);
    } catch (err) {
      console.error(err);
      alert("Error updating workout entry.");
    }
  };

  const computeTotalWeight = (workout: Workout) =>
    (workout.workout_exercises ?? []).reduce(
      (total, we) => total + we.weight * we.reps * we.sets,
      0
    );

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 flex flex-col w-full">
      {/* Navigation Bar */}
      <header className="w-full flex justify-between items-center px-4 py-4">
        <div>
          <h1 className="text-4xl font-bold">Lift Logger</h1>
          <p className="text-lg">Welcome, {userName}</p>
        </div>
        <Button label="Logout" onClick={() => navigate('/')} />
      </header>

      <main className="w-full px-4 py-8 flex-grow">
        <h2 className="text-5xl font-bold text-center mb-10">My Workouts</h2>

        {/* New Workout Form */}
        <section className="bg-gray-700 rounded-lg p-6 mb-8 w-full">
          <h3 className="text-3xl font-semibold mb-4">Add New Workout</h3>
          <form onSubmit={handleNewWorkoutSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Workout Name:</label>
              <input
                type="text"
                value={newWorkoutName}
                onChange={(e) => setNewWorkoutName(e.target.value)}
                className="w-full p-2 bg-white text-gray-900 border border-gray-200 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block mb-1">Workout Date:</label>
              <input
                type="date"
                value={newWorkoutDate}
                onChange={(e) => setNewWorkoutDate(e.target.value)}
                className="w-full p-2 bg-white text-gray-900 border border-gray-200 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Exercises</label>
              {newWorkoutExercises.map((item, index) => (
                <div key={index} className="flex flex-wrap gap-2 mb-2 items-center">
                  <select
                    value={item.exerciseID}
                    onChange={(e) => handleWorkoutExerciseChange(index, 'exerciseID', e.target.value)}
                    className="p-2 bg-white text-gray-900 border border-gray-200 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select Exercise</option>
                    {sortedExercises.map((ex) => (
                      <option key={ex.id} value={ex.id}>{ex.name}</option>
                    ))}
                    <option value="new">+ Add New Exercise</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Weight"
                    value={item.weight}
                    onChange={(e) => handleWorkoutExerciseChange(index, 'weight', e.target.value)}
                    className="p-2 bg-white text-gray-900 w-20 border border-gray-200 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={item.reps}
                    onChange={(e) => handleWorkoutExerciseChange(index, 'reps', e.target.value)}
                    className="p-2 bg-white text-gray-900 w-20 border border-gray-200 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Sets"
                    value={item.sets}
                    onChange={(e) => handleWorkoutExerciseChange(index, 'sets', e.target.value)}
                    className="p-2 bg-white text-gray-900 w-20 border border-gray-200 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                    required
                  />
                  <Button label="X" onClick={() => handleRemoveWorkoutExerciseRow(index)} />
                </div>
              ))}
              <div className="mt-2">
                <Button label="Add Exercise" onClick={handleAddWorkoutExerciseRow} />
              </div>
            </div>
            <div>
              <Button label="Create Workout" onClick={() => {}} type="submit" />
            </div>
          </form>
        </section>

        {/* Past Workouts Section */}
        <section className="bg-gray-700 rounded-lg p-6 w-full">
          <h3 className="text-3xl font-semibold mb-4">Past Workouts</h3>
          {workouts.length === 0 ? (
            <p className="text-gray-300 text-center">No workouts logged yet.</p>
          ) : (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 border-b">Name</th>
                    <th className="py-2 border-b">Date</th>
                    <th className="py-2 border-b">Total Weight</th>
                    <th className="py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout.workoutID} className="text-center">
                      <td className="py-2 border-b">
                        {workout.name.trim() && workout.name !== "Workout"
                          ? workout.name
                          : `Workout ${workout.workoutID}`}
                      </td>
                      <td className="py-2 border-b">{workout.date}</td>
                      <td className="py-2 border-b">{computeTotalWeight(workout)}</td>
                      <td className="py-2 border-b">
                        <Button label="More" onClick={() => toggleExpandedWorkout(workout.workoutID)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Expanded Workout Details */}
              {expandedWorkoutId && (
                <div className="mt-4 bg-gray-600 text-gray-900 p-4 rounded">
                  {workouts
                    .filter((w) => w.workoutID === expandedWorkoutId)
                    .map((workout) => (
                      <div key={workout.workoutID}>
                        <h4 className="text-2xl font-bold mb-2">Workout Details</h4>
                        {workout.workout_exercises && workout.workout_exercises.length > 0 ? (
                          <table className="w-full border-collapse">
                            <thead>
                              <tr>
                                <th className="py-2 border-b">Exercise</th>
                                <th className="py-2 border-b">Weight</th>
                                <th className="py-2 border-b">Reps</th>
                                <th className="py-2 border-b">Sets</th>
                                <th className="py-2 border-b">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {workout.workout_exercises.map((we) => (
                                <tr key={we.id} className="text-center">
                                  {editingExercise && editingExercise.workoutExerciseId === we.id ? (
                                    <>
                                      <td className="py-2 border-b">
                                        <select
                                          value={editingExercise.exerciseID}
                                          onChange={(e) => handleEditingChange('exerciseID', e.target.value)}
                                          className="p-2 bg-white text-gray-900 border border-gray-200 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                                        >
                                          <option value="">Select Exercise</option>
                                          {sortedExercises.map((ex) => (
                                            <option key={ex.id} value={ex.id}>{ex.name}</option>
                                          ))}
                                        </select>
                                      </td>
                                      <td className="py-2 border-b">
                                        <input
                                          type="number"
                                          value={editingExercise.weight}
                                          onChange={(e) => handleEditingChange('weight', e.target.value)}
                                          className="p-2 bg-white text-gray-900 w-20 border border-gray-200 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                                        />
                                      </td>
                                      <td className="py-2 border-b">
                                        <input
                                          type="number"
                                          value={editingExercise.reps}
                                          onChange={(e) => handleEditingChange('reps', e.target.value)}
                                          className="p-2 bg-white text-gray-900 w-20 border border-gray-200 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                                        />
                                      </td>
                                      <td className="py-2 border-b">
                                        <input
                                          type="number"
                                          value={editingExercise.sets}
                                          onChange={(e) => handleEditingChange('sets', e.target.value)}
                                          className="p-2 bg-white text-gray-900 w-20 border border-gray-200 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                                        />
                                      </td>
                                      <td className="py-2 border-b flex gap-2 justify-center">
                                        <Button label="Save" onClick={handleEditingSave} />
                                        <Button label="Cancel" onClick={handleEditingCancel} />
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td className="py-2 border-b">
                                        {we.exercise && we.exercise.name ? we.exercise.name : we.exercise_id}
                                      </td>
                                      <td className="py-2 border-b">{we.weight}</td>
                                      <td className="py-2 border-b">{we.reps}</td>
                                      <td className="py-2 border-b">{we.sets}</td>
                                      <td className="py-2 border-b flex gap-2 justify-center">
                                        <Button label="Edit" onClick={() => handleEditClick(we)} />
                                        <Button label="Delete" onClick={() => handleDeleteWorkoutExercise(we.id)} />
                                      </td>
                                    </>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-gray-900">No exercises recorded for this workout.</p>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
