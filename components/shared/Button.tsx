
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseClasses = 'w-full text-lg font-bold py-3 px-6 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4';
  
  const variantClasses = {
    primary: 'bg-[#232D4B] text-white hover:bg-[#1a2138] focus:ring-[#E57200]/50',
    secondary: 'bg-[#E57200] text-white hover:bg-[#c46100] focus:ring-[#232D4B]/50',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
