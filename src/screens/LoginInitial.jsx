import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { useEffect } from "react";

const LoginInitial = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      navigate("/welcome-dashboard");
    }
  }, []);

  return (
    <div className="page-wrapper mt-5">
      <Container>
        <Logo />
        <p
          className="mb-3 text-center"
          style={{ fontStyle: "italic", fontSize: "17px" }}
        >
          Earn easy cash referring friends! <br />
          Join our affiliate platform, share your ID, and grow your income.
        </p>
        <Button onClick={() => navigate("/registration")}>Register</Button>
        <Button onClick={() => navigate("/login-dark")}>Sign In</Button>
      </Container>
    </div>
  );
};

export default LoginInitial;
