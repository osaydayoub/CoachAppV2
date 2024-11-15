import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import logo from "../../assets/images/logo.png";
import "./AppBar.css";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop/ScrollToTop.jsx";

import LanguageIcon from "@mui/icons-material/Language";

function ResponsiveAppBar() {
  const {
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
    t,
    language,
    changeLanguage,
  } = useAuth();

  const { setClientsData, setWorkoutsData, setCurrentClient } = useData();
  const topScroller = React.useRef();

  const [pages, setPages] = React.useState([]);
  const [handleFunctions, setHandleFunctions] = React.useState([]);

  React.useEffect(() => {
    if (isLoggedIn) {
      if (currentUser.isAdmin) {
        setPages([
          `${t("navigation.Home")}`,
          `${t("navigation.Admin")}`,
          `${t("navigation.Training Timetable")}`,
          `${t("navigation.Tracking")}`,
          `${t("navigation.Meals")}`,
          `${t("navigation.Product Scanner")}`,
        ]);
        setHandleFunctions([
          handleHomeClick,
          handleAdminClick,
          handleTrainingClick,
          handleTrackingClick,
          handleMealsClick,
          handleScannerClick,
        ]);
      } else {
        setPages([
          `${t("navigation.Home")}`,
          `${t("navigation.Training Timetable")}`,
          `${t("navigation.Tracking")}`,
          `${t("navigation.Meals")}`,
          `${t("navigation.Product Scanner")}`,
        ]);
        setHandleFunctions([
          handleHomeClick,
          handleTrainingClick,
          handleTrackingClick,
          handleMealsClick,
          handleScannerClick,
        ]);
      }
    }
  }, [isLoggedIn, t]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleHomeClick = () => {
    handleCloseNavMenu();
    navigate("/");
  };
  const handleAdminClick = () => {
    handleCloseNavMenu();
    navigate("/admin");
  };
  const handleTrainingClick = () => {
    handleCloseNavMenu();
    navigate("/timetable");
  };
  const handleMealsClick = () => {
    handleCloseNavMenu();
    navigate("/meals");
  };
  const handleTrackingClick = () => {
    handleCloseNavMenu();
    navigate("/tracking");
  };

  const handleScannerClick = () => {
    handleCloseNavMenu();
    navigate("/scanner");
  };

  async function handleLogout() {
    try {
      setCurrentUser(null);
      setIsLoggedIn(false);
      setClientsData(null);
      setWorkoutsData(null);
      setCurrentClient(null);
      console.log("localStorage.removeItem");
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      navigate("./login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  const handleLogoClick = () => {
    navigate("/");
  };
  const handleLanguage = () => {
    const languageCode = language === "en" ? "ar" : "en"; // Toggle language
    changeLanguage(languageCode); // Change language using context function
    console.log("Current language:", languageCode);
  };

  //To change the primary color of your Material-UI components,
  // such as the AppBar, you can customize the Material-UI theme.
  return (
    <AppBar
      position="static"
      sx={{ height: "90px", backgroundColor: "#21201c" }}
      ref={topScroller}
    >
      <ScrollToTop refToScroller={topScroller} />
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "90px" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              className="logo-img"
              src={logo}
              alt="img"
              onClick={handleLogoClick}
            />
          </Typography>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={page} onClick={handleFunctions[index]}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              className="logo-img"
              src={logo}
              alt="img"
              onClick={handleLogoClick}
            />
          </Typography>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={handleFunctions[index]}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton size="large" onClick={handleLanguage} color="inherit">
                <LanguageIcon />
              </IconButton>
              <IconButton size="large" onClick={handleLogout} color="inherit">
                <LogoutIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
