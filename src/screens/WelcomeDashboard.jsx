import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import { HTTP } from "../utils";
import moment from "moment";
import { toast } from "react-toastify";

const WelcomeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [referralMeta, setReferralMeta] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchReferrals(parsedUser.id, 1);
    } else {
      navigate("/login-dark");
    }
  }, []);

  const fetchReferrals = async (userId, page) => {
    setIsLoading(true);

    const token = sessionStorage.getItem("authToken");

    try {
      const res = await HTTP.get(`/user/referral/${userId}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReferrals(res.data.data || []);
      setReferralMeta(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load referrals");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (label, url) => {
    if (!url) return;
    const match = url.match(/page=(\d+)/);
    const page = match ? parseInt(match[1]) : 1;
    fetchReferrals(user.id, page);
    setCurrentPage(page);
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
          url: `https://mylottohub.com/sign-up-with-your-phone-number?user=${user?.id}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        toast("Error sharing link");
      }
    } else {
      console.warn("Share API not supported, implement custom sharing logic");
      toast("Share API not supported");
    }
  };
  console.log(referrals);

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
            style={{
              fontSize: "24px",
              background: "none",
              color: "#000",
            }}
          >
            <i className="fa fa-bars" />
          </button>
        </div>
      </div>

      <Sidebar />

      <h5 className="text-left mb-4">
        Welcome {user?.name || user?.username || "User"}
      </h5>

      <p className="text-left mb-4">
        <span className="fw-bolder">ID:</span> {user?.id} <br />
        <span className="fw-bolder">Target:</span> Target: 0
        <br />
        <span className="fw-bolder">
          Onboardings Customers Onboarded:
        </span> 0 <br />
        <span className="fw-bolder"> Total Number of Referrals:</span>{" "}
        {referrals?.total} <br />
        <span className="fw-bolder">
          Customers Amount earned from funding:
        </span>{" "}
        ₦
      </p>
      <div className="d-flex gap-2 mb-4">
        {/* <Button onClick={() => navigate("/get-paid-bank")} variant="secondary">
          Get Paid
        </Button> */}
        <Button onClick={() => navigate("/cashout-referrals")}>
          Cashout Referrals
        </Button>
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
      ) : referrals?.data?.length === 0 ? (
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
              {referrals?.data?.map((ref, index) => (
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

          <nav>
            <ul className="pagination">
              {referralMeta?.links?.map((link, idx) => (
                <li
                  key={idx}
                  className={`page-item ${link.active ? "active" : ""}`}
                >
                  <a
                    href={link.url || "#"}
                    className="page-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageClick(link.label, link.url);
                    }}
                  >
                    {link.label === "&laquo; Previous"
                      ? "Previous"
                      : link.label === "Next &raquo;"
                      ? "Next"
                      : link.label}
                  </a>
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
