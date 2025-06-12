import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Container";
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { HTTP } from "../utils";

const LoginDark = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // 🔄 Spinner state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        user_details: formData.phoneNumber,
        password: formData.password,
      };

      const response = await HTTP.post("/login", payload);
      const token = response?.data?.token;

      if (token) {
        sessionStorage.setItem("authToken", token);
        toast.success("Login successful!");
        navigate("/welcome-dashboard");
      } else {
        toast.error("Unexpected error. Please try again.");
      }
    } catch (error) {
      const message =
        error.response?.data?.error || "Login failed. Check credentials.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container isDarkTheme={false}>
      <Logo isDarkTheme={false} />
      <h5 className="text-left mb-2 text-dark">Login with Phone Number</h5>
      <p className="text-left mb-4 text-dark">
        Welcome back, please input your details to access your account.
      </p>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter Phone Number"
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />
        <a
          href="#"
          onClick={() => navigate("/forgot-password")}
          className="text-muted mb-3 d-block text-decoration-none"
        >
          Forgot Password?
        </a>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="spinner" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </Button>
        <p className="text-center mt-3 text-dark">
          Are you new here?{" "}
          <a
            href="#"
            onClick={() => navigate("/registration")}
            className="text-red text-decoration-none"
          >
            Register New Account
          </a>
        </p>
      </form>
    </Container>
  );
};

export default LoginDark;
