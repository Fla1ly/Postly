import NavbarContent from "../components/Nav";
import { Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
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
  const [, setBlogs] = useState([]);
  //   const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/postly/fetchBlogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBlogs(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

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
      <Button onClick={fetchBlogs}>Fetch Blogs Test</Button>
    </NavbarContent>
  );
}
