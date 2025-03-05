import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', cases: 40 },
  { name: 'Feb', cases: 30 },
  { name: 'Mar', cases: 20 },
  { name: 'Apr', cases: 27 },
  { name: 'May', cases: 18 },
  { name: 'Jun', cases: 23 },
];

const PieChat = () => {
  return (
    <Box sx={{ mt: 4 , ml:14 }}>
      <Typography variant="h6" style={{fontSize:"20px", marginLeft:"2rem"}} fontWeight="bold" gutterBottom>
        Case Analytics
      </Typography>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="cases" fill="#8884d8" />
      </BarChart>
    </Box>
  );
};

export default PieChat;