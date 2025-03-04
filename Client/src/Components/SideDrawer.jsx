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
  ExitToApp as LogoutIcon,
  ChevronLeft as CollapseIcon,
  ChevronRight as ExpandIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const drawerWidth = 240;

const SideDrawer = () => {

  const user = JSON.parse(localStorage.getItem("users"));
  const officerCode = user?.officerCode;

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Assigned Cases");

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem("authtoken");
    toast.success("Logged out successfully");
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
          backgroundColor: "#f9fafb",
          color: "#4b5563",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Toolbar className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <IconButton onClick={handleDrawerToggle} color="inherit">
          {open ? <CollapseIcon /> : <ExpandIcon />}
        </IconButton>
        {open && (
          <Typography
            variant="h6"
            noWrap
            sx={{
              color: "black",
              fontWeight: "bold",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Dashboard
          </Typography>
        )}
      </Toolbar>
      <Divider />

      <List className="space-y-3 p-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ListItem
            button
            component={Link}
            to={`/officer/${officerCode}/dashboard`}
            onClick={() => handleMenuItemClick("DashBoard")}
            sx={{
              borderRadius: "8px",
              backgroundColor:
                selectedItem === "DashBoard" ? "#e0f7fa" : "transparent",
              "&:hover": {
                backgroundColor: "#e0f7fa",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#3b82f6", minWidth: "40px" }}>
              <ClosedCasesIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="DashBoard"
                sx={{ color: "#3b82f6", fontWeight: "medium" }}
              />
            )}
          </ListItem>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ListItem
            button
            component={Link}
            to="/AddCase"
            onClick={() => handleMenuItemClick("Add Case")}
            sx={{
              borderRadius: "8px",
              backgroundColor:
                selectedItem === "Add Case" ? "#e0f7fa" : "transparent",
              "&:hover": {
                backgroundColor: "#e0f7fa",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#3b82f6", minWidth: "40px" }}>
              <CaseIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Add Case"
                sx={{ color: "#3b82f6", fontWeight: "medium" }}
              />
            )}
          </ListItem>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ListItem
            button
            component={Link}
            to={`/${officerCode}/Contact`}
            onClick={() => handleMenuItemClick("Contact")}
            sx={{
              borderRadius: "8px",
              backgroundColor:
                selectedItem === "Contact" ? "#e0f7fa" : "transparent",
              "&:hover": {
                backgroundColor: "#e0f7fa",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#3b82f6", minWidth: "40px" }}>
              <ClosedCasesIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Contact"
                sx={{ color: "#3b82f6", fontWeight: "medium" }}
              />
            )}
          </ListItem>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ListItem
            button
            component={Link}
            to="/loginhome"
            onClick={() => handleMenuItemClick("Login")}
            sx={{
              borderRadius: "8px",
              backgroundColor:
                selectedItem === "Login" ? "#e0f7fa" : "transparent",
              "&:hover": {
                backgroundColor: "#e0f7fa",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#3b82f6", minWidth: "40px" }}>
              <ClosedCasesIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Login"
                sx={{ color: "#3b82f6", fontWeight: "medium" }}
              />
            )}
          </ListItem>
        </motion.div>
        
      </List>

      <Box sx={{ mt: "auto", p: 3 }}>
        <Divider />
        <List>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ListItem
              button
              component={Link}
              to="/signin"
              onClick={() => handleLogout()}
              sx={{
                borderRadius: "8px",
                color: "#ef4444",
                backgroundColor:
                  selectedItem === "Logout" ? "#fecaca" : "transparent",
                "&:hover": {
                  backgroundColor: "#fecaca",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#ef4444", minWidth: "40px" }}>
                <LogoutIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Logout"
                  sx={{ color: "#ef4444", fontWeight: "medium" }}
                />
              )}
            </ListItem>
          </motion.div>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
