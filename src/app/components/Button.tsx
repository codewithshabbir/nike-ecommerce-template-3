import React from 'react';

interface ButtonProps {
  text: string;
  classNames: string;
}

const Button: React.FC<ButtonProps> = ({ text, classNames }) => {
  return (
    <div className={`bg-black mb-4 px-4 text-white text-center ${classNames}`}>
      {text}
    </div>
  );
};

export default Button;