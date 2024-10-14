import React from "react";
import "./TrackingPage.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import DailyTracking from "../../components/DailyTracking/DailyTracking";
import WeightTracking from "../../components/WeightTracking/WeightTracking.jsx";

function TrackingPage() {
  const { currentUser } = useAuth();
  const { currentClient} = useData();


  return (
    <div className="TrackingPage page">
      {!currentUser.isAdmin && (
        <div className="add-track-container">
          <h1>Daily Tracking</h1>
          <p className="daily-message-container">
            Please take a moment to add or update your Daily Tracking to keep a
            record of your progress and maintain a comprehensive overview of
            your daily activities and goals.
          </p>
          <DailyTracking />
          <WeightTracking/>
        </div>
      )}
      {currentUser.isAdmin && <h2> Admin Daily Tracking</h2>}
    </div>
  );
}

export default TrackingPage;
