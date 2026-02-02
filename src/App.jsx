import { Box, Container } from "@mui/material";
import Hero from "./components/Hero";
import About from "./components/About";
import Resume from "./components/Resume";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DynamicFavicon from "./components/DynamicFavicon";

export default function App() {
  return (
    <Box sx={{ scrollBehavior: "smooth" }}>
      <DynamicFavicon />
      {/* Background video */}
      <video autoPlay loop muted playsInline
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2
        }}>
        <source src="/underwater.mp4" type="video/mp4" />
      </video>

      {/* premium blur overlay */}
      <Box sx={{
        position: "fixed",
        inset: 0,
        backdropFilter: "blur(6px)",
        bgcolor: "rgba(0,0,0,0.45)",
        zIndex: -1
      }}/>

      <Header />

      <Container maxWidth="xl" sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
        <Hero />
        <About />
        <Resume />
        <Projects />
        <Contact />
      </Container>
      <Footer />
    </Box>
  );
}
