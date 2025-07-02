import React, { useState, useEffect } from "react";
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
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(60);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

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

  const handleResend = async () => {
    if (!phone) {
      toast.error("Missing phone number.");
      return;
    }

    try {
      setResendLoading(true);
      await HTTP.post("/user/resend-otp", { user_details: phone });
      toast.success("OTP resent successfully.");
      setCooldown(60);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to resend OTP.";
      toast.error(message);
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="page-wrapper">
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

          <div className="text-center mt-3">
            {cooldown > 0 ? (
              <p className="text-muted">
                Resend OTP in <strong>{formatTime(cooldown)}</strong>
              </p>
            ) : (
              <Button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
              >
                {resendLoading ? <span className="spinner" /> : "Resend OTP"}
              </Button>
            )}
          </div>
        </form>
      </Container>
    </div>
  );
};

export default ConfirmOTP;
