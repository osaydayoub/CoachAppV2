import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import "./WorkoutsCalendar.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import {
  getFullDate,
  dateIsWithinSevenDays,
  isSameDay,
  isSameMonthAndYear,
} from "../../utils/helpers.js";

import { Box, Button, Typography } from "@mui/material";
import Workout from "../Workout/Workout.jsx";
import WorkoutsCarousel from "../WorkoutsCarousel/WorkoutsCarousel.jsx";

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

function WorkoutsCalendar() {
  const [value, setValue] = useState(initialValue);
  const [month, setMonth] = useState(initialValue);
  const { currentUser } = useAuth();
  const { workoutsData, getWorkouts, currentClient } = useData();
  //maybe no need for that
  const [workouts, setWorkouts] = useState(null);
  const [allHighlightedDates, setAllHighlightedDates] = useState(null);
  const [workoutsToDisply, setWorkoutsToDisply] = useState(null);
  const [highlightedDays, setHighlightedDays] = useState(null);
  const [workoutForDate, setWorkoutForDate] = useState(null);
  // const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    if (!currentUser.isAdmin && currentClient?.workouts) {
      const currentUserWorkouts = currentClient.workouts;
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
    } else if (currentUser.isAdmin && workoutsData === null) {
      getWorkouts();
    }
  }, [currentClient]);

  useEffect(() => {
    if (workoutsData != null) {
      const workoutsForToday = workoutsData?.filter((workout) => {
        return isSameDay(new Date(workout.date), new Date(value));
      });
      setWorkoutsToDisply(workoutsForToday);
      // console.log(workoutsForToday);
    }
  }, [workoutsData, value]);

  //set for admin
  useEffect(() => {
    if (workoutsData != null && currentUser.isAdmin) {
      const highlightArray = [];
      workoutsData.forEach((element) => {
        highlightArray.push(new Date(element.date));
      });

      const filteredHighlightArray = highlightArray?.filter((day) => {
        return isSameMonthAndYear(new Date(month), new Date(day));
      });

      const days = filteredHighlightArray?.map((date) => {
        return date.getDate();
      });

      setAllHighlightedDates(highlightArray);
      setHighlightedDays(days);
    }
  }, [workoutsData]);

  useEffect(() => {
    if (value != undefined && !currentUser.isAdmin) {
      const res = workouts?.find((workout) => {
        return isSameDay(new Date(value), new Date(workout.date));
      });
      console.log(res);
      setWorkoutForDate(res);
    }
  }, [value, workouts]);

  const handleMonthChange = (date) => {
    const res = allHighlightedDates?.filter((day) => {
      return isSameMonthAndYear(new Date(date), new Date(day));
    });
    const days = res?.map((date) => {
      return date.getDate();
    });
    console.log("new Date(date)=", new Date(date));
    console.log("date=", date);
    setMonth(new Date(date));
    setHighlightedDays(days);
  };
  const handleTodayClick = () => {
    // onchange(new Date());
    setValue(dayjs()); // Set the date to today using dayjs
  };

  return (
    <div className="calendar-message-container">
      <Box
        sx={{
          p: 1,
          pt: 0,
          margin: 2,
          maxWidth: 400,
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            sx={{
              "& .MuiDayCalendar-weekDayLabel": {
                marginLeft: "6px",
              },
            }}
            value={value}
            // loading={isLoading}
            onMonthChange={handleMonthChange}
            onChange={(newDate) => {
              setValue(dayjs(newDate));
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // mt: 2,
              borderTop: "solid 1px",
              borderColor: "primary.main",
            }}
          >
            <FitnessCenterIcon sx={{ mr: 1 }} />
            <Typography fontSize="small" sx={{ color: "#9d9d9d" }}>
              Days with the icon have workouts.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              mt: 1, // Margin-top for spacing
            }}
          >
            <Button variant="contained" onClick={handleTodayClick}>
              Today
            </Button>
          </Box>
        </LocalizationProvider>
      </Box>
      {!currentUser.isAdmin && workouts && (
        // <div className="message-container">
        <>
          {workoutForDate ? (
            <Box
              sx={{
                width: 225,
              }}
            >
              <Workout
                workout={workoutForDate}
                isAdmin={currentUser.isAdmin}
                index={1}
                isViewOnly={true}
              />
            </Box>
          ) : (
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Typography>No workout on this date!</Typography>
              </Box>
            </Box>
          )}
        </>

        // </div>
      )}
      {currentUser.isAdmin && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <h3>
            {isSameDay(new Date(value), new Date())
              ? `Today's Workouts`
              : `Workouts For ${getFullDate(value.toDate())}`}
          </h3>
          {workoutsToDisply && (
            <WorkoutsCarousel
              autoPlay={false}
              workoutsToDisply={workoutsToDisply}
              isViewOnly={false}
              isAdmin={currentUser.isAdmin}
            ></WorkoutsCarousel>
          )}
        </Box>
      )}
    </div>
  );
}

export default WorkoutsCalendar;
