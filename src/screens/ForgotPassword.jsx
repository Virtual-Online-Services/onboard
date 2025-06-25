import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { HTTP } from "../utils"; // Assuming you use this for API requests

const ForgotPassword = () => {
  const [phone, setphone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    setLoading(true);
    try {
      const response = await HTTP.post("/user/forgot", {
        user_details: phone,
        type: "phone",
      });

      if (response?.data?.message === "success") {
        toast.success("OTP sent to your phone number.");
        navigate("/confirm-otp", { state: { phone } });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send reset instructions.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Container>
        <Logo />
        <h5 className="text-left mb-2">Forgot Password</h5>
        <p className="text-left mb-4">
          Enter your phone number to receive a reset code.
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Phone Number"
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            placeholder="Enter Phone Number"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : "Send Reset Code"}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default ForgotPassword;
