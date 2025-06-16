import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Container";
import Logo from "../components/Logo";
import OTPInput from "../components/OTPInput";
import Button from "../components/Button";
import { HTTP } from "../utils";

const ConfirmOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location?.state?.phone;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) {
      toast.error("Missing phone number.");
      return;
    }

    try {
      setLoading(true);
      const response = await HTTP.post("/otp", { token: otp });

      if (response?.status === 200) {
        toast.success("OTP verified!");
        navigate("/set-password", { state: { phone } });
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "OTP verification failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Logo />
      <h2 className="text-center mb-4">Confirm OTP</h2>
      <p className="text-center mb-3">
        Please enter the 6-digit code sent to your registered phone number
      </p>
      <form onSubmit={handleSubmit}>
        <OTPInput onChange={setOtp} />
        <Button type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : "Verify"}
        </Button>
        {/* <p className="text-center text-muted mt-3">
          Resend Pin in 10 seconds...
        </p> */}
      </form>
    </Container>
  );
};

export default ConfirmOTP;
