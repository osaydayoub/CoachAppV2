import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Workout from "../Workout/Workout";


function WorkoutsCarousel({autoPlay,workoutsToDisply,isViewOnly,isAdmin}) {
  const [activeIndex, setActiveIndex] = useState(0); 

  useEffect(() => {
    if (workoutsToDisply && workoutsToDisply.length > 0) {
      setActiveIndex(0); 
    }
  }, [workoutsToDisply]);

  return (
    <div>
      {workoutsToDisply && (workoutsToDisply.length!=0)?(
        <Carousel
          autoPlay={autoPlay}
          interval={5000}
          navButtonsAlwaysVisible={true}
          index={activeIndex} 
          onChange={(index) => setActiveIndex(index)} 
          sx={{ paddingLeft: "50px", paddingRight:"50px", width: "320px" }}
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
        //TODO update to a good component
      ):<h4>No Workouts To Display Available!</h4>}
    </div>
  );
}

export default WorkoutsCarousel;
