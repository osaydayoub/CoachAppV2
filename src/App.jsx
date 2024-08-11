import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import AdminPage from "./pages/AdminPage/AdminPage";
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import TrackingPage from "./pages/TrackingPage/TrackingPage";
import MealsPage from "./pages/MealsPage/MealsPage";

import { useAuth } from "./context/AuthContext";
import Footer from "./components/Footer/Footer";
import MealOptionsPage from "./pages/MealOptionsPage/MealOptionsPage";
import ResponsiveAppBar from "./components/AppBar/AppBar";

function App() {
  const { currentUser, isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn && <ResponsiveAppBar />}

      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoggedIn ? <Homepage /> : <Navigate replace to={"/login"} />
          }
        />
        {/* <Route path='/' exact element={<Homepage />} /> */}
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
            isLoggedIn ? (
              <MealOptionsPage />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
