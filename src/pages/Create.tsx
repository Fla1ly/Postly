import NavbarContent from "../components/Nav";
import {
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [characters, setCharacters] = useState<number>(0);
  const [exceedLimit, setExceedLimit] = useState<boolean>(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    navigate("/login");
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/postly/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      if (!response.ok) {
        throw new Error("Post creation failed");
      }
      console.log("Post created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const response = await fetch("http://localhost:5000/postly/saveDraft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      if (!response.ok) {
        throw new Error("Draft save failed");
      }
      console.log("Draft saved successfully");
      navigate("/");
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
    setCharacters(value.length);
    if (value.length > 2000) {
      setExceedLimit(true);
    } else {
      setExceedLimit(false);
    }
  };

  return (
    <NavbarContent>
      <Stack sx={{ display: "flex", flexDirection: "row" }}>
        <Stack sx={{ width: "65%" }}>
          <Typography variant="h4">Add New Post</Typography>
          <TextField
            sx={{ mt: 1 }}
            id="outlined-basic"
            label="Enter Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            variant="outlined"
            sx={{
              width: "12.5%",
              fontSize: "12.5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mt: 1,
            }}
          >
            <PermMediaIcon sx={{ fontSize: "20px" }} />
            Add Media
          </Button>
          <TextField
            sx={{ mt: 1 }}
            id="outlined-multiline-static"
            label="Enter Description"
            multiline
            rows={15}
            variant="outlined"
            onChange={handleDescriptionChange}
            error={exceedLimit}
            helperText={exceedLimit ? "Description exceeds 2000 characters" : null}
            InputProps={{
              endAdornment: <span style={{ opacity: 0.75 }}>{characters}/2000</span>,
            }}
          />
          <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                width: "12.5%",
                fontSize: "12.5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                mt: 1,
              }}
              onClick={handleSubmit}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "12.5%",
                fontSize: "12.5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                mt: 1,
              }}
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button>
          </Stack>
        </Stack>
        <Stack sx={{ width: "35%" }}></Stack>
      </Stack>
    </NavbarContent>
  );
}
