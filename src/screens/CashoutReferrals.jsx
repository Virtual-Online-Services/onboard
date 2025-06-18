import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import { HTTP } from "../utils";

const CashoutReferrals = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bankList, setBankList] = useState([]);
  const [formData, setFormData] = useState({
    bank: "",
    accountNumber: "",
    accountName: "",
    amount: "",
  });
  const [resolving, setResolving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) return navigate("/login-dark");

    const parsed = JSON.parse(storedUser);
    setUser(parsed);

    // Load prefilled form data if already saved
    if (parsed.accname && parsed.accno && parsed.bname) {
      setFormData({
        bank: parsed.bname,
        accountNumber: parsed.accno,
        accountName: parsed.accname,
        amount: "",
      });
    }

    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await HTTP.get("/bank-accounts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBankList(res.data.data || []);
    } catch {
      toast.error("Failed to fetch banks");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Auto resolve account name
  useEffect(() => {
    const { bank, accountNumber } = formData;
    if (
      !user?.accname && // Only resolve if user hasn't saved details
      bank &&
      accountNumber.length === 10
    ) {
      const token = sessionStorage.getItem("authToken");
      setResolving(true);

      const timeout = setTimeout(async () => {
        try {
          const res = await HTTP.post(
            "/user/resolve-bank-account",
            {
              bank_name: bank,
              account_no: accountNumber,
              email: user?.email,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const resolved = res?.data?.data?.data?.account_name;
          if (resolved) {
            setFormData((prev) => ({
              ...prev,
              accountName: resolved,
            }));

            // Update sessionStorage with locked-in user details
            const updatedUser = {
              ...user,
              accname: resolved,
              accno: accountNumber,
              bname: bank,
            };
            sessionStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);

            toast.success("Account resolved and saved");
          }
        } catch {
          toast.error("Failed to resolve account name");
          setFormData((prev) => ({ ...prev, accountName: "" }));
        } finally {
          setResolving(false);
        }
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [formData.bank, formData.accountNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { bank, accountNumber, accountName, amount } = formData;

    if (!bank || !accountNumber || !accountName || !amount) {
      toast.error("Please fill all fields");
      return;
    }

    if (parseFloat(amount) < 1000) {
      toast.error("Minimum withdrawal is ₦1000");
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");

      const res = await HTTP.post(
        "/payments/referral-withdraw-request",
        {
          amount: parseFloat(amount),
          id: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        res?.data?.message ===
        "Your Balance in your Referral Wallet is insufficienct"
      ) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate("/cashout-confirmation");
      }
    } catch {
      toast.error("Failed to process withdrawal");
    } finally {
      setLoading(false);
    }
  };

  const referralBalance = parseFloat(user?.ref_give || 0).toLocaleString();

  return (
    <Container>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        <i className="fa fa-arrow-left" /> Back
      </Button>
      <div className="d-flex justify-content-between align-items-center mb-4">
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

      <h4 className="mb-2">Cashout Referrals</h4>
      <p className="mb-3">Referral Bonus Balance: ₦{referralBalance}</p>

      <form onSubmit={handleSubmit}>
        {user?.accno ? (
          <>
            <select
              className="form-control mb-2"
              name="bank"
              value={user?.bname}
              onChange={handleChange}
              disabled
            >
              <option value="">Select Bank</option>
              {bankList.map((bank) => (
                <option key={bank.id} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="form-control mb-2"
              name="accountNumber"
              value={user?.accno}
              onChange={handleChange}
              placeholder="Enter Account Number"
              maxLength={10}
              disabled
            />

            <input
              type="text"
              className="form-control mb-2"
              value={user?.accname}
              placeholder="Account Name"
              disabled
            />

            <input
              type="number"
              name="amount"
              value={referralBalance}
              onChange={handleChange}
              className="form-control mb-3"
              disabled
            />
          </>
        ) : (
          <>
            <select
              className="form-control mb-2"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              required
            >
              <option value="">Select Bank</option>
              {bankList.map((bank) => (
                <option key={bank.id} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="form-control mb-2"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter Account Number"
              maxLength={10}
              required
            />

            <input
              type="text"
              className="form-control mb-2"
              value={formData.accountName}
              placeholder="Account Name"
              disabled
            />

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Enter Amount"
              required
            />

            {resolving && (
              <small className="text-muted">Resolving account name...</small>
            )}
          </>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Processing...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Container>
  );
};

export default CashoutReferrals;
