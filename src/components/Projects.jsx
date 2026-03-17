import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import DownloadIcon from "@mui/icons-material/Download";

export default function Projects() {
  const theme = useTheme();

  const glass = {
    p: 3,
    backdropFilter: "blur(20px)",
    background: `linear-gradient(135deg, 
      rgba(0,229,255,0.08) 0%, 
      rgba(255,64,129,0.08) 50%, 
      rgba(0,229,255,0.05) 100%
    )`,
    border: `1px solid ${theme.palette.primary.main}30`,
    borderRadius: 6,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "3px",
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      transition: "left 0.6s ease",
    },
    "&:hover": {
      transform: "translateY(-12px)",
      boxShadow: `0 25px 50px rgba(0,229,255,0.2), 0 15px 35px rgba(255,64,129,0.15)`,
      "&:before": {
        left: 0,
      },
    },
  };

  const projects = [
    {
      title: "Feedback Management System",
      desc: "AI-assisted feedback platform built with React and FastAPI, featuring feedback submission, dashboard analytics, sentiment analysis, and LLM-based categorized insights using LangChain.",
      tech: ["React", "FastAPI", "Python", "LangChain"],
    },
    {
      title: "DevCode IDE",
      desc: "Modern web-based IDE with syntax highlighting, code execution, and real-time collaboration features for developers.",
      tech: ["React", "Material-UI", "CodeMirror"],
    },
    {
      title: "Space Shooter Game",
      desc: "Interactive browser-based space shooter built with React and Three.js, featuring AI-driven enemy behavior, dynamic collision handling, particle effects, and responsive gameplay.",
      tech: ["React", "Three.js", "Javascript", "AI"],
    },
  ];

  return (
    <Container maxWidth="lg" id="projects" sx={{ py: { xs: 2, md: 4 } }}>
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
          fontSize: { xs: "2rem", md: "3rem" },
        }}
      >
        Featured Projects
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={glass}>
              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  {project.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.6,
                    mb: 3,
                    flexGrow: 1,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                >
                  {project.desc}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  {project.tech.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      size="small"
                      sx={{
                        mr: 1,
                        mb: 1,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                        color: theme.palette.primary.main,
                        border: `1px solid ${theme.palette.primary.main}40`,
                        fontSize: "0.75rem",
                      }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    startIcon={<LaunchIcon />}
                    disabled={i === 0}
                    href={
                      i === 1
                        ? "https://dev-code-ide-client.vercel.app/"
                        : i === 2
                          ? "https://space-shooter-game-pi.vercel.app/"
                          : "#"
                    }
                    target={i === 1 || i === 2 ? "_blank" : "_self"}
                    rel={i === 1 || i === 2 ? "noopener noreferrer" : ""}
                    sx={{
                      color:
                        i === 0
                          ? "rgba(255,255,255,0.4)"
                          : theme.palette.primary.main,
                      borderColor:
                        i === 0
                          ? "rgba(255,255,255,0.2)"
                          : theme.palette.primary.main,
                      "&:hover": {
                        background:
                          i === 0
                            ? "transparent"
                            : `${theme.palette.primary.main}20`,
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                    variant="outlined"
                  >
                    {i === 0 ? "Private Project" : "Live Demo"}
                  </Button>
                  <Button
                    size="small"
                    startIcon={<GitHubIcon />}
                    href={
                      i === 1
                        ? "https://github.com/Aditya8766/DevCodeIDEClient"
                        : i === 2
                          ? "https://github.com/Aditya8766/SpaceShooterGame"
                          : "#"
                    }
                    target={i === 1 || i === 2 ? "_blank" : "_self"}
                    rel={i === 1 || i === 2 ? "noopener noreferrer" : ""}
                    disabled={i === 0}
                    sx={{
                      color:
                        i === 0
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(255,255,255,0.7)",
                      borderColor:
                        i === 0
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.3)",
                      "&:hover": {
                        background:
                          i === 0 ? "transparent" : "rgba(255,255,255,0.1)",
                        borderColor:
                          i === 0
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(255,255,255,0.5)",
                      },
                    }}
                    variant="outlined"
                  >
                    {i === 0 ? "Private" : "Code"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.8)",
            mb: 3,
            fontSize: { xs: "1rem", md: "1.1rem" },
          }}
        >
          Want to see more of my work?
        </Typography>
        <Button
          href="https://github.com/Aditya8766"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHubIcon />}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: "white",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 8px 25px rgba(0,229,255,0.3)`,
            },
          }}
        >
          Check out my GitHub
        </Button>
      </Box>
    </Container>
  );
}
