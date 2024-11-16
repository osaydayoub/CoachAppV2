import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Box,
  Rating,
  Button,
  Tooltip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  CardHeader,
  Menu,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import LocalDining from "@mui/icons-material/LocalDining";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { isRTL } from "../../utils/helpers";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function Meal({
  mealOption,
  mealType,
  setMealChanged,
  display,
  consumed,
  handleUpdateMeal,
}) {
  const [rating, setRating] = useState(null);
  const [selectedSnack, setSelectedSnack] = useState(""); // State to store selected snack
  const [addingMeal, setAddingMeal] = useState(false);
  // Handle snack selection
  const handleSnackChange = (event) => {
    setSelectedSnack(event.target.value);
  };
  const {
    currentClient,
    addMealRating,
    addDailyMeal,
    AddCaloriesToDailyTracking,
    consumeDailyMeal,
    deleteMeal,
  } = useData();
  const { currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    handleUpdateMeal();
    handleClose();
  };

  const handleDelete = async () => {
    try {
      await deleteMeal(mealOption._id);
      setMealChanged();
    } catch (error) {
      console.log("error in handleDelete", error);
    }
    handleClose();
  };

  useEffect(() => {
    if (currentClient) {
      const clientRating = mealOption?.ratings?.[currentClient._id];
      setRating(clientRating ?? 0);
    }
  }, []);

  const handelNewRating = async (newValue) => {
    setRating(newValue);
    try {
      // setLoggingWeight(true);
      const updatedClient = await addMealRating(
        mealOption._id,
        currentClient._id,
        newValue
      );
      setMealChanged();
    } catch (error) {
      console.log(error);
      console.log("error in handelNewRating");
    }

    setRating(newValue);
  };

  const handelAddDailyMeal = async () => {
    try {
      setAddingMeal(true);
      const dailyMeal = await addDailyMeal(
        currentClient._id,
        mealOption._id,
        mealOption.type === "snack" ? selectedSnack : mealOption.type
      );
    } catch (error) {
      console.log(error);
      console.log("error in handelNewRating");
    } finally {
      setAddingMeal(false);
    }
  };

  const handleConsumeMeal = async () => {
    try {
      await AddCaloriesToDailyTracking(mealOption.totalCalories);
      await consumeDailyMeal(
        currentClient._id,
        mealOption.type === "snack" ? mealType : mealOption.type
      );
    } catch (error) {
      console.log("error in handleConsumeMeal");
    }
  };

  return (
    <Card sx={{ width: 230, minHeight: 200 }}>
      {currentUser.isAdmin && (
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          sx={{
            paddingBottom: 0, // Removes the padding below the header
            marginBottom: -1, // Adjusts the margin to reduce the space below the header
          }}
        />
      )}
      <CardContent
        sx={{
          paddingTop: currentUser.isAdmin ? 0 : undefined, // Removes the padding at the top of CardContent if admin
          marginTop: currentUser.isAdmin ? -1 : undefined, // Adjusts the margin to reduce the space at the top if admin
        }}
      >
        <List>
          {mealOption.ingredients.map((ingredient, index) => (
            <ListItem key={ingredient.name + index} disablePadding>
              <Box display="flex" alignItems="center">
                <CircleIcon sx={{ fontSize: 8, marginRight: 1 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: isRTL(ingredient.name) ? "right" : "left",
                    direction: isRTL(ingredient.name) ? "rtl" : "ltr",
                  }}
                >
                  {`${ingredient.name} - ${ingredient.amount} ${ingredient.unit}`}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Total Calories: {mealOption.totalCalories}
        </Typography>
        {/* //TODO admin cant rate  */}
        {/* TODO Add rating average if  isAdmin */}

        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Optional: To center the contents horizontally
            gap: 2,
          }}
        >
          {currentUser.isAdmin ? (
            <Tooltip title="Average Rating">
              <span>
                <Rating
                  name="average-rating"
                  value={mealOption.averageRating || 0}
                  precision={0.5}
                  readOnly
                />
              </span>
            </Tooltip>
          ) : (
            <>
              <Rating
                name="half-rating"
                value={rating} // Bind value to the rating state
                precision={0.5}
                onChange={(event, newValue) => handelNewRating(newValue)} // Update state on change
              />
              {!display && (
                <>
                  {mealOption.type === "snack" && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        marginTop: 2,
                      }}
                    >
                      <FormControl sx={{ minWidth: 110 }}>
                        <InputLabel id="snack-select-label">
                          Select as
                        </InputLabel>
                        <Select
                          labelId="snack-select-label"
                          value={selectedSnack}
                          label="Select Snack"
                          onChange={handleSnackChange}
                        >
                          <MenuItem value="snack-1">Snack 1</MenuItem>
                          <MenuItem value="snack-2">Snack 2</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  )}
                  <Tooltip title="Add to Today's Meals">
                    <span>
                      <Button
                        variant="contained"
                        onClick={() => handelAddDailyMeal()}
                        endIcon={<LocalDining />}
                        startIcon={<AddIcon />}
                        disabled={
                          (mealOption.type === "snack" &&
                            selectedSnack === "") ||
                          addingMeal
                        }
                      />
                    </span>
                  </Tooltip>
                </>
              )}
              {/*TODO "You’ve already consumed a meal for this time. You can't select another." */}
              {display && (
                <Button
                  variant="contained"
                  onClick={() => handleConsumeMeal()}
                  endIcon={<DoneIcon />}
                  disabled={consumed}
                >
                  I Ate This
                </Button>
              )}
            </>
          )}
        </Box>
      </CardContent>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom", // Adjust this to 'bottom', 'center', etc.
          horizontal: "right", // Adjust this to 'left', 'center', etc.
        }}
        transformOrigin={{
          vertical: "top", // Adjust to 'bottom', 'center', etc.
          horizontal: "right", // Adjust to 'left', 'center', etc.
        }}
      >
        {/*TODO: Add a timestamp for the last update and display a note to users if the meal was updated after they selected it */}
        <MenuItem onClick={handleUpdate}>
          <Box
            display="flex"
            justifyContent="space-between"
            gap={1}
            width="100%"
          >
            <Typography>Update</Typography>
            <EditIcon />
          </Box>
        </MenuItem>
        {/* TODO: Handle the case where a client has already selected this meal for their daily tracking */}
        {/* <MenuItem onClick={handleDelete}>
          <Box
            display="flex"
            justifyContent="space-between"
            gap={1}
            width="100%"
          >
            <Typography>Delete</Typography>
            <DeleteIcon />
          </Box>
        </MenuItem> */}
      </Menu>
    </Card>
  );
}

export default Meal;
