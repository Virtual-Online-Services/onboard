import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Icon from "../components/Icon";
import Button from "../components/Button";

const RegistrationCompleted = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const heading = state?.heading || "Registration Completed";
  const message =
    state?.message || "You have successfully registered your account.";
  const buttonText = state?.buttonText || "Login to Account";
  const redirectTo = state?.redirectTo || "/login-dark";

  return (
    <Container>
      <Logo />
      <h5 className="text-center mb-4">{heading}</h5>
      <div className="text-center mb-3">
        <Icon name="checkmark" className="mb-3" style={{ width: "100px" }} />
      </div>
      <p className="text-center mb-3">{message}</p>
      <Button onClick={() => navigate(redirectTo)}>{buttonText}</Button>
    </Container>
  );
};

export default RegistrationCompleted;
