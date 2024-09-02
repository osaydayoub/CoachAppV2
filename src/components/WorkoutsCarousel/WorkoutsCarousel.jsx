import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import Workout from "../Workout/Workout";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

function WorkoutsCarousel({autoPlay,workoutsToDisply,isViewOnly,isAdmin}) {
  return (
    <div style={{ marginTop: "50px"}}>
      {workoutsToDisply && (workoutsToDisply.length!=0)?(
        <Carousel
          autoPlay={autoPlay}
          interval={5000}
          navButtonsAlwaysVisible={true}
          sx={{ paddingLeft: "50px", paddingRight:"50px", width: "320px" }}
        >
          {workoutsToDisply.map((workout, index) => {
            if (index == 0) console.log(workoutsToDisply);
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
        //TODO update to a good component
      ):<h4>No Workouts To Display Available!</h4>}
    </div>
  );
}

export default WorkoutsCarousel;
