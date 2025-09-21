import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary: { main: "#FF6A00", contrastText: "#fff" }, // Orange
        secondary: { main: "#212121", contrastText: "#fff" }, // Dark grey
        success: { main: "#43A047", contrastText: "#fff" },   // Green
        background: { default: "#F5F5F5", paper: "#fff" },
        text: { primary: "#212121", secondary: "#666" },
        brand: { navHover: "rgba(255,255,255,0.12)", orange: "#FF6A00", grey: "#212121", green: "#43A047" }
    },
    typography: {
        fontFamily: "'Inter','Roboto','Arial',sans-serif",
        h5: { fontWeight: 700 },
        button: { textTransform: "none", fontWeight: 600 }
    },
    shape: { borderRadius: 12 },
    shadows: [
        "none",
        "0px 2px 6px rgba(0,0,0,0.06)",
        "0px 4px 10px rgba(0,0,0,0.08)",
        "0px 6px 16px rgba(0,0,0,0.12)",
        ...Array(21).fill("0 0 0 rgba(0,0,0,0.12)")
    ]



});

export default theme;



// palette: {
//     primary: { main: "#1976D2", contrastText: "#FFFFFF" }, // Blue
//     secondary: { main: "#FF9800", contrastText: "#FFFFFF" }, // Orange accent
//     success: { main: "#2E7D32", contrastText: "#FFFFFF" }, // Dark Green
//     background: {
//         default: "#F5F5F5", // light grey background
//         paper: "#FFFFFF",
//     },
//     text: {
//         primary: "#212121",
//         secondary: "#555555",
//     },
// },
// palette: {
//     primary: { main: "#43A047", contrastText: "#FFFFFF" }, // Green
//     secondary: { main: "#FFC107", contrastText: "#212121" }, // Yellow
//     success: { main: "#2E7D32", contrastText: "#FFFFFF" }, // Dark Green
//     background: {
//         default: "#ECEFF1", // soft grey
//         paper: "#FFFFFF",
//     },
//     text: {
//         primary: "#212121",
//         secondary: "#555555",
//     },
// },

