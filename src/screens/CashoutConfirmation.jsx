import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";

const CashoutConfirmation = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Logo />
        <button
          className="btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
          aria-controls="sidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <Sidebar />
      <h2 className="text-center mb-4">Cashout Referrals</h2>
      <div className="text-center mb-3">
        <Icon name="checkmark" className="mb-3" style={{ width: "100px" }} />
      </div>
      <p className="text-center mb-4">
        You have successfully transferred money to your bank account.
      </p>
      <Button onClick={() => navigate("/welcome-dashboard")}>
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default CashoutConfirmation;
