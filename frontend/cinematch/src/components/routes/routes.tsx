import Landing from "./LandingPage";
import Profile from "./Profile";
import Swipe from "./Swipe";
import Matches from "./Matches";
import Chat from "./Chat";
import SignUp from "./SignUp";

const routes = [
  { path: "/", element: <Landing /> },
  { path: "/profile", element: <Profile /> },
  { path: "/swipe", element: <Swipe /> },
  { path: "/matches", element: <Matches /> },
  { path: "/chat", element: <Chat /> },
  { path: "/signup", element: <SignUp /> },
  // Add more routes as needed
];

export default routes;
