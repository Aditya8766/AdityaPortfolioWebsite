import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#c8ef8c" },
    secondary: { main: "#aabfa1" },
    background: { default: "#0b1012", paper: "#111a15" }
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h2: { fontWeight: 800 },
    h4: { fontWeight: 700 }
  },
  shape: { borderRadius: 20 }
});
