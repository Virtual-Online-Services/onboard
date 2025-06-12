import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Container";
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { HTTP } from "../utils"; // Axios instance

const SetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    reconfirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const phone = location?.state?.phone;
  if (!phone) {
    navigate("/login-dark");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.reconfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        phone: phone,
        password: formData.password,
      };

      const response = await HTTP.post("/create-password", payload);

      if (response?.data?.status === "success") {
        toast.success("Password set successfully!");
        navigate("/registration-completed");
      } else {
        toast.error(response?.data?.error || "Unexpected error occurred.");
      }
    } catch (error) {
      const message =
        error.response?.data?.error || "Failed to set password. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Logo />
      <h2 className="text-center mb-4">Set Password</h2>
      <p className="text-center mb-3">
        Do not share this password with anyone.
      </p>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />
        <FormInput
          label="Reconfirm Password"
          type="password"
          name="reconfirmPassword"
          value={formData.reconfirmPassword}
          onChange={handleChange}
          placeholder="Reconfirm Password"
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : "Save Password"}
        </Button>
      </form>
    </Container>
  );
};

export default SetPassword;
