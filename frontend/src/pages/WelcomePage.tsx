import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // For now, simulate login success
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-500 text-white">
      <h1 className="text-6xl font-bold mb-8">Welcome to LiftLog</h1>
      <p className="mb-4 text-xl">Track your gains and push your limits.</p>
      <p className="mb-12 text- sm italic">
        (Note: User login features are still under development. Go ahead and press the button to proceed!)
      </p>
      <Button label="login" onClick={handleLogin} />
    </div>
  );
  
};

export default WelcomePage;
