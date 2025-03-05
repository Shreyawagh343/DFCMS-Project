import React from "react";
import SideDrawer from "./SideDrawer";
import {
  Toolbar,
  AppBar,
  Typography
} from "@mui/material";

const OfficersCases = () => {

  return (
    <div>
      <AppBar
        position="static"
        color="default"
        elevation={2}
        style={{ height: "5rem"}}
      >
        <Toolbar className="flex justify-between">
          <Typography
            variant="h6"
            fontWeight="bold"
            style={{
              paddingLeft: "5rem",
              fontSize: "2rem",
              paddingTop: "1rem",
              color: "black",
            }}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <SideDrawer />
    </div>
  );
};

export default OfficersCases;
