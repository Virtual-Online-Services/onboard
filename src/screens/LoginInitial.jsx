import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Button from "../components/Button";

const LoginInitial = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo />
      <Button onClick={() => navigate("/registration")}>
        Register with Phone Number
      </Button>
      <Button onClick={() => navigate("/login-dark")}>Sign In</Button>
    </Container>
  );
};

export default LoginInitial;
