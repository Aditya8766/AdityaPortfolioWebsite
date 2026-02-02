import { Box, Typography, Stack, Avatar } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function Hero(){
  return (
    <Box
      id="home"
      sx={{
        minHeight:"100vh",
        display:"flex",
        flexDirection:{xs:"column", md:"row"},
        alignItems:"center",
        justifyContent:"center",
        gap:8,
        pt:12
      }}
    >

      {/* LEFT TEXT */}
      <motion.div
        initial={{opacity:0, x:-60}}
        animate={{opacity:1, x:0}}
        transition={{duration:1}}
      >
        <Typography
          sx={{
            fontSize:{xs:34, md:64},
            fontWeight:800,
            background:"linear-gradient(90deg,#00e5ff,#7c4dff)",
            WebkitBackgroundClip:"text",
            color:"transparent"
          }}
        >
          Aditya Bhosale
        </Typography>

        <TypeAnimation
          sequence={[
            "React Developer",1500,
            "Full Stack Engineer",1500,
            "Problem Solver",1500
          ]}
          repeat={Infinity}
          style={{fontSize:24}}
        />

        <Typography sx={{maxWidth:520, mt:3, color: "rgba(255,255,255,0.8)", lineHeight: 1.6}}>
          Passionate web developer building modern, scalable, user-friendly applications. 
          I specialize in React, Node.js, and creating seamless digital experiences 
          that combine cutting-edge technology with intuitive design. From responsive 
          front-end interfaces to robust back-end systems, I deliver solutions that 
          perform flawlessly across all devices and exceed user expectations.
        </Typography>
      </motion.div>


      {/* RIGHT IMAGE */}
      <motion.div
        initial={{opacity:0, x:60}}
        animate={{opacity:1, x:0}}
        transition={{duration:1}}
      >
        <Box sx={{
          p:1,
          borderRadius:"50%",
          background:"linear-gradient(45deg,#00e5ff,#7c4dff)",
          boxShadow:"0 0 40px rgba(0,229,255,.6)"
        }}>
          <Avatar
            src="/myImg.png"
            sx={{
              width:{xs:180, md:260},
              height:{xs:180, md:260},
              border:"6px solid black"
            }}
          />
        </Box>
      </motion.div>

    </Box>
  );
}
