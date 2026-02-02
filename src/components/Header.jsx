import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const buttonStyles = {
    color: "white",
    fontWeight: 500,
    borderRadius: 3,
    px: 2,
    py: 1,
    position: "relative",
    overflow: "hidden",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      transition: "left 0.3s ease",
      zIndex: -1
    },
    "&:hover:before": {
      left: 0
    },
    "&:hover": {
      color: "white",
      transform: "translateY(-2px)"
    }
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        background: `linear-gradient(135deg, rgba(0,229,255,0.1), rgba(255,64,129,0.1))`,
        backdropFilter: "blur(20px)",
        borderRight: `1px solid ${theme.palette.primary.main}30`
      }}
    >
      <List sx={{ pt: 8 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} sx={{ p: 0, mb: 1 }}>
            <Button
              href={item.href}
              fullWidth
              onClick={handleDrawerToggle}
              sx={{
                ...buttonStyles,
                justifyContent: "flex-start",
                mx: 2,
                "&:before": {
                  ...buttonStyles["&:before"],
                  background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
                }
              }}
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(14px)",
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.primary.main}30`
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Aditya.dev
          </Typography>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: theme.palette.primary.main }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={buttonStyles}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            background: 'transparent',
            border: 'none'
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
