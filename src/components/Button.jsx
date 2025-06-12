import React from "react";

const Button = ({
  type = "button",
  variant = "primary",
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} w-100 mb-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
