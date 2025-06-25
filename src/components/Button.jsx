const Button = ({
  type = "button",
  variant = "primary",
  onClick,
  children,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} w-100 mb-2 ${className}`}
      onClick={onClick}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
