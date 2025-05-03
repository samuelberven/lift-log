import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button" }) => (
  <button
    onClick={onClick}
    type={type}
    className="px-4 py-2 bg-white text-gray-800 font-medium rounded shadow hover:bg-gray-100 transition"
  >
    {label}
  </button>
);

export default Button;
