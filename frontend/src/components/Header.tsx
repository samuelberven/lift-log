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
    <header className="bg-indigo-600 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left and center: Logo and navigation links */}
        <div className="flex items-center gap-6">
          <Link to="/home" className="text-xl font-bold text-gray-800">
            Lift Logger
          </Link>
          <nav className="flex space-x-4">
            <Link to="/home" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/create" className="hover:text-gray-300">
              Add Exercise
            </Link>
          </nav>
        </div>
        {/* Right: Logout button */}
        <div>
          <Button label="Logout" onClick={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
