// Header.tsx
import React from "react";
import Button from "./Button";
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

    const handleLogout = () => {
    // For now, simply redirect back to login (Welcome page)
    navigate('/');
  };


  return (
    <header className="bg-blue-600 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/home" className="text-xl font-bold text-gray-800"> Lift Logger 
        </Link>
        <nav className="flex items-center space-x-4">
          <Button label="Logout" onClick={handleLogout} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
