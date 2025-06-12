import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../components/Container";
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";

const CustomerComplaints = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    issue: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulated API call
      await axios.post("/api/complaint", formData);
      navigate("/welcome-dashboard");
    } catch (error) {
      console.error("Complaint submission failed:", error);
    }
  };

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
      <h4 className="text-center mb-4">Lodge Customer Complaints</h4>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Select Issue"
          type="select"
          name="issue"
          value={formData.issue}
          onChange={handleChange}
          placeholder="Select Issue"
          options={[
            { value: "cannot-fund-account", label: "Cannot fund account" },
            { value: "cannot-register", label: "Cannot Register" },
            { value: "cannot-login", label: "Cannot Login" },
            { value: "delayed-otp", label: "Delayed OTP" },
            { value: "site-not-loading", label: "Site not loading" },
            { value: "fund-not-reflecting", label: "Fund not reflecting" },
          ]}
          required
        />
        <FormInput
          label="Enter User ID"
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          placeholder="Enter User ID"
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
};

export default CustomerComplaints;
