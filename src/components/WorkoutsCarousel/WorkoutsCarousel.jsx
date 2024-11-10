import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Workout from "../Workout/Workout";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

function WorkoutsCarousel({ autoPlay, workoutsToDisply, isViewOnly, isAdmin }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const {t}=useAuth();

  useEffect(() => {
    if (workoutsToDisply && workoutsToDisply.length > 0) {
      setActiveIndex(0);
    }
  }, [workoutsToDisply]);

  return (
    <div>
      {workoutsToDisply && workoutsToDisply.length != 0 ? (
        <Carousel
          autoPlay={autoPlay}
          interval={5000}
          navButtonsAlwaysVisible={true}
          index={activeIndex}
          onChange={(index) => setActiveIndex(index)}
          sx={{ paddingLeft: "50px", paddingRight: "50px", width: "320px" }}
        >
          {workoutsToDisply.map((workout, index) => {
            // if (index == 0) console.log(workoutsToDisply);
            return (
              <Workout
                key={index}
                workout={workout}
                isAdmin={isAdmin}
                index={index}
                id={workout._id}
                isViewOnly={isViewOnly}
              />
            );
          })}
        </Carousel>
      ) : (
        //TODO update to a good component
        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            padding: 2,
            borderRadius: 1,
            mt: 3,
            textAlign: "left",
          }}
        >
          <Typography variant="body1" color="textPrimary">
            {t("no workouts")}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default WorkoutsCarousel;
