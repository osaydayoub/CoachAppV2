import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";
import { Alert, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(17, 45, 78)", // Set the primary color
      },
    },
  });

  return (
    <div className="login-container">
      <h2>Welcome</h2>
      {error && (
        <Alert
          severity="error"
          variant="filled"
          // style={{ marginBottom: "1rem" }}
        >
          <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
            {error}
          </Typography>
        </Alert>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              mt: 2,
              height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
            <Button
              className="login-btn"
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                minWidth: 120,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Login
              {loading && <CircularProgress size={20} color="inherit" />}
            </Button>
          </Box>
        </ThemeProvider>
      </form>

      <div>
        Need an account?<Link onClick={handle}>Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
