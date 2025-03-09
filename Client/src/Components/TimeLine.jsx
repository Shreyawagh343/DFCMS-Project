import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import 'react-vertical-timeline-component/style.min.css';
import { useParams } from 'react-router-dom';
import { VerticalTimeline } from 'react-vertical-timeline-component';

const TimeLine = () => {
  const { officerCode } = useParams();
  const [cases, setCases] = useState([]); // State to store fetched cases
  const [error, setError] = useState(null); // State for error handling

  // Fetch cases from the backend
  useEffect(() => {
    const fetchCases = async () => {
      const token = localStorage.getItem('authtoken');
      try {
        const response = await fetch(`http://localhost:4001/cases/officer/${officerCode}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          // Handle unauthorized access
          console.log('Unauthorized access - redirecting to login');
          localStorage.removeItem('authtoken');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch cases');
        }

        const data = await response.json();
        console.log('Fetched Data:', data); // Debugging: Log the fetched data
        setCases(data.cases); // Set the fetched cases to state
      } catch (error) {
        console.error('Fetch Error:', error); // Debugging: Log the error
        setError(error.message); // Set error message if something goes wrong
      }
    };

    fetchCases();
  }, [officerCode]);

  let latestEvents = cases.slice(-4);

  return (
    <Box sx={{ mt: 4, ml: 8 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Latest Case Timeline
      </Typography>
      <VerticalTimeline>
        <Grid container spacing={3}>
          {latestEvents.map((event, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  width: '100%',
                  maxHeight: '30vh', // Set a maximum height
                  overflowY: 'auto', // Enable vertical scrolling
                  
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  {event.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  {event.date}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {event.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </VerticalTimeline>
    </Box>
  );
};

export default TimeLine;
