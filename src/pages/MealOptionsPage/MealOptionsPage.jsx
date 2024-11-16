import React, { useEffect, useState } from "react";
import "./MealOptionsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext.jsx";
import Meal from "../../components/Meal/Meal.jsx";
import AddMeal from "../../components/AddMeal/AddMeal.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  Box,
  Button,
  Typography,
  CardContent,
  Card,
  IconButton,
  MenuItem,
  Menu,
  Tooltip,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
function MealOptionsPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [mealOptions, setMealOptions] = useState(null);
  const [sortedMealOptions, setSortedMealOptions] = useState(null);
  const [addMealDisplay, setAddMealDisplay] = useState(false);
  const [mealsChanged, setMealsChanged] = useState(0);
  const { currentClient, getAllMealsByType } = useData();
  const { currentUser } = useAuth();

  const [mealData, setMealData] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [anchorEl, setAnchorEl] = useState(null);
  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getMeals = async () => {
      try {
        const MealOptions = await getAllMealsByType(type);
        setMealOptions(MealOptions);
        setSortedMealOptions(MealOptions);
      } catch (error) {
        console.log(error);
      }
    };
    getMeals();
  }, [mealsChanged]);
  function handleBack() {
    navigate(-1);
  }

  const handleSortByRatingForClient = () => {
    if (!mealOptions) return;
    let newSortedOrder = [...sortedMealOptions];
    if (sortOrder === "asc") {
      newSortedOrder = newSortedOrder.sort((a, b) => {
        let aRating = a.ratings?.[currentClient._id]
          ? a.ratings?.[currentClient._id]
          : 0;
        let bRating = b.ratings?.[currentClient._id]
          ? b.ratings?.[currentClient._id]
          : 0;
        return aRating - bRating;
      });
    } else {
      newSortedOrder = newSortedOrder.sort((a, b) => {
        let aRating = a.ratings?.[currentClient._id]
          ? a.ratings?.[currentClient._id]
          : 0;
        let bRating = b.ratings?.[currentClient._id]
          ? b.ratings?.[currentClient._id]
          : 0;
        return bRating - aRating;
      });
    }
    setSortedMealOptions(newSortedOrder);
  };

  const handleSortByRatingForAdmin = () => {
    if (!mealOptions) return;
    let newSortedOrder = [...sortedMealOptions];
    if (sortOrder === "asc") {
      newSortedOrder = newSortedOrder.sort((a, b) => {
        let aRating = a.averageRating ? a.averageRating : 0;
        let bRating = b.averageRating ? b.averageRating : 0;
        return aRating - bRating;
      });
    } else {
      newSortedOrder = newSortedOrder.sort((a, b) => {
        let aRating = a.averageRating ? a.averageRating : 0;
        let bRating = b.averageRating ? b.averageRating : 0;
        return bRating - aRating;
      });
    }
    setSortedMealOptions(newSortedOrder);
  };

  const handleSortByCalories = () => {
    if (!mealOptions) return;
    let newSortedOrder = [...sortedMealOptions];
    if (sortOrder === "asc") {
      newSortedOrder = newSortedOrder.sort(
        (a, b) => a.totalCalories - b.totalCalories
      );
    } else {
      newSortedOrder = newSortedOrder.sort(
        (a, b) => b.totalCalories - a.totalCalories
      );
    }
    setSortedMealOptions(newSortedOrder);
  };

  const toggleSortOrder = () => {
    setSortedMealOptions((prevSortedMealOptions) =>
      [...prevSortedMealOptions].reverse()
    );
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="page MealOptionsPage">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          gap: 3,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: 600,
          margin: "0 auto",
          mt: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          {`${type.charAt(0).toUpperCase() + type.slice(1)} Meals`}
        </Typography>

        <Button
          variant="contained"
          // color="secondary"
          endIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            padding: "8px 16px",
            fontWeight: 600,
          }}
        >
          Back
        </Button>

        {!currentUser.isAdmin && (
          <Typography gutterBottom>
            {`You can choose from a variety of options for your ${type}, ensuring your meal fits your preferences and nutritional needs.`}
          </Typography>
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Tooltip
            title={
              sortOrder === "asc"
                ? "Sort in descending order"
                : "Sort in ascending order"
            }
          >
            <IconButton onClick={toggleSortOrder}>
              {sortOrder === "asc" ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Sort By">
            <IconButton onClick={handleSortClick}>
              <SortIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                handleSortByCalories();
                handleClose();
              }}
            >
              <Typography>Sort By Calories</Typography>
            </MenuItem>

            <MenuItem
              onClick={() => {
                if (!currentUser.isAdmin) {
                  handleSortByRatingForClient();
                } else {
                  handleSortByRatingForAdmin();
                }
                handleClose();
              }}
            >
              <Typography>Sort By Rating</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {mealOptions ? (
          <div className="meals-container">
            {currentUser.isAdmin && (
              <Card
                sx={{
                  width: 230,
                  height: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardContent>
                  <Button
                    variant="contained"
                    endIcon={<AddCircleOutlineIcon />}
                    onClick={() => {
                      setAddMealDisplay(true);
                      setMealData(null);
                    }}
                    sx={{
                      backgroundColor: "#EB5406",
                      "&:hover": { backgroundColor: "#d34905" },
                      padding: "8px 16px",
                      fontWeight: 600,
                    }}
                    disabled={addMealDisplay}
                  >
                    Add new Meal
                  </Button>
                </CardContent>
              </Card>
            )}
            {addMealDisplay && currentUser.isAdmin && (
              <Box>
                <AddMeal
                  handeleAddMealDisplay={setAddMealDisplay}
                  type={type}
                  handleMealsChanged={() => setMealsChanged((prev) => prev + 1)}
                  open={addMealDisplay}
                  isDialog={true}
                  mealData={mealData}
                />
              </Box>
            )}
            {sortedMealOptions.map((mealOption) => {
              return (
                <Meal
                  mealOption={mealOption}
                  setMealChanged={() => setMealsChanged((prev) => prev + 1)}
                  key={mealOption._id}
                  handleUpdateMeal={() => {
                    setMealData(mealOption);
                    setAddMealDisplay(true);
                  }}
                />
              );
            })}
          </div>
        ) : (
          <Card
            sx={{
              width: 230,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <CircularProgress sx={{ color: "#EB5406" }} />
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
}

export default MealOptionsPage;
