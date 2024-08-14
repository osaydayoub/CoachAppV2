import React, { useState } from "react";
import { useData } from "../../context/DataContext.jsx";
import "./AddPackage.css";
function AddPackage({ client ,packageDisplay}) {
  const [workoutsNumber, setWorkoutsNumber] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [caloricIntake, setCaloricIntake] = useState(0);
  //TODO done
  const [adding, setAdding] = useState(false);
  const { addPackage } = useData();

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      setAdding(true);
      await addPackage(client._id, {
        numberOfWorkouts: workoutsNumber,
        totalCost: totalCost,
        paidAmount: paidAmount,
        caloricIntake: caloricIntake,
      });
    } catch (error) {}
    console.log("handleAddPackage");
    setAdding(false);
  };

  return (
    <div className="addPackage-container">
      <button onClick={()=>packageDisplay()}>X</button>
      <h3>Add a Package</h3>
      <form onSubmit={(e) => handleAddPackage(e)}>
        <div>
          <label htmlFor="workouts-number">Workouts Number</label>
          <br />
          <input
            type="number"
            id="workouts-number"
            onChange={(e) => setWorkoutsNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="total-cost">Total Cost</label>
          <br />
          <input
            type="number"
            id="total-cost"
            onChange={(e) => setTotalCost(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="paid-amount">Paid Amount</label>
          <br />
          <input
            type="number"
            id="paid-amount"
            onChange={(e) => setPaidAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="caloric-intake">Caloric Intake</label>
          <br />
          <input
            type="number"
            id="caloric-intake"
            onChange={(e) => setCaloricIntake(e.target.value)}
            required
          />
        </div>

        <div>
          {/* disabled={adding} TODO implement the change*/}
          <button type="submit" disabled={adding}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPackage;
