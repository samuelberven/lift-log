import React, { useState, useEffect } from 'react';
import Greeting from '../components/Greeting';
import ExerciseTable from '../components/ExerciseTable';
import { fetchExercises, deleteExercise } from '../services/exerciseService';
import { Exercise } from '../models/exercise';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch exercises from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const exercisesData = await fetchExercises();
        setExercises(exercisesData);
        setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error loading exercises');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete exercise
  const handleDelete = async (id: string) => {
    try {
      await deleteExercise(id);
      setExercises(exercises.filter(exercise => exercise.id !== id)); // Update state after deletion
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Error deleting exercise');
    }
  };

    // redirect to edit page
    const handleEdit = (exercise: Exercise) => {
      navigate(`/edit/${exercise.id}`);
    };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Greeting />
      <h2>Recent Exercises</h2>
      <ExerciseTable
        exercises={exercises}  // Pass entire exercises array
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default HomePage;
