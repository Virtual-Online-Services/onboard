import React, {  useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Container";
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { HTTP } from "../utils";

const SetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    reconfirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showReconfirm, setShowReconfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const phone = location?.state?.tell;
  
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
        user_details: phone,
        password: formData.password,
      };

      const response = await HTTP.post("/user/reset_onboarders", payload);

      if (response?.status === 200) {
        toast.success("Password set successfully!");
        navigate("/registration-completed", {
          state: {
            heading: "Password Reset Successful",
            message: "You can now log in with your new password.",
            buttonText: "Login Now",
            redirectTo: "/login-dark",
          },
        });
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
    <div className="page-wrapper">
      <Container>
        <Logo />
        <h2 className="text-center mb-4">Set Password</h2>
        <p className="text-center mb-3">
          Do not share this password with anyone.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Password Field with Toggle */}
          <div style={{ position: "relative" }}>
            <FormInput
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "50%",
                right: "12px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "#666",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Confirm Password Field with Toggle */}
          <div style={{ position: "relative" }}>
            <FormInput
              type={showReconfirm ? "text" : "password"}
              name="reconfirmPassword"
              value={formData.reconfirmPassword}
              onChange={handleChange}
              placeholder="Reconfirm Password"
              required
            />
            <span
              onClick={() => setShowReconfirm(!showReconfirm)}
              style={{
                position: "absolute",
                top: "50%",
                right: "12px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "#666",
              }}
            >
              {showReconfirm ? "Hide" : "Show"}
            </span>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : "Save Password"}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default SetPassword;
