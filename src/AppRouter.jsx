import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginInitial from "./screens/LoginInitial";
import RegistrationForm from "./screens/RegistrationForm";
import ConfirmOTP from "./screens/ConfirmOTP";
import SetPassword from "./screens/SetPassword";
import RegistrationCompleted from "./screens/RegistrationCompleted";
import LoginDark from "./screens/LoginDark";
import WelcomeDashboard from "./screens/WelcomeDashboard";
import GetPaid from "./screens/GetPaid";
import CashoutReferrals from "./screens/CashoutReferrals";
import CashoutConfirmation from "./screens/CashoutConfirmation";
import GetPaidConfirmation from "./screens/GetPaidConfirmation";
import CustomerComplaints from "./screens/CustomerComplaints";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./screens/ForgotPassword";

const App = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "2349045271959";
    const message = "Hello, I need assistance with Onboarder!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginInitial />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/confirm-otp" element={<ConfirmOTP />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/registration-completed"
          element={<RegistrationCompleted />}
        />
        <Route path="/login-dark" element={<LoginDark />} />
        <Route
          path="/welcome-dashboard"
          element={
            <PrivateRoute>
              <WelcomeDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/get-paid-bank"
          element={
            <PrivateRoute>
              <GetPaid />
            </PrivateRoute>
          }
        />
        <Route
          path="/cashout-referrals"
          element={
            <PrivateRoute>
              <CashoutReferrals />
            </PrivateRoute>
          }
        />
        <Route
          path="/cashout-confirmation"
          element={
            <PrivateRoute>
              <CashoutConfirmation />
            </PrivateRoute>
          }
        />
        <Route
          path="/get-paid-confirmation"
          element={
            <PrivateRoute>
              <GetPaidConfirmation />
            </PrivateRoute>
          }
        />
        <Route
          path="/customer-complaints"
          element={
            <PrivateRoute>
              <CustomerComplaints />
            </PrivateRoute>
          }
        />
      </Routes>
      <button
        className="btn btn-success rounded-circle position-fixed"
        style={{
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          zIndex: 1000,
        }}
        onClick={handleWhatsAppClick}
      >
        <i
          className="fab fa-whatsapp"
          style={{ fontSize: "28px", color: "white" }}
        ></i>
      </button>
    </BrowserRouter>
  );
};

export default App;
