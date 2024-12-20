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
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ProductScanPage from "./pages/ProductScanPage/ProductScanPage";

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
  const { setCurrentClient, getCurrentClient } = useData();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("currentUser");
    console.log("useEffect Try to get login data from localStorage");

    const updateClientData = async (clientID) => {
      console.log("updateClientData:-=-=-");
      try {
        await getCurrentClient(clientID);
      } catch (error) {
        console.log("error in updateClientData ", error);
      }
    };

    if (token && userData) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("updating");
      console.log("JSON.parse(userData):", JSON.parse(userData));
      console.log(".client:", JSON.parse(userData).clientId);
      setCurrentUser(JSON.parse(userData));
      if (JSON.parse(userData).clientId) {
        updateClientData(JSON.parse(userData).clientId);
      }
      console.log("Setting isLoggedIn to true");
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, []);
  if (loading) {
    return <LoadingScreen />;
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
        <Route
          path="/meals/:type"
          element={
            isLoggedIn ? <MealTypeCheck /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/scanner"
          element={
            isLoggedIn ? (
              <ProductScanPage />
            ) : (
              <Navigate replace to={"/login"} />
            )
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
