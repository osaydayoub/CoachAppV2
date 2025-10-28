import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineCopyright } from "react-icons/ai";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "secondary.main",
        color: "secondary.contrastText",
        py: 4,
        px: 4,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%"
      }}>
        <Box sx={{ px: 2, py: 0.5, display: "flex", alignItems: "center", gap: 1, backgroundColor: "brand.navHover", borderRadius: 2 }}>
          <IconButton
            component="a"
            href="https://www.instagram.com/ayoubm990/?utm_source=qr&igsh=MXJqeWo2OW9ueHk4eA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "inherit" }}
          >
            <FaSquareInstagram />
          </IconButton>
          <Divider orientation="vertical" flexItem sx={{ bgcolor: "divider" }} />
          <IconButton
            component="a"
            href="https://wa.me/972549961614"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "inherit" }}
          >
            <FaWhatsapp />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%"
      }}>
        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <AiOutlineCopyright />
          2025 CoachApp · M.S.A Personal Trainer
        </Typography></Box>

    </Box>
  );
}

export default Footer;
