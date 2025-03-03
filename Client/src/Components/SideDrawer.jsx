import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Assignment as CaseIcon,
  Folder as ClosedCasesIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  ChevronLeft as CollapseIcon,
  ChevronRight as ExpandIcon,
  GetApp as InstallIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const drawerWidth = 240;

const SideDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true); // Sidebar open/closed state
  const [selectedItem, setSelectedItem] = useState("Assigned Cases"); // Active menu item

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : theme.spacing(7),
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : theme.spacing(7),
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5", // Light background color
          color: "#333", // Darker text color for contrast
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Toolbar>
        <IconButton onClick={handleDrawerToggle} color="inherit">
          {open ? <CollapseIcon /> : <ExpandIcon />}
        </IconButton>
        {open && (
          <Typography variant="h6" noWrap sx={{ fontSize: '1.25rem' }}> {/* Smaller text size */}
            Dashboard
          </Typography>
        )}
      </Toolbar>
      <Divider />

      {/* Menu Items */}
      <List>
        <ListItem
          button
          component={Link}
          to="/AddCase"
          onClick={() => handleMenuItemClick("Add Case")}
          sx={{
            backgroundColor:
              selectedItem === "Add Case" ? theme.palette.action.selected : "transparent",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            borderRadius: 1,
            margin: theme.spacing(0.5),
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}><CaseIcon /></ListItemIcon>
          {open && <ListItemText primary="Add Case" sx={{ fontSize: '0.875rem' }} />}
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/closed-cases"
          onClick={() => handleMenuItemClick("Closed Cases")}
          sx={{
            backgroundColor:
              selectedItem === "Closed Cases" ? theme.palette.action.selected : "transparent",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            borderRadius: 1,
            margin: theme.spacing(0.5),
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}><ClosedCasesIcon /></ListItemIcon>
          {open && <ListItemText primary="Closed Cases" sx={{ fontSize: '0.875rem' }} />}
        </ListItem>

        {/* Add more ListItem components for other menu items as needed */}
      </List>

      {/* Logout Item at the Bottom */}
      <Box sx={{ marginTop: 'auto' }}> {/* Pushes the logout item to the bottom */}
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to="/logout"
            onClick={() => handleMenuItemClick("Logout")}
            sx={{
              backgroundColor:
                selectedItem === "Logout" ? theme.palette.action.selected : "transparent",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              borderRadius: 1,
              margin: theme.spacing(0.5),
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}><LogoutIcon /></ListItemIcon>
            {open && <ListItemText primary="Logout" sx={{ fontSize: '0.875rem' }} />}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;