import React from 'react'

const Cases = () => {
  return (
    <div>
        <Box
              sx={{
                display: "flex",
                ml:16,
                gap: 3,
                mb: 4,
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
    </div>
  )
}

export default Cases