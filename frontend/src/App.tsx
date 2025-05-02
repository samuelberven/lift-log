import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.js';
import HomePage from './pages/HomePage.js';
import CreateExercisePage from './pages/CreateExercisePage.js';
import EditExercisePage from './pages/EditExercisePage.js';
import ExerciseDetailPage from './pages/ExerciseDetailPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create" element={<CreateExercisePage />} />
        <Route path="/edit/:id" element={<EditExercisePage />} />
        <Route path="/exercise/:id" element={<ExerciseDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
