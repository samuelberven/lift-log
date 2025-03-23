import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchExerciseById, updateExercise } from '../services/exerciseService';
import { Exercise } from '../models/exercise';
import { isValidId } from '../utils/validationUtils';

const EditExercisePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only attempts fetch if id is valid
    if (isValidId(id)) {
      const fetchData = async () => {
        try {
          const data = await fetchExerciseById(id);
          setExercise(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setError('Error loading exercise');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setError('Invalid ID');
      setLoading(false);
      navigate('/'); // Redirect if the id is invalid
    }
  }, [id, navigate]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (exercise && isValidId(id)) {
      try {
        await updateExercise(id, exercise);
        navigate(`/exercise/${id}`); // Redirect to the exercise's details page after saving
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error updating exercise');
      }
    } else {
      setError('Please check your input before submitting');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!exercise) return <p>Exercise not found</p>;

  return (
    <div>
      <h2>Edit Exercise</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={exercise.name}
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
        />
        <input
          type="number"
          value={exercise.sets}
          onChange={(e) => setExercise({ ...exercise, sets: Number(e.target.value) })}
        />
        <input
          type="number"
          value={exercise.reps}
          onChange={(e) => setExercise({ ...exercise, reps: Number(e.target.value) })}
        />
        <input
          type="number"
          value={exercise.weight}
          onChange={(e) => setExercise({ ...exercise, weight: Number(e.target.value) })}
        />
        <select
          value={exercise.units}
          onChange={(e) => setExercise({ ...exercise, units: e.target.value as 'lbs' | 'kg' })}
        >
          <option value="lbs">lbs</option>
          <option value="kg">kg</option>
        </select>
        <input
          type="date"
          value={exercise.date}
          onChange={(e) => setExercise({ ...exercise, date: e.target.value })}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditExercisePage;
