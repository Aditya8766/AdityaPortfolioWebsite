import { useState } from 'react';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [prepared, setPrepared] = useState(false);
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  function change(event) {
    setFormData(previous => ({ ...previous, [event.target.name]: event.target.value }));
    setPrepared(false);
    setError('');
  }
  function submit(event) {
    event.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    if (!name || !email || !message) { setError('Please enter your name, email, and message.'); return; }
    const text = `Hi Aditya!\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}\n\n---\nSent from your portfolio website`;
    const url = `https://wa.me/918766971902?text=${encodeURIComponent(text)}`;
    setLink(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    setPrepared(true);
  }
  return <section id="contact" className="contact-panel" aria-labelledby="contact-heading">
    <div className="contact-panel-top"><span className="eyebrow">LET’S START A CONVERSATION</span><span aria-hidden="true">↗</span></div>
    <Typography component="h3" id="contact-heading">Get In Touch</Typography>
    <p className="contact-description">Have a project or opportunity in mind? Tell me a little about it.</p>
    <Box component="form" onSubmit={submit} className="contact-form">
      <div className="contact-field-row">
        <TextField name="name" label="Your Name" autoComplete="name" required fullWidth value={formData.name} onChange={change} variant="outlined" slotProps={{ htmlInput: { maxLength: 100 } }} />
        <TextField name="email" label="Your Email" type="email" autoComplete="email" required fullWidth value={formData.email} onChange={change} variant="outlined" slotProps={{ htmlInput: { maxLength: 254 } }} />
      </div>
      <TextField name="message" label="Your Message" required fullWidth multiline minRows={4} maxRows={8} value={formData.message} onChange={change} variant="outlined" placeholder="What are you building, and how can I help?" slotProps={{ htmlInput: { maxLength: 2000 } }} />
      {error && <Alert severity="error">{error}</Alert>}
      <div className="contact-form-bottom"><p>Opens WhatsApp with your message.<br />You review it before sending.</p><Button type="submit" variant="contained" endIcon={<ArrowOutwardIcon />}>Send Message</Button></div>
      {prepared && <Alert severity="info">Your message is ready in WhatsApp. If it didn’t open, <a href={link} target="_blank" rel="noopener noreferrer">continue here</a>.</Alert>}
    </Box>
  </section>;
}
