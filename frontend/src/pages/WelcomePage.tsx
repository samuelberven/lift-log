import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login success by navigating to the home page
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-indigo-600 text-white flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-8">Welcome to LiftLog</h1>
        <p className="mb-4 text-xl">Track your gains and push your limits.</p>
        <p className="mb-12 text-sm italic">
          (Note: User login features are still under development. Go ahead and press the button to proceed!)
        </p>
        <Button label="Login" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default WelcomePage;
