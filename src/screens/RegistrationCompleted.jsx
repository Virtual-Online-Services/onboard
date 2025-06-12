import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Icon from "../components/Icon";
import Button from "../components/Button";

const RegistrationCompleted = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo />
      <h5 className="text-center mb-4">Registration Completed</h5>
      <div className="text-center mb-3">
        <Icon name="checkmark" className="mb-3" style={{ width: "100px" }} />
      </div>
      <p className="text-center mb-3">
        You have successfully registered your account.
      </p>
      <Button onClick={() => navigate("/login-dark")}>Login to Account</Button>
    </Container>
  );
};

export default RegistrationCompleted;
