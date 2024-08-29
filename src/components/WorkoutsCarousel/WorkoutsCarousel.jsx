import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import Workout from "../Workout/Workout";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

function WorkoutsCarousel({autoPlay,workoutsToDisply,isViewOnly,isAdmin}) {
  return (
    <div style={{ marginTop: "50px", color: "#200a8e" }}>
      {workoutsToDisply && (
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
      )}
    </div>
  );
}

export default WorkoutsCarousel;
