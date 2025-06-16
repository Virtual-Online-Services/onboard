import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import ReCAPTCHA from "react-google-recaptcha";
import { HTTP } from "../utils";
import Container from "../components/Container";
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

// const siteKey = import.meta.env.VITE_SITE_KEY;

const RegistrationForm = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // const handleCaptchaVerification = (token) => {
  //   setCaptchaToken(token);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      toast.error("You must agree to the Terms and Conditions.");
      return;
    }

    // if (!captchaToken) {
    //   toast.error("Please verify the CAPTCHA.");
    //   return;
    // }

    try {
      const payload = {
        firstname: formData.firstname,
        surname: formData.surname,
        username: formData.username,
        phone_number: formData.phoneNumber,
        state: formData.state,
        lga: formData.lga,
        platform: "mobile",
        // recaptcha_token: captchaToken,
      };

      const response = await HTTP.post("/register", payload);

      if (response) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/confirm-otp");
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
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await HTTP.get("/get-states");
        setStates(response.data.data);
      } catch (error) {
        toast.error("Failed to load states. Please try again.");
      }
    };

    fetchStates();
  }, []);

  const fetchLgas = async (state) => {
    try {
      const response = await HTTP.get(`/get-local-government/${state}`);
      setLgas(response.data.data);
    } catch (error) {
      toast.error("Failed to load LGAs. Please try again.");
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

        <FormInput
          label="I have read the Terms and Conditions"
          type="checkbox"
          name="terms"
          value={formData.terms}
          onChange={handleChange}
          required
        />

        {/* ReCAPTCHA Component */}
        {/* <div className="my-4">
          <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerification} />
        </div> */}

        <Button type="submit">Finish</Button>
      </form>
    </Container>
  );
};

export default RegistrationForm;
