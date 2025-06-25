import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login-dark");
    toast.success("Logout Successfully");
  };

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="sidebar"
      aria-labelledby="sidebarLabel"
      style={{ width: "250px", backgroundColor: "#f8f9fa" }}
    >
      <div className="offcanvas-header border-bottom">
        <h5 id="sidebarLabel" className="offcanvas-title">
          <i className="fa fa-user me-2"></i> Menu
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body p-0">
        <ul className="list-group list-group-flush">
          <li className="list-group-item py-3 px-4">
            <button
              onClick={() => {
                document
                  .querySelector('[data-bs-dismiss="offcanvas"]')
                  ?.click();
                navigate("/welcome-dashboard");
              }}
              className="btn btn-link text-decoration-none text-dark p-0 w-100 text-start"
            >
              <i className="fa fa-home me-2" />
              Dashboard
            </button>
          </li>

          <li className="list-group-item py-3 px-4">
            <button
              onClick={() => {
                document
                  .querySelector('[data-bs-dismiss="offcanvas"]')
                  ?.click();
                navigate("/cashout-referrals");
              }}
              className="btn btn-link text-decoration-none text-dark p-0 w-100 text-start"
            >
              <i className="fa fa-wallet me-2" />
              Cashout Referrals
            </button>
          </li>

          {/* <li className="list-group-item py-3 px-4">
            <button
              onClick={() => {
                document
                  .querySelector('[data-bs-dismiss="offcanvas"]')
                  ?.click();
                navigate("/customer-complaints");
              }}
              className="btn btn-link text-decoration-none text-dark p-0 w-100 text-start"
            >
              <i className="fa fa-comments me-2" />
              Customer Complaints
            </button>
          </li> */}

          <li className="list-group-item py-3 px-4">
            <button
              className="btn btn-link text-decoration-none text-dark p-0"
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out-alt me-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
