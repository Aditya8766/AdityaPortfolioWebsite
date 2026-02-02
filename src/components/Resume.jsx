import React from "react";
import { Paper, Typography, Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Resume() {
  const theme = useTheme();
  
  const glass = {
    p: { xs: 3, md: 5 },
    backdropFilter: "blur(20px)",
    background: `linear-gradient(135deg, 
      rgba(0,229,255,0.08) 0%, 
      rgba(255,64,129,0.08) 50%, 
      rgba(0,229,255,0.05) 100%
    )`,
    border: `1px solid ${theme.palette.primary.main}30`,
    borderRadius: 6,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: `0 25px 50px rgba(0,229,255,0.15), 0 15px 35px rgba(255,64,129,0.1)`
    }
  };

  const sectionStyle = {
    mb: 4,
    p: 3,
    borderRadius: 4,
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${theme.palette.primary.main}20`
  };

  return (
    <Container maxWidth="lg" id="experience" sx={{ py: { xs: 2, md: 4 } }}>
      <Typography 
        variant="h3" 
        sx={{ 
          textAlign: "center", 
          mb: { xs: 4, md: 6 },
          fontWeight: 800,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "2rem", md: "3rem" }
        }}
      >
        Experience
      </Typography>
      
      <Paper sx={glass}>
        {/* Experience Section */}
        <Box sx={sectionStyle}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: theme.palette.primary.main, 
              fontWeight: 700, 
              mb: 3,
              fontSize: { xs: "1.5rem", md: "2rem" }
            }}
          >
            Experience
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "white", 
                fontWeight: 600,
                fontSize: { xs: "1.1rem", md: "1.25rem" }
              }}
            >
              Frontend Developer – Praise Array
            </Typography>
            <Typography 
              sx={{ 
                color: theme.palette.secondary.main, 
                fontWeight: 500, 
                mb: 2,
                fontSize: { xs: "0.9rem", md: "1rem" }
              }}
            >
              2023 – Present
            </Typography>
            <Typography 
              sx={{ 
                color: "rgba(255,255,255,0.8)", 
                lineHeight: 1.6,
                fontSize: { xs: "0.9rem", md: "1rem" }
              }}
            >
              Built modern UIs using React.js, enhanced app performance, and collaborated with backend teams to integrate APIs.
            </Typography>
          </Box>
        </Box>

        {/* Education Section */}
        <Box sx={sectionStyle}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: theme.palette.primary.main, 
              fontWeight: 700, 
              mb: 3,
              fontSize: { xs: "1.5rem", md: "2rem" }
            }}
          >
            Education
          </Typography>
          
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "white", 
                fontWeight: 600,
                fontSize: { xs: "1.1rem", md: "1.25rem" }
              }}
            >
              Master of Computer Applications – Pune University
            </Typography>
            <Typography 
              sx={{ 
                color: theme.palette.secondary.main, 
                fontWeight: 500, 
                mb: 2,
                fontSize: { xs: "0.9rem", md: "1rem" }
              }}
            >
              2022 – 2024
            </Typography>
            <Typography 
              sx={{ 
                color: "rgba(255,255,255,0.8)", 
                lineHeight: 1.6,
                fontSize: { xs: "0.9rem", md: "1rem" }
              }}
            >
              Graduated with 83% specializing in software development, programming, and database systems.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
