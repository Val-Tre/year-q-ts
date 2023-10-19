import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  text,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${className}`}
      disabled={disabled}
    >
      {text ? text : ""}
    </button>
  );
};

export default Button;
