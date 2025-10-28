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
  Stack,
  CircularProgress,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import "../Login/Login.css";
import axios from "axios";
import { CalendarMonth, FitnessCenter, MailOutline, PersonOutline, PhoneIphone } from "@mui/icons-material";

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2.5, p: 4, minHeight: 600 }}>
      <Typography variant="h4" fontWeight={700}>Sign Up</Typography>
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
        {pageNumber === 1 && (
          <Box
            sx={{
              mt: 2,
            }}
          >
            <Stack spacing={3}>
              <TextField
                label="Name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                fullWidth
                variant="outlined"
                inputRef={userNameRef}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonth />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FitnessCenter />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIphone />
                    </InputAdornment>
                  ),
                }}
              />

            </Stack>

          </Box>
        )}
        {pageNumber === 2 && (
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
                inputRef={emailRef}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline />
                    </InputAdornment>
                  ),
                }}
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
                  boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.grey[900], 0.35)}`,
                  "&:hover": {
                    background: (theme) =>
                      `linear-gradient(135deg,${theme.palette.secondary.main}  0%, ${theme.palette.primary.main} 100%)`,
                  }
                }}
              >
                Sign Up
                {loading && <CircularProgress size={20} color="inherit" />}
              </Button>
            </Stack>

          </Box>
        )}

      </form>

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



      <Stack direction="row" spacing={1} sx={{ mt: 1, alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?
        </Typography>
        <Button
          variant="text"
          onClick={handle}
          sx={{ p: 0, minWidth: 0, fontWeight: 700 }}
        >
          Log In
        </Button>
      </Stack>
    </Box>
  );
}

export default SignUp;
