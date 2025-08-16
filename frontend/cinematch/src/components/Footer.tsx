import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SwipeIcon from "@mui/icons-material/Swipe";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";

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
            <BottomNavigationAction label="Chats" icon={<ChatBubbleIcon />} />
            <BottomNavigationAction label="Matches" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Swipe" icon={<SwipeIcon />} />
            <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}
