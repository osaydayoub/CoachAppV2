import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary: { main: "#FF6A00", contrastText: "#fff" }, // Orange
        secondary: { main: "#212121", contrastText: "#fff" }, // Dark grey
        success: { main: "#43A047", contrastText: "#fff" },   // Green
        background: { default: "#F5F5F5", paper: "#fff" },
        text: { primary: "#212121", secondary: "#666" },
        // Optional custom namespace (usable in JS without TS types)
        brand: { orange: "#FF6A00", grey: "#212121", green: "#43A047" }
    },


});

export default theme;

