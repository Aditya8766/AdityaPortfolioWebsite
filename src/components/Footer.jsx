import { Box, Typography, Button, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useTheme } from "@mui/material/styles";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

const socialLinks = [
  { icon: GitHubIcon, href: "https://github.com/Aditya8766", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/aditya-bhosale-107682249/", label: "LinkedIn" },
  { icon: YouTubeIcon, href: "https://www.youtube.com/@BhatakyaDeveloper", label: "YouTube" }
];

export default function Footer() {
  const theme = useTheme();

  return (
    <Box 
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 2, md: 4 },
        mt: 8,
        borderTop: `1px solid ${theme.palette.primary.main}30`,
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: { xs: 2, md: 0 }
      }}
    >
      {/* Navigation Links */}
      <Box sx={{ 
        display: "flex", 
        gap: { xs: 1, md: 2 },
        flexWrap: "wrap",
        justifyContent: "center",
        order: { xs: 1, md: 0 }
      }}>
        {navItems.map((item) => (
          <Button
            key={item.label}
            href={item.href}
            sx={{
              color: "white",
              fontSize: { xs: 12, md: 14 },
              minWidth: "auto",
              px: 1,
              "&:hover": {
                color: theme.palette.primary.main
              }
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      {/* Copyright */}
      <Typography sx={{ 
        color: "rgba(255,255,255,0.7)", 
        fontSize: { xs: 12, md: 14 },
        order: { xs: 3, md: 0 },
        textAlign: "center"
      }}>
        <Box component="span" sx={{ display: { xs: "inline", md: "none" } }}>
          © 2026 Aditya
        </Box>
        <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
          © 2026 Aditya. All rights reserved.
        </Box>
      </Typography>
      
      {/* Social Links */}
      <Box sx={{ 
        display: "flex", 
        gap: { xs: 0.5, md: 1 },
        order: { xs: 2, md: 0 }
      }}>
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <IconButton
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.7)",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "translateY(-2px)"
                }
              }}
            >
              <IconComponent fontSize="small" />
            </IconButton>
          );
        })}
      </Box>
    </Box>
  );
}