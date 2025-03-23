import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import ExerciseDetailPage from './pages/ExerciseDetailPage';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateExercisePage />} />
        <Route path="/edit/:id" element={<EditExercisePage />} />
        <Route path="/exercise/:id" element={<ExerciseDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
