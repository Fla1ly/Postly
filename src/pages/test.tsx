// import {
//     styled,
//     useTheme,
//     Theme,
//     CSSObject,
//     ThemeProvider,
//     createTheme,
//   } from "@mui/material/styles";
//   import Box from "@mui/material/Box";
//   import MuiDrawer from "@mui/material/Drawer";
//   import List from "@mui/material/List";
//   import CssBaseline from "@mui/material/CssBaseline";
//   import Typography from "@mui/material/Typography";
//   import Divider from "@mui/material/Divider";
//   import IconButton from "@mui/material/IconButton";
//   import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
//   import ChevronRightIcon from "@mui/icons-material/ChevronRight";
//   import ListItem from "@mui/material/ListItem";
//   import ListItemButton from "@mui/material/ListItemButton";
//   import ListItemIcon from "@mui/material/ListItemIcon";
//   import ListItemText from "@mui/material/ListItemText";
//   import HomeIcon from "@mui/icons-material/Home";
//   import { useNavigate } from "react-router-dom";
//   import ExitToAppIcon from "@mui/icons-material/ExitToApp";
//   import PersonIcon from "@mui/icons-material/Person";
//   import NotesIcon from "@mui/icons-material/Notes";
//   import { HeaderStackTextContent } from "./Headerbar";
//   import SearchIcon from "@mui/icons-material/Search";
//   import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
//   import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
//   import PeopleIcon from "@mui/icons-material/People";
//   import ChecklistIcon from "@mui/icons-material/Checklist";
//   import InboxIcon from "@mui/icons-material/Inbox";
//   import VisibilityIcon from "@mui/icons-material/Visibility";
//   import React from "react";
//   import { useAuth } from "./Contexts/useAuth";
//   import { useUser } from "./Contexts/UserContext";
//   import UploadFileIcon from '@mui/icons-material/UploadFile';
//   const drawerWidth = "calc(12% + 55px)";
  
//   const openedMixin = (theme: Theme): CSSObject => ({
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   });
  
//   const closedMixin = (theme: Theme): CSSObject => ({
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     width: `calc(${theme.spacing(7)} + 1px)`,
//     [theme.breakpoints.up("sm")]: {
//       width: `calc(${theme.spacing(8)} + 1px)`,
//     },
//   });
  
//   const DrawerHeader = styled("div")(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
//   }));
  
//   const Drawer = styled(MuiDrawer, {
//     shouldForwardProp: (prop) => prop !== "open",
//   })(({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap",
//     boxSizing: "border-box",
//     ...(open && {
//       ...openedMixin(theme),
//       "& .MuiDrawer-paper": openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       "& .MuiDrawer-paper": closedMixin(theme),
//     }),
//   }));
  
//   export default function MainContent({
//     children,
//   }: {
//     children: React.ReactNode;
//   }) {
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(window.innerWidth > 900);
//     const { clearAuth } = useAuth();
//     const { userData } = useUser();
//     const permissions = userData?.permissions || "";
  
//     const handleResize = () => {
//       if (window.innerWidth < 900) {
//         setOpen(false);
//       } else {
//         setOpen(true);
//       }
//     };
  
//     React.useEffect(() => {
//       window.addEventListener("resize", handleResize);
  
//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }, []);
//     const navigate = useNavigate();
  
//     const strokeWidth = 0.75;
  
//     const lastSetStatus = () => {
//       if (window.innerWidth > 900) {
//         setOpen(!open);
//       } else {
//         setOpen(false);
//       }
//     };
  
//     const handleLogout = async () => {
//       clearAuth();
//     };
  
//     React.useEffect(() => {
//       const handleResize = () => {
//         if (window.innerWidth < 900) {
//           setOpen(false);
//         } else {
//           setOpen(true);
//         }
//       };
  
//       window.addEventListener("resize", handleResize);
//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }, []);
  
//     const darkTheme = createTheme({
//       typography: {
//         fontSize: 12.5,
//         fontFamily:
//           "Inter, Roboto, Nunito, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
//       },
//       palette: {
//         mode: "dark",
//         background: {
//           default: "#101418",
//         },
//       },
//     });
  
//     const isAdmin = permissions.includes('siteAdministrator');
//     const isEmployee = permissions.includes('sbiEmployee') || isAdmin;
//     // const isVisitor = permissions.includes('authorizedVisitor');
  
