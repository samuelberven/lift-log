import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import NewWorkoutForm from '../components/NewWorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { Workout } from '../types/workout';
import { Exercise } from '../types/exercise';
import { WorkoutApi } from '../services/workout-api';
import { ExerciseApi } from '../services/exercise-api';

const HomePage: React.FC = () => {
  const userId = 1;  // Hardcoded for now
  const userName = 'Demo User';
  // const navigate = useNavigate();
  
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [workoutsData, exercisesData] = await Promise.all([
        WorkoutApi.getAll(userId),  // Fetch workouts for the given user
        ExerciseApi.getAll()
      ]);
      setWorkouts(workoutsData);
      setExercises(exercisesData);
    } catch (error) {
      setError('Error fetching data');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header now only takes `userName` because logout is handled internally */}
      <Header userName={userName} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <NewWorkoutForm 
            userID={userId}
            exercises={exercises}
            onWorkoutCreated={fetchData}
          />
          <WorkoutList 
            workouts={workouts}
            // exercises={exercises}
            onWorkoutChanged={fetchData}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
