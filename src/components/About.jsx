import React from "react";
import { Paper, Typography, Avatar, Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function About() {
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
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "2px",
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      transition: "left 0.6s ease"
    },
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: `0 25px 50px rgba(0,229,255,0.15), 0 15px 35px rgba(255,64,129,0.1)`,
      "&:before": {
        left: 0
      }
    }
  };

  return (
    <Container maxWidth="lg" id="about" sx={{ py: { xs: 4, md: 8 } }}>
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
        About Me
      </Typography>
      
      <Paper sx={glass}>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center", md: "flex-start" },
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 5 },
            textAlign: { xs: "center", md: "left" }
          }}
        >
          <Box sx={{ position: "relative", flexShrink: 0 }}>
            <Avatar
              src="/myImg.png"
              alt="Aditya Bhosale"
              sx={{ 
                width: { xs: 120, md: 160 }, 
                height: { xs: 120, md: 160 },
                border: `3px solid ${theme.palette.primary.main}40`,
                boxShadow: `0 8px 32px rgba(0,229,255,0.3)`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: `0 12px 40px rgba(0,229,255,0.4)`
                }
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                  "100%": { transform: "scale(1)" }
                }
              }}
            >
              ✨
            </Box>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: "white", 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: "1.25rem", md: "1.5rem" }
              }}
            >
              Hi! I'm{" "}
              <Box 
                component="span" 
                sx={{ 
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 800
                }}
              >
                Aditya Bhosale
              </Box>{" "}
              <Box component="span" sx={{ fontSize: "1.2em" }}>👋</Box>
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: theme.palette.primary.main, 
                fontWeight: 500, 
                mb: 3,
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontStyle: "italic"
              }}
            >
              Passionate web developer building modern, scalable, user-friendly applications.
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: "rgba(255,255,255,0.9)", 
                lineHeight: 1.8,
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                "& strong": {
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }
              }}
            >
              I'm a <strong>Full-Stack Web Developer</strong> who loves turning ideas into modern, high-performance web experiences. I've spent years working with React, Node.js, JavaScript, and other modern web technologies, building applications that are not just functional but also <strong>ultra-responsive, visually appealing</strong>, and smooth to use.
              <br /><br />
              I enjoy creating web solutions that scale, whether it's crafting interactive front-end interfaces, connecting them to robust back-end APIs, or making sure every project runs efficiently and reliably. I also handle <strong>database management, version control with Git, and deployment</strong>, so your project is solid from start to finish.
              <br /><br />
              Design matters to me just as much as functionality. I focus on <strong>UI/UX</strong> to make sure every website or application is intuitive, engaging, and easy to navigate. I'm always learning, experimenting, and exploring new tools and technologies, because the web is constantly evolving—and I want to stay ahead.
              <br /><br />
              Whether you're a company looking for a dedicated developer or a client wanting a <strong>premium-quality website</strong>, I'm here to help bring your vision to life with solutions that are modern, reliable, and designed to impress.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
