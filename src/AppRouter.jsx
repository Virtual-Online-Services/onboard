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
    </BrowserRouter>
  );
};

export default App;
