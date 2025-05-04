// pages/CreateExercisePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postExercise } from '../services/exerciseService';
import { Exercise } from '../types/exercise';
import Header from '../components/Header';

const CreateExercisePage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExercise: Omit<Exercise, 'id' | 'created_at' | 'updated_at'> = { name, description };
    
    try {
      await postExercise(newExercise);
      navigate('/home');
    } catch (error) {
      console.error('Error creating exercise:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Create New Exercise</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <input
            type="text"
            placeholder="Exercise Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">
            Create Exercise
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExercisePage;
