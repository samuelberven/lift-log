// pages/home.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import NewWorkoutForm from '../components/NewWorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { Workout } from '../types/workout';
import { Exercise } from '../types/exercise';
import { WorkoutApi } from '../services/workout-api';
import { ExerciseApi } from '../services/exercise-api';

interface HomePageProps {
  userId?: number;  // Make it optional for now since we're hardcoding
}

const HomePage: React.FC<HomePageProps> = ({ userId = 1 }) => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Temporary until you implement auth
  const userName = 'Demo User';

  const fetchWorkouts = async () => {
    try {
      const data = await WorkoutApi.getAll(userId);
      setWorkouts(data);
    } catch (err) {
      setError('Failed to load workouts');
      console.error('Error fetching workouts:', err);
    }
  };

  const fetchExercises = async () => {
    try {
      const data = await ExerciseApi.getAll();
      setExercises(data);
    } catch (err) {
      setError('Failed to load exercises');
      console.error('Error fetching exercises:', err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchWorkouts(), fetchExercises()]);
      setIsLoading(false);
    };

    loadData();
  }, [userId]);

  const handleWorkoutChange = () => {
    fetchWorkouts();  // Only refresh workouts when needed
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userName={userName} 
        onLogout={() => navigate('/login')} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          My Workouts
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* New Workout Section */}
          <section className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add New Workout
              </h2>
              <NewWorkoutForm 
                userID={userId}
                exercises={exercises}
                onWorkoutCreated={handleWorkoutChange}
              />
            </div>
          </section>

          {/* Workouts List Section */}
          <section className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Past Workouts
              </h2>
              {isLoading ? (
                <div className="text-center text-gray-600">Loading...</div>
              ) : (
                <WorkoutList 
                  workouts={workouts}
                  exercises={exercises}
                  onWorkoutChanged={handleWorkoutChange}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
