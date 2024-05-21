import React from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";

/* Icons */
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import InventoryIcon from "@mui/icons-material/Inventory";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HelpIcon from "@mui/icons-material/Help";
import SourceIcon from "@mui/icons-material/Source";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import ArchiveIcon from "@mui/icons-material/Archive";
import PostAddIcon from "@mui/icons-material/PostAdd";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  display: "flex",
  justifyContent: "space-between",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  const openPDFUserGuide = () => {
    window.open("./src/assets/docs/userguide.pdf", "_blank");
  };

  const openPDFItpersonell = () => {
    window.open("./src/assets/docs/IT-personell.pdf", "_blank");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px red solid",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Postly
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: "15px" }}
                noWrap
                component="div"
              >
                {username &&
                  username.charAt(0).toUpperCase() + username.slice(1)}
              </Typography>
              <AccountCircleIcon />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            Postly
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Blogs"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  switch (index) {
                    case 0:
                      navigate("/");
                      break;
                    case 1:
                      navigate("/blogs");
                      break;
                    default:
                      break;
                  }
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <FeedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {isLoggedIn ? (
          <>
            <Divider />
            <List>
              {[
                "Account",
                "Create Blog",
                "Your Blogs",
                "Drafts",
                "Archive",
              ].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      switch (index) {
                        case 0:
                          navigate("/account");
                          break;
                        case 1:
                          navigate("/create");
                          break;
                        case 2:
                          navigate("/Inventory");
                          break;
                        default:
                          break;
                      }
                    }}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {index === 0 && <AccountCircleIcon />}
                      {index === 1 && <PostAddIcon />}
                      {index === 2 && (
                        <Badge badgeContent={4} color="primary">
                          <InventoryIcon />
                        </Badge>
                      )}
                      {index === 3 && <DesignServicesIcon />}
                      {index === 4 && <ArchiveIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        ) : null}
        <Divider />
        <List>
          {[
            "Customer Support",
            "User Guide",
            "IT Personel",
            "Documentation",
            "FAQ",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  switch (index) {
                    case 0:
                      navigate("/support");
                      break;
                    case 1:
                      openPDFUserGuide();
                      break;
                    case 2:
                      openPDFItpersonell();
                      break;
                    case 3:
                      navigate("/Documentation");
                      break;
                    case 4:
                      navigate("/FAQ");
                      break;
                    default:
                      break;
                  }
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 && <SupportAgentIcon />}
                  {index === 1 && <HelpIcon />}
                  {index === 2 && <SourceIcon />}
                  {index === 3 && <IntegrationInstructionsIcon />}
                  {index === 4 && <QuestionAnswerIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        {open && !isLoggedIn ? (
          <Stack
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "95%" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ width: "95%" }}
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </Stack>
        ) : open && isLoggedIn ? (
          <Stack
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "95%" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        ) : null}
      </Drawer>
      <Box
        component="main"
        sx={{
          width: "100%",
          height: "100vh",
          pl: 2.5,
          pt: 5,
          overflow: "auto",
        }}
      >
        <Box sx={{ width: "98.75%", mt: "2%" }}>{children}</Box>
      </Box>
    </Box>
  );
}
