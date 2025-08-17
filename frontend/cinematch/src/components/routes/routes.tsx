import Landing from "./LandingPage";
import Profile from "./Profile";
import Swipe from "./Swipe";
import Matches from "./Matches";
import Chat from "./Chat";
import SignIn from "./SignIn";
import Portal from "../Portal";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  // Landing page wrapped in ProtectedRoute
  {
    path: "/",
    element: <Landing />,
  },

  // Sign-in route does not require authentication
  { path: "/signin", element: <SignIn /> },

  // Routes wrapped in the Portal layout and ProtectedRoute
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Portal />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "swipe", element: <Swipe /> },
          { path: "matches", element: <Matches /> },
          { path: "chat", element: <Chat /> },
        ],
      },
    ],
  },
];

export default routes;
