import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff1744",
    },
    secondary: {
      main: "#d50000",
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(135deg, #0a0a0a 70%, #ff1744 100%)",
          color: "#ffffff",
          fontFamily: "'Open Sans', sans-serif",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}
