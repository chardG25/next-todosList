import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white h-8 w-30 bg-orange-500 rounded-4xl"
    >
      {children}
    </button>
  );
};

export default Button;
