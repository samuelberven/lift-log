import React from 'react';
import Button from './Button';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-indigo-600">LiftLog</h1>
          <span className="text-gray-600">Welcome, {userName}</span>
        </div>
        <Button 
          label="Logout" 
          onClick={onLogout} 
          variant="secondary"
          size="small"
        />
      </div>
    </header>
  );
};

export default Header;

// // components/Header.tsx
// import React from 'react';
// import Button from './Button';

// interface HeaderProps {
//   userName: string;
//   onLogout: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
//   return (
//     <header className="bg-white shadow-sm">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <h1 className="text-2xl font-bold text-indigo-600">LiftLog</h1>
//           <span className="text-gray-600">Welcome, {userName}</span>
//         </div>
//         <Button 
//           label="Logout" 
//           onClick={onLogout} 
//           variant="secondary"
//           size="small"
//         />
//       </div>
//     </header>
//   );
// };

// export default Header;
