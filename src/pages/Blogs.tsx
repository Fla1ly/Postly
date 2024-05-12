import NavbarContent from "../components/Nav";
import { Typography, Stack } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Travel",
  "Technology",
  "Fashion",
  "Finance",
  "Education",
  "Sports",
  "Lifestyle",
  "Business",
  "Art & Design",
  "Science",
  "Politics",
  "Real Estate",
];

export default function Blogs() {
  //   const navigate = useNavigate();

  return (
    <NavbarContent>
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid #c4c4c4",
        }}
      >
        <Typography variant="h3" sx={{ mb: 1 }}>
          The Hub
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          p: 1,
          overflowX: "auto",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {categories.map((category, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            {category}
          </Typography>
        ))}
      </Stack>
    </NavbarContent>
  );
}
