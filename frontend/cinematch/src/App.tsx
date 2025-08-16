import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./components/routes/routes.tsx";

//const router = createBrowserRouter(routes);
const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
