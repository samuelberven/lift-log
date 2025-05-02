import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.js';
import HomePage from './pages/HomePage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;


// import { useState, useEffect } from "react";
// import { getExercises } from "./api/api";

// interface Exercise {
//   id: number;
//   name: string;
//   description: string;
//   created_at: string;
//   updated_at: string;
// }

// function App() {
//   const [exercises, setExercises] = useState<Exercise[] | null>(null); // Use strong typing

//   useEffect(() => {
//     getExercises()
//       .then(response => {
//         console.log("Fetched exercises:", response); // 🔥 Debugging log
//         setExercises(response);
//       })
//       .catch(error => console.error("Error fetching exercises:", error));
//   }, []);

//   return (
//     <div>
//       <h1>Exercises</h1>
//       {exercises ? (
//         <pre>{JSON.stringify(exercises, null, 2)}</pre> // 🔥 Display raw JSON
//       ) : (
//         <p>Loading exercises...</p>
//       )}
//     </div>
//   );
// }

// export default App;
