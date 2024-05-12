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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const categories = [
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

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [characters, setCharacters] = useState<number>(0);
  const [, setSubtitleCharacters] = useState<number>(0);
  const [subtitleExceedLimit, setSubtitleExceedLimit] =
    useState<boolean>(false);
  const [exceedLimit, setExceedLimit] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [tempVisibility, setVisibilityTemp] = useState<string>("");
  const [value, setValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  if (!isLoggedIn) {
    navigate("/login");
  }

  if (status === "") {
    setStatus("Editing");
  }

  if (selectedCategory === "") {
    setSelectedCategory("Not chosen");
  }

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChipClick = (category: string) => {
    setSelectedCategory(category);
    console.log("Selected category:", { category });
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
    if (subtitleExceedLimit) {
      setSnackbarOpen(true);
      setSnackbarMessage("Subtitle exceeds 200 characters");
      setSnackbarSeverity("error");
      return;
    }
    if (visibility === "") {
      setSnackbarOpen(true);
      setSnackbarMessage("Visibility cannot be empty");
      setSnackbarSeverity("error");
      return;
    }
    if (selectedCategory === "Not chosen") {
      setSnackbarOpen(true);
      setSnackbarMessage("Category not selected");
      setSnackbarSeverity("error");
      return;
    }
    console.log("subtitle:", subtitle);
    try {
      const postData = {
        title: title,
        subtitle: subtitle,
        description: description,
        author: localStorage.getItem("username"),
        visibility: visibility,
        category: selectedCategory,
        status: "Published",
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
      setStatus("Published");
    } catch (error) {
      console.error("Error creating post:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("Failed to create post");
      setSnackbarSeverity("error");
      setStatus("Pending");
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

  const handleSaveDraft = async () => {
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
    if (subtitleExceedLimit) {
      setSnackbarOpen(true);
      setSnackbarMessage("Subtitle exceeds 200 characters");
      setSnackbarSeverity("error");
      return;
    }
    if (visibility === "") {
      setSnackbarOpen(true);
      setSnackbarMessage("Visibility cannot be empty");
      setSnackbarSeverity("error");
      return;
    }
    if (selectedCategory === "Not chosen") {
      setSnackbarOpen(true);
      setSnackbarMessage("Category not selected");
      setSnackbarSeverity("error");
      return;
    }
    try {
      const postData = {
        title: title,
        subtitle: subtitle,
        description: description,
        author: localStorage.getItem("username"),
        visibility: visibility,
        category: selectedCategory,
        status: "Draft",
      };
      const response = await fetch("http://localhost:5000/postly/createDraft", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Draft creation failed");
      }
      setSnackbarOpen(true);
      setSnackbarMessage("Successfully created draft");
      setSnackbarSeverity("success");
      setStatus("Published");
    } catch (error) {
      console.error("Error creating draft:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("Failed to create draft");
      setSnackbarSeverity("error");
    }
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubtitle(value);
    setSubtitleCharacters(value.length);
    if (value.length > 200) {
      setSubtitleExceedLimit(true);
    } else {
      setSubtitleExceedLimit(false);
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
            id="outlined-basic"
            label="Enter Subtitle"
            variant="outlined"
            onChange={handleSubtitleChange}
            error={subtitleExceedLimit}
            helperText={
              subtitleExceedLimit ? "Subtitle exceeds 200 characters" : null
            }
          />
          <TextField
            sx={{ mt: 2 }}
            id="outlined-multiline-static"
            label="Enter Description"
            multiline
            rows={20}
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
              height: "35.8%",
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
                <Button
                  onClick={handleSaveDraft}
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                >
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
                    width: "100%",
                    justifyContent: "space-between",
                    gap: 0.75,
                  }}
                >
                  <Typography>
                    Status: <b>{status}</b>
                  </Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 0.75,
                    }}
                  >
                    <Typography>
                      Category: <b>{selectedCategory}</b>
                    </Typography>
                  </Stack>
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
                height: "27.2%",
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
          <Box
            sx={{
              border: "1px #c4c4c4 solid",
              width: "100%",
              height: "65%",
              mt: 1,
              borderRadius: "5px",
            }}
          >
            <Typography sx={{ p: 1 }}>
              <b>Category</b>
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
                  flexDirection: "column",
                  width: "95%",
                  justifyContent: "space-between",
                }}
              >
                <Stack>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChangeTab}
                        aria-label="basic tabs example"
                      >
                        <Tab label="All Categories" {...a11yProps(0)} />
                        <Tab label="Coming soon" {...a11yProps(1)} />
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                      <Grid container spacing={1}>
                        {categories.map((category, index) => (
                          <Grid
                            item
                            xs={matches && category.length > 10 ? 3 : 3}
                            sm={matches && category.length > 10 ? 3 : 3}
                            key={index}
                          >
                            <Chip
                              sx={{
                                border:
                                  selectedCategory === category
                                    ? "1px #1976d2 solid"
                                    : "1px #c4c4c4 solid",
                                background:
                                  selectedCategory === category
                                    ? "#e0f0ff"
                                    : "#fff",
                                "&:hover": { cursor: "pointer" },
                              }}
                              label={category}
                              onClick={() => handleChipClick(category)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      Coming soon
                    </CustomTabPanel>
                  </Box>
                </Stack>
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
