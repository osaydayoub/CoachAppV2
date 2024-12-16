import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  CardContent,
  Card,
  Dialog,
} from "@mui/material";
import { useData } from "../../context/DataContext.jsx";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function AddMeal({
  handeleAddMealDisplay,
  type,
  handleMealsChanged,
  open,
  mealData,
  //mealAction can be "update"  "create" "generate"
  mealAction,
}) {
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [amount, setAmount] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [displayNewMeal, setDisplayNewMeal] = useState(false);
  const [caloriesLimit, setCaloriesLimit] = useState("");
  // const [showCreateMealOption, setShowCreateMealOption] = useState(false);

  const unitOptions = [
    { value: "kg", label: "kg" },
    { value: "g", label: "g" },
    { value: "ml", label: "ml" },
    { value: "units", label: "units" },
  ];
  const [selectedUnit, setSelectedUnit] = useState(unitOptions[0].value);
  const [adding, setAdding] = useState(false);
  const [generating, setGenerating] = useState(false);

  const { addNewMeal, updateMeal, generateMeal } = useData();

  useState(() => {
    if (mealData) {
      setIngredientsArray(mealData.ingredients);
      setDisplayNewMeal(true);
      setTotalCalories(mealData.totalCalories);
    }
  }, []);

  const handleAddMeal = async (e) => {
    e.preventDefault();
    try {
      setAdding(true);
      const newMeal = {
        ingredients: ingredientsArray,
        type: type,
        totalCalories: totalCalories,
      };
      await addNewMeal(newMeal);
      handleMealsChanged();
    } catch (error) {
      console.log("Error adding meal", error);
    } finally {
      setAdding(false);
      setTotalCalories(0);
      handeleAddMealDisplay(false);
    }
  };

  const handleUpdateMeal = async (e) => {
    e.preventDefault();
    try {
      setAdding(true);
      const newMeal = {
        mealId: mealData._id,
        type: mealData.type,
        ingredients: ingredientsArray,
        totalCalories: totalCalories,
      };
      await updateMeal(newMeal);
      handleMealsChanged();
    } catch (error) {
      console.log("Error adding meal", error);
    } finally {
      setAdding(false);
      setTotalCalories(0);
      handeleAddMealDisplay(false);
    }
  };
  const handleGenerateMeal = async () => {
    try {
      setGenerating(true);
      const newMeal = await generateMeal(type, caloriesLimit);
      const newMealObj = newMeal;
      // console.log(newMeal);
      // const newMealObj = {
      //   ingredients: [
      //     { name: "eff", amount: "1", unit: "kg" },
      //     { name: "qqq", amount: "2", unit: "ml" },
      //   ],
      //   type: "breakfast",
      //   totalCalories: 20,
      // };
      setIngredientsArray(newMealObj.ingredients);
      setTotalCalories(newMealObj.totalCalories);
      setDisplayNewMeal(true);
    } catch (error) {
      console.log("handleGenerateMeal", error);
    } finally {
      setGenerating(false);
      // setTotalCalories(0);
      // handeleAddMealDisplay(false);
    }
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const ingredient = {
      name: ingredientName,
      amount: amount,
      unit: selectedUnit,
    };
    console.log("new ingredient:", ingredient);
    setIngredientsArray([...ingredientsArray, ingredient]);
    setDisplayNewMeal(true);
    setIngredientName("");
    setAmount(0);
    setSelectedUnit(unitOptions[0].value);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredientsArray.filter(
      (ingredient, i) => i !== index
    );
    setIngredientsArray(updatedIngredients);
  };

  const dialogContent = (
    <Box
      sx={{
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        maxWidth: 350,
        margin: "auto",
        // mt:2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {mealData ? `Update Meal` : `Add a Meal`}
        </Typography>
        <IconButton onClick={() => handeleAddMealDisplay(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      {mealAction == "generate" && (
        <Box>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 2,
              fontSize: "0.875rem",
              color: "gray",
            }}
          >
            You can either generate a meal with or without a calorie limit!
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Set Calorie Limit"
            value={caloriesLimit}
            onChange={(e) => setCaloriesLimit(e.target.value)}
          />
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            startIcon={<AutoAwesomeIcon />}
            onClick={handleGenerateMeal}
          >
            {generating ? "Generating..." : "Generate Meal"}
          </Button>
        </Box>
      )}

      {displayNewMeal && (
        <Card sx={{ mt: 1, mb: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Ingredients
            </Typography>
            <List>
              {ingredientsArray.map((ingredient, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    mealAction !== "generate" ? (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null
                  }
                >
                  <CircleIcon sx={{ fontSize: 10, mr: 1 }} />
                  {`${ingredient.name} - ${ingredient.amount} ${ingredient.unit}`}
                </ListItem>
              ))}
            </List>
            {mealAction == "generate" && (
              <Typography variant="h6" component="div" gutterBottom>
                {`Total Calories: ${totalCalories}`}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {(mealAction == "update" || mealAction == "create") && (
        <>
          <form onSubmit={handleAddIngredient}>
            <TextField
              fullWidth
              margin="normal"
              label="Ingredient Name"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              type="number"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="unit-label">Choose a Unit</InputLabel>
              <Select
                labelId="unit-label"
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                label="Choose a Unit"
              >
                {unitOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button fullWidth variant="outlined" type="submit" sx={{ mt: 2 }}>
              Add Ingredient
            </Button>
          </form>
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Total Calories"
            value={totalCalories}
            onChange={(e) => setTotalCalories(e.target.value)}
            required
          />
        </>
      )}

      <form onSubmit={mealData ? handleUpdateMeal : handleAddMeal}>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          // sx={{ mt: 2 }}
          sx={{
            mt: 2,
            backgroundColor: "#EB5406",
            "&:hover": { backgroundColor: "#d34905" },
            padding: "8px 16px",
            fontWeight: 600,
          }}
          disabled={
            adding || totalCalories <= 0 || ingredientsArray.length === 0
          }
          startIcon={adding ? <CircularProgress size={20} /> : null}
        >
          {mealData
            ? adding
              ? "Update Meal..."
              : "Update Meal"
            : adding
            ? "Adding Meal..."
            : "Add Meal"}
        </Button>
      </form>
    </Box>
    //
  );
  return (
    <Dialog
      onClose={() => handeleAddMealDisplay(false)}
      open={open}
      scroll="body"
    >
      {dialogContent}
    </Dialog>
  );
}

export default AddMeal;
