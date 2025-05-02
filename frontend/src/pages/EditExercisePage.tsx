// pages/EditExercisePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchExerciseById, updateExercise } from '../services/exerciseService';
import { Exercise } from '../models/exercise';
import Header from '../components/Header';
import { isValidId } from '../utils/validationUtils';

const EditExercisePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isValidId(id)) {
      const fetchData = async () => {
        try {
          const data = await fetchExerciseById(id!);
          setExercise(data);
        } catch (err) {
          console.error("An error occurred in fetchExerciseById():", err);
          // TODO: Implement more robust error handling later (if needed); maybe create a util function for it
  
          setError('Error loading exercise');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setError('Invalid ID');
      setLoading(false);
      navigate('/home');
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (exercise && isValidId(id)) {
      try {
        await updateExercise(id!, exercise);
        navigate(`/exercise/${id}`);
      } catch (err) {
        console.error("An error occurred in updateExercise():", err);
        // TODO: Implement more robust error handling later (if needed); maybe create a util function for it
  
        setError('Error updating exercise');
      }
    } else {
      setError('Please check your input before submitting');
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!exercise) return <p className="p-4">Exercise not found</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Exercise</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={exercise.name}
            onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={exercise.description}
            onChange={(e) => setExercise({ ...exercise, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExercisePage;
