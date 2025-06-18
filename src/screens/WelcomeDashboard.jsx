import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import { HTTP } from "../utils";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const WelcomeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [referralMeta, setReferralMeta] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) return navigate("/login-dark");

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  }, []);

  const fetchReferrals = async (userId, page = 1, start = "", end = "") => {
    setIsLoading(true);
    const token = sessionStorage.getItem("authToken");

    const queryParams = new URLSearchParams({
      page,
      ...(start && { start_date: start }),
      ...(end && { end_date: end }),
    });

    try {
      const res = await HTTP.get(
        `/user/referral/${userId}?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = res.data.data;
      setReferrals(result.data || []);
      setReferralMeta(result);
    } catch (err) {
      // toast.error(err?.response?.data?.message || "Failed to load referrals");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchReferrals(user.id, currentPage);
    }
  }, [user, currentPage]);

  const handlePageClick = (label, url) => {
    if (!url || !user) return;
    const match = url.match(/page=(\d+)/);
    const page = match ? parseInt(match[1]) : 1;
    setCurrentPage(page);
    fetchReferrals(user.id, page, startDate, endDate);
  };

  const handleFilter = () => {
    if (!user) return;
    setCurrentPage(1);
    fetchReferrals(user.id, 1, startDate, endDate);
  };

  const notifyCopy = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Copied!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const referralLink = `https://mylottohub.com/sign-up-with-your-phone-number?user=${user?.id}`;

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out MyLottoHub",
          text: "Join MyLottoHub and explore the exciting world of lotteries!",
          url: referralLink,
        });
      } catch (error) {
        toast("Error sharing link");
      }
    } else {
      toast("Share API not supported");
    }
  };

  return (
    <Container>
      <div className="d-flex align-items-center mb-4 w-100">
        <Logo />
        <div className="ms-auto">
          <button
            className="btn p-2 border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="sidebar"
            style={{ fontSize: "24px", background: "none", color: "#000" }}
          >
            <i className="fa fa-bars" />
          </button>
        </div>
      </div>

      <Sidebar />

      <h5 className="text-left mb-4">
        Welcome {user?.name || user?.username || "User"}
      </h5>

      <p className="text-left mb-4 fw-bolder">
        <span>ID:</span> {user?.id} <br />
        <span>Target:</span> 0 <br />
        <span>Target onboarded:</span> 0 <br />
        <span>Total number of targets met:</span> 0 <br />
        <span>Total referred:</span> {referralMeta?.total || 0} <br />
        <span>Amount Earned:</span> ₦
      </p>

      <div className="d-flex gap-2 mb-4">
        <Button onClick={() => navigate("/cashout-referrals")}>
          Cashout Referrals
        </Button>
      </div>
      <div className="row mb-3">
        <div className="col-md-4 mb-3">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Start Date (dd/mm/yyyy)"
            maxDate={new Date()}
            isClearable
          />
        </div>
        <div className="col-md-4 mb-3">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="End Date (dd/mm/yyyy)"
            maxDate={new Date()}
            isClearable
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-dark w-100" onClick={handleFilter}>
            Apply Filter
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-7">
          <input
            type="text"
            className="form-control mb-3"
            value={referralLink}
            readOnly
          />
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-dark w-100"
            onClick={() => notifyCopy(referralLink)}
          >
            <i className="fa fa-copy me-2" /> Copy
          </button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary w-100" onClick={shareLink}>
            <i className="fa fa-share-alt me-1" />
          </button>
        </div>
      </div>

      <h5 className="mb-3">Referral History</h5>

      {isLoading ? (
        <div className="text-center my-4">
          <i className="fa fa-spinner fa-spin fa-2x text-primary" />
        </div>
      ) : referrals?.length === 0 ? (
        <div className="alert alert-warning text-center">
          No referral data found.
        </div>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Signup Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref, index) => (
                <tr key={index}>
                  <td className="text-capitalize">{ref.username}</td>
                  <td>
                    {moment(ref.created_at).format("Do MMM YYYY, h:mm A")}
                  </td>
                  <td className="text-capitalize">{ref.funded}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              {referralMeta?.links
                ?.filter(
                  (link) =>
                    link.label !== "&laquo; Previous" &&
                    link.label !== "Next &raquo;"
                )
                .map((link, idx) => (
                  <li
                    key={idx}
                    className={`page-item ${link.active ? "active" : ""} ${
                      !link.url ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (link.url) handlePageClick(link.label, link.url);
                      }}
                    />
                  </li>
                ))}
            </ul>
          </nav>
        </>
      )}
    </Container>
  );
};

export default WelcomeDashboard;
