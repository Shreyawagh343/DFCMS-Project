import React, { useState, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import SideDrawer from "./SideDrawer"; // Assuming you have a SideDrawer component
import AdminSideDrawer from "./AdminSideDrawer";

const AdminNavbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const officerCode = JSON.parse(localStorage.getItem("users")).officerCode;

  // Fetch notifications (queries) from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("authtoken");
        const response = await axios.get(
          `http://localhost:4001/query/${officerCode}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [officerCode]);

  // Dummy data for user profile
  const user = {
    name: "Admin User",
    photo: "https://img.freepik.com/premium-vector/manager-icon_933463-4265.jpg?w=740", // Replace with actual photo URL
  };

  return (
    <div>
      {/* AppBar for the Navbar */}
      <AppBar
        position="static"
        color="default"
        elevation={2}
        style={{ height: "5rem" }}
      >
        <Toolbar className="flex justify-between">
          {/* Left Side: Logo/Brand Name */}
          <Typography
            variant="h6"
            fontWeight="bold"
            style={{
              fontSize: "2rem",
              paddingTop: "1rem",
              color: "black",
              marginLeft:"5rem"
            }}
          >
            Forensic Case Manager
          </Typography>

          {/* Right Side: Notification Icon and User Profile */}
          <div className="flex items-center space-x-6">
            {/* Notification Icon */}
            <div className="relative">
              <IconButton
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                color="inherit"
              >
                <Badge badgeContent={notifications.length} color="error">
                  <BellIcon className="h-6 w-6 text-gray-500" />
                </Badge>
              </IconButton>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        className="px-4 py-3 border-b border-gray-200 hover:bg-gray-100"
                      >
                        <div className="text-sm font-semibold text-gray-800">
                          Case: {notification.CaseName}
                        </div>
                        <div className="text-xs text-gray-600">
                          Officer Code: {notification.officerCode}
                        </div>
                        <div className="text-sm text-gray-700 mt-1">
                          Query: {notification.query}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Created At: {new Date(notification.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-700">
                      No new notifications.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <Avatar src={user.photo} alt="User Profile" />
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* SideDrawer */}
      <AdminSideDrawer/>
    </div>
  );
};

export default AdminNavbar;