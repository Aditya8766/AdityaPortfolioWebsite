import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00e5ff" },
    secondary: { main: "#ff4081" },
    background: { default: "transparent" }
  },
  typography: {
    h2: { fontWeight: 800 },
    h4: { fontWeight: 700 }
  },
  shape: { borderRadius: 20 }
});
