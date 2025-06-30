import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { HTTP } from "../utils";
import Container from "../components/Container";
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const siteKey = import.meta.env.VITE_SITE_KEY;

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState(""); // State to store captcha response
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      navigate("/welcome-dashboard");
    }
  }, []);

  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    username: "",
    phoneNumber: "",
    state: "",
    lga: "",
    terms: false,
  });
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCaptchaVerification = (token) => {
    setCaptchaToken(token);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      toast.error("You must agree to the Terms and Conditions.");
      return;
    }

    if (!captchaToken) {
      toast.error("Please verify the CAPTCHA.");
      return;
    }

    setLoading(true); // Start spinner
    try {
      const payload = {
        first_name: formData.firstname,
        last_name: formData.surname,
        username: formData.username,
        tell: formData.phoneNumber,
        state: formData.state,
        lga: formData.lga,
        platform: "mobile",
        recaptcha_token: captchaToken,
      };

      const response = await HTTP.post("/register", payload);

      if (response) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/confirm-otp", { state: { phone: formData.phoneNumber } });
        }, 1500);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.messgae ||
        "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await HTTP.get("/get-states");
        setStates(response.data.data);
      } catch (error) {
        // toast.error("Failed to load states. Please try again.");
      }
    };
    fetchStates();
  }, []);

  const fetchLgas = async (state) => {
    try {
      const response = await HTTP.get(`/get-local-government/${state}`);
      setLgas(response.data.data);
    } catch (error) {
      // toast.error("Failed to load LGAs. Please try again.");
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData({ ...formData, state });
    setSelectedState(state);
    setLgas([]);
    if (state) {
      fetchLgas(state);
    }
  };

  const handleLgaChange = (e) => {
    const lga = e.target.value;
    setFormData({ ...formData, lga });
  };

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <Logo />
      <h5 className="text-left mb-2">Register with Phone Number</h5>
      <p className="text-left mb-4">
        Welcome to Onboarder, please input your details to register.
      </p>
      <form onSubmit={handleSubmit}>
        <FormInput
          // label="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Enter First Name"
          required
        />
        <FormInput
          // label="Surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Enter Surname"
          required
        />
        <FormInput
          // label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter Username"
          required
        />
        <FormInput
          // label="Phone Number"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter Phone Number"
          required
        />
        <FormInput
          // label="State"
          type="select"
          name="state"
          value={formData.state}
          onChange={handleStateChange}
          placeholder="Select State"
          required
          options={states.map((s) => ({ value: s, label: s }))}
        />
        <FormInput
          // label="LGA"
          type="select"
          name="lga"
          value={formData.lga}
          onChange={handleLgaChange}
          placeholder="Select LGA"
          required
          options={lgas.map((l) => ({ value: l, label: l }))}
        />
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="terms"
            className="form-check-label"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowModal(true);
              setFormData((prev) => ({ ...prev, terms: true }));
            }}
          >
            I agree to the{" "}
            <span className="text-primary">Terms and Conditions</span>
          </label>
        </div>
        {/* ReCAPTCHA Component */}
        <div className="my-4">
          <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerification} />
        </div>{" "}
        
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              />
              Processing...
            </>
          ) : (
            "Proceed"
          )}
        </Button>
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login-dark")}
            >
              Login
            </span>
          </p>
        </div>
      </form>
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Terms and Conditions</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                <p>
                  <strong>Onboarder</strong> is an online super affiliate
                  monitoring platform that allows affiliate marketers and brands
                  to directly monitor progress and results, and also helps
                  stimulate brand spread and easy earnings.
                </p>

                <p>
                  An onboarder registers on the Onboarder platform and is
                  assigned a user ID. This user ID is then embedded into partner
                  platforms during registrations to enable the referrer to track
                  their progress and directly get paid into their bank accounts
                  for efforts made in registering a new user onto the brand.
                </p>

                <h6>How to earn with Onboarder</h6>
                <ol>
                  <li>User registers on Onboarder platform.</li>
                  <li>
                    A user ID is assigned to the user on the Onboarder platform.
                  </li>
                  <li>
                    User introduces a new user to the partner’s platform
                    (MyLottoHub) and encourages them to use their ID during
                    registration.
                  </li>
                  <li>
                    The referrer earns an amount for every account successfully
                    opened on the brand’s platform (MyLottoHub).
                  </li>
                  <li>
                    The referred customer will receive a welcome credit
                    deposited/funded into their account via the promoted brand
                    (MyLottoHub).
                  </li>
                </ol>

                <h6>Tasks to Get Paid</h6>
                <ol>
                  <li>
                    The onboarder will have daily targets (number of customers
                    to onboard) that must be met before payment is issued.
                  </li>
                  <li>
                    The number of targets is set by the partner brand
                    (MyLottoHub).
                  </li>
                  <li>
                    The amount paid per acquisition is determined by the partner
                    brand.
                  </li>
                  <li>
                    Payout is made automatically once all agreed and set
                    criteria are met — including number of genuine registrations
                    and genuine customers onboarded.
                  </li>
                </ol>

                <h6>Please Note the Following</h6>
                <ul>
                  <li>
                    Any account found or suspected to be fraudulent will be
                    blocked and payments will be restricted.
                  </li>
                  <li>
                    All phone numbers onboarded on the platform must be genuine.
                    These numbers will be verified by the partner (MyLottoHub).
                    Any phony act will be detected, and the account will be
                    blocked.
                  </li>
                  <li>
                    Onboarders must only share their referral codes with people
                    they have directly marketed and explained the platform
                    (MyLottoHub) to — not random individuals.
                  </li>
                  <li>
                    Onboarders with multiple accounts will be blocked and have
                    payments restricted.
                  </li>
                  <li>
                    All payments will be made immediately after task completion.
                  </li>
                  <li>
                    Onboarder accounts that have less than 40% of their referred
                    customers funded after 3 days will be disabled from making
                    payouts on subsequent customer acquisitions.
                  </li>
                </ul>
              </div>

              <div className="modal-footer">
                <button className="btn btn-dark" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default RegistrationForm;
