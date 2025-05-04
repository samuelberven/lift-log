// pages/ExerciseDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchExerciseById } from '../services/exerciseService';
import { Exercise } from '../types/exercise';
import Header from '../components/Header';
import { isValidId } from '../utils/validationUtils';

const ExerciseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isValidId(id)) {
      const fetchData = async () => {
        try {
          const data = await fetchExerciseById(id!);
          setExercise(data);
        } catch (err) {
          console.error('Error fetching exercise:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      console.error('Invalid exercise ID');
      navigate('/home');
    }
  }, [id, navigate]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!exercise) return <p className="p-4">Exercise not found</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{exercise.name}</h2>
        <div className="bg-white p-6 rounded shadow">
          <p className="mb-2"><strong>Description:</strong> {exercise.description}</p>
          <p className="mb-2"><strong>Created:</strong> {new Date(exercise.created_at).toLocaleString()}</p>
          <p className="mb-2"><strong>Updated:</strong> {new Date(exercise.updated_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
