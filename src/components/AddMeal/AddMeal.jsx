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

function AddMeal({
  handeleAddMealDisplay,
  type,
  handleMealsChanged,
  open,
  isDialog,
  mealData,
}) {
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [amount, setAmount] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [displayNewMeal, setDisplayNewMeal] = useState(false);

  const unitOptions = [
    { value: "kg", label: "kg" },
    { value: "g", label: "g" },
    { value: "ml", label: "ml" },
    { value: "units", label: "units" },
  ];
  const [selectedUnit, setSelectedUnit] = useState(unitOptions[0].value);
  const [adding, setAdding] = useState(false);
  const { addNewMeal,updateMeal } = useData();

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
        mealId:mealData._id,
        type:mealData.type,
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

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const ingredient = {
      name: ingredientName,
      amount: amount,
      unit: selectedUnit,
    };
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => handeleAddMealDisplay(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h5" gutterBottom>
        {mealData ? `Update Meal` : `Add a Meal`}
      </Typography>

      {displayNewMeal && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Ingredients
            </Typography>
            <List>
              {ingredientsArray.map((ingredient, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <CircleIcon sx={{ fontSize: 10, mr: 1 }} />
                  {`${ingredient.name} - ${ingredient.amount} ${ingredient.unit}`}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

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

      <form onSubmit={mealData ? handleUpdateMeal : handleAddMeal}>
        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Total Calories"
          value={totalCalories}
          onChange={(e) => setTotalCalories(e.target.value)}
          required
        />
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
          {/* {adding ? "Adding Meal..." : "Add Meal"} */}
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
  return isDialog ? (
    <Dialog
      onClose={() => handeleAddMealDisplay(false)}
      open={open}
      scroll="body"
    >
      {dialogContent}
    </Dialog>
  ) : (
    dialogContent
  );
}

export default AddMeal;
