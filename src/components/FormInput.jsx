import React from "react";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  readOnly = false,
  options = [],
  className = "",
}) => {
  return (
    <div className="form-group mb-3">
      {/* {label && <label className="form-label">{label}</label>} */}
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`form-control ${className}`}
          required={required}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <div className="form-check">
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={onChange}
            className="form-check-input"
            required={required}
          />
          <label className="form-check-label">{label}</label>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-control ${className}`}
          required={required}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

export default FormInput;
