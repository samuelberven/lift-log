// HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'; // Your Button component (which you may also simplify if needed)
import { getExercises, postExercise } from '../services/exerciseService';

// Data types
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
  date: string; // "YYYY-MM-DD"
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
  // Hard-code user details.
  const userID = 1;
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

  // Function to fetch workouts.
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/workouts?user_id=${userID}`);
        if (!res.ok) throw new Error('Failed to fetch workouts');
        const data: Workout[] = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error('Error fetching workouts:', err);
      }
    };
    fetchWorkouts();
  }, [userID]);

  // Function to fetch global exercises.
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

  // Handler to add a new exercise row.
  const handleAddWorkoutExerciseRow = () => {
    setNewWorkoutExercises([
      ...newWorkoutExercises,
      { exerciseID: '', weight: '', reps: '', sets: '' },
    ]);
  };

  // Sort exercises alphabetically.
  const sortedExercises = [...globalExercises].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Handler for changes in an exercise row.
  const handleWorkoutExerciseChange = (index: number, field: string, value: string) => {
    if (field === 'exerciseID' && value === 'new') {
      handleNewExercise(index);
      return;
    }
    const updated = [...newWorkoutExercises];
    updated[index] = { ...updated[index], [field]: value };
    setNewWorkoutExercises(updated);
  };

  // Handler to add a new exercise via a prompt.
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

  // Handler to remove an exercise row.
  const handleRemoveWorkoutExerciseRow = (index: number) => {
    if (window.confirm('Are you sure you want to remove this exercise?')) {
      const updated = [...newWorkoutExercises];
      updated.splice(index, 1);
      setNewWorkoutExercises(updated);
    }
  };

  // Handler to submit the new workout.
  const handleNewWorkoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const workoutPayload = {
      name: newWorkoutName,
      date: newWorkoutDate,
      user_id: userID,
    };
    try {
      const workoutRes = await fetch(`http://localhost:3000/api/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutPayload),
      });
      if (!workoutRes.ok) throw new Error('Failed to create workout');
      const newWorkout = await workoutRes.json();
      const workoutID = newWorkout.workoutID;
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
      const updatedRes = await fetch(`http://localhost:3000/api/workouts?user_id=${userID}`);
      if (!updatedRes.ok) throw new Error('Failed to fetch updated workouts');
      const updatedWorkouts = await updatedRes.json();
      setWorkouts(updatedWorkouts);
      setNewWorkoutName('');
      setNewWorkoutDate('');
      setNewWorkoutExercises([{ exerciseID: '', weight: '', reps: '', sets: '' }]);
    } catch (err) {
      console.error('Error creating workout:', err);
    }
  };

  // Logout handler.
  const handleLogout = () => {
    navigate('/');
  };

  // Handler for workout selection.
  const handleSelectWorkout = (workout: Workout) => {
    console.log('Selected workout:', workout);
  };

  // Compute total weight moved.
  const computeTotalWeight = (workout: Workout) => {
    const exercises = workout.workout_exercises || []; // Default to empty array if undefined
    return exercises.reduce((total, we) => total + we.weight * we.reps * we.sets, 0);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#818cf8',
        color: 'white',
        width: '100%',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Navigation Bar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>Lift Logger</h1>
          <p style={{ fontSize: '18px', margin: 0 }}>Welcome, {userName}</p>
        </div>
        <Button label="Logout" onClick={handleLogout} />
      </header>

      {/* Main Content */}
      <main style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '40px', textAlign: 'center', marginBottom: '32px' }}>My Workouts</h2>
        
        {/* New Workout Form */}
        <section style={{ backgroundColor: '#b3b3ff', padding: '24px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '32px', marginBottom: '16px' }}>Add New Workout</h3>
          <form onSubmit={handleNewWorkoutSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label>Workout Name:</label><br/>
              <input
                type="text"
                value={newWorkoutName}
                onChange={(e) => setNewWorkoutName(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label>Workout Date:</label><br/>
              <input
                type="date"
                value={newWorkoutDate}
                onChange={(e) => setNewWorkoutDate(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label>Exercises:</label><br/>
              {newWorkoutExercises.map((item, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                  <select
                    value={item.exerciseID}
                    onChange={(e) =>
                      handleWorkoutExerciseChange(index, 'exerciseID', e.target.value)
                    }
                    style={{ padding: '8px', marginRight: '8px' }}
                    required
                  >
                    <option value="">Select Exercise</option>
                    {sortedExercises.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.name}
                      </option>
                    ))}
                    <option value="new">+ Add New Exercise</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Weight"
                    value={item.weight}
                    onChange={(e) =>
                      handleWorkoutExerciseChange(index, 'weight', e.target.value)
                    }
                    style={{ width: '80px', padding: '8px', marginRight: '8px' }}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={item.reps}
                    onChange={(e) =>
                      handleWorkoutExerciseChange(index, 'reps', e.target.value)
                    }
                    style={{ width: '80px', padding: '8px', marginRight: '8px' }}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Sets"
                    value={item.sets}
                    onChange={(e) =>
                      handleWorkoutExerciseChange(index, 'sets', e.target.value)
                    }
                    style={{ width: '80px', padding: '8px', marginRight: '8px' }}
                    required
                  />
                  <Button label="X" onClick={() => handleRemoveWorkoutExerciseRow(index)} />
                </div>
              ))}
              <div style={{ marginTop: '16px' }}>
                <Button label="Add Exercise" onClick={handleAddWorkoutExerciseRow} />
              </div>
            </div>
            <div>
              <Button label="Create Workout" onClick={() => {}} type="submit" />
            </div>
          </form>
        </section>

        {/* Past Workouts Section */}
        <section style={{ backgroundColor: '#b3b3ff', padding: '24px' }}>
          <h3 style={{ fontSize: '32px', marginBottom: '16px' }}>Past Workouts</h3>
          {workouts.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#eee' }}>No workouts logged yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid white', padding: '8px' }}>Name</th>
                  <th style={{ borderBottom: '1px solid white', padding: '8px' }}>Date</th>
                  <th style={{ borderBottom: '1px solid white', padding: '8px' }}>Total Weight</th>
                  <th style={{ borderBottom: '1px solid white', padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.workoutID} style={{ textAlign: 'center' }}>
                    <td style={{ padding: '8px' }}>{workout.name}</td>
                    <td style={{ padding: '8px' }}>{workout.date}</td>
                    <td style={{ padding: '8px' }}>{computeTotalWeight(workout)}</td>
                    <td style={{ padding: '8px' }}>
                      <Button label="View" onClick={() => handleSelectWorkout(workout)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
