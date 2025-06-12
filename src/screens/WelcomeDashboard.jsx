import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Sidebar from "../components/Sidebar";

const WelcomeDashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value,
    });
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
          <span className="navbar-toggler-icon text-dark"></span>
        </button>
      </div>
      <Sidebar />
      <h2 className="text-left mb-4">Welcome XXXX</h2>
      <p className="text-left mb-4">
        ID: 2341 <br />
        Target: 20
        <br /> Onboardings Customers Onboarded: 10 <br />
        Total Number of Referrals: 20 <br />
        Customers Amount earned from funding: N20000
      </p>
      <div className="d-flex gap-2 mb-4">
        <Button onClick={() => navigate("/get-paid-bank")} variant="secondary">
          Get Paid
        </Button>
        <Button onClick={() => navigate("/cashout-referrals")}>
          Cashout Referrals
        </Button>
      </div>
      <div className="mb-4">
        <h5>Select Date:</h5>
        <div className="d-flex gap-2">
          <FormInput
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleChange}
            placeholder="From"
          />
          <FormInput
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleChange}
            placeholder="To"
          />
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Sign Up</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Olawunmi 50</td>
            <td>12th May 2025</td>
            <td>Funded</td>
          </tr>
          <tr>
            <td>0703333339</td>
            <td>10:24AM</td>
            <td>Funded</td>
          </tr>
          <tr>
            <td>Olawunmi 50</td>
            <td>12th May 2025</td>
            <td>Funded</td>
          </tr>
          <tr>
            <td>0703333339</td>
            <td>10:24AM</td>
            <td>Funded</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </Container>
  );
};

export default WelcomeDashboard;
