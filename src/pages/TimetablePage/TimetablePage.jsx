import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import "./TimetablePage.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import {
  getFullDate,
  dateIsWithinSevenDays,
  isSameDay,
  isSameMonthAndYear,
} from "../../utils/helpers.js";
import Workout from "../../components/Workout/Workout.jsx";
import WorkoutsCarousel from "../../components/WorkoutsCarousel/WorkoutsCarousel.jsx";

import { Box } from "@mui/material";

const initialValue = dayjs(new Date());

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays?.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? <FitnessCenterIcon sx={{ mt: 0.5 }} /> : undefined
      }
      sx={{ p: 0.25 }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}
function TimetablePage() {
  const [value, onchange] = useState(new Date());
  const { currentUser } = useAuth();
  const { workoutsData, getWorkouts } = useData();
  //maybe no need for that
  const [workouts, setWorkouts] = useState(null);
  const [allHighlightedDates, setAllHighlightedDates] = useState(null);
  const [workoutsToDisply, setWorkoutsToDisply] = useState(null);
  const [highlightedDays, setHighlightedDays] = useState(null);
  // const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    if (!currentUser.isAdmin) {
      //   console.log("hi 1");
      const currentUserWorkouts = currentUser.client.workouts;
      currentUserWorkouts.sort((a, b) => new Date(a.date) - new Date(b.date));
      const highlightArray = [];
      currentUserWorkouts.forEach((element) => {
        highlightArray.push(new Date(element.date));
      });
      const filterdWorkouts = currentUserWorkouts.filter((workout) => {
        return dateIsWithinSevenDays(workout.date);
      });

      const filteredHighlightArray = highlightArray?.filter((day) => {
        return isSameMonthAndYear(new Date(initialValue), new Date(day));
      });

      const days = filteredHighlightArray?.map((date) => {
        return date.getDate();
      });
      //   console.log("days:", days);

      setWorkouts(currentUserWorkouts);
      setWorkoutsToDisply(filterdWorkouts);
      setAllHighlightedDates(highlightArray);
      setHighlightedDays(days);
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

  const getWorkout = (date) => {
    const res = workouts?.find((workout) => {
      return isSameDay(new Date(date), new Date(workout.date));
    });
    return res;
  };

  const handleMonthChange = (date) => {
    const res = allHighlightedDates?.filter((day) => {
      return isSameMonthAndYear(new Date(date), new Date(day));
    });
    const days = res?.map((date) => {
      return date.getDate();
    });
    setHighlightedDays(days);
  };

  return (
    <div className="TimetablePage page">
      <div className="calendar-message-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            sx={{
              p: 1,
              margin: 2,
              maxWidth: 400,
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
              "& .MuiDayCalendar-weekDayLabel": {
                marginLeft: "6px",
              },
            }}
            defaultValue={initialValue}
            // loading={isLoading}
            onMonthChange={handleMonthChange}
            onChange={(newDate) => {
              onchange(new Date(newDate));
              console.log(
                "Selected day changed to:",
                newDate.format("YYYY-MM-DD")
              );
              // Add any custom logic here when the day changes
            }}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
          />
        </LocalizationProvider>
        {!currentUser.isAdmin && workouts && (
          <div className="message-container">
            {/* <h3>{getFullDate(value)}</h3> */}
            <Box
              sx={{
                width: 225,
                height: 150,
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
              }}
            >
              {getWorkout(new Date(value)) && (
                <Workout
                  workout={getWorkout(new Date(value))}
                  isAdmin={currentUser.isAdmin}
                  index={1}
                  isViewOnly={true}
                />
              )}
            </Box>
          </div>
        )}
      </div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 350,
          height: 350,
          gap: 2,
          p: 2,
          // border: 1,
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
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
      </Box>
    </div>
  );
}

export default TimetablePage;
