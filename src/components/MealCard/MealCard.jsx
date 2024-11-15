import React from "react";
import "./MealCard.css";
import { useNavigate } from "react-router-dom";

import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import { Paper } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
function getTheImg(img) {
  switch (img) {
    case "1.jpg":
      return img1;
    case "2.jpg":
      return img2;
    case "3.jpg":
      return img3;
    case "4.jpg":
      return img4;
    default:
      break;
  }
}

function MealCard({ meal }) {
  const navigate = useNavigate();
  const {t}=useAuth();
  const handleSelect = (name) => {
    navigate(`/meals/${name.toLowerCase()}`);
  };
  return (
    <Paper
      className="card-container"
      sx={{ m: 2, p: 2, textAlign: "center", cursor: "pointer" }}
      elevation={4}
      onClick={() => handleSelect(meal.name)}
    >
      <img className="card-img" src={getTheImg(meal.img)} alt="img" />
      <h2>{t(meal.name)}</h2>
    </Paper>
  );
}

export default MealCard;
