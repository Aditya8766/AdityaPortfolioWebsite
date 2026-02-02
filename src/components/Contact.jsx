import React, { useState } from "react";
import { Paper, TextField, Button, Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";

export default function Contact() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }

    const whatsappMessage = `Hi Aditya! 👋\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}\n\n---\nSent from your portfolio website`;
    const whatsappURL = `https://wa.me/8766971902?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappURL, '_blank');
  };

  return (
    <Container maxWidth="md" id="contact" sx={{ py: { xs: 2, md: 4 } }}>
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
        Get In Touch
      </Typography>
      
      <Paper sx={glass}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField 
            name="name"
            label="Your Name" 
            variant="filled" 
            fullWidth 
            value={formData.name}
            onChange={handleInputChange}
            sx={{
              '& .MuiFilledInput-root': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)'
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255,255,255,0.15)'
                }
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255,255,255,0.7)'
              },
              '& .MuiFilledInput-input': {
                color: 'white'
              }
            }}
          />
          <TextField 
            name="email"
            label="Your Email" 
            type="email"
            variant="filled" 
            fullWidth 
            value={formData.email}
            onChange={handleInputChange}
            sx={{
              '& .MuiFilledInput-root': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)'
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255,255,255,0.15)'
                }
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255,255,255,0.7)'
              },
              '& .MuiFilledInput-input': {
                color: 'white'
              }
            }}
          />
          <TextField
            name="message"
            label="Your Message"
            variant="filled"
            fullWidth
            multiline
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            sx={{
              '& .MuiFilledInput-root': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)'
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255,255,255,0.15)'
                }
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255,255,255,0.7)'
              },
              '& .MuiFilledInput-input': {
                color: 'white'
              }
            }}
          />
          <Button 
            type="submit"
            variant="contained" 
            endIcon={<SendIcon />}
            sx={{ 
              mt: 2,
              py: 1.5,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              fontWeight: 600,
              fontSize: '1.1rem',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px rgba(0,229,255,0.3)`
              }
            }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
