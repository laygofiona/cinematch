import Landing from "./LandingPage";
import Profile from "./Profile";
import Swipe from "./Swipe";
import Matches from "./Matches";
import Chat from "./Chat";
import SignIn from "./SignIn";
import Portal from "../Portal";

const routes = [
  // Routes without the Portal layout
  { path: "/", element: <Landing /> },
  { path: "/signin", element: <SignIn /> },

  // Routes wrapped in the Portal layout
  {
    path: "/", // layout route
    element: <Portal />,
    children: [
      { path: "profile", element: <Profile /> },
      { path: "swipe", element: <Swipe /> },
      { path: "matches", element: <Matches /> },
      { path: "chat", element: <Chat /> },
    ],
  },
];

export default routes;
