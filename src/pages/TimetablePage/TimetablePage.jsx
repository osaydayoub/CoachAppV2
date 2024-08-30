import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TimetablePage.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import {
  getFullDate,
  dateIsWithinSevenDays,
  isSameDay,
} from "../../utils/helpers.js";
import Workout from "../../components/Workout/Workout.jsx";
import WorkoutsCarousel from "../../components/WorkoutsCarousel/WorkoutsCarousel.jsx";
function TimetablePage() {
  const [value, onchange] = useState(new Date());
  const { currentUser } = useAuth();
  const { workoutsData, setWorkoutsData, getWorkouts } = useData();
  //maybe no need for that
  const [workouts, setWorkouts] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState(null);
  const [workoutsToDisply, setWorkoutsToDisply] = useState(null);
  useEffect(() => {
    if (!currentUser.isAdmin) {
      const currentUserWorkouts = currentUser.client.workouts;
      currentUserWorkouts.sort((a,b)=>new Date(a.date) - new Date(b.date));
      const highlightArray = [];
      currentUserWorkouts.forEach((element) => {
        highlightArray.push(new Date(element.date));
      });
      const res = currentUserWorkouts.filter((workout) => {
        return dateIsWithinSevenDays(workout.date);
      });
      setWorkouts(currentUserWorkouts);
      setHighlightedDates(highlightArray);
      // setWorkoutWithinSevenDays(res);
      setWorkoutsToDisply(res);
    } else {
      if (workoutsData === null) {
        getWorkouts();
      }
    }
  }, []);

  useEffect(() => {
    if (workoutsData != null) {
      const workoutsForToday = workoutsData?.filter((workout) => {
        return isSameDay(new Date(workout.date), new Date(value));
      });
      setWorkoutsToDisply(workoutsForToday);
      // console.log(workoutsForToday);
    }
  }, [workoutsData, value]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const isHighlighted = highlightedDates?.some((highlightedDate) =>
        isSameDay(date, highlightedDate)
      );
      return isHighlighted ? <div className="highlighted-date"></div> : null;
    }
  };

  const getWorkout = (date) => {
    const res = workouts?.find((workout) => {
      return isSameDay(new Date(date), new Date(workout.date));
    });
    return res;
  };

  return (
    <div className="TimetablePage page">
      <div className="calendar-message-container">
        <Calendar value={value} onChange={onchange} tileContent={tileContent} />
        {!currentUser.isAdmin && workouts && (
          <div className="message-container">
            <h3>{getFullDate(value)}</h3>
            {getWorkout(new Date(value)) && (
              <Workout
                workout={getWorkout(new Date(value))}
                isAdmin={currentUser.isAdmin}
                index={1}
                isViewOnly={true}
              />
            )}
          </div>
        )}
      </div>

      <div className="workouts-container">
        {!currentUser.isAdmin && <h3>Workouts in the upcoming 7 days</h3>}
        {currentUser.isAdmin && (
          <h3>
            {isSameDay(new Date(value), new Date())
              ? `Today's Workouts`
              : `Workouts For ${getFullDate(value)}`}
          </h3>
        )}
        {workoutsToDisply && (
          <WorkoutsCarousel
            autoPlay={false}
            workoutsToDisply={workoutsToDisply}
            isViewOnly={false}
            isAdmin={currentUser.isAdmin}
          ></WorkoutsCarousel>
        )}
      </div>
    </div>
  );
}

export default TimetablePage;
