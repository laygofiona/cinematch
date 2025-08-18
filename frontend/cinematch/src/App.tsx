import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./components/routes/routes.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useLockBodyScroll } from "@uidotdev/usehooks";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#080707", // overall app background
      paper: "#2a1e3f", // surfaces like Paper, AppBar, Cards, BottomNavigation
    },
    primary: {
      main: "#fcd98a", // primary color for buttons, links, etc.
    },
  },
});

//const router = createBrowserRouter(routes);
const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

function App() {
  // Locks Scrolling in the body
  useLockBodyScroll();
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
