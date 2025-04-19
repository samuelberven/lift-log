import { useState, useEffect } from "react";
import { getExercises } from "./api/api";

interface Exercise {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

function App() {
  const [exercises, setExercises] = useState<Exercise[] | null>(null); // Use strong typing

  useEffect(() => {
    getExercises()
      .then(response => {
        console.log("Fetched exercises:", response); // 🔥 Debugging log
        setExercises(response);
      })
      .catch(error => console.error("Error fetching exercises:", error));
  }, []);

  return (
    <div>
      <h1>Exercises</h1>
      {exercises ? (
        <pre>{JSON.stringify(exercises, null, 2)}</pre> // 🔥 Display raw JSON
      ) : (
        <p>Loading exercises...</p>
      )}
    </div>
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
//   const [exercises, setExercises] = useState<Exercise[]>([]); // Explicitly set type

//   useEffect(() => {
//     getExercises().then(setExercises);
//   }, []);

//   return (
//     <div>
//       <h1>Exercises</h1>
//       {exercises.length > 0 ? (
//         <ul>
//           {exercises.map(exercise => (
//             <li key={exercise.id}>
//               <strong>{exercise.name}</strong>: {exercise.description ?? "No description available"}
//               <br></br>
//               <p>"Created {exercise.created_at}, updated {exercise.updated_at}"</p>
//             </li>

//           ))}
//         </ul>
//       ) : (
//         <p>Loading exercises...</p>
//       )}
//     </div>
//   );
// }

// export default App;