//     return (
//       <ThemeProvider theme={darkTheme}>
//         <Box sx={{ display: "flex", height: "100%" }}>
//           <CssBaseline />
//           <Drawer
//             variant="permanent"
//             open={window.innerWidth > 900 ? open : false}
//           >
//             <DrawerHeader
//               sx={{ display: "flex", justifyContent: "space-between" }}
//             >
//               {open && (
//                 <Typography
//                   sx={{
//                     pl: 1,
//                     fontSize: "1.7em",
//                     ".headerStackTextContent": {
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                     },
//                     ".headerStackTextContent span": {
//                       display: "inline-block",
//                       verticalAlign: "top",
//                     },
//                   }}
//                 >
//                   <HeaderStackTextContent />
//                 </Typography>
//               )}
//               <IconButton onClick={lastSetStatus}>
//                 {theme.direction === "rtl" ? (
//                   open ? (
//                     <ChevronRightIcon />
//                   ) : (
//                     <ChevronLeftIcon />
//                   )
//                 ) : open ? (
//                   <ChevronLeftIcon />
//                 ) : (
//                   <ChevronRightIcon />
//                 )}
//               </IconButton>
//             </DrawerHeader>
//             <Divider />
//             <List
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               {open && (
//                 <Typography
//                   sx={{
//                     p: 2.5,
//                     width: "100%",
//                     textAlign: "center",
//                     display: "flex",
//                     fontSize: 16,
//                   }}
//                 >
//                   Overview
//                 </Typography>
//               )}
//               {[
//                 {
//                   icon: <HomeIcon />,
//                   text: "Home",
//                   data: "home",
//                 },
//               ].map((item) => (
//                 <ListItem
//                   key={item.text}
//                   disablePadding
//                   sx={{ display: "block", width: "92%" }}
//                   onClick={() => {
//                     navigate(`/${item.data}`);
//                   }}
//                 >
//                   <ListItemButton
//                     sx={{
//                       borderRadius: "15px",
//                       color: "#B3B9C6",
//                       "&:hover": {
//                         color: "#FFF",
//                         fontWeight: "600",
//                       },
//                       minHeight: 48,
//                       justifyContent: open ? "initial" : "center",
//                       px: 2.5,
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         strokeWidth: strokeWidth,
//                         minWidth: 0,
//                         justifyContent: "center",
//                         mr: open ? 3 : "auto",
//                         color: "#B3B9C6",
//                       }}
//                     >
//                       {item.icon}
//                     </ListItemIcon>
  
//                     <ListItemIcon
//                       sx={{
//                         justifyContent: "center",
//                         display: "flex",
//                         minWidth: "auto",
//                         color: "#B3B9C6",
//                         strokeWidth: strokeWidth,
//                       }}
//                     ></ListItemIcon>
//                     {open && <ListItemText primary={item.text} />}
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//             <Divider />
//             {isEmployee && (
//             <List
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               {open && (
//                 <Typography
//                   sx={{
//                     fontSize: 16,
//                     p: 2.5,
//                     width: "100%",
//                     textAlign: "center",
//                     display: "flex",
//                     color: "#B3B9C6",
//                   }}
//                 >
//                   Intelligence Tools
//                 </Typography>
//               )}
//               {[
//                 {
//                   icon: <SearchIcon />,
//                   text: "Background Check",
//                   data: "backgroundCheck",
//                 },
//                 {
//                   icon: <AssignmentIndIcon />,
//                   text: "Record Check",
//                   data: "recordCheck",
//                 },
//                 {
//                   icon: <PeopleIcon />,
//                   text: "Account Database",
//                   data: "accountDatabase",
//                 },
//                 {
//                   icon: <DocumentScannerIcon />,
//                   text: "Documents",
//                   data: "documents",
//                 },
//                 {
//                   icon: <ChecklistIcon />,
//                   text: "Badgometer",
//                   data: "badgometer",
//                 },
//                 {
//                   icon: <VisibilityIcon />,
//                   text: "Watchlists",
//                   data: "watchlists",
//                 },
//               ].map((item) => (
//                 <ListItem
//                   key={item.text}
//                   disablePadding
//                   sx={{ display: "block", width: "92%" }}
//                   onClick={() => {
//                     navigate(`/${item.data}`);
//                   }}
//                 >
//                   <ListItemButton
//                     sx={{
//                       borderRadius: "15px",
//                       color: "#B3B9C6",
//                       "&:hover": {
//                         color: "#FFF",
//                         fontWeight: "600",
//                       },
//                       minHeight: 48,
//                       justifyContent: open ? "initial" : "center",
//                       px: 2.5,
//                       wordWrap: "break-word",
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         strokeWidth: strokeWidth,
//                         minWidth: 0,
//                         justifyContent: "center",
//                         mr: open ? 3 : "auto",
//                         color: "#B3B9C6",
//                       }}
//                     >
//                       {item.icon}
//                     </ListItemIcon>
  
//                     <ListItemIcon
//                       sx={{
//                         justifyContent: "center",
//                         display: "flex",
//                         minWidth: "auto",
//                         color: "#B3B9C6",
//                         strokeWidth: strokeWidth,
//                       }}
//                     ></ListItemIcon>
//                     {open && (
//                       <ListItemText
//                         primary={item.text}
//                         sx={{ wordWrap: "break-word" }}
//                       />
//                     )}
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//             )}
//             <Divider />
//             {isAdmin && (
//             <List
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               {open && (
//                 <Typography
//                   sx={{
//                     p: 2.5,
//                     width: "100%",
//                     textAlign: "center",
//                     display: "flex",
//                     fontSize: 16,
//                     color: "#B3B9C6",
//                   }}
//                 >
//                   Administrative Tools
//                 </Typography>
//               )}
//               {[
//                 {
//                   icon: <PersonIcon />,
//                   text: "Account Overview",
//                   data: "accountOverview",
//                 },
//                 {
//                   icon: <NotesIcon />,
//                   text: "Login Overview",
//                   data: "loginOverview",
//                 },
//                 {
//                   icon: <UploadFileIcon />,
//                   text: "Upload Documents",
//                   data: "uploadDocuments",
//                 },
//               ].map((item) => (
//                 <ListItem
//                   key={item.text}
//                   disablePadding
//                   sx={{ display: "block", width: "92%" }}
//                   onClick={() => {
//                     navigate(`/${item.data}`);
//                   }}
//                 >
//                   <ListItemButton
//                     sx={{
//                       borderRadius: "15px",
//                       color: "#B3B9C6",
//                       "&:hover": {
//                         color: "#FFF",
//                         fontWeight: "600",
//                       },
//                       minHeight: 48,
//                       justifyContent: open ? "initial" : "center",
//                       px: 2.5,
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         strokeWidth: strokeWidth,
//                         minWidth: 0,
//                         justifyContent: "center",
//                         mr: open ? 3 : "auto",
//                         color: "#B3B9C6",
//                       }}
//                     >
//                       {item.icon}
//                     </ListItemIcon>
  
//                     <ListItemIcon
//                       sx={{
//                         justifyContent: "center",
//                         display: "flex",
//                         minWidth: "auto",
//                         color: "#B3B9C6",
//                         strokeWidth: strokeWidth,
//                       }}
//                     ></ListItemIcon>
//                     {open && <ListItemText primary={item.text} />}
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//             )}
//             <Divider />
//             <List
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               {open && (
//                 <Typography
//                   sx={{
//                     fontSize: 16,
//                     p: 2.5,
//                     width: "100%",
//                     textAlign: "center",
//                     display: "flex",
//                     color: "#B3B9C6",
//                   }}
//                 >
//                   Personal Tools
//                 </Typography>
//               )}
//               {[
//                 {
//                   icon: <InboxIcon />,
//                   text: "Personal Docket",
//                   data: "personalDocket",
//                 },
//                 {
//                   icon: <PersonIcon />,
//                   text: "Account Settings",
//                   data: "accountSettings",
//                 }
//               ].map((item) => (
//                 <ListItem
//                   key={item.text}
//                   disablePadding
//                   sx={{ display: "block", width: "92%" }}
//                   onClick={() => {
//                     navigate(`/${item.data}`);
//                   }}
//                 >
//                   <ListItemButton
//                     sx={{
//                       borderRadius: "15px",
//                       color: "#B3B9C6",
//                       "&:hover": {
//                         color: "#FFF",
//                         fontWeight: "600",
//                       },
//                       minHeight: 48,
//                       justifyContent: open ? "initial" : "center",
//                       px: 2.5,
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         strokeWidth: strokeWidth,
//                         minWidth: 0,
//                         justifyContent: "center",
//                         mr: open ? 3 : "auto",
//                         color: "#B3B9C6",
//                       }}
//                     >
//                       {item.icon}
//                     </ListItemIcon>
  
//                     <ListItemIcon
//                       sx={{
//                         justifyContent: "center",
//                         display: "flex",
//                         minWidth: "auto",
//                         color: "#B3B9C6",
//                         strokeWidth: strokeWidth,
//                       }}
//                     ></ListItemIcon>
//                     {open && <ListItemText primary={item.text} />}
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//             <Box
//               sx={{
//                 mt: "auto",
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <List sx={{ width: "100%" }}>
//                 <Divider />
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     justifyContent: "center",
//                     display: "flex",
//                     width: "100%",
//                   }}
//                 >
//                   <ListItemButton
//                     sx={{
//                       justifyContent: "center",
//                       display: "flex",
//                       width: "100px",
//                       color: "#B3B9C6",
//                     }}
//                     onClick={handleLogout}
//                   >
//                     {!open && (
//                       <ListItemIcon
//                         sx={{
//                           justifyContent: "center",
//                           display: "flex",
//                           color: "#B3B9C6",
//                         }}
//                       >
//                         <ExitToAppIcon />
//                       </ListItemIcon>
//                     )}
//                     {open && (
//                       <ListItemText
//                         primary="Logout"
//                         sx={{
//                           textAlign: "center",
//                           minWidth: "auto",
//                           display: "inline",
//                         }}
//                       />
//                     )}
//                   </ListItemButton>
//                 </ListItem>
//               </List>
//             </Box>
//           </Drawer>
//           <Box
//             component="div"
//             sx={{
//               width: "100%",
//               height: "100vh",
//               pl: 10,
//               pt: 5,
//               overflow: "auto",
//             }}
//           >
//             <Box sx={{ width: "100%" }}>{children}</Box>
//           </Box>
//         </Box>
//       </ThemeProvider>
//     );
//   }