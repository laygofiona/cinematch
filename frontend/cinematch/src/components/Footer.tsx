import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";

import { Link } from "react-router-dom";

export default function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <Box>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: "1px solid #e0e0e0",
            zIndex: 100,
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Home"
              component={Link}
              to="/swipe"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              label="Matches"
              component={Link}
              to="/matches"
              icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
              label="Chats"
              component={Link}
              to="/chat"
              icon={<ChatBubbleIcon />}
            />
            <BottomNavigationAction
              label="Profile"
              component={Link}
              to="profile"
              icon={<PersonIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}
