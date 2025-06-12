import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="offcanvas offcanvas-start text-drk"
      tabIndex="-1"
      id="sidebar"
      aria-labelledby="sidebarLabel"
    >
      <div className="offcanvas-header text-dark">
        <h5 className="offcanvas-title text-dark" id="sidebarLabel">
          Menu
        </h5>
        <button
          type="button"
          className="btn-close text-dark"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="list-unstyled">
          <li className="mb-2">
            <a
              href="#"
              onClick={() => {
                navigate("/welcome-dashboard");
                document.getElementById("sidebar").classList.remove("show");
              }}
              className="text-decoration-none text-dark"
            >
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => {
                navigate("/get-paid-bank");
                document.getElementById("sidebar").classList.remove("show");
              }}
              className="text-decoration-none text-dark"
            >
              Get Paid
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => {
                navigate("/cashout-referrals");
                document.getElementById("sidebar").classList.remove("show");
              }}
              className="text-decoration-none text-dark"
            >
              Cashout Referrals
            </a>
          </li>

          <li className="mb-2">
            <a
              href="#"
              onClick={() => {
                navigate("/customer-complaints");
                document.getElementById("sidebar").classList.remove("show");
              }}
              className="text-decoration-none text-dark"
            >
              Customer Complaints
            </a>
          </li>

          <li className="mb-2">
            <a
              href="#"
              onClick={() => {
                navigate("/login-dark");
                document.getElementById("sidebar").classList.remove("show");
              }}
              className="text-decoration-none text-dark"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
