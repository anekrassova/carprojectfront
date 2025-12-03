import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authapi";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const mutation = useMutation(registerUser, {
    onSuccess: () => navigate("/login"),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    mutation.mutate(form);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={5} mb={2}>
        Register
      </Typography>

      <Stack spacing={2}>
        <TextField name="username" label="Username" onChange={handleChange} />
        <TextField name="email" label="Email" onChange={handleChange} />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Sign Up
        </Button>
        <Typography>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Stack>
    </Container>
  );
}

export default Register;
