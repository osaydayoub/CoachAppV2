import React, { useState } from "react";
import { useData } from "../../context/DataContext.jsx";
import "./AddWorkout.css"
function AddWorkout({ client,workoutDisplay }) {
  const exerciseOptions = [
    { value: "Push", label: "Push" },
    { value: "Pull", label: "Pull" },
    { value: "Leg", label: "Leg" },
    { value: "A/b/c/d ", label: "A/b/c/d" },
    { value: "Full-body", label: "Full-body" },
  ];
  const [selectedExercise, setSelectedExercise] = useState(
    exerciseOptions[0].value
  );
  const [date, setDate] = useState(0);
  const [time, setTime] = useState(0);
  const [adding, setAdding] = useState(false);

  const { createWorkout } = useData();

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    try {
      setAdding(true);
      await createWorkout({
        exercise: selectedExercise,
        date: new Date(`${date}T${time}`),
        clientID: client._id,
      });
    } catch (error) {}
    setAdding(false);
  };
  return (
    <div className="addWorkout-container">
      <button onClick={()=>workoutDisplay()}>X</button>
      <h3>Add a Workout</h3>
      <form onSubmit={(e) => handleCreateWorkout(e)}>
        <div>
          <label>
            {`Choose an exercise: `}
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
            >
              {exerciseOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="date">{`Date: `}</label>
          <input
            type="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {date != 0 && (
          <div>
            <label htmlFor="time">{`Time: `}</label>
            <input
              type="time"
              id="time"
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          {/* disabled={adding} TODO implement the change*/}
          <button type="submit" disabled={adding}>
            Add
          </button>
        </div>
      </form>
      {/* <button onClick={handleQQQQ}>QQQQQ</button> */}
    </div>
  );
}

export default AddWorkout;


