import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

import axios from "axios";
// import loginImg from "../../assets/msaCoach.jpeg";
import loginImg from "../../assets/images/logo2.png";
import { useData } from "../../context/DataContext";
//TODO handel is afunc for moving to signup page oe login... so do it
const coachEmail="msa@CoachApp.com"
const coachNumber="+972 54-996-1614"

function Login({ handle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const { setCurrentClient } = useData();
  const navigate = useNavigate();
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
      localStorage.setItem("currentUser", JSON.stringify(res.data)); // Store the user data as a string
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      setCurrentUser(res.data);
      setCurrentClient(res.data.client);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log("error.response:", error.response.status);
      if (error.response.status === 403) {
        console.log("Forbidden");
        setError(
          `Your account is not active. Please contact ${coachEmail} or reach out via WhatsApp at ${coachNumber} to activate your account.`
        );
      } else {
        console.log(error);
        setError("Faild to login");
      }
    }
    setLoading(false);
  }

  return (
    <div className="login-container">
      {/* <img className="img-login" src={loginImg} alt="logo-img" /> */}
      <h2>Welcome</h2>
      {/* <h3>M.S.A</h3> */}
      {error && <div className="error-container">{error}</div>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button disabled={loading} type="submit">
            Login
          </button>
        </div>
      </form>

      <div>
        Need an account?<Link onClick={handle}>Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
