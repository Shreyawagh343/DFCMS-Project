import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper, 
  CircularProgress,
  useTheme,
  Avatar
} from "@mui/material";
import axios from "axios";
import { keyframes } from "@emotion/react";
import { useParams } from "react-router-dom";


// Define a subtle fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CaseStatistics = () => {
  const { officerCode } = useParams();
  const [activeCases, setActiveCases] = useState(null);
  const [closedCases, setClosedCases] = useState(null);
  const [newCases, setNewCases] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const userName =JSON.parse(localStorage.getItem("users")).fullname; 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authtoken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `http://localhost:4001/cases/${officerCode}/statistics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { activeCases, closedCases, newCases } = response.data;
        setActiveCases(activeCases);
        setClosedCases(closedCases);
        setNewCases(newCases);
      } catch (error) {
        console.error("Error fetching case data:", error);
        setError(error.response?.data?.message || error.message);

        if (error.response?.status === 401) {
          navigate(`/officer/${officerCode}/dashboard`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [officerCode]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "150px",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{
        background: '#03045e',
        width:"87vw",
        height:"28vh",
        padding: '1.5rem',
        marginLeft:"8rem",
        marginTop:"4rem",
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
        <Avatar
        sx={{
          width: 100,
          height: 100,
          marginTop: "0.5rem",
          marginLeft:"5rem",
          border: '3px solid white',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
        src="https://img.freepik.com/premium-vector/manager-icon_933463-4265.jpg?w=740"
      />
      {/* Welcome Message and Paragraph */}
      <Box>
        <Typography variant="h5" fontWeight="bold" style={{ color: "white" , marginLeft:"2rem" }}>
          Welcome, {userName}
        </Typography>
        <Typography
          variant="body1"
          style={{
            paddingTop: "0.5rem",
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: "60vw",
            marginLeft:"2rem"
          }}
        >
            You currently have{' '}
          <strong>{activeCases} active cases</strong>,{' '}
          <strong>{closedCases} closed cases</strong>, and{' '}
          <strong>{newCases} new cases</strong> to review. Your progress is critical in ensuring timely and accurate forensic analysis. Keep up the great work!
        </Typography>
      </Box>
          
      {/* Avatar */}
    </Box>
    <Box 
              sx={{
                display: "flex",
                ml:18,
                gap: 3,
                mb: 4,
                mt:6,
                animation: `${fadeIn} 0.5s ease-in-out`,
              }}
            >
              {/* Active Cases Card */}
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  width: "30%",
                  textAlign: "center",
                  borderRadius: "12px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.text.secondary, mb: 1 }}
                >
                  Active Cases
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                >
                  {activeCases}
                </Typography>
              </Paper>
        
              {/* Closed Cases Card */}
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  width: "30%",
                  textAlign: "center",
                  borderRadius: "12px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.text.secondary, mb: 1 }}
                >
                  Closed Cases
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: theme.palette.success.main }}
                >
                  {closedCases}
                </Typography>
              </Paper>
        
              {/* New Cases Card */}
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  width: "30%",
                  textAlign: "center",
                  borderRadius: "12px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.text.secondary, mb: 1 }}
                >
                  New Cases
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: theme.palette.warning.main }}
                >
                  {newCases}
                </Typography>
              </Paper>
            </Box>
    </>
  );
};

export default CaseStatistics;
