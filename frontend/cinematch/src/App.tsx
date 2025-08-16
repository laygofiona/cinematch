import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./components/routes/routes.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2b1d40", // overall app background
      paper: "#2b1d40", // surfaces like Paper, AppBar, Cards
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
