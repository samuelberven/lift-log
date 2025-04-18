import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchExerciseById } from '../services/exerciseService';
import { Exercise } from '../models/exercise';  // Import the Exercise interface
import { isValidId } from '../utils/validationUtils';  // Import the validation helper

const ExerciseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);  // Use the Exercise interface for type safety

  useEffect(() => {
    if (isValidId(id)) {  // Check if id is valid before fetching
      const fetchData = async () => {
        const data = await fetchExerciseById(id);
        setExercise(data);  // Set the fetched data to exercise state
      };
      fetchData();
    } else {
      console.error('Exercise ID is invalid');
      navigate('/');  // Redirect to home or show error page
    }
  }, [id, navigate]);  // Dependency array ensures effect runs when id or navigate changes

  if (!exercise) return <p>Loading...</p>;  // Show loading message while fetching

  return (
    <div>
      <h2>{exercise.name}</h2>
      <p><strong>Sets:</strong> {exercise.sets}</p>
      <p><strong>Reps:</strong> {exercise.reps}</p>
      <p><strong>Weight:</strong> {exercise.weight} {exercise.units}</p>
      <p><strong>Date:</strong> {exercise.date}</p>
    </div>
  );
};

export default ExerciseDetailPage;
