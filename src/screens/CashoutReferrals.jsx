import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../components/Container";
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";

const CashoutReferrals = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bank: "",
    accountNumber: "",
    accountName: "",
    amount: "",
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
      // await axios.post("/api/cashout", formData);
      navigate("/cashout-confirmation");
    } catch (error) {
      console.error("Cashout failed:", error);
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
      <h4 className="text-left mb-2">Cashout Referrals</h4>
      <p className="text-left mb-2">Balance N15,000</p>
      <p className="text-left mb-4">
        To initiate a withdrawal, choose your bank and input your account number
        to automatically fill and save your account details
      </p>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Select Bank"
          type="select"
          name="bank"
          value={formData.bank}
          onChange={handleChange}
          placeholder="Select Bank"
          options={[{ value: "gtbank", label: "GTBank" }]}
          required
        />
        <FormInput
          label="Enter Account Number"
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          placeholder="Enter Account Number"
          required
        />
        <FormInput
          label="Account Name"
          type="text"
          name="accountName"
          value={formData.accountName}
          onChange={handleChange}
          placeholder="Account Name"
          required
        />
        <FormInput
          label="Enter Amount"
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
};

export default CashoutReferrals;
