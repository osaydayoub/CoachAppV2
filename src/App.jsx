import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import AdminPage from "./pages/AdminPage/AdminPage";
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import TrackingPage from "./pages/TrackingPage/TrackingPage";
import MealsPage from "./pages/MealsPage/MealsPage";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/Footer/Footer";
import MealOptionsPage from "./pages/MealOptionsPage/MealOptionsPage";
import ResponsiveAppBar from "./components/AppBar/AppBar";
import { useData } from "./context/DataContext";
import { useEffect, useState } from "react";
import NotFound from "./pages/NotFound/NotFound";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import logo from '/src/assets/images/big-logo.png';

function MealTypeCheck() {
  const { type } = useParams();
  const validMealTypes = ["breakfast", "lunch", "snack", "dinner"];

  if (!validMealTypes.includes(type)) {
    return <Navigate replace to="/404" />; // Redirect to NotFound page if type is invalid
  }

  return <MealOptionsPage />;
}

function App() {
  const [loading, setLoading] = useState(true);
  const { setCurrentUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const { setCurrentClient } = useData();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("currentUser");
    console.log("useEffect Try to get login data from localStorage");

    if (token && userData) {
      console.log("updating");
      // setIsLoggedIn(true);
      console.log(JSON.parse(userData));
      console.log(JSON.parse(userData).client);
      setCurrentUser(JSON.parse(userData));
      setCurrentClient(JSON.parse(userData).client);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Setting isLoggedIn to true");
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <img
          src={logo}
          alt="Loading logo"
          width="200"
          height="200"
          style={{ marginBottom: "20px" }}
        />
        <CircularProgress sx={{ color: '#EB5406' }} />
      </Box>
    );
  }
  return (
    <>
      <ResponsiveAppBar />

      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoggedIn ? <Homepage /> : <Navigate replace to={"/login"} />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            isLoggedIn ? <AdminPage /> : <Navigate replace to={"/login"} />
          }
        />
        <Route
          path="/timetable"
          element={
            isLoggedIn ? <TimetablePage /> : <Navigate replace to={"/login"} />
          }
        />
        <Route
          path="/tracking"
          element={
            isLoggedIn ? <TrackingPage /> : <Navigate replace to={"/login"} />
          }
        />
        <Route
          path="/meals"
          element={
            isLoggedIn ? <MealsPage /> : <Navigate replace to={"/login"} />
          }
        />
        {/* <Route
          path="/meals/:type"
          element={
            isLoggedIn ? (
              <MealOptionsPage />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        /> */}
        <Route
          path="/meals/:type"
          element={
            isLoggedIn ? <MealTypeCheck /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />{" "}
        {/* Catch all unmatched routes */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
