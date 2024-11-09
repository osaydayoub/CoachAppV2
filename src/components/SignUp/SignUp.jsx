import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Alert,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../Login/Login.css";
import axios from "axios";

function SignUp({ handle }) {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const userNameRef = useRef(null);
  const ageRef = useRef(null);
  const weightRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    // if (!email || !password || !passwordConfirm) {
    //   setError("Please fill out all fields.");
    //   if (!email) {
    //     emailRef.current.focus();
    //   } else if (!password) {
    //     passwordRef.current.focus();
    //   } else if (!passwordConfirm) {
    //     passwordConfirmRef.current.focus();
    //   }
    //   return;
    // }

    try {
      setError("");
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_LINK}/users`, {
        name: userName,
        age,
        weight,
        phoneNumber,
        email,
        password,
      });

      // console.log("SignUp before navigate!");
      // console.log(res.data);
      // setCurrentUser(res.data);
      // setIsLoggedIn(true);
      // navigate("/");

      //move to login after singnUp instead?
      handle();
    } catch (error) {
      console.log("error");
      console.log(error);
      setError("Failed to create an account");
    }
    setLoading(false);
    console.log("SignUp completed!");
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  const handleNextPage = () => {
    if (!userName || !age || !weight || !phoneNumber) {
      setError("Please fill out all fields on this page.");
      // Focus on the first empty field
      if (!userName) {
        userNameRef.current.focus();
      } else if (!age) {
        ageRef.current.focus();
      } else if (!weight) {
        weightRef.current.focus();
      } else if (!phoneNumber) {
        phoneNumberRef.current.focus();
      }
      return;
    }
    setPageNumber(2);
    setError("");
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(17, 45, 78)", // Set the primary color
      },
    },
  });
  return (
    <div className="login-container">
      <h2>Sign Up</h2>
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
      <ThemeProvider theme={theme}>
        <form onSubmit={(e) => handleSubmit(e)}>
          {pageNumber === 1 && (
            <Box
              sx={{
                mt: 2,
                height: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TextField
                label="Name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                fullWidth
                variant="outlined"
                inputRef={userNameRef}
              />

              <TextField
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                fullWidth
                variant="outlined"
                inputRef={ageRef}
              />
              <TextField
                label="Weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                fullWidth
                variant="outlined"
                inputRef={weightRef}
              />
              <TextField
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                fullWidth
                variant="outlined"
                inputRef={phoneNumberRef}
              />
            </Box>
          )}
          {pageNumber === 2 && (
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
                inputRef={emailRef}
              />

              <FormControl variant="outlined" fullWidth inputRef={passwordRef}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  required
                  endAdornment={
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
                  }
                />
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                inputRef={passwordConfirmRef}
              >
                <InputLabel htmlFor="password-confirm">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="password-confirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  label="Confirm Password"
                  required
                  endAdornment={
                    <InputAdornment
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button className="login-btn" disabled={loading} type="submit">
                Sign Up
              </Button>
            </Box>
          )}
        </form>
      </ThemeProvider>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          edge="end"
          aria-label="back"
          onClick={() => setPageNumber(1)}
          disabled={pageNumber === 1}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton
          edge="end"
          aria-label="forward"
          onClick={handleNextPage}
          disabled={pageNumber === 2}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <div>
        Already have an account?<Link onClick={handle}>Log In</Link>{" "}
      </div>
    </div>
  );
}

export default SignUp;
