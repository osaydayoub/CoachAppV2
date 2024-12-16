import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { isSameDay } from "../utils/helpers";

export const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [clientsData, setClientsData] = useState(null);
  const [workoutsData, setWorkoutsData] = useState(null);
  const [currentClient, setCurrentClient] = useState(null);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     console.log("token Changed!!!");
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     }
  //   }
  // }, [isLoggedIn]);

  const getWorkouts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_LINK}/coach/workouts`
      );
      const data = response.data;
      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      setWorkoutsData(data);
      return data;
    } catch (error) {
      console.log("error in get workouts");
      return null;
    }
  };
  const getClients = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_LINK}/coach/clients`
      );
      setClientsData(response.data);
    } catch (error) {
      console.log("error in get Clients");
    }
  };

  const addPackage = async (id, packageObj) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_LINK}/coach/clients/assignPackage/${id}`,
        {
          numberOfWorkouts: packageObj.numberOfWorkouts,
          totalCost: packageObj.totalCost,
          paidAmount: packageObj.paidAmount,
          caloricIntake: packageObj.caloricIntake,
        }
      );
      //console.log(response.data);
      await getClients();
    } catch (error) {
      console.log("error in addPackage");
    }
  };

  const getCurrentClient = async (id) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // console.log("getCurrentClient-currentDate:",currentDate);
    // console.log("currentDate.toISOString():",currentDate.toISOString());
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_LINK
        }/coach/clients/${id}?date=${currentDate.toISOString()}`
      );
      console.log("response", response);
      setCurrentClient(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      // throw new Error(error.)
    }
  };

  const createWorkout = async (workout) => {
    // console.log("createWorkout");
    try {
      console.log(workout);
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}/coach/workouts`,
        {
          exercise: workout.exercise,
          date: workout.date,
          duration: workout.duration,
          clientID: workout.clientID,
        }
      );
      // console.log(response.data);
      await getWorkouts();
    } catch (error) {
      if (error.response.status == 409) {
        throw error;
      }
      console.log(error);
      console.log("error in createWorkout");
    }
  };

  const deleteWorkout = async (id) => {
    console.log("deleteWorkout");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_LINK}/coach/workouts/${id}`
      );
      console.log(response);
      await getWorkouts();
    } catch (error) {
      console.log("error in deleteWorkout");
    }
  };

  const addDailyTracking = async (id, trackingObj) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_LINK}/coach/clients/dailyTracking/${id}`,
        {
          date: trackingObj.date,
          calories: trackingObj.calories,
          waterAmount: trackingObj.waterAmount,
          sleepHours: trackingObj.sleepHours,
        }
      );
      console.log(response.data);
      // await getCurrentClient(id);
    } catch (error) {
      console.log(error);
      console.log("error in addDailyTracking");
    }
  };

  const getAllMealsByType = async (type) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_LINK}/coach/meals/${type}`
      );
      return response.data;
    } catch (error) {
      // throw new Error("error in getAllMealsByType");
      console.log("error in getAllMealsByType");
      console.log(error);
    }
  };

  const addNewMeal = async (meal) => {
    console.log("addNewMeal");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}/coach/meals`,
        meal
      );
    } catch (error) {
      console.log("error in addNewMeal",error);
    }
  };

  const updateMeal = async (meal) => {
    console.log("updateMeal");
    try {
      console.log(meal);
      const response = await axios.put(
        `${import.meta.env.VITE_API_LINK}/coach/meals/${meal.mealId}`,
        { ingredients: meal.ingredients, totalCalories: meal.totalCalories }
      );
    } catch (error) {
      console.log("error in updateMeal",error);
    }
  };

  const deleteMeal = async (mealId) => {
    console.log("deleteMeal");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_LINK}/coach/meals/${mealId}`
      );
    } catch (error) {
      console.log("error in deleteMeal");
    }
  };

  const generateMeal = async (type, calorieLimit) => {
    console.log("generateMeal");
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_LINK
        }/coach/meals/generateMeal/${type}?calorieLimit=${calorieLimit}`
      );
      return response.data;
    } catch (error) {
      console.log("error in generateMeal",error);
    }
  };

  const addProduct = async (product) => {
    console.log("addProduct");
    try {
      console.log(product);
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}/coach/products`,
        {
          barcodeNumber: product.barcodeNumber,
          caloriesIn100g: product.caloriesIn100g,
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log("error in addProduct");
    }
  };

  const getProductByBarcodeNumber = async (number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_LINK}/coach/products/${number}`
      );
      return response.data;
    } catch (error) {
      console.log("error in getProductByBarcodeNumber");
    }
  };

  const addWeightTracking = async (clientID, weightLog) => {
    console.log("addWeightTracking");
    try {
      console.log(weightLog);
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_LINK
        }/coach/clients/weightTracking/${clientID}`,
        {
          weight: weightLog.weight,
          date: weightLog.date,
        }
      );
      // console.log(response.data);
      await getCurrentClient(clientID);
    } catch (error) {
      console.log(error);
      console.log("ststus:", error.response.status);
      if (error.response.status == 409) {
        throw error;
      }
      console.log("error in addWeightTracking");
    }
  };

  const updateWeightTracking = async (clientID, weightLog) => {
    console.log("updateWeightTracking");
    try {
      console.log(weightLog);
      const response = await axios.put(
        `${
          import.meta.env.VITE_API_LINK
        }/coach/clients/weightTracking/${clientID}`,
        {
          weight: weightLog.weight,
          date: weightLog.date,
        }
      );
      // console.log(response.data);
      await getCurrentClient(clientID);
    } catch (error) {
      console.log(error);
      console.log("ststus:", error.response.status);
      if (error.response.status == 409) {
        throw error;
      }
      console.log("error in updateWeightTracking");
    }
  };

  const addMealRating = async (mealId, clientID, rating) => {
    console.log("addMealRating");
    try {
      console.log(clientID);
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}/coach/meals/mealsRating/${mealId}`,
        {
          clientId: clientID,
          rating: rating,
        }
      );
      // console.log(response.data);
      await getCurrentClient(clientID);
    } catch (error) {
      console.log(error);
      console.log("error in addMealRating");
    }
  };

  const normalizeDate = (date) => {
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
  };

  const addDailyMeal = async (clientID, mealId, type) => {
    console.log("addDailyMeal");
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}/coach/clients/dailyMeals/${clientID}`,
        {
          mealId: mealId,
          mealType: type,
          date: currentDate,
        }
      );
      await getCurrentClient(clientID);
    } catch (error) {
      console.log(error);
      console.log("error in addDailyMeal");
    }
  };

  const AddCaloriesToDailyTracking = async (calories) => {
    let track = currentClient.dailyTracking.find((track) => {
      return isSameDay(new Date(track.date), new Date());
    });
    if (track === undefined) {
      console.log("stil no data");
      const t = {
        date: new Date(),
        calories: 0,
        waterAmount: 0,
        sleepHours: 0,
      };
      track = t;
    }
    try {
      const updatednewTrack = {
        date: track.date,
        calories: Number(track.calories) + Number(calories),
        waterAmount: Number(track.waterAmount),
        sleepHours: Number(track.sleepHours),
      };
      await addDailyTracking(currentClient._id, updatednewTrack);
      await getCurrentClient(currentClient._id);
    } catch (error) {
      console.log(error);
      console.log("AddCaloriesToDailyTracking");
    }
  };

  const consumeDailyMeal = async (clientID, type) => {
    console.log("consumeDailyMeal");
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    try {
      console.log(clientID);
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_LINK
        }/coach/clients/consumeDailyMeals/${clientID}`,
        {
          mealType: type,
          date: currentDate,
        }
      );
      await getCurrentClient(currentClient._id);
    } catch (error) {
      console.log(error);
      console.log("error in consumeDailyMeal");
    }
  };

  const updateUserActiveStatus = async (userId, newStatus) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_LINK}/users/updateUserStatus`,
        {
          userId: userId,
          status: newStatus,
        }
      );
      console.log(response.data);
      await getClients();
    } catch (error) {
      console.log("error in updateUserActiveStatus");
    }
  };

  const value = {
    currentClient,
    setCurrentClient,
    getCurrentClient,
    clientsData,
    setClientsData,
    getClients,
    workoutsData,
    setWorkoutsData,
    getWorkouts,
    addPackage,
    createWorkout,
    deleteWorkout,
    addDailyTracking,
    getAllMealsByType,
    addNewMeal,
    updateMeal,
    deleteMeal,
    generateMeal,
    addProduct,
    getProductByBarcodeNumber,
    addWeightTracking,
    updateWeightTracking,
    addMealRating,
    addDailyMeal,
    AddCaloriesToDailyTracking,
    consumeDailyMeal,
    updateUserActiveStatus,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// {
//   exercise: workout.exercise,
//   date: workout.date,
//   clientID: workout.clientID,
// }
