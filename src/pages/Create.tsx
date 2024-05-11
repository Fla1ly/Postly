import NavbarContent from "../components/Nav";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Box,
  Divider,
  Container,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [characters, setCharacters] = useState<number>(0);
  const [exceedLimit, setExceedLimit] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDialog, setOpenDialog] = useState(false);
  const [visibility, setVisibility] = useState<string>("");
  const [tempVisibility, setVisibilityTemp] = useState<string>("");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    navigate("/login");
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    if (title === "" || description === "") {
      setSnackbarOpen(true);
      setSnackbarMessage("Title and description cannot be empty");
      setSnackbarSeverity("error");
      return;
    }
    if (exceedLimit) {
      setSnackbarOpen(true);
      setSnackbarMessage("Description exceeds 2000 characters");
      setSnackbarSeverity("error");
      return;
    }
    try {
      const postData = {
        title: title,
        description: description,
        createdBy: localStorage.getItem("username"),
      };
      const response = await fetch("http://localhost:5000/postly/createPost", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Post creation failed");
      }
      setSnackbarOpen(true);
      setSnackbarMessage("Successfully created post");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error creating post:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("Failed to create post");
      setSnackbarSeverity("error");
    }
  };

  const handleChangeVisibility = (
    event: SelectChangeEvent<typeof visibility>
  ) => {
    setVisibilityTemp(String(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpenDialog(false);
    }
  };

  const handleCloseOk = () => {
    setVisibility(tempVisibility);
    setOpenDialog(false);
  };

  // const handleSaveDraft = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/postly/saveDraft", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title,
  //         description,
  //       }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Draft save failed");
  //     }
  //     console.log("Draft saved successfully");
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error saving draft:", error);
  //   }
  // };

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
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ width: "70%" }}>
          <Typography variant="h4">Add New Post</Typography>
          <TextField
            sx={{ mt: 1 }}
            id="outlined-basic"
            label="Enter Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            sx={{ mt: 2 }}
            id="outlined-multiline-static"
            label="Enter Description"
            multiline
            rows={15}
            variant="outlined"
            onChange={handleDescriptionChange}
            error={exceedLimit}
            helperText={
              exceedLimit ? "Description exceeds 2000 characters" : null
            }
            InputProps={{
              endAdornment: (
                <span style={{ opacity: 0.75 }}>{characters}/2000</span>
              ),
            }}
          />
        </Stack>
        <Stack sx={{ width: "27.5%" }}>
          <Typography variant="h4">Settings</Typography>
          <Box
            sx={{
              border: "1px #c4c4c4 solid",
              width: "100%",
              height: "42.85%",
              mt: 1,
              borderRadius: "5px",
            }}
          >
            <Typography sx={{ p: 1 }}>
              <b>Publish</b>
            </Typography>
            <Divider />
            <Stack
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "95%",
                  justifyContent: "space-between",
                }}
              >
                <Button variant="outlined" sx={{ textTransform: "none" }}>
                  Save Draft
                </Button>
                <Button variant="outlined" sx={{ textTransform: "none" }}>
                  Preview
                </Button>
              </Stack>
            </Stack>
            <Stack
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Stack sx={{ width: "95%", gap: 0.75 }}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 0.75,
                  }}
                >
                  <Typography>
                    Status: <b>Draft</b>
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 0.75,
                  }}
                >
                  <Typography>
                    Visibility: <b>{visibility}</b>
                  </Typography>
                  <Typography
                    sx={{
                      textDecoration: "Underline",
                      color: "#0070ff",
                      "&:hover": { cursor: "pointer" },
                    }}
                    onClick={handleClickOpen}
                  >
                    Edit
                  </Typography>
                  <Dialog
                    disableEscapeKeyDown
                    open={openDialog}
                    onClose={handleClose}
                  >
                    <DialogTitle>Change The Visibility</DialogTitle>
                    <DialogContent>
                      <Box
                        component="form"
                        sx={{ display: "flex", flexWrap: "wrap" }}
                      >
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel htmlFor="demo-dialog-native">
                            Visibility
                          </InputLabel>
                          <Select
                            native
                            value={tempVisibility}
                            onChange={handleChangeVisibility}
                            input={
                              <OutlinedInput
                                label="Visibility"
                                id="demo-dialog-native"
                              />
                            }
                          >
                            <option aria-label="None" value="" />
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                          </Select>
                        </FormControl>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleCloseOk}>Ok</Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
              </Stack>
            </Stack>
            <Container sx={{ height: "12.5px" }}></Container>
            <Divider />
            <Stack
              sx={{
                height: "50px",
                width: "100%",
                background: "#f5f5f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  width: "95%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <DeleteIcon
                  sx={{
                    color: "red",
                    fontSize: 25,
                    "&:hover": { cursor: "pointer" },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={handleSubmit}
                >
                  Publish
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity as AlertColor}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </NavbarContent>
  );
}
