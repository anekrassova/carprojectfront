import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authapi";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    },
  });

  const handleSubmit = () => {
    mutation.mutate(form);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={5} mb={2}>
        Login
      </Typography>

      <Stack spacing={2}>
        <TextField name="email" label="Email" onChange={handleChange} />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>

        <Typography>
          Don't have an account? <Link to="/register">Sign up</Link>
        </Typography>
      </Stack>
    </Container>
  );
}

export default Login;
