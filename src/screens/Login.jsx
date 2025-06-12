import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <h2 className="text-center mb-3">Sign in with Phone Number</h2>
      <div className="form-group">
        <label className="form-label">Phone Number</label>
        <input type="tel" className="form-control" placeholder="+234..." />
      </div>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/dashboard")}
      >
        Sign In
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
}
