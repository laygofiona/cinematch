import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SwipeIcon from "@mui/icons-material/Swipe";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";

export default function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <div className="border-t border-gray-300 bg-white">
      <Box>
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
      </Box>
    </div>
  );
}
