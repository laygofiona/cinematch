import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./components/routes/routes.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#db4e6b", // overall app background
      paper: "#2a1e3f", // surfaces like Paper, AppBar, Cards, BottomNavigation
    },
    primary: {
      main: "#fad88e", // primary color for buttons, links, etc.
    },
  },
});

//const router = createBrowserRouter(routes);
const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
