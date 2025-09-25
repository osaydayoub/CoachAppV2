import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert, alpha, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { LockOpenOutlined, LockOutlined, MailOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
// import loginImg from "../../assets/msaCoach.jpeg";
import loginImg from "../../assets/images/logo2.png";
import { useData } from "../../context/DataContext";
//TODO handel is afunc for moving to signup page oe login... so do it
const coachEmail = "ayoubm850@gmail.com";
const coachNumber = "+972 54-996-1614";
const loginErrorMessage = "Login failed. Please check your email and password.";
const inactiveAccountMessage1 = `Account inactive.\nContact ${coachEmail} \nor WhatsApp ${coachNumber} \nto activate.`;
const inactiveAccountMessage2 = `Your account is not active.Please contact\n ${coachEmail}\n or reach out via WhatsApp at\n ${coachNumber} \nto activate your account.`;
function Login({ handle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const { getCurrentClient } = useData();
  const navigate = useNavigate();

  const updateClientData = async (clientID) => {
    console.log("updateClientData:-=-=-");
    try {
      await getCurrentClient(clientID);
    } catch (error) {
      console.log("error in updateClientData ", error);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_LINK}/users/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      const { client, ...rest } = res.data;
      const userToStore = {
        ...rest,
        clientId: res.data.client ? res.data.client._id : null,
      };
      console.log("new:", userToStore);

      localStorage.setItem("currentUser", JSON.stringify(userToStore)); // Store the user data as a string
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.token}`;
      setCurrentUser(userToStore);

      if (res.data.client) {
        updateClientData(res.data.client._id);
      }
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log("error.response:", error.response?.status);
      console.log("error:", error);
      if (error.response.status === 403) {
        console.log("Forbidden");
        setError(inactiveAccountMessage1);
      } else {
        console.log(error);
        setError(loginErrorMessage);
      }
    }
    setLoading(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2.5, p: 4 ,minHeight:600}}>
      <Typography variant="h4" fontWeight={700}>Welcome</Typography>
      {error && (
        <Alert
          severity="error"
          variant="filled"
          sx={{ mb: 1 }}
        >
          <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
            {error}
          </Typography>
        </Alert>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>

        <Box
          sx={{
            mt: 2,
          }}
        >
          <Stack spacing={3}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}

            />
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                width: "100%",
                minWidth: 140,
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                py: 1.25,
                fontWeight: 700,
                borderRadius: 1,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.grey[900], 0.35)}`
              }}
            >
              Login
              {loading && <CircularProgress size={20} color="inherit" />}
            </Button>
          </Stack>

        </Box>

      </form>

      <Stack direction="row" spacing={1} sx={{ mt: 1, alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Need an account?
        </Typography>
        <Button
          variant="text"
          onClick={handle}
          sx={{ p: 0, minWidth: 0, fontWeight: 700 }}
        >
          Sign Up
        </Button>
      </Stack>


    </Box>
  );
}

export default Login;
