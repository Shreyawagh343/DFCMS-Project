import React from 'react';
import { useParams } from 'react-router-dom';
import SideDrawer from './SideDrawer';
 
import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";


const OfficersCases = () => {
  const { officerCode } = useParams();

    return (
        <div>
              <AppBar position="static" color="default" elevation={2} style={{height:"5rem" , backgroundColor:"#03045E"}}>
      <Toolbar className="flex justify-between">
        <Typography variant="h6" fontWeight="bold" style={{
          paddingLeft:"5rem" , fontSize:"2rem" , paddingTop:"1rem" , color:"white"
        }}>
          Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="subtitle1" fontWeight="medium" style={{
           paddingTop:"1rem",color:"white"
        }}>
          {officerCode} 
          </Typography>
          <Avatar style={{
           marginTop:"1rem"
        }} src="https://img.freepik.com/premium-vector/manager-icon_933463-4265.jpg?w=740"/>
        </Box>
      </Toolbar>
    </AppBar>  
        <SideDrawer/>
        </div>
    );
};

export default OfficersCases;