import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-200 transition"
  >
    {label}
  </button>
);

export default Button;
