import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import axios from "axios";

function SignUp({ handle }) {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { setCurrentUser, setIsLoggedIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_LINK}/users`, {
        name: userName,
        age,
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
      setError("Faild to creat an account");
    }
    setLoading(false);
    console.log("SignUp completed!");
  }

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      {error && <div>{error}</div>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <br />
          <input
            type="number"
            id="age"
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password-Conform">Password Conformation</label>
          <br />
          <input
            type="password"
            id="password-Conform"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>

        <div>
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div>
        Already have an account?<Link onClick={handle}>Log In</Link>{" "}
      </div>
    </div>
  );
}

export default SignUp;

// {
//   "name": "tongi mongi",
//   "age" :19,
//   "email":"tongimongi@gmail.com",
//   "password":"123456"
// }
