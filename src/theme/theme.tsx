import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0073b7",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#005992",
    },
    background: {
      default: "#212121",
    },
  },
});
