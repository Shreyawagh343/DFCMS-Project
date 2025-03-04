import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/admin-notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mt: 4 }}>
        Admin Notifications
      </Typography>
      <List>
        {notifications.map((notification, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`Officer: ${notification.officerName}`}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`Case ID: ${notification.caseId}`}
                    </Typography>
                    {" — " + notification.query}
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default AdminNotifications;
