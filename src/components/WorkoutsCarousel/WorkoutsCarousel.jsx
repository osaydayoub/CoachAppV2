import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import Workout from "../Workout/Workout";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

function WorkoutsCarousel({workoutsToDisply}) {
  return (
    <div style={{ marginTop: "50px", color: "#200a8e" }}>
      {workoutsToDisply && (
        <Carousel
          interval={5000}
          navButtonsAlwaysVisible={true}
          sx={{ padding: "50px", width: "500px" }}
        >
          {workoutsToDisply.map((workout, index) => {
            if (index == 0) console.log(workoutsToDisply);
            return (
              <Workout
                key={index}
                workout={workout}
                isAdmin={true}
                index={index}
                id={workout._id}
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
}

export default WorkoutsCarousel;
