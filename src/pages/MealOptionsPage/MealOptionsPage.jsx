import React, { useEffect, useState } from "react";
import "./MealOptionsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext.jsx";
import Meal from "../../components/Meal/Meal.jsx";
import AddMeal from "../../components/AddMeal/AddMeal.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function MealOptionsPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [mealOptions, setMealOptions] = useState(null);
  const [addMealDisplay, setAddMealDisplay] = useState(false);
  const [mealsChanged, setMealsChanged] = useState(false);
  const { getAllMealsByType } = useData();
  const { currentUser } = useAuth();

  useEffect(() => {
    const getMeals = async () => {
      try {
        const MealOptions = await getAllMealsByType(type);
        console.log(MealOptions);
        setMealOptions(MealOptions);
      } catch (error) {
        console.log(error);
      }
    };
    getMeals();
  }, [mealsChanged]);
  function handleBack() {
    navigate(-1);
  }
  return (
    <div className="page MealOptionsPage">
      <button className="back-btn" onClick={handleBack}>
        Back
      </button>
      <h1>{type}</h1>
      <p>{`You can choose from a variety of options for your ${type}, ensuring your meal fits your preferences and nutritional needs.`}</p>
      <div>
      {currentUser.isAdmin && (<div>
          <button
            className="add-meal-btn"
            onClick={() => {
              setAddMealDisplay(true);
            }}
          >
            +
          </button>
          {addMealDisplay && (
            <AddMeal
              handeleAddMealDisplay={setAddMealDisplay}
              type={type}
              handleMealsChanged={setMealsChanged}
            />
          )}
        </div>)
        }
        {mealOptions && (
          <div className="meals-container">
            {mealOptions.map((mealOption) => {
              return <Meal mealOption={mealOption} setMealsChanged={setMealsChanged} key={mealOption._id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MealOptionsPage;
